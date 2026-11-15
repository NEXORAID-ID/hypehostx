from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
import os,tempfile,shutil
from playwright.sync_api import sync_playwright,expect
R=Path(__file__).resolve().parents[1]
class Handler(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
with tempfile.TemporaryDirectory() as tmp:
 shutil.copytree(R/'dist',Path(tmp)/'hypehostx');sv=ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=tmp));Thread(target=sv.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{sv.server_port}/hypehostx/'
 try:
  with sync_playwright() as p:
   kwargs={'headless':True,'args':['--no-sandbox']};exe=os.environ.get('CHROMIUM_PATH')
   if exe:kwargs['executable_path']=exe
   browser=p.chromium.launch(**kwargs);ctx=browser.new_context(viewport={'width':1280,'height':720});page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   for prefix in ('','id/'):
    for route in ('','ps3/','ps4/','ps5/','compatibility/','catalog/','cache/','diagnostics/','recovery/','settings/','updates/','help/','credits/','privacy/','about/','404.html'):
     assert page.goto(base+prefix+route).ok;expect(page.locator('h1')).to_be_visible()
   page.goto(base);expect(page.locator('.console')).to_have_count(3)
   if os.environ.get('PREVIEW_PATH'):page.screenshot(path=os.environ['PREVIEW_PATH'],full_page=True)
   page.get_by_role('link',name='Open PS3').click();page.locator('#firmware').fill('4.93.1');page.locator('#fwtype').select_option('CEX HFW');page.locator('#check').click();expect(page.locator('#compat-result')).to_contain_text('Upstream listed')
   page.locator('#firmware').fill('4.93');page.locator('#check').click();expect(page.locator('#compat-result')).to_contain_text('No exact record')
   page.locator('#firmware').fill('4.93.1');page.locator('#fwtype').select_option('CEX OFW');page.locator('#check').click();expect(page.locator('#compat-result')).to_contain_text('No exact record')
   page.goto(base+'catalog/');page.locator('#filter').select_option('ps4');expect(page.locator('article:visible')).to_have_count(2);page.locator('#search').fill('nothing');expect(page.locator('article:visible')).to_have_count(0)
   page.goto(base+'settings/');page.locator('#large').check();page.locator('#remember').check();page.locator('#save-settings').click();expect(page.locator('#settings-status')).to_contain_text('Saved locally');page.reload();expect(page.locator('#large')).to_be_checked()
   page.goto(base+'diagnostics/');expect(page.locator('#report')).to_have_value(__import__('re').compile('HYPEHOSTX'));page.locator('#clear-report').click();expect(page.locator('#report')).to_have_value('');page.locator('#refresh-report').click();expect(page.locator('#report')).to_have_value(__import__('re').compile('HEN state: unknown'))
   page.goto(base+'recovery/');page.once('dialog',lambda d:d.accept());page.locator('#reset-settings').click();expect(page.locator('#recovery-status')).to_contain_text('reset')
   page.goto(base+'cache/');expect(page.locator('#install-cache')).to_be_enabled();page.locator('#install-cache').click();expect(page.locator('#cache-status')).to_contain_text('Original site assets present',timeout=30000);page.reload();page.wait_for_function('!!navigator.serviceWorker.controller');ctx.set_offline(True);assert page.goto(base+'id/ps5/').ok;expect(page.locator('h1')).to_have_text('HYPEHEN 5');assert page.goto(base+'cache/').ok;ctx.set_offline(False);page.once('dialog',lambda d:d.accept());page.locator('#clear-cache').click();expect(page.locator('#cache-status')).to_contain_text('Host cache cleared');assert not errors,errors
   mobile=browser.new_context(viewport={'width':360,'height':780});mp=mobile.new_page();mp.goto(base);assert mp.evaluate('document.documentElement.scrollWidth <= innerWidth');mobile.close();nojs=browser.new_context(java_script_enabled=False);np=nojs.new_page();np.goto(base);expect(np.get_by_role('link',name='Open PS5')).to_be_visible();nojs.close();browser.close()
   print('PASS: 32 routes, exact checks, catalog filter, local preferences, diagnostics, reset, verified offline cache/navigation/clear, mobile width, no-JS navigation, no unhandled errors.')
 finally:sv.shutdown()
