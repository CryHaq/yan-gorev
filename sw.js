/* Yan Görev SW — bilinçli olarak AĞ-ÖNCELİKLİ: her istek önce ağa gider,
   önbellek yalnız çevrimdışı yedek. Bayat içerik tuzağına düşmeyiz. */
const SURUM = "yg-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(adlar => Promise.all(adlar.filter(a => a !== SURUM).map(a => caches.delete(a))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request)
      .then(yanit => {
        const kopya = yanit.clone();
        caches.open(SURUM).then(c => c.put(e.request, kopya));
        return yanit;
      })
      .catch(() => caches.match(e.request))
  );
});
