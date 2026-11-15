from pathlib import Path
import hashlib,json,zipfile,shutil
root=Path(__file__).resolve().parents[1]
out=root/'artifacts';out.mkdir(exist_ok=True)
def archive(name,files):
 target=out/name
 with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
  for source,dest in sorted(files,key=lambda x:x[1]):
   info=zipfile.ZipInfo(dest,(2026,11,15,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o644<<16;z.writestr(info,source.read_bytes())
 return {'path':name,'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'releaseApproval':'pending'}
files=[]
files.append(archive('hypehostx-web-0.1.0-dev.zip',[(p,p.name) for p in (root/'dist/web').iterdir() if p.is_file()]))
native=[(root/'native/build/Debug'/name,name) for name in ['hypehen.exe','hypekit_sample.exe']]
native.extend([(root/'native/third_party/nlohmann/LICENSE.MIT','licenses/nlohmann-json-MIT.txt'),(root/'NOTICE.md','NOTICE.md'),(root/'docs/architecture.md','LIMITATIONS.md')])
files.append(archive('hypehen-windows-x64-0.1.0-dev.zip',native))
backend=[(p,'server/'+str(p.relative_to(root/'artifacts/backend')).replace('\\','/')) for p in (root/'artifacts/backend').rglob('*.js')]
backend.extend((p,str(p.relative_to(root)).replace('\\','/')) for p in (root/'backend/migrations').glob('*.sql'))
backend.extend((root/p,p) for p in ['package.json','package-lock.json','README.md','PRIVACY.md','SECURITY.md','NOTICE.md','docs/operations.md','packages/contracts/openapi.json'])
files.append(archive('hypenet-backend-0.1.0-dev.zip',backend))
sdk=[(p,str(p.relative_to(root)).replace('\\','/')) for p in (root/'packages/hypekit').iterdir() if p.is_file()]
sdk.append((root/'native/include/hype.hpp','native/include/hype.hpp'))
files.append(archive('hypekit-source-0.1.0-dev.zip',sdk))
files.append(archive('hypenet-web-client-0.1.0-dev.zip',[(p,p.name) for p in (root/'clients/online').iterdir() if p.is_file()]))
(out/'release-manifest.json').write_text(json.dumps({'schemaVersion':1,'version':'0.1.0-dev','target':'1.0.0','signature':None,'scope':'local development artifacts; publication not approved','artifacts':files},indent=2)+'\n',encoding='utf-8')
(out/'SHA256SUMS').write_text('\n'.join(f["sha256"]+'  '+f['path'] for f in files)+'\n',encoding='utf-8')
for f in files:print(f['path'],f['bytes'],f['sha256'])
