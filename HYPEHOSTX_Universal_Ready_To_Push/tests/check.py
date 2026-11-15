from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,hashlib,re,subprocess
R=Path(__file__).resolve().parents[1];D=R/'dist'; data=json.loads((R/'src/data.json').read_text()); keys=set(); domains={'github.com','nexoraid-id.github.io'}
for r in data['compatibility']:
 k=(r['platform'],r['firmware'],r['type']);assert k not in keys;keys.add(k);assert re.fullmatch(r'\d{1,2}\.\d{2}(\.\d{1,2})?',r['firmware']);assert r['hardware']=='not-tested';assert urlsplit(r['source']).hostname in domains
for r in data['catalog']: assert urlsplit(r['url']).hostname in domains
class Page(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:assert a['id'] not in self.ids,a['id'];self.ids.add(a['id'])
  for prop in ('href','src'):
   if prop in a:self.links.append(a[prop])
count=0
for f in D.rglob('*.html'):
 parser=Page();parser.feed(f.read_text());count+=1
 for link in parser.links:
  u=urlsplit(link)
  if u.scheme:assert u.scheme=='https' and u.hostname in domains,(f,link);continue
  if not u.path:continue
  p=(f.parent/unquote(u.path)).resolve();assert p.is_relative_to(D.resolve());assert p.exists(),(f,link)
  if p.is_dir():assert (p/'index.html').exists()
assert count==32
m=json.loads((D/'manifest.json').read_text());total=0
for a in m['assets']:
 buf=(D/a['path']).read_bytes();assert len(buf)==a['size'];assert hashlib.sha256(buf).hexdigest()==a['sha256'];total+=len(buf)
assert total<500_000
for p in [D/'assets/app.js',D/'assets/data.js',D/'sw.js']:subprocess.run(['node','--check',str(p)],check=True)
assert not re.search(r'\b(?:eval|Function)\s*\(', (D/'assets/app.js').read_text())
print(f'PASS: {count} HTML files, local paths, unique IDs, {len(keys)} exact upstream records, source domains, {len(m["assets"])} hashes, JS syntax, {total} bytes.')
