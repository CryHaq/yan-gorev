/* Yan Görev SW — bilinçli olarak AĞ-ÖNCELİKLİ: her istek önce ağa gider,
   önbellek yalnız çevrimdışı yedek. Bayat içerik tuzağına düşmeyiz. */
const SURUM = "yg-v3";

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
        /* Video (206 range yanıtı Cache API'de reddedilir) ve temel-olmayan
           yanıtlar önbelleğe YAZILMAZ — boşa disk churn önlenir (denetim #4). */
        if (yanit.status === 200 && yanit.type === "basic" && !e.request.url.includes("/video/")) {
          const kopya = yanit.clone();
          caches.open(SURUM)
            .then(c => c.put(e.request, kopya))
            .catch(() => { /* kota dolu olabilir; yanıt zaten kullanıcıya döndü */ });
        }
        return yanit;
      })
      .catch(() =>
        caches.match(e.request).then(bulunan =>
          /* Çevrimdışı + önbellekte yok: gezinmelerde tarayıcının çıplak hata
             sayfası yerine kendi 404 sayfamız (sessiz-hata denetimi #7). */
          bulunan || (e.request.mode === "navigate" ? caches.match("404.html") : Response.error())
        )
      )
  );
});
