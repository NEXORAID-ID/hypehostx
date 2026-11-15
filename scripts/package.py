"""Refresh original-asset hashes and produce a static root-deployable ZIP."""
from pathlib import Path
import hashlib, json, re, zipfile
ROOT = Path(__file__).resolve().parents[1]
def site_files():
    return sorted([p for p in ROOT.rglob('*') if p.is_file() and not any(x.startswith('.') for x in p.relative_to(ROOT).parts) and p.suffix in ('.html','.css','.js','.svg','.png','.json') and p.relative_to(ROOT).parts[0] not in ('release','tests','scripts','docs','vendor') and p.name not in ('manifest.json','sw.js')])
def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()
if __name__ == '__main__':
    files = site_files()
    entries = [{'path':p.relative_to(ROOT).as_posix(),'sha256':digest(p),'size':p.stat().st_size} for p in files]
    revision = hashlib.sha256(json.dumps(entries,sort_keys=True).encode()).hexdigest()[:16]
    (ROOT/'manifest.json').write_text(json.dumps({'revision':revision,'assets':entries},indent=2)+'\n',encoding='utf-8')
    sw = (ROOT/'sw.js').read_text(encoding='utf-8')
    sw = re.sub(r"const CACHE=PREFIX+'[^']+';", "const CACHE=PREFIX+'"+revision+"';", sw)
    sw = re.sub(r"m.revision!=='[^']+'", "m.revision!=='"+revision+"'", sw)
    sw = re.sub(r'const FILES=\[.*?\];', 'const FILES='+json.dumps([x['path'] for x in entries])+';', sw)
    (ROOT/'sw.js').write_text(sw,encoding='utf-8')
    out = ROOT/'release'; out.mkdir(exist_ok=True)
    archive = out/'HYPEHOSTX-Universal-Cyber-1.0.0.zip'
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(ROOT.rglob('*')):
            if not p.is_file(): continue
            parts=p.relative_to(ROOT).parts
            if parts[0] in ('.upstream','.qa','.git','release') or '__pycache__' in parts or p.name=='upgrade.py': continue
            z.write(p,p.relative_to(ROOT).as_posix())
    print(json.dumps({'assets':len(files),'revision':revision,'zip':str(archive),'bytes':archive.stat().st_size}))
