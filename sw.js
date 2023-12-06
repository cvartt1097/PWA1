const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'offlinemsg.html',
    'settings.html',
    'about.html',
    '/js/app.js',
    '/js/script.js',
    '/images/icons/48.png',
    '/images/icons/57.png',
    '/images/icons/60.png',
    '/images/icons/72.png',
    '/images/icons/76.png',
    '/images/icons/96.png',
    '/images/icons/120.png',
    '/images/icons/128.png',
    '/images/icons/144.png',
    '/images/icons/152.png',
    '/images/icons/180.png',
    '/images/icons/192.png',
    '/images/icons/256.png',
    '/images/icons/512.png',
    '/images/screenshots/aboutTabAndroid.png',
    '/images/screenshots/settingsTabAndroid.png',
    '/images/screenshots/homeTabAndroid.png',
    '/css/styles.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
];





// install service worker
// self.addEventListener('install', evt => {
//     //console.log('service worker has been installed');
//     evt.waitUntil(
//         caches.open(staticCacheName).then(cache => {
//             console.log('caching shell assets');
//             cache.addAll(assets);
//         })
//     );
    
// });

// // activate event
// self.addEventListener('activate', evt => {
//     //console.log('service worker has been activated');
//     evt.waitUntil(
//         caches.keys().then(keys => {
//             //console.log(keys);
//             return Promise.all(keys
//                 .filter(key => key !== staticCacheName && key !== dynamicCacheName)
//                 .map(key => caches.delete(key))
//             )
//         })
//     );
// });

// // fetch event
// self.addEventListener('fetch', evt => {
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             return cacheRes || fetch(evt.request).then(fetchRes => {
//                 // Check if the request scheme is supported
//                 if (evt.request.url.startsWith('http')) {
//                     // Cache the resource if the scheme is supported
//                     return caches.open(dynamicCacheName).then(cache => {
//                         cache.put(evt.request.url, fetchRes.clone());
//                         return fetchRes;
//                     });
//                 } else {
//                     // If the scheme is not supported, just return the fetch response
//                     return fetchRes;
//                 }
//             });
//         }).catch(() => {
//             if (evt.request.url.indexOf('.html') > -1) {
//                 return caches.match('/offlinemsg.html');
//             }
//         })
//     );
// });

//Call install event
self.addEventListener('install', (e) => {
console.log('Service Worker: Installed');

e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
);
});

//Call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    });

    //Call Fetch Event
    self.addEventListener('fetch', e=> {
        console.log('Service Worker: fetching');
        e.respondWith(fetch(e.request).catch(() => catches.match(e.request)));
    });





