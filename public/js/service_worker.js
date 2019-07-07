const cacheName = 'static_cache';
const precacheResources = [
    'offline',
    //-- images --
    '/public/img/logo.png',
    '/public/img/mobile_menu.png',
    //-- json --
    '/public/json/input_errors.json',
    '/public/json/lexem_table.json',
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');

    evt.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(precacheResources);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }

    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(cacheName)
                    .then((cache) => {
                        return cache.match('offline');
                    });
            })
    );
});


