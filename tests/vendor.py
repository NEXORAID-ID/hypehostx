"""Asset/provenance tests only: never execute upstream exploit code."""
from pathlib import Path
from urllib.parse import urlsplit,unquote
from html.parser import HTMLParser
import json,hashlib,re
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'vendor/manifest.json').read_text())
for a in data['assets']:
    p=ROOT/a['path']; assert p.is_file(),p
    assert p.stat().st_size==a['size'] and hashlib.sha256(p.read_bytes()).hexdigest()==a['sha256'],p
    assert p.stat().st_size<100*1024*1024,f'GitHub single-file limit: {p}'
for p in (ROOT/'vendor').rglob('*'):
    if p.suffix not in ('.manifest','.appcache'):continue
    cache=True
    for line in p.read_text(encoding='utf-8').splitlines():
        line=line.strip().split(' #')[0].replace('\\','/')
        if line in ['NETWORK:','FALLBACK:']:cache=False;continue
        if line=='CACHE:':cache=True;continue
        if not cache or not line or line.startswith('#') or line=='CACHE MANIFEST':continue
        if urlsplit(line).scheme:continue
        target=p.parent/unquote(urlsplit(line).path)
        assert target.exists(),f'{p}: missing cache dependency {line}'
for r in json.loads((ROOT/'compatibility/firmware.json').read_text())['compatibility']:
    if not r.get('localHost'):
        assert r['scope']=='payload-source-only',r
        continue
    assert (ROOT/r['localHost']).exists(),r
    if r['platform']=='ps3':
        fw='.'.join(r['firmware'].split('.')[:2])+('D' if r['type'].startswith('DEX') else '')
        assert (ROOT/'vendor/ps3hen'/fw/'PS3HEN.p3t').exists(),r
    if r['platform']=='ps5':assert (ROOT/Path(r['localHost']).parent/'offsets'/(r['firmware']+'.js')).exists(),r
for f in re.findall(r'fileName:\s*"([^"]+)"',(ROOT/'vendor/ps5/payload_map.js').read_text()):assert (ROOT/'vendor/ps5/payloads'/f).exists(),f
assert (ROOT/'vendor/ps5/payloads/elfldr-ps5.elf').exists()
print(f'PASS: {len(data["assets"])} vendor hashes/sizes, all AppCache paths, platform routes, PS3 themes, PS5 offsets and selected payload dependencies. No native execution tested.')
