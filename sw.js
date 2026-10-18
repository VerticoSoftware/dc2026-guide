// DC2026 guide · service worker for the hosted copy (brief call 51). Build: 18 Oct, 15:59 Beijing
// Pages: network first, so a new build arrives whenever there is signal; after 3 s, or offline, the copy kept here.
// Never touches localStorage: stars and notes stay where they are.
'use strict';
var CACHE = 'dc26-guide';
var FILES = ['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('dc26-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function page(e) {
  var net = fetch(e.request).then(function (r) {
    if (r && r.ok) { var copy = r.clone(); caches.open(CACHE).then(function (c) { return c.put('./', copy); }); }
    return r;
  });
  e.waitUntil(net.then(function () {}, function () {}));
  var kept = caches.match('./');
  return new Promise(function (resolve) {
    var done = false;
    function give(r) { if (!done && r) { done = true; resolve(r); } }
    var slow = setTimeout(function () { kept.then(give); }, 3000); // roaming: the kept copy rather than a blank screen
    net.then(function (r) { clearTimeout(slow); give(r); }, function () { clearTimeout(slow); kept.then(function (r) { give(r || Response.error()); }); });
  });
}
self.addEventListener('fetch', function (e) {
  var q = e.request;
  if (q.method !== 'GET' || new URL(q.url).origin !== self.location.origin) return;
  if (q.mode === 'navigate') { e.respondWith(page(e)); return; }
  e.respondWith(caches.match(q, { ignoreSearch: true }).then(function (r) { return r || fetch(q); }));
});
