"""Import pinned upstream snapshots. Never executes console code."""
from pathlib import Path
import json, hashlib, shutil, subprocess, zipfile, re, urllib.request
ROOT=Path(__file__).resolve().parents[1]
VENDOR=ROOT/'vendor'; VENDOR.mkdir(exist_ok=True)
sources=VENDOR/'sources'; sources.mkdir(exist_ok=True)
records=[]
def snapshot(name,repo):
    src=ROOT/'.upstream'/name
    commit=subprocess.check_output(['git','-C',str(src),'rev-parse','HEAD'],text=True).strip()
    archive=sources/(name+'-'+commit[:12]+'.zip')
    subprocess.run(['git','-C',str(src),'archive','--format=zip','--output='+str(archive),'HEAD'],check=True)
    records.append({'component':name,'repository':repo,'commit':commit,'sourceArchive':archive.relative_to(ROOT).as_posix()})
    return src
ps3=snapshot('ps3hen','https://github.com/PS3Xploit/PS3HEN')
target=VENDOR/'ps3hen'; target.mkdir(exist_ok=True)
with zipfile.ZipFile(ps3/'html/hen_installer/offline_local/offline.zip') as z:
    for info in z.infolist():
        if info.is_dir(): continue
        rel=Path(info.filename).relative_to('offline')
        dest=(target/rel).resolve()
        assert dest.is_relative_to(target.resolve())
        dest.parent.mkdir(parents=True,exist_ok=True); dest.write_bytes(z.read(info))
shutil.copy2(ps3/'LICENSE.txt',target/'LICENSE.txt')
shutil.copy2(ps3/'README.md',target/'UPSTREAM-README.md')

ps4=snapshot('gamerhack','https://github.com/GamerHack/GamerHack.github.io')
shutil.copytree(ps4,VENDOR/'gamerhack',ignore=shutil.ignore_patterns('.git','.github'),dirs_exist_ok=True)

ps5=snapshot('umtx2','https://github.com/idlesauce/umtx2')
shutil.copytree(ps5/'document/en/ps5',VENDOR/'ps5',ignore=shutil.ignore_patterns('payloads'),dirs_exist_ok=True)
shutil.copy2(ps5/'LICENSE',VENDOR/'ps5/LICENSE')
shutil.copy2(ps5/'README.md',VENDOR/'ps5/UPSTREAM-README.md')
payloads=VENDOR/'ps5/payloads'; payloads.mkdir(exist_ok=True)
shutil.copy2(ps5/'document/en/ps5/payloads/elfldr-ps5.elf',payloads/'elfldr-ps5.elf')
eta=snapshot('etahen','https://github.com/etaHEN/etaHEN')
# Preserve the host's exact default payload to avoid silently upgrading its tested pairing.
shutil.copy2(ps5/'document/en/ps5/payloads/etaHEN-2.4B.bin',payloads/'etaHEN-2.4B.bin')
shutil.copy2(eta/'etaHEN-2.5B.bin',payloads/'etaHEN-2.5B.bin')
shutil.copy2(eta/'LICENSE',VENDOR/'ps5/LICENSE-etaHEN')
shutil.copy2(eta/'README.md',VENDOR/'ps5/etaHEN-README.md')
mapping=(ps5/'document/en/ps5/payload_map.js').read_text(encoding='utf-8')
item=re.search(r'\{\s*displayTitle: "etaHEN",.*?\n    \}',mapping,re.S).group(0)
newer=item.replace('"etaHEN"','"etaHEN 2.5B (manual selection)"').replace('2.4B','2.5B').replace('2.4b','2.5b')
newer=re.sub(r'binarySource: "[^"]+"', 'binarySource: "https://github.com/etaHEN/etaHEN/releases/tag/2.5B"',newer)
(VENDOR/'ps5/payload_map.js').write_text('const CUSTOM_ACTION_APPCACHE_REMOVE="appcache-remove";\nconst payload_map=[\n'+item+',\n'+newer+'\n];\n',encoding='utf-8')
# Full source and notices for nested AGPL PSFree and MIT elfldr.
urllib.request.urlretrieve('https://www.gnu.org/licenses/agpl-3.0.txt',VENDOR/'ps5/psfree/COPYING')
urllib.request.urlretrieve('https://raw.githubusercontent.com/ps5-payload-dev/elfldr/v0.21/LICENSE',VENDOR/'ps5/LICENSE-elfldr')
subprocess.run(['python',str(ps5/'appcache_manifest_generator.py'),'-d',str(VENDOR/'ps5')],check=True)

assets=[]
for p in sorted(VENDOR.rglob('*')):
    if p.is_file(): assets.append({'path':p.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'size':p.stat().st_size})
(VENDOR/'manifest.json').write_text(json.dumps({'reviewed':'2026-11-15','snapshots':records,'assets':assets},indent=2),encoding='utf-8')
print(json.dumps({'vendorFiles':len(assets),'bytes':sum(x['size'] for x in assets),'snapshots':records}))
