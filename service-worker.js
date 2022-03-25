/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-bf0141c';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./anglicke_listy_001.html","./anglicke_listy_002.html","./anglicke_listy_003.html","./anglicke_listy_004.html","./anglicke_listy_005.html","./anglicke_listy_006.html","./anglicke_listy_007.html","./anglicke_listy_008.html","./anglicke_listy_009.html","./anglicke_listy_010.html","./anglicke_listy_011.html","./anglicke_listy_012.html","./anglicke_listy_013.html","./anglicke_listy_014.html","./anglicke_listy_015.html","./anglicke_listy_016.html","./anglicke_listy_017.html","./colophon.html","./favicon.png","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/01.jpg","./resources/02.jpg","./resources/03.jpg","./resources/04.jpg","./resources/05.jpg","./resources/06.jpg","./resources/07.jpg","./resources/08.jpg","./resources/09.jpg","./resources/10.jpg","./resources/11.jpg","./resources/12.jpg","./resources/13.jpg","./resources/14.jpg","./resources/15.jpg","./resources/16.jpg","./resources/17.jpg","./resources/18.jpg","./resources/19.jpg","./resources/20.jpg","./resources/21.jpg","./resources/22.jpg","./resources/23.jpg","./resources/24.jpg","./resources/25.jpg","./resources/26.jpg","./resources/27.jpg","./resources/28.jpg","./resources/29.jpg","./resources/30.jpg","./resources/31.jpg","./resources/32.jpg","./resources/33.jpg","./resources/34.jpg","./resources/35.jpg","./resources/36.jpg","./resources/37.jpg","./resources/38.jpg","./resources/39.jpg","./resources/40.jpg","./resources/41.jpg","./resources/42.jpg","./resources/43.jpg","./resources/44.jpg","./resources/45.jpg","./resources/46.jpg","./resources/47.jpg","./resources/48.jpg","./resources/49.jpg","./resources/50.jpg","./resources/51.jpg","./resources/52.jpg","./resources/53.jpg","./resources/54.jpg","./resources/55.jpg","./resources/56.jpg","./resources/57.jpg","./resources/58.jpg","./resources/59.jpg","./resources/60.jpg","./resources/61.jpg","./resources/62.jpg","./resources/63.jpg","./resources/64.jpg","./resources/65.jpg","./resources/66.jpg","./resources/67.jpg","./resources/68.jpg","./resources/69.jpg","./resources/70.jpg","./resources/71.jpg","./resources/72.jpg","./resources/73.jpg","./resources/74.jpg","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.png","./resources/obalka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
