const staticCacheName = 'site-static-v5';
const dynamicCacheName = 'site-dinamic-v3';
const assets = [
    '/',
    '/index.html',
    '/offlinemsg.html',
    '/settings.html',
    '/about.html',
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
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
];





// install service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
    
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
             return caches.open(dynamicCacheName).then(cache => {
                cache.put(evt.request.url, fetchRes.clone())
                return fetchRes;
             })   
            });
        }).catch(() => {
            if(evt.request.url.indexOf('.html') > -1){
                return caches.match('/offlinemsg.html');
            }
            
        })
    );


});

