from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import hashlib, json, re, subprocess
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self): super().__init__(); self.urls=[]; self.ids=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        for k in ('href','src'):
            if k in a: self.urls.append(a[k])
pages=list(ROOT.glob('*.html'))+list(ROOT.glob('*/index.html'))+list(ROOT.glob('id/*/index.html'))
for p in pages:
    parser=Page(); parser.feed(p.read_text(encoding='utf-8'))
    assert len(parser.ids)==len(set(parser.ids)),f'duplicate id: {p}'
    for u in parser.urls:
        url=urlsplit(u)
        if url.scheme or url.netloc or not url.path: continue
        assert not url.path.startswith('/'),f'root-absolute path: {p}: {u}'
        target=(p.parent/unquote(url.path)).resolve()
        assert target.is_relative_to(ROOT) and target.exists(),f'missing local target: {p}: {u}'
manifest=json.loads((ROOT/'manifest.json').read_text())
database=json.loads((ROOT/'assets/data.js').read_text().removeprefix('window.HXDATA=').strip().rstrip(';'))
assert database==json.loads((ROOT/'compatibility/firmware.json').read_text()),'embedded and readable databases drifted'
for a in manifest['assets']:
    assert hashlib.sha256((ROOT/a['path']).read_bytes()).hexdigest()==a['sha256'],a['path']
for name in ['assets/app.js','assets/modules.js','assets/data.js','sw.js']:
    subprocess.run(['node','--check',str(ROOT/name)],check=True)
print(f'PASS: {len(pages)} HTML pages; local links/assets; unique IDs; {len(manifest["assets"])} SHA-256 entries; JS syntax.')
