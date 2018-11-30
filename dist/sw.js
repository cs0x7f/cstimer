var urlsToCache = [
    '.',
    'timer.php',
    'js/cstimer.js',
    'js/twisty.js',
    'js/jquery.min.js',
    'css/style.css'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

var CACHE_NAME = "cstimer_cache_07edaa74b299b18fddefddcfd86953b8";
