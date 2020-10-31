const CACHE_NAME = "first-pwa-v02";
var urlsToCache = [
  "./",
  "./nav.html",
  "./index.html",
  "./img/icon.png",
  "./img/apple.jpg",
  "./img/banner-home.jpg",
  "./img/blueberry.jpg",
  "./img/call-me.jpg",
  "./img/salad.jpg",
  "./img/veggie.jpg",
  "./pages/home.html",
  "./pages/about.html",
  "./pages/product.html",
  "./pages/blog.html",
  "./pages/contact.html",
  "./fonts/Itim-Regular.ttf",
  "./fonts/OpenSans-Regular.ttf",
  "./fonts/OpenSans-Light.ttf",
  "./fonts/OpenSans-SemiBold.ttf",
  "./css/materialize.min.css",
  "./css/style.css",
  "./js/materialize.min.js",
  "./js/nav.js",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});