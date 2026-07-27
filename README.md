# Yan Görev

Kurgusal bir oyun inceleme dergisi + tartışma forumu demosu. Tüm oyunlar,
stüdyolar ve kullanıcılar hayal ürünüdür.

Saf statik HTML/CSS/JS — framework ve build adımı yok. `main`'e her push,
Vercel GitHub entegrasyonuyla otomatik yayınlanır.

## Yerelde çalıştırma

```bash
python3 -m http.server 7777
# http://localhost:7777
```

## Yapı

- `index.html` — manşet + inceleme kartları + forum listesi
- `oyun.html?id=…` — inceleme şablonu
- `konu.html?id=…` — forum konusu şablonu (yorum formu localStorage'a yazar)
- `js/data.js` — kurgu veri, `js/app.js` — render + sahte etkileşim

Bu proje bir ekip alıştırmasıdır; tasarım ve uygulama planı `docs/superpowers/` altındadır.
