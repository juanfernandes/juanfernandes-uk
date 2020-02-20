const cacheName = 'v1.7::static'

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        'assets/css/global.min.css',
        'assets/css/components/slider.scss',
        'assets/css/plugins/_tiny-slider.scss',
        'assets/js/tiny-slider.js',
        'about/',
        'work/',
        'contact/',
        'now/',
        'notes/',
        'photos/'
      ]).then(() => self.skipWaiting())
    })
  )
})

// when the browser fetches a url, either response with
// the cached object or go ahead and fetch the actual url
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  )
})
