from pathlib import Path
import json,re,html
ROOT=Path(__file__).resolve().parents[1]
file=ROOT/'assets/data.js'
data=json.loads(file.read_text(encoding='utf-8').removeprefix('window.HXDATA=').strip().rstrip(';'))
rows=[r for r in data['compatibility'] if r['platform']=='ps3']
for r in rows:
    r.update({'models':['Fat','Slim','Super Slim'],'evidence':'PS3HEN README exact firmware/type listing','localHost':'vendor/ps3hen/index.html','scope':'engine-reference'})
ps4={'5.05','5.07','6.72'}
for group in ['700','900']:
    for p in (ROOT/f'vendor/gamerhack/g2all/{group}/lapse').glob('*.js'):
        if p.stem.isdigit(): ps4.add(p.stem[:-2]+'.'+p.stem[-2:])
offsets=(ROOT/'vendor/gamerhack/g2all/slopkit/ps4_offsets.js').read_text()
ps4.update(re.findall(r'"(\d+\.\d{2})"(?:\s*:|\])',offsets))
# Each of these is an actual released version routed by the pinned upstream index.
ps4.update(['7.01','7.02','7.55','8.01','8.03','9.04','9.51','9.60','10.00','10.01','10.50','10.70','10.71','11.02'])
for fw in sorted(ps4,key=lambda v:tuple(map(int,v.split('.')))):
    rows.append({'platform':'ps4','firmware':fw,'type':'unknown','source':'https://github.com/GamerHack/GamerHack.github.io/blob/5bc701d626331ce75f25d02514226324bf575a65/g2all/index.html','upstream':'GamerHack routing / GoldHEN payload provided','hardware':'not-tested','models':['Fat','Slim','Pro'],'scope':'host-routing-only','evidence':'Pinned host route/offset record; not proof of GoldHEN activation','localHost':'vendor/gamerhack/672goldhen/index.html' if fw=='6.72' else 'vendor/gamerhack/g2all/index.html'})
for p in sorted((ROOT/'vendor/ps5/offsets').glob('*.js')):
    rows.append({'platform':'ps5','firmware':p.stem,'type':'unknown','source':'https://github.com/idlesauce/umtx2/blob/a080beb74d9e4bc34f3563798b716bd86b2d6ee0/document/en/ps5/offsets/'+p.name,'upstream':'UMTX2 host offsets; etaHEN 2.4B / 2.5B menu','hardware':'not-tested','models':['Original','Slim','Pro'],'scope':'host-offsets-only','evidence':'Offset file exists; model/firmware availability and payload support must be verified','localHost':'vendor/ps5/index.html'})
data['compatibility']=rows
data['catalog'].append({'platform':'ps4','name':'GamerHack','category':'Host','en':'Local upstream PS4 host snapshot.','id':'Snapshot host PS4 upstream lokal.','url':'https://github.com/GamerHack/GamerHack.github.io'})
file.write_text('window.HXDATA='+json.dumps(data,separators=(',',':'))+';\n',encoding='utf-8')
(ROOT/'compatibility/firmware.json').write_text(json.dumps(data,indent=2)+'\n',encoding='utf-8')

for path in [*ROOT.glob('*.html'), *ROOT.glob('*/index.html'), *ROOT.glob('id/*/index.html')]:
    s=path.read_text(encoding='utf-8')
    ind=bool(re.search(r'<html lang="id"',s)); tr=lambda en,local:local if ind else en
    root=re.search(r'data-root="([^"]+)"',s).group(1)
    page=re.search(r'data-page="([^"]*)"',s).group(1)
    base=root+('id/' if ind else '')
    replacements={
        'No HEN binary or exploit is bundled; hardware compatibility is not verified.':'Upstream installers and payloads are included separately; hardware operation is not verified.',
        'Tidak menyertakan binary HEN atau exploit; kompatibilitas perangkat asli belum diuji.':'Installer dan payload upstream tersedia secara terpisah; operasi pada perangkat asli belum diuji.',
        'No third-party HEN binaries, source or logos are distributed with this website.':'Third-party components, license notices, source archives and hashes are available in vendor/. GoldHEN permission is owner-reported.',
        'Tidak ada binary, source atau logo HEN pihak ketiga yang didistribusikan bersama situs ini.':'Komponen pihak ketiga, lisensi, source archive, dan hash tersedia di vendor/. Izin GoldHEN dinyatakan oleh pemilik.',
        'Original project identity is retained. This site does not execute or install it.':'Original project identity is retained. Open the local upstream host explicitly to run its installer.',
        'Identitas proyek asli dipertahankan. Situs ini tidak menjalankan atau menginstalnya.':'Identitas proyek asli dipertahankan. Buka host upstream lokal secara eksplisit untuk menjalankan installer.',
        'DOCUMENTATION ONLY':'UPSTREAM COMPONENT', 'HANYA DOKUMENTASI':'KOMPONEN UPSTREAM',
        'External provider. HYPEHOSTX does not embed or execute the installer.':'Local upstream host. Requirements vary by firmware.',
        'Penyedia eksternal. HYPEHOSTX tidak menyematkan atau menjalankan installer.':'Host upstream lokal. Persyaratan berbeda menurut firmware.',
        'No. This original interface provides references, compatibility information and navigation to upstream documentation.':'Local upstream installer files are included. Their native results must be verified on the console; opening a link is not proof of activation.',
        'Tidak. Antarmuka original ini menyediakan referensi, informasi kompatibilitas dan navigasi ke dokumentasi upstream.':'File installer upstream lokal tersedia. Hasil native harus diverifikasi pada konsol; membuka tautan bukan bukti aktivasi.'
    }
    for old,new in replacements.items(): s=s.replace(old,new)
    if not ind:
        s=s.replace('Mode konsol ringan (otomatis pada browser konsol)','Lightweight console mode (automatic on console browsers)').replace('>Tema</label>','>Theme</label>')
    if page in ['ps3','ps4','ps5']:
        names={'ps3':'PS3HEN offline-local','ps4':'GamerHack + GoldHEN','ps5':'UMTX2 + etaHEN'}
        urls={'ps3':'vendor/ps3hen/index.html','ps4':'vendor/gamerhack/index.html','ps5':'vendor/ps5/index.html'}
        note={'ps3':tr('Local HTML, JavaScript and 16 firmware theme files. The native stage may still fetch the final PKG from PS3Xploit. Read upstream instructions.','HTML, JavaScript, dan 16 berkas tema firmware lokal. Tahap native masih dapat mengambil PKG akhir dari PS3Xploit. Baca petunjuk upstream.'),'ps4':tr('Complete pinned GamerHack snapshot, including its firmware routes and GoldHEN binaries. Choose the exact firmware; a host route is not hardware validation.','Snapshot GamerHack lengkap termasuk rute firmware dan binary GoldHEN. Pilih firmware persis; rute host bukan validasi perangkat.'),'ps5':tr('UMTX2 host with 29 exact firmware offset files (1.00–5.50). etaHEN 2.4B retains the upstream pairing; 2.5B is a separate manual menu option. Models are target labels, not support guarantees.','Host UMTX2 dengan 29 offset firmware persis (1.00–5.50). etaHEN 2.4B mempertahankan pasangan upstream; 2.5B menjadi opsi menu manual terpisah. Label model bukan jaminan dukungan.')}
        panel='<section class="panel release-panel"><span class="chip">HYPEPAYLOAD / LOCAL UPSTREAM</span><h2>'+names[page]+'</h2><p>'+note[page]+'</p><a class="button primary local-host" href="'+root+urls[page]+'">'+tr('Open local upstream host','Buka host upstream lokal')+'</a><p class="source">'+tr('Native installation / activation: not tested on hardware.','Instalasi / aktivasi native: belum diuji pada perangkat asli.')+'</p><a href="'+root+'vendor/manifest.json">'+tr('Source commits & SHA-256 inventory','Commit sumber & inventaris SHA-256')+'</a></section>'
        s=re.sub(r'<section class="panel release-panel">.*?</section>',panel,s,flags=re.S)
        options=''.join('<option value="'+r['firmware']+'">'+r['firmware']+' / '+r['type']+'</option>' for r in rows if r['platform']==page)
        s=s.replace('<label for="firmware">','<label for="known-firmware">'+tr('Repository firmware records','Catatan firmware repository')+'</label><select id="known-firmware"><option value="">'+tr('Select a recorded version','Pilih versi yang tercatat')+'</option>'+options+'</select><label for="firmware">')
    if page=='launch':
        for old,target,label in [('https://ps3xploit.me/','vendor/ps3hen/index.html','PS3HEN'),('https://gamerhack.github.io/','vendor/gamerhack/index.html','GamerHack'),('https://github.com/etaHEN/etaHEN','vendor/ps5/index.html','UMTX2 + etaHEN')]:
            s=re.sub(r'<a class="button primary" href="'+re.escape(old)+r'"[^>]*>.*?</a>','<a class="button primary local-host" href="'+root+target+'">'+tr('Open local ','Buka lokal ')+label+'</a>',s)
        s=s.replace('Provider access requires internet.','PS3 native package downloads and external documentation may require internet.').replace('Akses penyedia memerlukan internet.','Unduhan paket native PS3 dan dokumentasi eksternal dapat memerlukan internet.')
    if page=='compatibility':
        table=''.join('<tr><td>'+r['platform'].upper()+'</td><td>'+r['firmware']+'</td><td>'+r['type']+'</td><td>'+html.escape(r['upstream'])+'</td><td><a href="'+r['source']+'" rel="noreferrer">'+tr('Evidence','Sumber')+'</a></td><td>'+tr('Not tested','Belum diuji')+'</td></tr>' for r in rows)
        s=re.sub(r'<tbody>.*?</tbody>','<tbody>'+table+'</tbody>',s,flags=re.S)
    if page=='lab':
        s=s.replace('Platform interfaces; executable components blocked','Platform interfaces and local upstream hosts; hardware unverified').replace('Antarmuka platform; komponen executable terblokir','Antarmuka platform dan host upstream lokal; perangkat belum diuji')
        s=s.replace('executable installer/enabler integration, redistribution permission where required, real PS3/PS4/PS5 testing','native dependency verification, upstream permission scope where unresolved, real PS3/PS4/PS5 testing').replace('integrasi installer/enabler executable, izin redistribusi jika diperlukan, pengujian PS3/PS4/PS5 asli','verifikasi dependensi native, ruang lingkup izin upstream yang belum jelas, pengujian PS3/PS4/PS5 asli')
    path.write_text(s,encoding='utf-8')
print('Firmware records:',len(rows))
