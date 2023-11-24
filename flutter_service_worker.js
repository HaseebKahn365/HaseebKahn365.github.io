'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "e7b6829538c9838b9c19af64f4685dde",
"assets/AssetManifest.json": "74e6a62b2d08f99afd11c167d2f8bb2a",
"assets/assets/boyinspace.jpg": "a03b9548574bb0cd0db85b7369714e48",
"assets/assets/boyinspace2.jpg": "b0568cb055aadf3aecd318d067273b24",
"assets/assets/boyinspace3.jpg": "9641bc42c222c255fade257838268bec",
"assets/assets/facebook_desktop.jpg": "fd04fcb3450d4dc5626a6f48287662cb",
"assets/assets/facebook_mobile.jpg": "3842d79a591ed8d2d6e8a237cf9d1a41",
"assets/assets/netflix_desktop.jpg": "6e8727bbda76b1b65bb2d289a48e4e07",
"assets/assets/netflix_mobile.jpg": "de65785fb8d600b276e3724d914597ff",
"assets/assets/netflix_tablet.jpg": "24ba0b2579b52ff67d41a4e2dc1d2151",
"assets/assets/Profile.jpg": "6f38888bf5a7bcc2ff2beea599c85888",
"assets/assets/spotify_desktop.jpg": "2c3e7b4dd2d82bfaf67323a1c711ea2d",
"assets/assets/spotify_mobile.jpg": "b2b734dd07bedda45cee20561ddbac36",
"assets/assets/spotify_tablet.jpg": "78f7cde3c64f7bb19d4eacf651f81d23",
"assets/FontManifest.json": "93659626f423ccb781dee59542f6f38f",
"assets/fonts/MaterialIcons-Regular.otf": "e471707ceec5a5c586d513d5d9a34982",
"assets/fonts/Product_Sans_Bold.ttf": "dba0c688b8d5ee09a1e214aebd5d25e4",
"assets/fonts/Product_Sans_Bold_Italic.ttf": "79750b1d82b2558801373d62dd7e5280",
"assets/fonts/Product_Sans_Italic.ttf": "e88ec18827526928e71407a24937825a",
"assets/fonts/Product_Sans_Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/NOTICES": "e5c71baa5a74f04498c9bad4fdbf5beb",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP1.ttf": "18363f22c1a1e5edd78af7dcb6db4704",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP2.ttf": "f361a7f534b150b6aca9e062d26df1ec",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP3.ttf": "e59442c8a082f6314479eadfa78a88be",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP4.ttf": "1d7bd3ebed559a3291c8f2556ea0a58f",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP5.ttf": "3066e0e994eb220c010683f13de4893b",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP6.ttf": "3e237ba9e8ea7fea26d7aff083b104ac",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP7.ttf": "6ff04f77f5d74b91158d60468affbccc",
"assets/packages/simple_icons/fonts/SimpleIcons.ttf": "429f4878395a78daa21abc07b2954fd9",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "fb616e3edf2fb34c3b88f699b28e0971",
"/": "fb616e3edf2fb34c3b88f699b28e0971",
"main.dart.js": "b21e5b7de31856a4aa031ade8ccdaeed",
"manifest.json": "d8fe34f7ae4c072a77b924e01dac8a50",
"version.json": "9b818ca9511483c901bed1545384376c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
