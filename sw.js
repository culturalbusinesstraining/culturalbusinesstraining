// AppCachea tässä filussa, lisää tapoja: https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/
// Joka releassissa versionumeroa päivitetään eli site-static-v(n)
// static on etusivu - dynamic on muut
const staticCacheName = 'site-static-v1.1.1';
const dynamicCacheName = 'site-dynamic-v1.1.1';

// Tässä taulukossa sopisi olla vaa etusivun sisältö ja fallback mut koska nopee duunattu nii paljon kaikkee ylimääräistä (varsinkin /img)
const assets = [
    '/',
    '/index.html',
    '/members.html',
    '/assets/js/app.js',
    '/assets/js/bootstrap.min.js',
    '/assets/js/flickity.pkgd.min.js',
    '/assets/js/jquery.scrollTo.min.js',
    '/assets/js/jquery.min.js',
    '/assets/js/zoom.js',
    '/assets/js/lazysizes.min.js',
    '/assets/images/icons/android-chrome-192x192.png',
    '/assets/images/icons/android-chrome-512x512.png',
    '/assets/images/icons/apple-touch-icon.png',
    '/assets/images/icons/favicon.ico',
    '/assets/images/icons/favicon-16x16.png',
    '/assets/images/icons/favicon-32x32.png',
    '/assets/images/icons/mstile-150x150.png',
    '/assets/images/icons/safari-pinned-tab.svg',
    '/assets/css/index.css',
    '/assets/css/index.css.map',
    '/assets/css/main.css',
    '/assets/css/main.css.map',
    '/assets/css/flickity.css',
    '/assets/css/zoom.css',
    '/assets/images/profile/selene.jpg',
    '/assets/images/profile/ramona.jpg',
    '/assets/images/profile/lorena.jpg',
    '/assets/images/profile/harri.jpg',
    '/assets/images/profile/sabrina.jpg',
    '/assets/images/cbt-logo.png',
    '/assets/images/programcovid.png',
    '/assets/images/guide.png',
    '/assets/images/tampere.png',
    '/assets/images/InternationalHub.jpg',
    '/assets/images/BusinessEngine.png',
    '/assets/images/imagem.png',
    '/assets/images/festIBAL.png',
    '/assets/images/FIFsquare180.png',
    '/assets/images/crispymania.png',
    '/assets/images/pinta.png',
    '/assets/images/ct-logo-rgb.png',
    '/assets/images/tribe.png',
    '/assets/images/afaes.png',
    '/assets/images/htlogo.png',
    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
    'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    'https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap',
    'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459W1hyzbi.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459WZhyzbi.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wdhyzbi.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gTD_u50.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gbD_u50.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3g3D_u50.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gfD_u50.woff2',
    'https://fonts.gstatic.com/s/montserrat/v14/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2',
    'https://fonts.googleapis.com/css?family=Lato:300,400,300italic,400italic&display=swap',
    'https://fonts.gstatic.com/s/lato/v16/S6u_w4BMUTPHjxsI9w2_FQft1dw.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAUi-qJCY.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-q.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh7USSwaPGR_p.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh7USSwiPGQ.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXjeu.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXg.woff2',
    'https://fonts.gstatic.com/s/lato/v16/S6u_w4BMUTPHjxsI9w2_Gwft.woff2'
];

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size){
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
};

// install service worker
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 150);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.includes('.html')){
                return caches.match('/fallback.html');
            }
        })
    );
});
//fetch alternative, täs oli jotain häikkää
// const { request } = evt;
//     return evt.respondWith(caches.match(request)) || fetch(request);
// A slightly more ES6 way to handle the fetch events can be done in 2 lines:
// Return waits for the promise to resolve without having to use.then() or await and object destructuring makes the code look a bit cleaner