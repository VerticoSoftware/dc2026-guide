// DC2026 guide · retired service worker (brief call 51, withdrawn 18 Oct). Build: 19 Oct, 06:28 Beijing
// The 18 Oct 15:59 build installed a service worker. A browser that still has it fetches this file when it checks
// for an update: it clears its cache and unregisters, so pages load straight from GitHub Pages again. It never
// touches localStorage, where stars and notes are. Keep it on the site until the guide is retired.
'use strict';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('dc26-') === 0; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.registration.unregister(); }));
});
