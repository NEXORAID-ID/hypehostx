from pathlib import Path
import json,re,shutil,hashlib
root=Path(__file__).resolve().parents[1]
def write(p,v):
 p=root/p;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(v if isinstance(v,str) else json.dumps(v,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
spec=root/'HYPEHOSTX_FINAL_Codex_Package_v5'
if not (root/'AGENTS.md').exists(): shutil.copyfile(spec/'AGENTS.md',root/'AGENTS.md')
tickets=[]
for line in (spec/'BACKLOG.md').read_text(encoding='utf-8').splitlines():
 if re.match(r'\| (HX-\d+|NET-\d+|I-\d+) \|',line):
  fields=[x.strip() for x in line.split('|')[1:-1]]
  tickets.append({'id':fields[0],'requirement':fields,'status':'TODO','files':[],'tests':[],'evidence':[],'blocker':None,'nextStep':'Implement acceptance criteria in dependency order'})
qa=[]
for line in (spec/'QA_MATRIX.md').read_text(encoding='utf-8').splitlines():
 if re.match(r'\| (T\d+|NET-QA-\d+|IND-QA-\d+) \|',line):
  fields=[x.strip() for x in line.split('|')[1:-1]];qa.append({'id':fields[0],'requirement':fields[1:],'status':'NOT_RUN','evidence':[]})
if not (root/'evidence/status.json').exists():write('evidence/status.json',{'schemaVersion':1,'tickets':tickets,'qa':qa})
write('evidence/package-inventory.json',[{'path':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'read':True} for p in spec.iterdir() if p.is_file()])
routes=['Dashboard','HYPEHEN','Firmware Library','Compatibility','HYPEPAYLOAD','HYPECACHE','HYPESYSTEM','HYPEDIAG','HYPERECOVERY','Settings','Updates','Guide','Changelog','Credits','About']
idroutes=['Dasbor','HYPEHEN','Pustaka Firmware','Kompatibilitas','HYPEPAYLOAD','HYPECACHE','HYPESYSTEM','HYPEDIAG','HYPERECOVERY','Pengaturan','Pembaruan','Panduan','Riwayat','Kredit','Tentang']
pairs={
'tagline':['Unlock Beyond Limits.','Unlock Beyond Limits.'],
'unavailable':['Integration unavailable. No approved provider is configured.','Integrasi belum tersedia. Penyedia yang disetujui belum dikonfigurasi.'],
'compatLink':['View compatibility','Lihat kompatibilitas'],
'firmware':['Firmware','Firmware'],'device':['Device','Perangkat'],'information':['Information mode','Mode informasi'],
'hint':['Browser hint only; not hardware verification.','Hanya petunjuk browser; bukan verifikasi perangkat.'],
'unknown':['Unknown','Tidak diketahui'],'manual_only':['Manually selected; not device-verified','Dipilih manual; bukan hasil verifikasi perangkat'],
'detected_hint':['Detected hint; not verified','Petunjuk terdeteksi; belum terverifikasi'],'conflict':['HX-1004: Manual selection conflicts with browser hint. Clear selection and check console settings.','HX-1004: Pilihan manual berbeda dari petunjuk browser. Hapus pilihan dan periksa pengaturan konsol.'],
'cache':['Offline shell','Host offline'],'absent':['Not prepared','Belum disiapkan'],'unsupported':['HX-3003: Offline API unavailable; online mode only.','HX-3003: API offline tidak tersedia; hanya mode daring.'],
'ready':['Shell files are present in browser cache. Offline device testing is still required.','Berkas host tersedia di cache browser. Pengujian offline pada perangkat tetap diperlukan.'],
'preparing':['Preparing and verifying shell assets…','Menyiapkan dan memverifikasi aset host…'],
'failed':['HX-3001: Cache preparation or verification failed. Retry with connectivity.','HX-3001: Persiapan atau verifikasi cache gagal. Coba lagi dengan koneksi.'],
'prepare':['Prepare offline host','Siapkan host offline'],'verify':['Verify cache','Verifikasi cache'],
'guideLink':['Read the guide','Baca panduan'],'component':['Component availability not verified','Ketersediaan komponen belum terverifikasi'],
'select':['Exact firmware (for example 9.00)','Firmware tepat (misalnya 9.00)'],'save':['Save selection','Simpan pilihan'],'clear':['Clear selection','Hapus pilihan'],
'invalid':['Enter an exact version such as 9.00; values are never rounded.','Masukkan versi tepat seperti 9.00; nilai tidak pernah dibulatkan.'],
'search':['Search exact firmware','Cari firmware tepat'],'empty':['No matching records. No compatibility is inferred.','Tidak ada data cocok. Kompatibilitas tidak diasumsikan.'],
'reference_listed':['Reference listed; not tested','Tercantum sebagai referensi; belum diuji'],
'catalogNote':['Catalog r1 · 2026-11-15. Historical package references only. No firmware or model has been verified. Offline copies cannot receive immediate withdrawals.','Katalog r1 · 2026-11-15. Hanya referensi historis paket. Tidak ada firmware atau model terverifikasi. Salinan offline tidak menerima penarikan langsung.'],
'noComponents':['No approved downloadable components. Third-party integration requires rights, provenance and hardware evidence.','Belum ada komponen unduhan yang disetujui. Integrasi pihak ketiga memerlukan bukti hak, asal, dan perangkat keras.'],
'cacheHelp':['Only original host assets are cached. Shell readiness does not establish HEN or component readiness. After preparation disconnect, reopen, and navigate to verify your device. Legacy application cache is not enabled without device evidence.','Hanya aset host asli yang disimpan. Kesiapan host bukan kesiapan HEN atau komponen. Setelah persiapan putuskan koneksi, buka ulang, dan navigasikan untuk menguji perangkat. Cache aplikasi lama belum diaktifkan tanpa bukti perangkat.'],
'systemHelp':['Only browser-visible properties are shown. Model, privileges and native runtime are unknown.','Hanya properti yang terlihat oleh browser ditampilkan. Model, hak akses, dan runtime native tidak diketahui.'],
'export':['Export local report','Ekspor laporan lokal'],'clearLogs':['Clear local logs','Hapus log lokal'],
'diagHelp':['Logs contain bounded error codes only. Reports stay local until you choose to share them. Client timestamps are untrusted.','Log hanya berisi kode kesalahan terbatas. Laporan tetap lokal sampai Anda membagikannya. Waktu klien tidak terpercaya.'],
'reset':['Reset host preferences','Reset pengaturan host'],'resetConfirm':['Reset only HYPEHOSTX preferences and logs? Browser cache and other site data are not changed.','Reset hanya pengaturan dan log HYPEHOSTX? Cache browser dan data situs lain tidak diubah.'],
'recoveryHelp':['Close this page after a browser crash and reopen the reviewed host. Do not retry an unconfirmed provider operation automatically. Clear browser site data manually only after understanding it may remove other stored data.','Tutup halaman setelah browser gagal lalu buka kembali host yang ditinjau. Jangan otomatis mengulang operasi penyedia yang belum terkonfirmasi. Hapus data situs browser secara manual hanya setelah memahami risiko kehilangan data lain.'],
'language':['Language','Bahasa'],'largeText':['Large text','Teks besar'],'diagnostics':['Persist local error logs (opt-in)','Simpan log kesalahan lokal (opsional)'],
'saved':['Saved','Tersimpan'],'sessionOnly':['HX-4003: Storage unavailable; preferences last for this session.','HX-4003: Penyimpanan tidak tersedia; pengaturan hanya untuk sesi ini.'],
'check':['Check release metadata','Periksa metadata rilis'],'installed':['Installed version','Versi terpasang'],
'updateUnknown':['HX-6001: Available release is unknown. No firmware changes are performed.','HX-6001: Rilis tersedia tidak diketahui. Tidak ada perubahan firmware.'],
'sameVersion':['Metadata reports the installed version. This is not a signed publisher update.','Metadata melaporkan versi terpasang. Ini bukan pembaruan penerbit bertanda tangan.'],
'guideText':['Start with Firmware Library. A browser hint or manual selection is not proof of compatibility. HYPEHEN shows integration availability honestly. Prepare the original offline shell only when your browser supports it. No account is required. Native applications require an existing authorized runtime.','Mulai dari Pustaka Firmware. Petunjuk browser atau pilihan manual bukan bukti kompatibilitas. HYPEHEN menampilkan ketersediaan integrasi secara jujur. Siapkan host offline asli hanya jika browser mendukungnya. Akun tidak diperlukan. Aplikasi native memerlukan runtime resmi yang sudah tersedia.'],
'changelogText':['0.1.0-dev — Original local information-host implementation. Target release: 1.0.0. No stable release or hardware support is claimed.','0.1.0-dev — Implementasi lokal host informasi asli. Target rilis: 1.0.0. Tidak mengklaim rilis stabil atau dukungan perangkat keras.'],
'creditsText':['Original implementation: MR.4NONY / NEXORAID. Upstream references retain their own authors and names. No upstream code or binaries are bundled. Original license awaits owner decision.','Implementasi asli: MR.4NONY / NEXORAID. Referensi upstream mempertahankan penulis dan namanya. Tidak ada kode atau biner upstream yang disertakan. Lisensi asli menunggu keputusan pemilik.'],
'aboutText':['HYPEHOSTX is an independent information host. HYPEHEN is the launcher UI, not a verified native enabler. No Sony or upstream endorsement. No ads, tracking, mandatory accounts, or cloud calls.','HYPEHOSTX adalah host informasi independen. HYPEHEN adalah antarmuka peluncur, bukan enabler native terverifikasi. Tidak didukung Sony atau upstream. Tanpa iklan, pelacakan, akun wajib, atau panggilan cloud.'],
'notFound':['HX-5002: Page not found','HX-5002: Halaman tidak ditemukan'],
'home':['Return to dashboard','Kembali ke dasbor'],'report':['Selectable local report','Laporan lokal yang dapat dipilih']}
for lang,i in [('en',0),('id',1)]:
 d={k:v[i] for k,v in pairs.items()};d.update({'route'+str(n):x for n,x in enumerate(routes if i==0 else idroutes)});write('src/locales/'+lang+'.json',d)
write('src/data/compatibility.json',{'schemaVersion':1,'revision':'r1','records':[{'firmware':v,'status':'reference_listed','evidenceIds':[]} for v in ['5.05','5.07','6.72','9.00','14.00','14.02']]})
write('src/data/release.json',{'schemaVersion':1,'version':'0.1.0-dev','target':'1.0.0','catalogRevision':'r1','date':'2026-11-15'})
write('src/data/components.json',{'schemaVersion':1,'components':[]})
print(f'Initialized {len(tickets)} tickets and {len(qa)} QA scenarios')
