/* HYPECORE/HYPEDETECT/HYPESYSTEM/HYPELAB: original ES5 presentation code. */
(function () {
    'use strict';
    var d = document, w = window, n = navigator, b = d.body;
    var id = d.documentElement.lang === 'id';
    function tr(en, local) { return id ? local : en; }
    function put(node, value) { if (node) { while (node.firstChild) node.removeChild(node.firstChild); node.appendChild(d.createTextNode(value)); } }
    var match = String(n.userAgent).match(/PlayStation[ _-]*([345])(?:[ ;/]+([0-9]+\.[0-9]+))?/i);
    var firmware = match && match[2] ? match[2] : tr('Unknown; enter manually', 'Tidak diketahui; masukkan manual');
    put(d.getElementById('hostmode'), tr('Static web interface', 'Antarmuka web statis'));
    var input = d.getElementById('firmware');
    var known = d.getElementById('known-firmware');
    if (known) known.onchange = function () {
        if (!known.value) return;
        input.value = known.value;
        var type = known.options[known.selectedIndex].text.split(' / ')[1];
        if (d.getElementById('fwtype')) d.getElementById('fwtype').value = type || 'unknown';
        put(d.getElementById('compat-result'), tr('Selection changed. Check the record before opening the host.', 'Pilihan berubah. Periksa catatan sebelum membuka host.'));
        if (d.getElementById('check')) d.getElementById('check').click();
    };
    if (input && match && match[2]) {
        var hint = d.createElement('p'); hint.className = 'source';
        put(hint, tr('Browser firmware hint: ', 'Indikasi firmware browser: ') + firmware + tr('. Verify in console settings.', '. Verifikasi di pengaturan konsol.'));
        input.parentNode.insertBefore(hint, input);
    }
    function systemLines() {
        return [tr('Console hint: ', 'Indikasi konsol: ') + (match ? 'PS' + match[1] : tr('Unknown / other', 'Tidak diketahui / lain')),
            tr('Firmware hint: ', 'Indikasi firmware: ') + firmware,
            'Viewport: ' + d.documentElement.clientWidth + ' x ' + d.documentElement.clientHeight,
            tr('Browser language: ', 'Bahasa browser: ') + (n.language || 'unknown'),
            tr('Secure context: ', 'Konteks aman: ') + (w.isSecureContext === true ? 'yes' : 'no / unknown'),
            'Service worker API: ' + (!!n.serviceWorker), 'Cache API: ' + (!!w.caches),
            'SHA-256 API: ' + (!!(w.crypto && w.crypto.subtle)),
            tr('HEN state: not detectable by this interface', 'Status HEN: tidak dapat dideteksi oleh antarmuka ini')];
    }
    put(d.getElementById('system-info'), systemLines().join('\n'));
    var run = d.getElementById('lab-run');
    if (run) run.onclick = function () {
        var storage = false, probe = 'hypehostx.lab.probe';
        try { w.localStorage.setItem(probe, '1'); storage = w.localStorage.getItem(probe) === '1'; w.localStorage.removeItem(probe); } catch (e) { storage = false; }
        put(d.getElementById('lab-result'), systemLines().concat(['Local storage write/read: '+storage, tr('Completed locally. No console modification was attempted.', 'Selesai secara lokal. Tidak ada modifikasi konsol yang dijalankan.')]).join('\n'));
    };
    /* D-pad-like keyboard navigation. Text fields retain normal editing keys. */
    if (d.addEventListener) d.addEventListener('keydown', function (event) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        var code = event.keyCode, active = d.activeElement, tag = active && active.tagName;
        if (code < 37 || code > 40 || /INPUT|TEXTAREA|SELECT/.test(tag) || (active && active.isContentEditable)) return;
        var nodes = d.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea'), items = [], i, at = -1;
        for (i = 0; i < nodes.length; i++) if (nodes[i].offsetWidth && nodes[i].offsetHeight && nodes[i].className !== 'skip') { if (nodes[i] === active) at = items.length; items.push(nodes[i]); }
        if (!items.length) return;
        at = at < 0 ? 0 : (at + (code === 37 || code === 38 ? -1 : 1) + items.length) % items.length;
        items[at].focus(); event.preventDefault();
    }, false);
}());
