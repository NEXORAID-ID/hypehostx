"""Render compatibility evidence and dropdowns from the checked-in JSON database."""
from pathlib import Path
import json,re,html
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'compatibility/firmware.json').read_text(encoding='utf-8'))
(ROOT/'assets/data.js').write_text('window.HXDATA='+json.dumps(data,separators=(',',':'))+';\n',encoding='utf-8')
rows=data['compatibility']
for prefix in ['', 'id/']:
    ind=bool(prefix); tr=lambda en,local:local if ind else en
    p=ROOT/prefix/'compatibility/index.html';s=p.read_text(encoding='utf-8')
    table=''.join('<tr><td>'+r['platform'].upper()+'</td><td>'+r['firmware']+'</td><td>'+r['type']+'</td><td>'+html.escape(r['upstream'])+'</td><td><a href="'+r['source']+'" rel="noreferrer">'+tr('Evidence','Sumber')+'</a></td><td>'+tr('Not tested','Belum diuji')+'</td></tr>' for r in rows)
    s=re.sub(r'<tbody>.*?</tbody>','<tbody>'+table+'</tbody>',s,flags=re.S)
    s=re.sub(r'\d+ (records|catatan):',str(len(rows))+' '+tr('records:','catatan:'),s)
    s=s.replace('and UMTX2 offset files.','UMTX2 host offsets, and etaHEN source-only offsets.').replace('dan file offset UMTX2.','offset host UMTX2, dan offset source-only etaHEN.')
    p.write_text(s,encoding='utf-8')
    for platform in ['ps3','ps4','ps5']:
        p=ROOT/prefix/platform/'index.html';s=p.read_text(encoding='utf-8')
        opts='<option value="">'+tr('Select a recorded version','Pilih versi yang tercatat')+'</option>'+''.join('<option value="'+r['firmware']+'">'+r['firmware']+' / '+r['type']+'</option>' for r in rows if r['platform']==platform)
        s=re.sub(r'(<select id="known-firmware">).*?(</select>)',lambda m:m[1]+opts+m[2],s,flags=re.S)
        p.write_text(s,encoding='utf-8')
print('Synced',len(rows),'firmware records')
