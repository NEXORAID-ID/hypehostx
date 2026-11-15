"""Real browser checks at the production /hypehostx/ base path."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlsplit, unquote
import threading, json
from playwright.sync_api import sync_playwright, expect
ROOT=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
    def translate_path(self,path):
        rel=unquote(urlsplit(path).path).removeprefix('/hypehostx/')
        target=(ROOT/rel).resolve()
        return str(target if target.is_relative_to(ROOT) else ROOT/'404.html')
    def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0),Handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
BASE=f'http://127.0.0.1:{server.server_port}/hypehostx/'
out=ROOT/'.qa'; out.mkdir(exist_ok=True)
results=[]
def passed(s): results.append(s); print('PASS:',s)
try:
    with sync_playwright() as pw:
        browser=pw.chromium.launch()
        context=browser.new_context(viewport={'width':1440,'height':1000})
        page=context.new_page(); errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(BASE); page.wait_for_timeout(1400)
        assert page.title()=='HYPEHOSTX'
        page.screenshot(path=str(out/'desktop.png'),full_page=True)
        page.get_by_role('link',name='Open Launch Center',exact=True).click()
        assert '/launch/' in page.url
        page.goto(BASE+'ps3/'); page.locator('#firmware').fill('4.93.1'); page.locator('#fwtype').select_option('CEX HFW'); page.locator('#check').click()
        assert 'PS3HEN 3.6.0' in page.locator('#compat-result').inner_text()
        page.locator('#firmware').fill('99.99'); page.locator('#check').click()
        assert 'No exact record' in page.locator('#compat-result').inner_text()
        page.locator('#firmware').fill('bad'); page.locator('#check').click()
        assert 'Enter an exact' in page.locator('#compat-result').inner_text()
        passed('Home -> Launch Center; compatibility match, unknown and invalid input')
        page.locator('#known-firmware').select_option(index=1); assert page.locator('#firmware').input_value()=='4.80'; assert page.locator('#fwtype').input_value()=='CEX OFW'
        for route in ['ps3/','ps4/','ps5/','id/ps3/','id/ps4/','id/ps5/']:
            page.goto(BASE+route); href=page.locator('.local-host').get_attribute('href'); assert 'vendor/' in href
        # Render vendor entry documents with JS disabled: do not execute exploit code on a test PC.
        upstream=browser.new_context(java_script_enabled=False); up=upstream.new_page()
        for route in ['vendor/ps3hen/index.html','vendor/gamerhack/index.html','vendor/ps5/index.html','vendor/ps5-relapse/index.html']:
            response=up.goto(BASE+route); assert response.status==200; assert up.title()
        upstream.close(); passed('Firmware dropdown and six local host links; upstream documents load with scripts disabled')
        page.goto(BASE+'ps5/'); page.locator('#known-firmware').select_option('13.60'); assert 'ps5-relapse' in page.locator('.local-host').get_attribute('href')
        page.locator('#known-firmware').select_option('6.00'); assert page.locator('.local-host').get_attribute('href') is None
        assert 'NO matching bundled WebKit host' in page.locator('#compat-result').inner_text()
        passed('PS5 firmware routes to Relapse; payload-only 6.00 cannot launch mismatched host')
        page.goto(BASE+'settings/'); page.locator('#lite').check(); page.locator('#reduce').check(); page.locator('#remember').check(); page.locator('#theme').select_option('terminal'); page.locator('#save-settings').click(); page.reload()
        assert page.locator('#lite').is_checked() and page.locator('#reduce').is_checked()
        assert 'theme-terminal' in page.locator('body').get_attribute('class')
        page.goto(BASE+'ps3/'); page.locator('#firmware').fill('4.93.1'); page.locator('#fwtype').select_option('CEX HFW'); page.locator('#check').click(); page.reload()
        assert page.locator('#firmware').input_value()=='4.93.1'
        passed('Preferences, theme, lightweight/reduced motion and firmware selection persist')
        page.goto(BASE+'catalog/'); page.locator('#search').fill('etahen'); assert '1 ' in page.locator('#count').inner_text(); page.locator('#search').fill('no-such-project'); assert '0 ' in page.locator('#count').inner_text()
        page.goto(BASE+'diagnostics/'); assert 'HYPEHOSTX' in page.locator('#report').input_value(); page.locator('#clear-report').click(); assert page.locator('#report').input_value()==''; page.locator('#refresh-report').click(); assert 'Hardware verification: not tested' in page.locator('#report').input_value()
        page.goto(BASE+'id/lab/'); page.locator('#lab-run').click(); assert 'Selesai secara lokal' in page.locator('#lab-result').inner_text()
        page.locator('.lang').click(); assert page.url.endswith('/lab/') and '/id/' not in page.url
        passed('Catalog filtering; diagnostics clear/refresh; bilingual lab and language switch')
        page.goto(BASE+'recovery/'); page.on('dialog',lambda dialog:dialog.accept()); page.locator('#reset-settings').click(); page.goto(BASE+'settings/'); assert not page.locator('#lite').is_checked()
        page.keyboard.press('Tab'); page.keyboard.press('ArrowRight'); assert page.evaluate('document.activeElement !== document.body')
        passed('Preference recovery and keyboard direction navigation')
        for lang in ['', 'id/']:
            for route in ['', 'ps3/','ps4/','ps5/','launch/','compatibility/','catalog/','settings/','diagnostics/','recovery/','help/','updates/','credits/','privacy/','about/','lab/']:
                page.goto(BASE+lang+route)
                assert page.locator('h1').count()==1,(lang,route)
                assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),(lang,route)
        passed('32 bilingual main routes render at desktop without overflow')
        page.set_viewport_size({'width':390,'height':844})
        for route in ['', 'id/','ps3/','ps4/','ps5/','launch/','id/settings/','id/lab/']:
            page.goto(BASE+route)
            assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth'),route
        page.goto(BASE); page.wait_for_timeout(1400); page.screenshot(path=str(out/'mobile.png'),full_page=True)
        page.set_viewport_size({'width':1920,'height':1080}); page.goto(BASE); assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth')
        page.set_viewport_size({'width':1440,'height':1000}); page.goto(BASE+'ps5/'); page.screenshot(path=str(out/'ps5.png'),full_page=True)
        page.set_viewport_size({'width':1280,'height':720}); page.goto(BASE); assert page.evaluate('document.documentElement.scrollWidth<=window.innerWidth')
        page.emulate_media(reduced_motion='reduce'); assert page.locator('.radar b').evaluate('(e)=>getComputedStyle(e).animationName')=='none'
        passed('390px mobile, 720p/1080p layouts and OS reduced-motion mode')
        page.goto(BASE+'cache/'); page.locator('#install-cache').click(); expect(page.locator('#cache-status')).to_contain_text('SHA-256 integrity verified',timeout=60000)
        page.reload(); context.set_offline(True); page.goto(BASE+'id/ps4/'); assert page.locator('h1').inner_text()=='HYPEHEN 4'; context.set_offline(False)
        page.goto(BASE+'cache/'); page.locator('#verify-cache').click(); expect(page.locator('#cache-status')).to_contain_text('SHA-256 integrity verified')
        passed('Cache installation, SHA-256 verification and offline navigation under /hypehostx/')
        page.evaluate("""async () => {const keys=await caches.keys();const key=keys.find(k=>k.indexOf('hypehostx-site-')===0);const c=await caches.open(key);await c.put(new URL('../assets/brand.svg',location.href).href,new Response('corrupt'));}""")
        page.locator('#verify-cache').click(); expect(page.locator('#cache-status')).to_contain_text('No complete host cache verified')
        page.locator('#clear-cache').click(); expect(page.locator('#cache-status')).to_contain_text('Host cache cleared')
        passed('Corrupt cached asset rejected; cache recovery completes')
        legacy=browser.new_context(java_script_enabled=False); lp=legacy.new_page(); lp.goto(BASE+'ps3/'); assert lp.locator('noscript').is_visible(); assert lp.get_by_role('link',name='View evidence table').is_visible(); legacy.close()
        console=browser.new_context(user_agent='Mozilla/5.0 (PLAYSTATION 3; 4.93)'); cp=console.new_page(); cp.goto(BASE+'ps3/'); assert 'lite' in cp.locator('body').get_attribute('class'); assert '4.93' in cp.locator('.source').first.inner_text(); console.close()
        passed('No-JavaScript fallback and emulated console-UA lightweight mode (not hardware validation)')
        assert not errors,errors
        passed('No uncaught JavaScript errors during tested flows')
        browser.close()
finally: server.shutdown()
(out/'results.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
