var urlsToCache = [
	'.',
	'css/style.css'
];

// self.addEventListener('install', function(event) {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME)
// 		.then(function(cache) {
// 			return cache.addAll(urlsToCache);
// 		})
// 	);
// });

// self.addEventListener('fetch', function(event) {
// 	event.respondWith(
// 		caches.match(event.request)
// 		.then(function(response) {
// 			if (response) {
// 				return response;
// 			}
// 			return fetch(event.request);
// 		})
// 	);
// });

// self.addEventListener('activate', function(event) {
// 	event.waitUntil(
// 		caches.keys().then(function(cacheNames) {
// 			return Promise.all(
// 				cacheNames.map(function(cacheName) {
// 					if (cacheName != CACHE_NAME) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

var CACHE_NAME = 'cstimer_cache_0123456989465xx';