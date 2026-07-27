# Yan Görev — Kurgusal Oyun Dergisi + Forum Demosu (Tasarım)

**Tarih:** 2026-07-27
**Durum:** Onaylandı
**Amaç:** Yeni ekip arkadaşımızın Claude Code + skill'ler + GitHub + Vercel iş akışına alışması için özenle yapılmış, tamamen kurgusal içerikli demo site.

## 1. Özet

"Yan Görev", temiz editoryal dergi estetiğinde bir oyun inceleme sitesi + tartışma forumu demosudur. Tüm içerik (oyunlar, stüdyolar, incelemeler, forum kullanıcıları, yorumlar) hayal ürünüdür; gerçek oyun veya marka adı kullanılmaz. Site saf statik HTML/CSS/JS ile yapılır, GitHub'a push'lanır ve Vercel GitHub entegrasyonuyla otomatik yayınlanır.

## 2. Öğrenme hedefleri (projenin asıl amacı)

- git init → GitHub repo → Vercel bağlama → push = otomatik deploy döngüsünü uçtan uca yaşamak
- Claude Code skill'lerine alışmak: brainstorming, writing-plans, find-skills, frontend-design, verification
- Küçük ama karar gerektiren kod parçalarını bizzat yazmak (aşağıda "kullanıcı katkıları")

## 3. Mimari

- **Yaklaşım:** Framework'süz, build adımsız saf statik site. Vercel dosyaları olduğu gibi servis eder.
- **Konum:** `~/developer/yan-gorev`
- **Repo:** GitHub `CryHaq/yan-gorev` (public — kurgu içerik, sır yok)
- **Deploy:** Vercel GitHub entegrasyonu; `main`'e her push otomatik production deploy.

### Dosya yapısı

```
yan-gorev/
├─ index.html          # Ana sayfa: manşet inceleme + kart grid + forum özeti
├─ oyun.html           # İnceleme detay şablonu (?id= ile data.js'ten seçer)
├─ konu.html           # Forum konusu şablonu (?id= ile data.js'ten seçer)
├─ css/styles.css      # Tüm stil (tek dosya)
├─ js/data.js          # Kurgu veri: OYUNLAR ve KONULAR dizileri
├─ js/app.js           # Şablon render + sahte etkileşim (yorum, beğeni)
└─ docs/superpowers/specs/  # Bu doküman
```

## 4. Sayfalar

### index.html
- Üst bar: "Yan Görev" logotipi (saf tipografi), menü: İncelemeler / Forum
- Manşet: öne çıkan inceleme, büyük serif başlık + puan rozeti
- İnceleme kartları: kalan 5 oyun, grid düzeninde (başlık, tür, tek cümle özet, puan)
- "Forumda bu hafta": 6 konunun listesi (başlık, rumuz, yorum sayısı, beğeni)
- Footer: "Yan Görev — kurgusal bir demo yayınıdır" notu

### oyun.html?id=«slug»
- İnceleme başlığı, alt başlık, puan rozeti (10 üzerinden, tek ondalık)
- Künye satırı: tür / kurgu stüdyo / kurgu çıkış tarihi / platformlar
- 4-6 paragraflık inceleme metni
- Artı/eksi kutusu (iki sütun liste)
- "Bu oyunu forumda tartış →" bağlantısı (ilgili konuya)
- Geçersiz/eksik `id` → ilk oyuna düşer (hata sayfası yok, demo davranışı)

### konu.html?id=«slug»
- Konu başlığı + açan rumuz + tarih
- Açılış mesajı, ardından 4-8 kurgu yorum (harf-avatar, rumuz, tarih, metin)
- localStorage'daki kullanıcı yorumları kurgu yorumların ALTINA eklenir
- Yorum formu: rumuz + metin → localStorage'a kaydeder, listeyi anında günceller
- Her yorumda beğeni sayacı; tıklama localStorage'da saklanır
- Geçersiz/eksik `id` → ilk konuya düşer

## 5. Veri modeli (js/data.js)

```js
const OYUNLAR = [{
  id: "slug",            // URL'de kullanılır
  ad: "…", tur: "…", studyo: "…", cikis: "…", platformlar: ["…"],
  puan: 8.7,
  ozet: "tek cümle",
  manset: true|false,     // ana sayfa hero'su (tam 1 adet true)
  inceleme: ["paragraf", …],
  arti: ["…"], eksi: ["…"],
  konuId: "ilgili-forum-konusu"
}, … 6 adet];

const KONULAR = [{
  id: "slug",
  baslik: "…", acan: "rumuz", tarih: "…",
  mesaj: "açılış metni",
  yorumlar: [{ rumuz, tarih, metin }, … 4-8 adet]
}, … 6 adet];
```

- Tüm adlar kurgu; gerçek oyun/stüdyo/marka adı YOK.
- İçerik dili Türkçe.

## 6. Sahte etkileşim (js/app.js)

- **Render:** `?id=` parametresini okur, data.js'ten kaydı bulur, DOM'a basar.
- **Yorum kaydetme:** `localStorage["yg-yorumlar-«konuId»"]` altında JSON dizi. (Fonksiyonu yeni ekip arkadaşı yazar — kullanıcı katkısı #1.)
- **Beğeni:** `localStorage["yg-begeni-«anahtar»"]` sayaç; ikinci tıklama geri alır.
- Sunucu, hesap, gerçek kalıcılık YOK — bilinçli tasarım kararı, footer'da şeffafça belirtilir.

## 7. Görsel dil

- Temiz editoryal dergi: açık zemin, yüksek kontrast, bol beyaz alan
- Büyük serif manşet tipografisi + grotesk gövde; tek vurgu rengi (puan rozetleri, bağlantılar)
- Uygulamada `frontend-design` skill'i ile özgün tipografi/renk seçimi yapılır; şablonvari "AI görünümü" kabul edilmez
- Görsel yoksa tipografi ve renk blokları taşır — stok/AI görsel kullanılmaz

## 8. Kullanıcı katkıları (öğrenme parçaları)

1. `app.js` içinde yorumun localStorage'a kaydedilme stratejisi (5-10 satır)
2. Bir oyunun inceleme metni + artı/eksi listesi (içerik yazımı)
3. Vurgu renginin seçimi (tasarım kararı)

Her katkı için iskelet + TODO işaretli boşluk hazırlanır, seçenekler ve trade-off'lar anlatılır.

## 9. Deploy ve doğrulama

1. `git init` + ilk commit (bu spec)
2. `gh repo create CryHaq/yan-gorev --public` + push
3. Vercel'e GitHub entegrasyonuyla bağlama (vercel CLI `link`/`git connect` veya dashboard)
4. `main`'e push → otomatik deploy doğrulanır
5. Canlı URL'de gözle + headless ekran görüntüsüyle kontrol (masaüstü ve ~390px mobil)
6. Sonraki her değişiklikte: küçük commit → push → deploy'un tetiklendiğini izle

## 10. Kapsam dışı (YAGNI)

- Gerçek veritabanı, kullanıcı hesabı, auth
- Arama, sayfalama, çoklu dil
- CMS/admin paneli
- Gerçek görseller (tipografi taşır)

İkinci aşama istenirse (gerçek yorum sistemi) ayrı bir spec yazılır.
