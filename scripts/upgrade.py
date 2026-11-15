"""Apply the Universal Cyber presentation and release-status update once."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
for path in [*ROOT.glob('*.html'), *ROOT.glob('*/index.html'), *ROOT.glob('id/*/index.html')]:
    s = path.read_text(encoding='utf-8')
    ind = 'lang="id"' in s
    tr = lambda en, id: id if ind else en
    root = re.search(r'data-root="([^"]+)"', s).group(1)
    s = s.replace('</head>', '<link rel="stylesheet" href="'+root+'assets/cyber.css"></head>')
    page = re.search(r'data-page="([^"]*)"', s).group(1)
    base = root + ('id/' if ind else '')
    s = s.replace('UNIVERSAL EDITION', 'UNIVERSAL CYBER EDITION').replace('Universal Edition', 'Universal Cyber Edition')
    s = s.replace('Powered by NEXORAID', 'Publisher: NEXORAID').replace('2026 MR.4NONY', '2026 Developer: MR.4NONY')
    s = s.replace('Reference: GoldHEN', 'GamerHack + GoldHEN').replace('Referensi: GoldHEN', 'GamerHack + GoldHEN')
    s = s.replace('<div class="footerlinks">', '<div class="footerlinks"><a href="'+base+'lab/">HYPELAB</a> ')
    s = s.replace('</body>', '<script src="'+root+'assets/modules.js"></script></body>')
    if page == 'settings':
        s = s.replace('<div class="js-only">', '<div class="js-only"><label for="theme">'+tr('Theme','Tema')+'</label><select id="theme"><option value="crimson">Crimson Cyber</option><option value="terminal">Terminal Green</option></select>')
        s = s.replace('<label><input type="checkbox" id="remember">', '<label><input type="checkbox" id="lite">'+tr('Lightweight console mode (automatic on console browsers)', 'Mode konsol ringan (otomatis pada browser konsol)')+'</label><label><input type="checkbox" id="remember">')
    if page in ['ps3','ps4','ps5']:
        block = '<section class="panel release-panel"><span class="chip">HYPEPAYLOAD / HYPEGUARD</span><h2>'+tr('Installer & enabler status','Status installer & enabler')+'</h2><p>'+tr('Executable component is not bundled in this release. Installation and activation have not been verified on hardware.','Komponen executable tidak disertakan dalam rilis ini. Instalasi dan aktivasi belum diverifikasi pada perangkat asli.')+'</p><p class="error">'+tr('Release blocker: approved component integration and console validation.','Blocker rilis: integrasi komponen yang diizinkan dan validasi konsol.')+'</p><a class="button" href="'+base+'lab/">'+tr('View release readiness','Lihat kesiapan rilis')+'</a></section>'
        s = s.replace('</main>', block+'</main>')
    if page == 'diagnostics':
        s = s.replace('</main>', '<section class="panel"><h2>HYPESYSTEM</h2><div id="system-info" class="result" role="status"></div></section></main>')
    if page == '':
        s = s.replace('<section class="hero">', '<section class="hero"><div class="matrix" aria-hidden="true"><span>01001<br>11010<br>00101<br>10110</span><span>10110<br>00101<br>11010<br>01001</span><span>00110<br>10101<br>01010<br>11001</span></div>')
        s = s.replace('<h1>', '<h1 class="glitch">',1)
        s = s.replace('<main ', '<div class="boot" aria-hidden="true">HYPECORE // '+tr('Loading interface','Memuat antarmuka')+'<i></i></div><main ',1)
    path.write_text(s, encoding='utf-8', newline='\n')

modules = [('HYPECORE','Local state and initialization','State lokal dan inisialisasi'),('HYPEUI','Responsive UI and motion preferences','UI responsif dan preferensi animasi'),('HYPEHEN 3 / 4 / 5','Platform interfaces; executable components blocked','Antarmuka platform; komponen executable terblokir'),('HYPEDETECT','Console and firmware hints from user agent','Indikasi konsol dan firmware dari user agent'),('HYPECOMPAT','Exact, evidence-linked firmware records','Catatan firmware persis dengan sumber'),('HYPEPAYLOAD','Component catalog and availability','Katalog dan ketersediaan komponen'),('HYPECACHE','Optional original-asset cache and integrity check','Cache aset original opsional dan pemeriksaan integritas'),('HYPEGUARD','Content policy and truthful component status','Kebijakan konten dan status komponen'),('HYPESYSTEM','Browser capabilities and viewport','Kemampuan browser dan viewport'),('HYPEDIAG','Local diagnostic report and copy','Laporan diagnostik lokal dan salin'),('HYPERECOVERY','Scoped cache and preference reset','Reset cache dan preferensi dalam lingkup situs'),('HYPEUPDATE','Version, review date and changelog','Versi, tanggal tinjauan, dan changelog'),('HYPELAB','Local capability checks and release readiness','Pemeriksaan kemampuan lokal dan kesiapan rilis')]
for ind in (False, True):
    tr = lambda en, id: id if ind else en
    folder = ROOT / ('id/lab' if ind else 'lab')
    folder.mkdir(parents=True, exist_ok=True)
    template = (ROOT / ('id/diagnostics/index.html' if ind else 'diagnostics/index.html')).read_text(encoding='utf-8')
    rows = ''.join('<tr><th>'+name+'</th><td>'+tr(en,id)+'</td></tr>' for name,en,id in modules)
    body = '<span class="eyebrow">UNIVERSAL CYBER EDITION / 1.0.0</span><h1>HYPELAB</h1><p>'+tr('Website readiness and capability checks. These checks do not run an exploit or detect HEN activation.','Kesiapan website dan pemeriksaan kemampuan. Pemeriksaan ini tidak menjalankan exploit atau mendeteksi aktivasi HEN.')+'</p><section class="panel"><h2>'+tr('Browser capabilities','Kemampuan browser')+'</h2><button type="button" id="lab-run" class="primary">'+tr('Run local checks','Jalankan pemeriksaan lokal')+'</button><pre class="result" id="lab-result" role="status" aria-live="polite">'+tr('Not checked','Belum diperiksa')+'</pre></section><section class="panel"><h2>'+tr('Module map','Peta modul')+'</h2><div class="tablewrap"><table><thead><tr><th>'+tr('Module','Modul')+'</th><th>'+tr('Implemented responsibility','Fungsi yang diimplementasikan')+'</th></tr></thead><tbody>'+rows+'</tbody></table></div></section><div class="notice"><p>'+tr('Release blockers: executable installer/enabler integration, redistribution permission where required, real PS3/PS4/PS5 testing, and production deployment verification. Website tests alone do not resolve these blockers.','Blocker rilis: integrasi installer/enabler executable, izin redistribusi jika diperlukan, pengujian PS3/PS4/PS5 asli, dan verifikasi deployment produksi. Pengujian website saja tidak menyelesaikan blocker ini.')+'</p></div>'
    template = re.sub(r'<main .*?</main>', '<main class="main wrap" id="main">'+body+'</main>', template, flags=re.S)
    template = template.replace('data-page="diagnostics"','data-page="lab"').replace('<a class="active" href=', '<a href=').replace('Diagnostics |','HYPELAB |').replace('Diagnostik |','HYPELAB |')
    template = template.replace('id/diagnostics/" hreflang', 'id/lab/" hreflang').replace('../diagnostics/" hreflang', '../lab/" hreflang')
    (folder/'index.html').write_text(template,encoding='utf-8')

app = ROOT/'assets/app.js'
s = app.read_text(encoding='utf-8')
s = s.replace("+(pref.reduce===true?' reduce':'');", "+(pref.reduce===true?' reduce':'')+(pref.lite===true||/PlayStation[ _-]*[345]/i.test(n.userAgent)?' lite':'')+(pref.theme==='terminal'?' theme-terminal':'');")
s = s.replace("pref.large=el('large').checked;", "pref.lite=el('lite').checked;pref.theme=val('theme');pref.large=el('large').checked;")
s = s.replace("if(el('large')){", "if(el('large')){el('lite').checked=pref.lite===true;el('theme').value=pref.theme==='terminal'?'terminal':'crimson';")
s = s.replace("if(!res)throw new Error('missing');", "if(!res)throw new Error('missing');return res.arrayBuffer().then(function(buffer){return w.crypto.subtle.digest('SHA-256',buffer);}).then(function(buffer){var bytes=new Uint8Array(buffer),hash='',i;for(i=0;i<bytes.length;i++)hash+=('0'+bytes[i].toString(16)).slice(-2);if(hash!==a.sha256)throw new Error('integrity');});")
s = s.replace("Original site assets present. Revision: ", "Original site SHA-256 integrity verified. Revision: ").replace("Aset situs original tersedia. Revisi: ","Integritas SHA-256 situs original terverifikasi. Revisi: ")
app.write_text(s,encoding='utf-8')
