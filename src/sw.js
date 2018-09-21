// we'll version our cache (and learn how to delete caches in
// some other post)
const cacheName = 'v1.1::static';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        'assets/css/global.min.css',
        'assets/js/libs/jquery-1.11.3.min.js',
        'assets/js/global.min.js',
        'about/',
        'work/',
        'contact/'
      ]).then(() => self.skipWaiting());
    })
  );
});

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});