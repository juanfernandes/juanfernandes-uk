addEventListener('install', installEvent => {
  skipWaiting()
  installEvent.waitUntil(
    caches.open(staticCacheName)
      .then(staticCache => {
        // Nice to have
        staticCache.addAll([
          '/assets/imgs/juanfernandes-logo.svg'
        ]) // end addAll
        // Must have
        return staticCache.addAll([
          '/assets/css/global.min.css',
          '/assets/imgs/fallback.jpg',
          '/assets/js/offline.js',
          '/offline.html'
        ]) // end return addAll
      }) // end open then
  ) // end waitUntil
}) // end addEventListener

addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheList.includes(cacheName)) {
              return caches.delete(cacheName)
            } // end if
          }) // end map
        ) // end return Promise.all
      }) // end keys then
      .then(() => {
        return clients.claim()
      }) // end then
  ) // end waitUntil
}) // end addEventListener

// When the browser requests a file...
addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request
  // When the user requests an HTML file
  if (request.headers.get('Accept').includes('text/html')) {
    fetchEvent.respondWith(
      // Fetch that page from the network
      fetch(request)
        .catch(error => {
          // Otherwise show the fallback page
          return caches.match('/offline.html')
        }) // end fetch catch
    ) // end respondWith
    return // Go no further
  } // end if

  // When the user requests an image
  if (request.headers.get('Accept').includes('image')) {
    fetchEvent.respondWith(
      // Look for a cached version of the image
      caches.match(request)
        .then(responseFromCache => {
          if (responseFromCache) {
            return responseFromCache
          } // end if
          // Otherwise fetch the image from the network
          return fetch(request)
            .then(responseFromFetch => {
              // Put a copy in the cache
              const copy = responseFromFetch.clone()
              fetchEvent.waitUntil(
                caches.open(imagesCacheName)
                  .then(imageCache => {
                    return imageCache.put(request, copy)
                  }) // end open then
              ) // end waitUntil
              return responseFromFetch
            }) // end fetch then
            .catch(error => {
              // Otherwise show a fallback image
              return caches.match('/assets/imgs/fallback.jpg')
            }) // end fetch catch and return
        }) // end match then
    ) // end respondWith
    return // Go no further
  } // end if

  // For everything else...
  fetchEvent.respondWith(
    // Look for a cached version of the file
    caches.match(request)
      .then(responseFromCache => {
        if (responseFromCache) {
          return responseFromCache
        } // end if
        // Otherwise fetch the file from the network
        return fetch(request)
      }) // end match then
  ) // end respondWith
}) // end addEventListener
