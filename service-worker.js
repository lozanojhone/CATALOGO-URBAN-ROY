const CACHE_NAME='catalogo-roy-pwa-v4-1-icons-20260803';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./favicon.png','./apple-touch-icon.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(event.request).then(resp=>{const copy=resp.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return resp}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))))});
