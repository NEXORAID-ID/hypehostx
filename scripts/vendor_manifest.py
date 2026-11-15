from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
manifest=ROOT/'vendor/manifest.json'
data=json.loads(manifest.read_text(encoding='utf-8'))
data['assets']=[{'path':p.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'size':p.stat().st_size} for p in sorted((ROOT/'vendor').rglob('*')) if p.is_file() and p!=manifest]
manifest.write_text(json.dumps(data,indent=2)+'\n',encoding='utf-8')
print('Vendor inventory:',len(data['assets']),'files')
