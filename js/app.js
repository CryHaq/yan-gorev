/* Yan Görev — render motoru ve sahte etkileşim.
   Veri kaynağı: js/data.js (OYUNLAR, KONULAR). Sunucu yok; kalıcılık localStorage. */

document.addEventListener("DOMContentLoaded", sayfayiKur);

/* Aktif yanıt bağlamı: Yanıtla'ya basılınca dolar, gönderince sıfırlanır. */
let aktifYanit = null;

function sayfayiKur() {
  temaDugmesiKur();
  uyeNavGuncelle();
  navAktifIsaretle();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
  if (!document.getElementById("icerik")) return; /* 404 gibi statik sayfalar kendi içeriğini taşır */
  const sayfa = location.pathname.split("/").pop() || "index.html";
  /* Sevk kalkanı (denetim #6): herhangi bir render çökerse boş sayfa yerine
     açıklanmış hata — kullanıcı da geliştirici de karanlıkta kalmaz. */
  try {
    if (sayfa === "oyun.html") oyunSayfasi();
    else if (sayfa === "konu.html") konuSayfasi();
    else if (sayfa === "forum.html") forumSayfasi();
    else if (sayfa === "ipuclari.html") ipuclariSayfasi();
    else if (sayfa === "uye.html") uyeSayfasi();
    else if (sayfa === "profil.html") profilSayfasi();
    else if (sayfa === "ekip.html") ekipSayfasi();
    else anaSayfa();
  } catch (hata) {
    console.error("Yan Görev render hatası:", hata);
    const icerik = document.getElementById("icerik");
    if (icerik && !icerik.childElementCount) {
      const kutu = el("div", "bos-durum");
      kutu.append(el("p", null, "Bir şeyler ters gitti. Sayfayı yenilemeyi dene; sorun sürerse tarayıcının site verilerini temizlemek çözebilir."));
      icerik.append(kutu);
    }
  }
}

/* ---------- ipuçları sayfası ---------- */

function ipuclariSayfasi() {
  document.title = "İpuçları — Yan Görev";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const baslik = el("header", "forum-basligi");
  baslik.append(
    el("p", "eyebrow", "Görev Rehberi · Topluluk Bilgeliği"),
    el("h1", null, "İpuçları"),
    el("p", "alt", "Kurgu oyunlarımızın can alıcı sırları — çoğunu forumdaki kavgalardan damıttık. Spoiler içerenler bulanık gelir; görmek isteyen tıklar."),
    aramaKutusu()
  );
  icerik.append(baslik);

  /* En çok aranan ipucu: forum manşetiyle aynı kalıp, ayın gününe göre döner. */
  const aday = ARANAN_ADAYLAR[new Date().getDate() % ARANAN_ADAYLAR.length];
  const adayGrup = IPUCLARI.find(g => g.oyunId === aday.oyunId);
  const adayOyun = OYUNLAR.find(o => o.id === aday.oyunId);
  const adayIpucu = adayGrup && adayGrup.liste[aday.ipucu];
  if (!adayIpucu || !adayOyun) console.warn("En Çok Aranan İpucu adayı veriyle eşleşmiyor:", aday);
  if (adayIpucu && adayOyun) {
    const manset = el("article", "ipucu-kart forum-one-cikan js-reveal");
    const mansetKapak = el("a", "konu-kapak");
    mansetKapak.href = "oyun.html?id=" + adayOyun.id;
    mansetKapak.setAttribute("aria-label", adayOyun.ad + " incelemesine git");
    mansetKapak.append(kapakGorseli(adayOyun, "(max-width: 640px) 100vw, 480px", true));
    manset.append(mansetKapak);
    const mansetGovde = el("div", "konu-govde");
    mansetGovde.append(el("p", "one-cikan-eyebrow", "💡 En Çok Aranan İpucu"));
    const mansetOyun = el("p", "konu-oyun");
    const mansetLink = el("a", null, adayOyun.ad);
    mansetLink.href = "oyun.html?id=" + adayOyun.id;
    mansetOyun.append(mansetLink, el("span", "tur-etiket", adayOyun.tur));
    mansetGovde.append(mansetOyun, el("p", "buyuk-ipucu", "“" + adayIpucu.metin + "”"));
    const mansetGit = el("a", "tartisma-git");
    mansetGit.href = "konu.html?id=" + adayOyun.konuId;
    mansetGit.append(document.createTextNode("Tartışmaya git"), el("span", "ok-mini", "→"));
    mansetGovde.append(mansetGit);
    manset.append(mansetGovde);
    icerik.append(manset);
  }

  const liste = el("div", "forum-izgara ipucu-izgara");
  IPUCLARI.forEach(grup => {
    const oyun = OYUNLAR.find(o => o.id === grup.oyunId);
    if (!oyun) return;
    const kart = el("article", "ipucu-kart dikey js-reveal");
    kart.id = "ipucu-" + oyun.id;

    const kapak = el("a", "konu-kapak");
    kapak.href = "oyun.html?id=" + oyun.id;
    kapak.setAttribute("aria-label", oyun.ad + " incelemesine git");
    kapak.append(kapakGorseli(oyun, "(max-width: 640px) 100vw, 346px"));
    kart.append(kapak);

    const govde = el("div", "konu-govde");
    const oyunSatiri = el("p", "konu-oyun");
    const oyunLink = el("a", null, oyun.ad);
    oyunLink.href = "oyun.html?id=" + oyun.id;
    oyunSatiri.append(oyunLink, el("span", "tur-etiket", oyun.tur));
    govde.append(oyunSatiri);

    const ul = el("ul", "ipucu-liste");
    grup.liste.forEach(ip => {
      const li = el("li", "ipucu" + (ip.spoiler ? " spoiler" : ""));
      li.append(el("span", "isaret", ip.spoiler ? "☠" : "▸"), el("span", "metin", ip.metin));
      if (ip.spoiler) {
        li.setAttribute("role", "button");
        li.setAttribute("tabindex", "0");
        li.setAttribute("aria-label", "Spoiler içeren ipucu — görmek için tıkla");
        const ac = () => { li.classList.add("acik"); guvenliYaz("yg-spoiler-acildi", "1"); };
        li.addEventListener("click", ac);
        li.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ac(); } });
      }
      ul.append(li);
    });
    /* İpuçları varsayılan gizli: kart küçük kalır, isteyen baloncukla açar. */
    const detay = el("div", "ipucu-detay gizli");
    detay.append(ul);
    const git = el("a", "tartisma-git");
    git.href = "konu.html?id=" + oyun.konuId;
    git.append(document.createTextNode("Tartışmaya git"), el("span", "ok-mini", "→"));
    detay.append(git);

    const gor = el("button", "tartisma-git ipucu-gor");
    gor.type = "button";
    gor.setAttribute("aria-expanded", "false");
    const gorYazi = el("span", null, "İpuçlarını gör");
    const gorOk = el("span", "ok-mini", "▾");
    gor.append(gorYazi, gorOk);
    gor.addEventListener("click", () => {
      const acik = !detay.classList.toggle("gizli");
      gor.setAttribute("aria-expanded", acik ? "true" : "false");
      gorYazi.textContent = acik ? "İpuçlarını gizle" : "İpuçlarını gör";
      gorOk.textContent = acik ? "▴" : "▾";
    });

    govde.append(gor, detay);
    kart.append(govde);
    liste.append(kart);
  });
  icerik.append(liste);

  /* Aramadan #ipucu-<oyun> çapasıyla gelindiyse ilgili kartı aç ve odakla. */
  if (location.hash) {
    const hedef = document.getElementById(location.hash.slice(1));
    if (hedef) {
      const dugme = hedef.querySelector(".ipucu-gor");
      if (dugme) dugme.click();
      hedef.scrollIntoView({ block: "start" });
    }
  }
  canlandir();
}

/* ---------- yardımcılar ---------- */

function paramId(varsayilan) {
  return new URLSearchParams(location.search).get("id") || varsayilan;
}

/* Metin her zaman textContent ile basılır: kullanıcı girdisi HTML olarak yorumlanamaz. */
function el(tag, sinif, metin) {
  const e = document.createElement(tag);
  if (sinif) e.className = sinif;
  if (metin !== undefined) e.textContent = metin;
  return e;
}

/* Kart görselleri: AVIF öncelikli <picture>, JPG yedek; 720px orta + 1400px srcset.
   eager=true manşet/LCP görselleri içindir: lazy anti-pattern'inden kaçınır (denetim #3, #6). */
function kapakGorseli(oyun, boyutlar, eager) {
  const orta = oyun.gorsel.replace("img/", "img/orta/");
  const resim = el("picture");
  const avif = document.createElement("source");
  avif.type = "image/avif";
  avif.srcset = orta.replace(".jpg", ".avif") + " 720w, " + oyun.gorsel.replace(".jpg", ".avif") + " 1400w";
  avif.sizes = boyutlar;
  const img = el("img");
  img.src = orta;
  img.srcset = orta + " 720w, " + oyun.gorsel + " 1400w";
  img.sizes = boyutlar;
  img.alt = oyun.ad + " oyununun görseli";
  if (eager) {
    img.fetchPriority = "high";
  } else {
    img.loading = "lazy";
  }
  resim.append(avif, img);
  return resim;
}

function puanRozet(puan) {
  const rozet = el("span", "puan-rozet");
  rozet.append(
    el("span", "sayi", String(puan).replace(".", ",")),
    el("span", "bolen", " /10")
  );
  return rozet;
}

/* ---------- ana sayfa ---------- */

function anaSayfa() {
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const manset = OYUNLAR.find(o => o.manset) || OYUNLAR[0];
  const hero = el("section", "hero hero-prisma");

  /* LCP yolu: manşet görseli AVIF <picture> + srcset + yüksek öncelik (denetim #2, #6). */
  const heroOrta = manset.gorsel.replace("img/", "img/orta/");
  const heroResim = el("picture");
  const heroAvif = document.createElement("source");
  heroAvif.type = "image/avif";
  heroAvif.srcset = heroOrta.replace(".jpg", ".avif") + " 720w, " + manset.gorsel.replace(".jpg", ".avif") + " 1400w";
  heroAvif.sizes = "100vw";
  const heroGorsel = el("img", "hero-gorsel");
  heroGorsel.src = manset.gorsel;
  heroGorsel.srcset = heroOrta + " 720w, " + manset.gorsel + " 1400w";
  heroGorsel.sizes = "100vw";
  heroGorsel.fetchPriority = "high";
  heroGorsel.alt = manset.ad + " oyununun tanıtım görseli";
  heroResim.append(heroAvif, heroGorsel);
  hero.append(heroResim);

  /* Video LCP görseli YÜKLENDİKTEN sonra eklenir: 800KB'lık dosya
     manşet görseliyle bant genişliği yarıştırmaz (denetim #2).
     Hareket azaltma tercihinde hiç eklenmez. */
  if (manset.video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const videoEkle = () => {
      const video = document.createElement("video");
      video.className = "hero-video";
      video.src = manset.video;
      video.poster = manset.gorsel;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      hero.insertBefore(video, heroResim.nextSibling);
    };
    if (heroGorsel.complete) videoEkle();
    else {
      heroGorsel.addEventListener("load", videoEkle, { once: true });
      /* Denetim #10: görsel kırılırsa video (kendi poster'ı var) yine denenir. */
      heroGorsel.addEventListener("error", videoEkle, { once: true });
    }
  }

  hero.append(puanRozet(manset.puan));

  const heroIcerik = el("div", "hero-icerik");
  const heroSol = el("div", "hero-sol");
  heroSol.append(el("p", "eyebrow", "Ana Görev · Haftanın İncelemesi"));

  /* Kelime kelime yükselen manşet: her kelime maskeli kutusundan süzülür. */
  const h1 = el("h1", "dev-baslik");
  const h1a = el("a");
  h1a.href = "oyun.html?id=" + manset.id;
  const kelimeler = manset.ad.split(" ");
  kelimeler.forEach((kelime, i) => {
    const maske = el("span", "kelime");
    const ic = el("span", "kelime-ic", kelime);
    ic.style.animationDelay = (0.15 + i * 0.12) + "s";
    if (i === kelimeler.length - 1) ic.append(el("sup", "yildiz", "*"));
    maske.append(ic);
    h1a.append(maske);
  });
  h1.append(h1a);
  heroSol.append(h1);

  const heroSag = el("div", "hero-sag");
  heroSag.append(el("p", "ozet", manset.ozet));
  const heroCta = el("a", "hero-cta");
  heroCta.href = "oyun.html?id=" + manset.id;
  heroCta.append(document.createTextNode("İncelemeyi oku"), el("span", "ok", "→"));
  heroSag.append(heroCta);

  heroIcerik.append(heroSol, heroSag);
  hero.append(heroIcerik, el("p", "hero-dipnot", "*tamamı kurgusaldır"));

  const incelemeBaslik = el("h2", "bolum-baslik", "İncelemeler");
  incelemeBaslik.id = "incelemeler";
  const grid = el("div", "kart-grid");
  OYUNLAR.filter(o => !o.manset).forEach(o => {
    const kart = el("article", "kart js-reveal");
    const kapak = el("a", "kart-kapak");
    kapak.href = "oyun.html?id=" + o.id;
    kapak.setAttribute("aria-label", o.ad + " incelemesine git");
    kapak.append(kapakGorseli(o, "(max-width: 640px) 100vw, 350px"));
    const govde = el("div", "kart-govde");
    govde.append(el("p", "tur", o.tur));
    const h3 = el("h3");
    const a = el("a", null, o.ad);
    a.href = "oyun.html?id=" + o.id;
    h3.append(a);
    govde.append(h3, el("p", "ozet", o.ozet), puanRozet(o.puan));
    kart.append(kapak, govde);
    grid.append(kart);
  });

  const forumBaslik = el("h2", "bolum-baslik", "Yan Görevler · Forum");
  forumBaslik.id = "forum";
  const liste = el("ul", "forum-liste");
  tumKonular().forEach(k => {
    const li = el("li", "js-reveal");
    const a = el("a");
    a.href = "konu.html?id=" + k.id;
    a.append(
      el("span", "isaret", "▸"),
      el("span", "baslik", k.baslik),
      el("span", "meta", k.acan + " · " + k.yorumlar.length + " yorum")
    );
    li.append(a);
    liste.append(li);
  });

  const tartisma = gununTartismasi();
  if (tartisma) icerik.append(tartisma);
  const tumForum = el("a", "forum-cta", "Forumun tamamı: büyük başlıklar, büyük kavgalar →");
  tumForum.href = "forum.html";
  icerik.append(hero, incelemeBaslik, grid, forumBaslik, liste, nabizPaneli(), tumForum, toplulukSayimi());
  canlandir();
}

/* ---------- Meydan Nabzı: kendi kendine yaşayan topluluk simülasyonu ----------
   Her 20 sn'lik zaman dilimi, TOHUMLU sözde-rastgele üreteçle bir "hamle"ye
   dönüşür (konu açma / yanıt). Rastgelelik yok: aynı an siteye bakan herkes
   aynı akışı görür; dönünce meydan "sen yokken yaşamış" olur. */

const NABIZ_ARALIK = 20000;

const NABIZ_KONU_SABLONLARI = [
  "«{oyun}» için gizli bir detay buldum, kimse fark etmemiş",
  "{oyun} hakkında tuhaf bir teorim var, gelin tartışalım",
  "Gece gece {oyun} açanlar kulübü",
  "{oyun} yamadan sonra daha mı iyi oldu?",
  "{oyun} hakkında kimsenin konuşmadığı şey",
  "{oyun} ilk kez oynayacak arkadaşa tavsiyeler"
];

const NABIZ_YANIT_PARCALARI = [
  "buna saygıyla katılmıyorum",
  "denedim ve gerçekten çalışıyor",
  "kanıt olmadan olmaz, ekran görüntüsü bekliyorum",
  "ilk mesajıma dönüp haklı çıktığımı not düşüyorum",
  "spoiler vermeden söylüyorum: sabredin",
  "bunu bir kenara yazın, bir gün turnuva kuralı olacak",
  "meydan bu akşam yine dolu",
  "rehberdeki ipucu buradaki kavgayı bitiriyor aslında"
];

/* mulberry32: minik, deterministik tohumlu üreteç. */
function tohumluRastgele(tohum) {
  return function () {
    tohum |= 0; tohum = (tohum + 0x6D2B79F5) | 0;
    let t = Math.imul(tohum ^ (tohum >>> 15), 1 | tohum);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function kurguRumuzlari() {
  const kume = new Set();
  KONULAR.forEach(k => { kume.add(k.acan); k.yorumlar.forEach(y => kume.add(y.rumuz)); });
  return [...kume];
}

function nabizOlayi(tik) {
  const r = tohumluRastgele((tik % 2147483647) ^ 0x9E3779B9);
  const rumuzlar = kurguRumuzlari();
  const kisi = rumuzlar[Math.floor(r() * rumuzlar.length)];
  const oyun = OYUNLAR[Math.floor(r() * OYUNLAR.length)];
  if (r() < 0.28) {
    const sablon = NABIZ_KONU_SABLONLARI[Math.floor(r() * NABIZ_KONU_SABLONLARI.length)];
    return { kisi, tip: "konu", metin: sablon.replace("{oyun}", oyun.ad), hedef: "konu.html?id=" + oyun.konuId };
  }
  const konu = KONULAR[Math.floor(r() * KONULAR.length)];
  const parca = NABIZ_YANIT_PARCALARI[Math.floor(r() * NABIZ_YANIT_PARCALARI.length)];
  return { kisi, tip: "yanit", metin: "“" + parca + "” · " + kisalt(konu.baslik, 40), hedef: "konu.html?id=" + konu.id };
}

let nabizZamanlayici = null;

function nabizCiz(listeKutu, sayacKutu, canli) {
  const simdiTik = Math.floor(Date.now() / NABIZ_ARALIK);
  const gunBasi = new Date(); gunBasi.setHours(0, 0, 0, 0);
  sayacKutu.textContent = " Meydan Nabzı · bugün " + Math.floor((Date.now() - gunBasi.getTime()) / NABIZ_ARALIK) + " hamle";
  listeKutu.textContent = "";
  for (let i = 0; i < 6; i++) {
    const olay = nabizOlayi(simdiTik - i);
    const satir = el("p", "nabiz-satir" + (canli && i === 0 ? " yeni" : ""));
    const kisiLink = el("a", "rumuz", olay.kisi);
    kisiLink.href = "profil.html?rumuz=" + encodeURIComponent(olay.kisi);
    const hedefLink = el("a", null, olay.metin);
    hedefLink.href = olay.hedef;
    const sn = i * (NABIZ_ARALIK / 1000);
    satir.append(
      kisiLink,
      document.createTextNode(olay.tip === "konu" ? " konu açtı: " : " yanıt verdi: "),
      hedefLink,
      el("span", "nabiz-zaman", i === 0 ? "az önce" : sn < 60 ? sn + " sn önce" : Math.round(sn / 60) + " dk önce")
    );
    listeKutu.append(satir);
  }
}

function nabizPaneli() {
  const panel = el("section", "nabiz js-reveal");
  const baslik = el("p", "nabiz-baslik");
  const sayac = el("span");
  baslik.append(el("span", "canli-nokta"), sayac);
  const listeKutu = el("div", "nabiz-listesi");
  panel.append(baslik, listeKutu);
  nabizCiz(listeKutu, sayac, false);
  if (nabizZamanlayici) clearInterval(nabizZamanlayici);
  nabizZamanlayici = setInterval(() => nabizCiz(listeKutu, sayac, true), NABIZ_ARALIK);
  return panel;
}

/* Sayfa dibi topluluk sayaçları: hepsi gerçek veriden türer, üye olunca
   "son katılan" gerçekten SEN olursun. */
function toplulukSayimi() {
  const rumuzlar = new Set();
  KONULAR.forEach(k => {
    rumuzlar.add(k.acan);
    k.yorumlar.forEach(y => rumuzlar.add(y.rumuz));
  });
  const uye = uyeGetir();
  const ipucuSayisi = IPUCLARI.reduce((t, g) => t + g.liste.length, 0);
  const veriler = [
    [OYUNLAR.length, "inceleme"],
    [tumKonular().length, "konu"],
    [ipucuSayisi, "ipucu"],
    [rumuzlar.size + (uye ? 1 : 0), "kayıtlı sakin"],
    [uye ? uye.rumuz : "tozlufirca", "son katılan"]
  ];
  const serit = el("section", "sayim js-reveal");
  serit.setAttribute("aria-label", "Topluluk sayıları");
  veriler.forEach(([deger, etiket]) => {
    const kutucuk = el("div", "sayim-kutu");
    const yazilik = typeof deger === "string";
    kutucuk.append(
      el("span", "sayim-deger" + (yazilik ? " yazi" : ""), String(deger)),
      el("span", "sayim-etiket", etiket)
    );
    serit.append(kutucuk);
  });
  return serit;
}

/* ---------- forum sayfası ---------- */

function forumSayfasi() {
  document.title = "Yan Görev Forum";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const baslik = el("header", "forum-basligi");
  baslik.append(
    el("p", "eyebrow", "Yan Görevler · Topluluk"),
    el("h1", null, "Yan Görev Forum"),
    el("p", "alt", "Oyun biter, sohbet başlar. Kurgu topluluğumuzun meydanı."),
    cevrimiciSayaci()
  );
  const parametreler = new URLSearchParams(location.search);
  const etiketSecimi = parametreler.get("etiket") || "";
  const siralama = parametreler.get("sirala") || "";

  baslik.append(aramaKutusu(), konuAcPaneli(), filtreCubugu(etiketSecimi, siralama));
  icerik.append(baslik);

  /* En çok yorum alan konu manşete çıkar — kullanıcı yorumları da sayılır,
     yani topluluk yazdıkça manşet gerçekten el değiştirebilir. */
  const tumVeriler = tumKonular().map(k => ({
    konu: k,
    oyun: konuOyunu(k),
    toplam: k.yorumlar.length + kullaniciYorumlari(k.id).length
  }));
  const oneCikan = tumVeriler.reduce((a, b) => (b.toplam > a.toplam ? b : a));

  /* Filtre + sıralama: durum URL'de yaşar, görünüm paylaşılabilir link olur. */
  let veriler = tumVeriler;
  if (etiketSecimi) veriler = veriler.filter(v => (v.konu.etiket || "Tartışma") === etiketSecimi);
  if (siralama === "hareketli") veriler = [...veriler].sort((a, b) => b.toplam - a.toplam);
  else if (siralama === "begenilen") veriler = [...veriler].sort((a, b) => kalpPuani(b.konu) - kalpPuani(a.konu));

  /* Manşet yalnız varsayılan görünümde: filtre/sıralama aktifken saf liste. */
  const varsayilan = !etiketSecimi && !siralama;
  const digerleri = varsayilan ? veriler.filter(v => v !== oneCikan) : veriler;

  const SAYFA_BOYU = 6;
  const toplamSayfa = Math.max(1, Math.ceil(digerleri.length / SAYFA_BOYU));
  let sayfaNo = parseInt(parametreler.get("sayfa"), 10);
  if (!(sayfaNo >= 1 && sayfaNo <= toplamSayfa)) sayfaNo = 1;

  if (varsayilan && sayfaNo === 1) icerik.append(konuKarti(oneCikan, true));

  const izgara = el("div", "forum-izgara");
  digerleri.slice((sayfaNo - 1) * SAYFA_BOYU, sayfaNo * SAYFA_BOYU)
    .forEach(v => izgara.append(konuKarti(v, false)));
  const toplamYorum = tumVeriler.reduce((t, v) => t + v.toplam, 0);
  icerik.append(
    izgara,
    sayfalama(sayfaNo, toplamSayfa, etiketSecimi, siralama),
    el("p", "istatistik", OYUNLAR.length + " oyun · " + tumVeriler.length + " konu · " + toplamYorum + " yorum · sınırsız kavga")
  );
  canlandir();
}

function konuKarti(veri, oneCikan) {
  const k = veri.konu, oyun = veri.oyun;
  const kutu = el("article", (oneCikan ? "forum-konu forum-one-cikan" : "forum-konu dikey") + " js-reveal");
  if (okunanlar().has(k.id)) kutu.classList.add("okundu");

  if (oyun) {
    const kapak = el("a", "konu-kapak");
    kapak.href = "oyun.html?id=" + oyun.id;
    kapak.setAttribute("aria-label", oyun.ad + " incelemesine git");
    kapak.append(kapakGorseli(oyun, oneCikan ? "(max-width: 640px) 100vw, 480px" : "(max-width: 640px) 100vw, 346px", oneCikan));
    kutu.append(kapak);
  }

  /* Sade kart: yalnız başlık (oyun) + alt başlık (konu) + tartışma baloncuğu. */
  const govde = el("div", "konu-govde");
  if (oneCikan) govde.append(el("p", "one-cikan-eyebrow", "🔥 Günün En Çok Tartışılanı"));
  if (oyun) {
    const oyunSatiri = el("p", "konu-oyun");
    const oyunLink = el("a", null, oyun.ad);
    oyunLink.href = "oyun.html?id=" + oyun.id;
    oyunSatiri.append(oyunLink, el("span", "tur-etiket", oyun.tur), el("span", "etiket-mini", k.etiket || "Tartışma"));
    govde.append(oyunSatiri);
  }
  const h2 = el("h2", "konu-alt-baslik");
  const a = el("a", null, k.baslik);
  a.href = "konu.html?id=" + k.id;
  h2.append(a);
  govde.append(h2);

  /* Manşet karta bağlam satırı: ölü boşluk yerine yaşayan özet. */
  if (oneCikan) {
    const parcalar = [veri.toplam + " yorum"];
    if (k.anket) {
      const taban = k.anket.secenekler.reduce((t, s) => t + s.taban, 0);
      const oyVar = localStorage.getItem("yg-anket-" + k.id) !== null;
      parcalar.push((taban + (oyVar ? 1 : 0)) + " oy");
    }
    const baglam = el("p", "one-cikan-baglam", parcalar.join(" · "));
    const son = kullaniciYorumlari(k.id).slice(-1)[0] || k.yorumlar[k.yorumlar.length - 1];
    if (son) baglam.append(document.createTextNode(" — Son söz, " + son.rumuz + ": “" + kisalt(son.metin, 72) + "”"));
    govde.append(baglam);
  }

  const git = el("a", "tartisma-git");
  git.href = "konu.html?id=" + k.id;
  git.append(document.createTextNode("Tartışmaya git"), el("span", "ok-mini", "→"));
  govde.append(git);
  kutu.append(govde);
  return kutu;
}

/* Forum bağlantısı üretici: yalnız varsayılan-dışı durumlar URL'e yazılır. */
function forumUrl(sayfa, etiket, sirala) {
  const p = new URLSearchParams();
  if (sayfa > 1) p.set("sayfa", sayfa);
  if (etiket) p.set("etiket", etiket);
  if (sirala) p.set("sirala", sirala);
  const q = p.toString();
  return "forum.html" + (q ? "?" + q : "");
}

/* Beğeni tabanlarının toplamı: "En Beğenilen" sıralamasının ölçütü. */
function kalpPuani(k) {
  return k.yorumlar.reduce((t, y) => t + (y.metin.length % 17) + 2, 0);
}

function filtreCubugu(etiketSecimi, siralama) {
  const kutu = el("div", "filtre-cubugu");
  ["", "Tartışma", "Rehber", "Teori"].forEach(e => {
    const cip = el("a", "filtre-cip" + (etiketSecimi === e ? " aktif" : ""), e || "Tümü");
    cip.href = forumUrl(1, e, siralama);
    kutu.append(cip);
  });
  kutu.append(el("span", "filtre-ayrac", "·"));
  [["", "Öne Çıkan"], ["hareketli", "En Hareketli"], ["begenilen", "En Beğenilen"]].forEach(([deger, ad]) => {
    const cip = el("a", "filtre-cip" + (siralama === deger ? " aktif" : ""), ad);
    cip.href = forumUrl(1, etiketSecimi, deger);
    kutu.append(cip);
  });
  return kutu;
}

/* Deterministik "çevrimiçi" sayacı: saate bağlı, herkes aynı sayıyı görür — yalan rastgelelik yok. */
function cevrimiciSayaci() {
  const simdi = new Date();
  const sayi = 28 + (simdi.getHours() * 7 + simdi.getDay() * 5) % 41;
  const p = el("p", "cevrimici");
  p.append(el("span", "canli-nokta"), document.createTextNode(" Şu an " + sayi + " oyuncu meydanda"));
  return p;
}

/* "Yazıyor…" balonu: konudaki gerçek rumuzlardan sırayla; reduced-motion'da hiç başlamaz. */
let yaziyorZamanlayici = null;

function yaziyorBaslat(konu, liste) {
  if (yaziyorZamanlayici) { clearTimeout(yaziyorZamanlayici); yaziyorZamanlayici = null; }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rumuzlar = [...new Set(konu.yorumlar.map(y => y.rumuz))];
  if (!rumuzlar.length) return;
  let tur = 0;
  const dongu = () => {
    const rumuz = rumuzlar[tur % rumuzlar.length];
    tur++;
    const li = el("li", "yorum yaziyor");
    const avatar = el("span", "avatar", rumuz.charAt(0));
    avatar.style.background = avatarRengi(rumuz);
    const balon = el("div", "balon");
    balon.append(el("span", "rumuz", rumuz + " yazıyor"));
    const noktalar = el("span", "yaziyor-noktalar");
    noktalar.append(el("span"), el("span"), el("span"));
    balon.append(noktalar);
    li.append(avatar, balon);
    liste.append(li);
    yaziyorZamanlayici = setTimeout(() => {
      li.remove();
      yaziyorZamanlayici = setTimeout(dongu, 12000 + (tur % 3) * 5000);
    }, 3800);
  };
  yaziyorZamanlayici = setTimeout(dongu, 6000);
}

function okunanlar() {
  const dizi = guvenliOku("yg-okunan", []);
  return new Set(Array.isArray(dizi) ? dizi : []);
}

function sayfalama(sayfaNo, toplamSayfa, etiket, sirala) {
  const kutu = el("nav", "sayfalama");
  kutu.setAttribute("aria-label", "Forum sayfaları");
  const dugme = (hedef, metin) => {
    const a = el("a", "sayfa-dugme", metin);
    if (hedef >= 1 && hedef <= toplamSayfa) {
      a.href = forumUrl(hedef, etiket, sirala);
    } else {
      a.classList.add("pasif");
      a.setAttribute("aria-disabled", "true");
    }
    return a;
  };
  kutu.append(dugme(sayfaNo - 1, "← Önceki sayfa"));
  for (let n = 1; n <= toplamSayfa; n++) {
    const d = dugme(n, String(n));
    if (n === sayfaNo) { d.classList.add("aktif"); d.setAttribute("aria-current", "page"); }
    kutu.append(d);
  }
  kutu.append(dugme(sayfaNo + 1, "Sonraki sayfa →"));
  return kutu;
}

/* Site içi arama: Türkçe küçük harfe çevirerek (İ/ı doğru) oyun + konu tarar. */
function aramaKutusu() {
  const kutu = el("div", "arama");
  const girdi = el("input", "arama-girdi");
  girdi.type = "search";
  girdi.placeholder = "Oyun veya konu ara…";
  girdi.setAttribute("aria-label", "Sitede ara");
  const sonuclar = el("div", "arama-sonuclar");
  girdi.addEventListener("input", () => {
    const s = girdi.value.trim().toLocaleLowerCase("tr");
    sonuclar.textContent = "";
    if (s.length < 2) return;
    const bulunan = [];
    OYUNLAR.forEach(o => {
      if (o.ad.toLocaleLowerCase("tr").includes(s)) bulunan.push({ metin: o.ad + " — inceleme", href: "oyun.html?id=" + o.id });
    });
    tumKonular().forEach(k => {
      if (k.baslik.toLocaleLowerCase("tr").includes(s)) bulunan.push({ metin: k.baslik, href: "konu.html?id=" + k.id });
    });
    /* İpuçlarında da ara — ama spoiler'lar arama sonucuna SIZMAZ. */
    IPUCLARI.forEach(grup => {
      const oyun = OYUNLAR.find(o => o.id === grup.oyunId);
      grup.liste.forEach(ip => {
        if (ip.spoiler) return;
        if (ip.metin.toLocaleLowerCase("tr").includes(s)) {
          bulunan.push({ metin: "💡 " + (oyun ? oyun.ad + ": " : "") + kisalt(ip.metin, 64), href: "ipuclari.html#ipucu-" + grup.oyunId });
        }
      });
    });
    if (!bulunan.length) {
      sonuclar.append(el("p", "arama-bos", "Sonuç yok — belki o görev henüz yazılmadı."));
      return;
    }
    bulunan.slice(0, 8).forEach(b => {
      const a = el("a", null, b.metin);
      a.href = b.href;
      sonuclar.append(a);
    });
  });
  kutu.append(girdi, sonuclar);
  return kutu;
}

/* Yeni konu açma: üyeyse form, değilse üyeliğe davet. Konu localStorage'a yazılır. */
function konuAcPaneli() {
  const kutu = el("div", "konu-ac");
  const uye = uyeGetir();
  if (!uye) {
    const ipucu = el("p", "form-ipucu");
    const git = el("a", null, "Konu açmak için üye ol →");
    git.href = "uye.html";
    ipucu.append(git);
    kutu.append(ipucu);
    return kutu;
  }
  const acButon = el("button", "tartisma-git");
  acButon.type = "button";
  acButon.append(document.createTextNode("Yeni konu aç"), el("span", "ok-mini", "+"));
  const form = el("form", "konu-ac-form gizli");
  const oyunSec = el("select");
  oyunSec.name = "oyun";
  oyunSec.setAttribute("aria-label", "Hangi oyun hakkında");
  OYUNLAR.forEach(o => {
    const secenek = el("option", null, o.ad);
    secenek.value = o.id;
    oyunSec.append(secenek);
  });
  const baslikGirdi = el("input");
  baslikGirdi.name = "baslik"; baslikGirdi.placeholder = "Konu başlığı"; baslikGirdi.required = true; baslikGirdi.maxLength = 90;
  const mesajGirdi = el("textarea");
  mesajGirdi.name = "mesaj"; mesajGirdi.placeholder = "Tartışmayı başlat…"; mesajGirdi.required = true; mesajGirdi.maxLength = 1000;
  const gonder = el("button", null, "Konuyu aç");
  gonder.type = "submit";
  form.append(oyunSec, baslikGirdi, mesajGirdi, gonder);
  acButon.addEventListener("click", () => form.classList.toggle("gizli"));
  form.addEventListener("submit", e => {
    e.preventDefault();
    const yeni = {
      id: "u-" + Date.now(),
      etiket: "Tartışma",
      oyunId: oyunSec.value,
      baslik: baslikGirdi.value.trim(),
      acan: uye.rumuz,
      tarih: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
      mesaj: mesajGirdi.value.trim(),
      yorumlar: []
    };
    if (!yeni.baslik || !yeni.mesaj) {
      formHata(form, "Başlık ve mesaj boş olamaz.");
      return;
    }
    const liste = kullaniciKonulari();
    liste.push(yeni);
    if (!guvenliYaz("yg-konular", JSON.stringify(liste))) {
      formHata(form, "Konu kaydedilemedi — tarayıcı depolaması kapalı ya da dolu olabilir.");
      return;
    }
    location.href = "konu.html?id=" + yeni.id;
  });
  kutu.append(acButon, form);
  return kutu;
}

function kisalt(metin, sinir) {
  return metin.length > sinir ? metin.slice(0, sinir - 1).trimEnd() + "…" : metin;
}

/* ---------- demo üyelik ----------
   Dürüst sahtelik: üyelik yalnızca bu tarayıcının localStorage'ında yaşar,
   sunucuya hiçbir şey gitmez; bu yüzden şifre de İSTEMİYORUZ. */

const AVATAR_RENKLERI = [
  "hsl(8 72% 62%)", "hsl(35 82% 58%)", "hsl(95 45% 55%)", "hsl(160 52% 52%)",
  "hsl(200 68% 58%)", "hsl(231 70% 68%)", "hsl(280 55% 65%)", "hsl(330 65% 65%)"
];

function uyeGetir() {
  /* Şekil denetimi (denetim #5): geçerli-JSON-yanlış-şekil "Merhaba, undefined" üretmesin. */
  const uye = guvenliOku("yg-uye", null);
  return uye && typeof uye.rumuz === "string" && uye.rumuz.trim() ? uye : null;
}

/* ---------- Görev Günlüğü ----------
   Sitenin adının hakkı: her görev, kullanıcının ZATEN bıraktığı localStorage
   izlerinden doğrulanır — ayrı ilerleme kaydı tutulmaz, günlük yalan söyleyemez. */

function anahtarVar(onek, deger) {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(onek) === 0 && (deger === undefined || localStorage.getItem(k) === deger)) return true;
    }
  } catch (e) { /* depolama engelli: görev tamamlanmamış sayılır */ }
  return false;
}

const GOREVLER = [
  { ad: "Aramıza katıl", ipucu: "Bir rumuz seç, rengini kap", kontrol: () => !!uyeGetir() },
  { ad: "Işıkları dene", ipucu: "Gece/gündüz düğmesine bas", kontrol: () => { try { return localStorage.getItem("yg-tema") !== null; } catch (e) { return false; } } },
  { ad: "Meydanda oyunu kullan", ipucu: "Pehlivan anketine katıl", kontrol: () => anahtarVar("yg-anket-") },
  { ad: "Duygunu belli et", ipucu: "Bir yoruma ♥, 🔥 ya da 🧂 bırak", kontrol: () => anahtarVar("yg-begeni-", "1") || anahtarVar("yg-tepki-", "1") },
  { ad: "Sırra bak", ipucu: "İpuçlarında bir spoiler aç", kontrol: () => anahtarVar("yg-spoiler-acildi", "1") },
  { ad: "Beş kavga oku", ipucu: "Beş farklı konuyu ziyaret et", kontrol: () => okunanlar().size >= 5 },
  { ad: "Söze karış", ipucu: "Toplam üç yorum yaz", kontrol: () => uyeYorumSayisi() >= 3 },
  { ad: "Kendi meydanını kur", ipucu: "Bir konu aç", kontrol: () => kullaniciKonulari().length >= 1 }
];

function gorevPaneli() {
  const panel = el("section", "yan-panel gorev-gunlugu js-reveal");
  panel.append(el("p", "yan-baslik", "📜 Görev Günlüğün"));
  let bitti = 0;
  const satirlar = GOREVLER.map(g => {
    let tamam = false;
    try { tamam = !!g.kontrol(); } catch (e) {}
    if (tamam) bitti++;
    const satir = el("div", "gorev" + (tamam ? " tamam" : ""));
    const govde = el("span", "gorev-govde");
    govde.append(el("span", "gorev-ad", g.ad), el("span", "gorev-ipucu", g.ipucu));
    satir.append(el("span", "isaret", tamam ? "✓" : "◇"), govde);
    return satir;
  });
  const cubuk = el("div", "gorev-cubuk");
  const dolgu = el("div", "gorev-dolgu");
  dolgu.style.width = Math.round((bitti / GOREVLER.length) * 100) + "%";
  cubuk.append(dolgu);
  panel.append(
    el("p", "gorev-ozet", bitti + " / " + GOREVLER.length + " görev tamamlandı" + (bitti === GOREVLER.length ? " — meydan senindir! 🏆" : "")),
    cubuk,
    ...satirlar
  );
  return panel;
}

/* Unvan merdiveni: unvan satın alınmaz, yorumla kazanılır. */
function uyeYorumSayisi() {
  return tumKonular().reduce((t, k) => t + kullaniciYorumlari(k.id).length, 0);
}

function uyeUnvani() {
  const n = uyeYorumSayisi();
  if (n >= 10) return "Meydan Efsanesi";
  if (n >= 3) return "Müdavim";
  return "Çaylak";
}

/* Gece/gündüz düğmesi: nav'a JS ile eklenir, tercih localStorage'da yaşar.
   İlk boyamadan önce temayı head'deki tek satırlık betik uygular. */
function temaDugmesiKur() {
  const nav = document.querySelector(".site-header nav");
  if (!nav || document.getElementById("tema-dugme")) return;
  const dugme = el("button", "tema-dugme");
  dugme.id = "tema-dugme";
  dugme.type = "button";
  const ciz = () => {
    const gunduz = document.documentElement.dataset.tema === "gunduz";
    dugme.textContent = gunduz ? "☾" : "☀";
    dugme.setAttribute("aria-label", gunduz ? "Gece moduna geç" : "Gündüz moduna geç");
  };
  dugme.addEventListener("click", () => {
    const yeni = document.documentElement.dataset.tema === "gunduz" ? "gece" : "gunduz";
    /* Denetim #4: görünüm ve düğme ÖNCE tutarlı hale gelir; kalıcılık başarısız
       olsa bile arayüz yarım durumda kalmaz. */
    document.documentElement.dataset.tema = yeni;
    ciz();
    guvenliYaz("yg-tema", yeni);
  });
  ciz();
  /* Tema düğmesi profil simgesinin SOLUNA girer: profil hep en sağda. */
  const profil = document.getElementById("nav-profil");
  if (profil) nav.insertBefore(dugme, profil);
  else nav.append(dugme);
}

/* Bulunulan sayfanın nav başlığı kobaltla işaretlenir. */
function navAktifIsaretle() {
  const sayfa = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-header nav a:not(#nav-profil)").forEach(a => {
    const hedef = (a.getAttribute("href") || "").split("#")[0];
    if (hedef === sayfa) a.classList.add("aktif");
  });
}

/* Sabit, güvenli işaretleme — kullanıcı verisi içermez. */
const PROFIL_SIMGE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.2 4.8-6 8-6s6.5 1.8 8 6"/></svg>';

function uyeNavGuncelle() {
  const dugme = document.getElementById("nav-profil");
  if (!dugme) return;
  const uye = uyeGetir();
  if (uye) {
    /* Girişli: harf-avatar, kendi renginde → profiline gider. */
    dugme.textContent = uye.rumuz.charAt(0);
    dugme.style.background = uye.renk || "";
    dugme.classList.add("girisli");
    dugme.href = "profil.html?rumuz=" + encodeURIComponent(uye.rumuz);
    dugme.setAttribute("aria-label", "Profilin: " + uye.rumuz);
    dugme.title = uye.rumuz;
  } else {
    /* Çıkışlı: kişi simgesi → giriş/üyelik sayfasına gider. */
    dugme.innerHTML = PROFIL_SIMGE;
    dugme.style.background = "";
    dugme.classList.remove("girisli");
    dugme.href = "uye.html";
    dugme.setAttribute("aria-label", "Giriş ve üyelik");
    dugme.title = "Giriş / Üye Ol";
  }
}

function uyeSayfasi() {
  document.title = "Üyelik — Yan Görev";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";
  const uye = uyeGetir();

  const baslik = el("header", "forum-basligi");
  baslik.append(
    el("p", "eyebrow", "Yan Görev · Üyelik"),
    el("h1", null, uye ? "Merhaba, " + uye.rumuz : "Aramıza Katıl"),
    el("p", "alt", uye
      ? "Unvanın: " + uyeUnvani() + " (" + uyeYorumSayisi() + " yorum) — sıradaki basamak yorumla açılır."
      : "Bir rumuz seç, rengini kap, tartışmaya karış.")
  );
  icerik.append(baslik);

  const kart = el("section", "uye-kart");
  const onizleme = el("span", "avatar buyuk", (uye ? uye.rumuz : "?").charAt(0));
  onizleme.style.background = uye ? uye.renk : AVATAR_RENKLERI[5];
  kart.append(onizleme);

  const form = el("form", "uye-form");
  const rumuzInput = el("input");
  rumuzInput.name = "rumuz";
  rumuzInput.placeholder = "Rumuzun";
  rumuzInput.required = true;
  rumuzInput.maxLength = 24;
  rumuzInput.value = uye ? uye.rumuz : "";
  rumuzInput.addEventListener("input", () => {
    onizleme.textContent = (rumuzInput.value.trim() || "?").charAt(0);
  });

  const renkler = el("div", "renkler");
  AVATAR_RENKLERI.forEach((renk, i) => {
    const etiket = el("label", "renk-secenek");
    etiket.style.background = renk;
    etiket.setAttribute("aria-label", "Avatar rengi " + (i + 1));
    const radyo = el("input");
    radyo.type = "radio";
    radyo.name = "renk";
    radyo.value = renk;
    radyo.checked = uye ? uye.renk === renk : i === 5;
    radyo.addEventListener("change", () => { onizleme.style.background = renk; });
    etiket.append(radyo);
    renkler.append(etiket);
  });

  const gonder = el("button", null, uye ? "Profili Güncelle" : "Üye Ol");
  gonder.type = "submit";
  form.append(rumuzInput, renkler, gonder);

  if (uye) {
    const cikis = el("button", "cikis-btn", "Çıkış yap");
    cikis.type = "button";
    cikis.addEventListener("click", () => {
      localStorage.removeItem("yg-uye");
      uyeNavGuncelle();
      uyeSayfasi();
    });
    form.append(cikis);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const rumuz = rumuzInput.value.trim();
    if (!rumuz) {
      formHata(form, "Rumuz boş olamaz.");
      return;
    }
    const secili = form.querySelector("input[name=renk]:checked");
    if (!guvenliYaz("yg-uye", JSON.stringify({ rumuz: rumuz, renk: secili ? secili.value : AVATAR_RENKLERI[5] }))) {
      formHata(form, "Kaydedilemedi — tarayıcı depolaması kapalı ya da dolu olabilir.");
      return;
    }
    uyeNavGuncelle();
    uyeSayfasi();
  });

  kart.append(form);
  kart.append(el("p", "demo-not", "Demo üyelik: bilgin yalnızca bu tarayıcının localStorage'ında saklanır, sunucuya hiçbir şey gönderilmez. Bu yüzden şifre de istemiyoruz."));

  const kolonlar = el("div", "iki-kolon");
  const sol = el("div", "kolon-icerik");
  sol.append(kart);
  const yan = el("aside", "yan-kutu");
  yan.append(gorevPaneli());
  if (uye) {
    const profilPaneli = el("div", "yan-panel");
    profilPaneli.append(el("p", "yan-baslik", "Meydan Geçmişin"));
    const git = el("a", "tartisma-git");
    git.href = "profil.html?rumuz=" + encodeURIComponent(uye.rumuz);
    git.append(document.createTextNode("Profiline git"), el("span", "ok-mini", "→"));
    profilPaneli.append(git);
    yan.append(profilPaneli);
  }
  kolonlar.append(sol, yan);
  icerik.append(kolonlar);
  canlandir();
}

/* ---------- profil sayfası ----------
   Rumuzun tüm izleri: açtığı konular + kurgu ve kullanıcı yorumları,
   veriyi tarayarak derlenir — profil için ayrı kayıt tutulmaz. */
function profilSayfasi() {
  const rumuz = (new URLSearchParams(location.search).get("rumuz") || "").trim();
  document.title = (rumuz || "Profil") + " — Yan Görev";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const uye = uyeGetir();
  const benim = !!(uye && rumuz && uye.rumuz === rumuz);

  const girisler = [];
  let acilanKonu = 0;
  tumKonular().forEach(k => {
    if (k.acan === rumuz) {
      acilanKonu++;
      girisler.push({ konu: k, metin: k.mesaj, tarih: k.tarih, tip: "Konuyu açtı" });
    }
    k.yorumlar.forEach(y => {
      if (y.rumuz === rumuz) girisler.push({ konu: k, metin: y.metin, tarih: y.tarih, tip: "Yorum" });
    });
    kullaniciYorumlari(k.id).forEach(y => {
      if (y.rumuz === rumuz) girisler.push({ konu: k, metin: y.metin, tarih: y.tarih, tip: "Yorum" });
    });
  });
  const yorumSayisi = girisler.length - acilanKonu;

  const baslik = el("header", "forum-basligi profil-basligi");
  const geri = el("a", "geri-izi", "← Foruma dön");
  geri.href = "forum.html";
  baslik.append(geri, el("p", "eyebrow", "Yan Görev · Meydan Sakini"));
  const kimlik = el("div", "profil-kimlik");
  const avatar = el("span", "avatar buyuk", (rumuz || "?").charAt(0));
  avatar.style.background = benim && uye.renk ? uye.renk : avatarRengi(rumuz || "?");
  const adKutu = el("div");
  const h1 = el("h1", null, rumuz || "İsimsiz sakin");
  adKutu.append(h1);
  const rozetSatiri = el("p", "profil-rozetler");
  if (benim) {
    rozetSatiri.append(el("span", "sen", "sen"), el("span", "rozet-mini unvan", uyeUnvani()));
    const duzenle = el("a", "rozet-mini", "profili düzenle");
    duzenle.href = "uye.html";
    rozetSatiri.append(duzenle);
  }
  if (typeof ROZETLER !== "undefined" && ROZETLER[rumuz]) rozetSatiri.append(el("span", "rozet-mini", ROZETLER[rumuz]));
  if (rozetSatiri.childElementCount) adKutu.append(rozetSatiri);
  adKutu.append(el("p", "alt", yorumSayisi + " yorum · " + acilanKonu + " konu"));
  kimlik.append(avatar, adKutu);
  baslik.append(kimlik);
  icerik.append(baslik);

  if (!girisler.length) {
    const bos = el("div", "bos-durum");
    bos.append(el("p", null, "Bu rumuz meydanda henüz iz bırakmamış — belki de sadece okuyor."));
    icerik.append(bos);
    canlandir();
    return;
  }

  const akis = el("div", "profil-akisi");
  girisler.forEach(g => {
    const kutu = el("article", "profil-giris js-reveal");
    const ust = el("p", "giris-ust");
    const konuLink = el("a", null, kisalt(g.konu.baslik, 60));
    konuLink.href = "konu.html?id=" + g.konu.id;
    ust.append(el("span", "etiket-mini", g.tip), konuLink, el("span", "tarih", g.tarih || ""));
    kutu.append(ust, el("p", "giris-metin", g.metin || ""));
    akis.append(kutu);
  });
  icerik.append(akis);
  canlandir();
}

/* ---------- ekip / künye sayfası ---------- */
function ekipSayfasi() {
  document.title = "Ekip ve Künye — Yan Görev";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const baslik = el("header", "forum-basligi");
  baslik.append(
    el("p", "eyebrow", "Yan Görev · Künye"),
    el("h1", null, "Işıkları Yakanlar"),
    el("p", "alt", "Yan Görev'i çıkaran kurgu kadro — footer'daki imzanın yüzleri.")
  );
  icerik.append(baslik);

  const izgara = el("div", "forum-izgara ipucu-izgara");
  EKIP.forEach(kisi => {
    const kart = el("article", "ekip-kart js-reveal");
    const avatar = el("span", "avatar buyuk", kisi.rumuz.charAt(0));
    avatar.style.background = avatarRengi(kisi.rumuz);
    kart.append(avatar);
    const ad = el("p", "konu-oyun");
    const link = el("a", null, kisi.rumuz);
    link.href = "profil.html?rumuz=" + encodeURIComponent(kisi.rumuz);
    ad.append(link, el("span", "tur-etiket", kisi.gorev));
    kart.append(ad, el("p", "ekip-bio", kisi.bio));
    if (kisi.imzalar.length) {
      const imzalar = el("p", "ekip-imzalar");
      imzalar.append(document.createTextNode("İmzası: "));
      kisi.imzalar.forEach((oyunId, i) => {
        const oyun = OYUNLAR.find(o => o.id === oyunId);
        if (!oyun) return;
        if (i > 0) imzalar.append(document.createTextNode(" · "));
        const a = el("a", null, oyun.ad);
        a.href = "oyun.html?id=" + oyun.id;
        imzalar.append(a);
      });
      kart.append(imzalar);
    }
    izgara.append(kart);
  });
  icerik.append(izgara);
  canlandir();
}

/* Günün Tartışması: adaylar arasından ayın gününe göre seçilir — her gün başka alıntı. */
function gununTartismasi() {
  const aday = TARTISMA_ADAYLARI[new Date().getDate() % TARTISMA_ADAYLARI.length];
  const konu = KONULAR.find(k => k.id === aday.konuId);
  const yorum = konu && konu.yorumlar[aday.yorum];
  if (!yorum) {
    console.warn("Günün Tartışması adayı veriyle eşleşmiyor:", aday);
    return null;
  }
  const kutu = el("section", "gunun-tartismasi");
  kutu.append(el("p", "eyebrow", "🔥 Günün Tartışması"));
  kutu.append(el("blockquote", null, "“" + yorum.metin + "”"));
  const alt = el("p", "alt-bilgi");
  alt.append(el("span", "rumuz", yorum.rumuz));
  const git = el("a", null, konu.baslik + " →");
  git.href = "konu.html?id=" + konu.id;
  alt.append(document.createTextNode(" · "), git);
  kutu.append(alt);
  return kutu;
}

/* Görünüme girenleri kademeli belirt; hareket azaltma tercihine saygı duy. */
function canlandir() {
  const hedefler = document.querySelectorAll(".js-reveal:not(.gorunur)");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    hedefler.forEach(n => n.classList.add("gorunur"));
    return;
  }
  const izleyici = new IntersectionObserver(girisler => {
    girisler.forEach(g => {
      if (g.isIntersecting) { g.target.classList.add("gorunur"); izleyici.unobserve(g.target); }
    });
  }, { threshold: 0.12 });
  hedefler.forEach((n, i) => {
    n.style.animationDelay = (i % 6) * 70 + "ms";
    izleyici.observe(n);
  });
}

/* ---------- inceleme sayfası ---------- */

function oyunSayfasi() {
  const oyun = OYUNLAR.find(o => o.id === paramId(OYUNLAR[0].id)) || OYUNLAR[0];
  document.title = oyun.ad + " incelemesi — Yan Görev";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const kapak = el("div", "inceleme-kapak");
  const kapakImg = el("img");
  kapakImg.src = oyun.gorsel;
  kapakImg.alt = oyun.ad + " oyununun tanıtım görseli";
  kapak.append(kapakImg);
  icerik.append(kapak);

  const kolonlar = el("div", "iki-kolon");
  const sol = el("div", "kolon-icerik");

  const baslik = el("header", "inceleme-baslik");
  baslik.append(el("p", "eyebrow", "İnceleme"), el("h1", null, oyun.ad));

  const govde = el("div", "inceleme-govde");
  if (oyun.inceleme.length === 0) {
    govde.append(el("p", null, "Bu incelemenin metni yayına hazırlanıyor — Yan Görev ekibi klavye başında."));
  } else {
    oyun.inceleme.forEach(p => govde.append(el("p", null, p)));
  }
  sol.append(baslik, govde);

  if (oyun.arti.length || oyun.eksi.length) {
    const kutu = el("div", "arti-eksi");
    const arti = el("section", "arti");
    arti.append(el("h2", null, "Artılar"));
    const artiListe = el("ul");
    oyun.arti.forEach(x => artiListe.append(el("li", null, x)));
    arti.append(artiListe);
    const eksi = el("section", "eksi");
    eksi.append(el("h2", null, "Eksiler"));
    const eksiListe = el("ul");
    oyun.eksi.forEach(x => eksiListe.append(el("li", null, x)));
    eksi.append(eksiListe);
    kutu.append(arti, eksi);
    sol.append(kutu);
  }

  kolonlar.append(sol, yanKutuOyun(oyun));
  icerik.append(kolonlar);
  canlandir();
}

/* Sağ yapışkan panel: künye, puan, aksiyonlar ve benzer görevler tek bakışta. */
function yanKutuOyun(oyun) {
  const yan = el("aside", "yan-kutu js-reveal");

  const bilgi = el("div", "yan-panel");
  bilgi.append(puanRozet(oyun.puan));
  const kunye = el("ul", "yan-kunye");
  [["Tür", oyun.tur], ["Stüdyo", oyun.studyo], ["Çıkış", oyun.cikis], ["Platform", oyun.platformlar.join(", ")]]
    .forEach(([ad, deger]) => {
      const li = el("li");
      li.append(el("b", null, ad), document.createTextNode(deger));
      kunye.append(li);
    });
  bilgi.append(kunye);
  const tartis = el("a", "tartisma-git");
  tartis.href = "konu.html?id=" + oyun.konuId;
  tartis.append(document.createTextNode("Tartışmaya git"), el("span", "ok-mini", "→"));
  const rehber = el("a", "yan-baglanti");
  rehber.href = "ipuclari.html#ipucu-" + oyun.id;
  rehber.textContent = "İpuçları rehberine git →";
  bilgi.append(tartis, rehber);
  yan.append(bilgi);

  /* Benzer görevler: önce tür ailesi, boş kalırsa en yüksek puanlılar. */
  const benzerler = OYUNLAR.filter(o => o.id !== oyun.id && o.tur.split(" ")[0] === oyun.tur.split(" ")[0]);
  OYUNLAR.filter(o => o.id !== oyun.id && !benzerler.includes(o))
    .sort((a, b) => b.puan - a.puan)
    .forEach(o => { if (benzerler.length < 3) benzerler.push(o); });
  if (benzerler.length) {
    const panel = el("div", "yan-panel");
    panel.append(el("p", "yan-baslik", "Benzer Görevler"));
    benzerler.slice(0, 3).forEach(o => {
      const satir = el("a", "yan-benzer");
      satir.href = "oyun.html?id=" + o.id;
      satir.append(kapakGorseli(o, "84px"), el("span", "ad", o.ad), el("span", "puan", String(o.puan).replace(".", ",")));
      panel.append(satir);
    });
    yan.append(panel);
  }
  return yan;
}

/* ---------- forum konusu ---------- */

/* Kullanıcının açtığı konular: kurgu KONULAR ile aynı şemada, localStorage'da yaşar. */
function kullaniciKonulari() {
  const liste = guvenliOku("yg-konular", []);
  return Array.isArray(liste) ? liste : [];
}

function tumKonular() { return KONULAR.concat(kullaniciKonulari()); }

function konuOyunu(k) {
  return OYUNLAR.find(o => o.konuId === k.id) || OYUNLAR.find(o => o.id === k.oyunId) || null;
}

function konuSayfasi() {
  const konu = tumKonular().find(k => k.id === paramId(KONULAR[0].id)) || KONULAR[0];
  document.title = konu.baslik + " — Yan Görev Forum";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const baslik = el("header", "konu-baslik");
  const geri = el("a", "geri-izi", "← Foruma dön");
  geri.href = "forum.html";
  baslik.append(
    geri,
    el("p", "eyebrow", "Yan Görev · Forum"),
    el("h1", null, konu.baslik),
    (() => {
      const meta = el("p", "meta");
      const acanLink = el("a", null, konu.acan);
      acanLink.href = "profil.html?rumuz=" + encodeURIComponent(konu.acan);
      meta.append(acanLink, document.createTextNode(" açtı · " + konu.tarih));
      return meta;
    })()
  );

  aktifYanit = null;

  /* Okundu izi: ziyaret edilen konular forumda soluklaşır. */
  const okunan = okunanlar();
  if (!okunan.has(konu.id)) {
    okunan.add(konu.id);
    guvenliYaz("yg-okunan", JSON.stringify([...okunan]));
  }

  const acilis = el("div", "acilis-mesaj");
  acilis.append(el("p", null, konu.mesaj));

  const liste = el("ul", "yorumlar");
  const tumYorumlar = [
    ...konu.yorumlar.map(y => ({ ...y, kullanici: false })),
    ...kullaniciYorumlari(konu.id).map(y => ({ ...y, kullanici: true }))
  ];
  tumYorumlar.forEach((y, i) => liste.append(yorumSatiri(konu.id, y, i)));

  /* Boş ekran davettir: sessiz boşluk yerine yönlendirme. */
  if (!tumYorumlar.length) {
    const bos = el("li", "bos-durum js-reveal");
    bos.append(el("p", null, "Henüz kimse konuşmadı. İlk sözü sen söyle — meydan senin."));
    liste.append(bos);
  }

  const kolonlar = el("div", "iki-kolon");
  const sol = el("div", "kolon-icerik");
  sol.append(baslik, acilis);
  if (konu.anket) sol.append(anketKutusu(konu));
  sol.append(liste, yorumFormu(konu));
  kolonlar.append(sol, yanKutuKonu(konu));
  icerik.append(kolonlar);
  yaziyorBaslat(konu, liste);
  canlandir();
}

/* Konu sayfasının sağ paneli: tartışılan oyunun kartı + başka kavgalar. */
function yanKutuKonu(konu) {
  const yan = el("aside", "yan-kutu js-reveal");
  const oyun = konuOyunu(konu);

  if (oyun) {
    const panel = el("div", "yan-panel");
    const kapak = el("a", "yan-oyun-kapak");
    kapak.href = "oyun.html?id=" + oyun.id;
    kapak.append(kapakGorseli(oyun, "360px"));
    panel.append(kapak);
    const adSatiri = el("p", "yan-oyun-ad");
    adSatiri.append(el("span", null, oyun.ad), puanRozet(oyun.puan));
    panel.append(adSatiri, el("p", "yan-oyun-tur", oyun.tur + " · " + oyun.studyo));
    const oku = el("a", "tartisma-git");
    oku.href = "oyun.html?id=" + oyun.id;
    oku.append(document.createTextNode("İncelemeyi oku"), el("span", "ok-mini", "→"));
    const rehber = el("a", "yan-baglanti");
    rehber.href = "ipuclari.html#ipucu-" + oyun.id;
    rehber.textContent = "İpuçları rehberine git →";
    panel.append(oku, rehber);
    yan.append(panel);
  }

  const digerleri = tumKonular().filter(k => k.id !== konu.id).slice(0, 4);
  if (digerleri.length) {
    const panel = el("div", "yan-panel");
    panel.append(el("p", "yan-baslik", "Başka Kavgalar"));
    digerleri.forEach(k => {
      const satir = el("a", "yan-kavga");
      satir.href = "konu.html?id=" + k.id;
      const toplam = k.yorumlar.length + kullaniciYorumlari(k.id).length;
      satir.append(el("span", "ad", kisalt(k.baslik, 56)), el("span", "sayi", toplam + " yorum"));
      panel.append(satir);
    });
    yan.append(panel);
  }
  return yan;
}

/* Anket: kurgu taban oylar + senin localStorage oyun; çubuklar oy verince dolar. */
function anketKutusu(konu) {
  const kutu = el("section", "anket js-reveal");
  const anahtar = "yg-anket-" + konu.id;
  const govde = el("div");
  kutu.append(el("h2", null, "📊 " + konu.anket.soru), govde);

  const ciz = () => {
    govde.textContent = "";
    /* Denetim #8: bozuk/aralık-dışı oy değeri "seçimsiz kilitli anket" üretmesin. */
    const ham = localStorage.getItem(anahtar);
    let oyum = ham === null ? null : Number(ham);
    if (oyum !== null && !(Number.isInteger(oyum) && oyum >= 0 && oyum < konu.anket.secenekler.length)) {
      try { localStorage.removeItem(anahtar); } catch (e) {}
      oyum = null;
    }
    const oyVerildi = oyum !== null;
    const toplam = konu.anket.secenekler.reduce((t, s) => t + s.taban, 0) + (oyVerildi ? 1 : 0);
    konu.anket.secenekler.forEach((s, i) => {
      const oySayisi = s.taban + (oyVerildi && oyum === i ? 1 : 0);
      const oran = Math.round((oySayisi / toplam) * 100);
      const secenek = el("button", "anket-secenek" + (oyVerildi ? " kilitli" : "") + (oyVerildi && oyum === i ? " secili" : ""));
      secenek.type = "button";
      const dolgu = el("span", "anket-dolgu");
      if (oyVerildi) dolgu.style.width = oran + "%";
      secenek.append(dolgu, el("span", "anket-metin", s.metin), el("span", "anket-oran", oyVerildi ? "%" + oran : ""));
      if (!oyVerildi) secenek.addEventListener("click", () => { localStorage.setItem(anahtar, String(i)); ciz(); });
      govde.append(secenek);
    });
    const alt = el("p", "anket-alt", toplam + " oy" + (oyVerildi ? "" : " · oy vermek için seç"));
    if (oyVerildi) {
      const geriAl = el("button", "anket-geri", "oyunu geri al");
      geriAl.type = "button";
      geriAl.addEventListener("click", () => { localStorage.removeItem(anahtar); ciz(); });
      alt.append(document.createTextNode(" · "), geriAl);
    }
    govde.append(alt);
  };
  ciz();
  return kutu;
}

/* Rumuzdan deterministik pastel renk: aynı kişi her sayfada aynı renkte görünür. */
function avatarRengi(rumuz) {
  let h = 0;
  for (const harf of rumuz) h = (h * 31 + harf.charCodeAt(0)) % 360;
  return "hsl(" + h + " 62% 66%)";
}

function yorumSatiri(konuId, yorum, sira) {
  const li = el("li", "yorum js-reveal" + (yorum.kullanici ? " kullanici" : ""));
  li.id = "yorum-" + konuId + "-" + sira;
  const avatar = el("span", "avatar", (yorum.rumuz || "?").charAt(0));
  const uye = uyeGetir();
  if (!yorum.kullanici) avatar.style.background = avatarRengi(yorum.rumuz || "?");
  else if (uye && uye.renk) avatar.style.background = uye.renk;
  li.append(avatar);
  const balon = el("div", "balon");
  const ust = el("div", "ust");
  const rumuzLink = el("a", "rumuz", yorum.rumuz || "?");
  rumuzLink.href = "profil.html?rumuz=" + encodeURIComponent(yorum.rumuz || "");
  ust.append(rumuzLink, el("span", "tarih", yorum.tarih || ""));
  if (yorum.kullanici) {
    ust.append(el("span", "sen", "sen"), el("span", "rozet-mini unvan", uyeUnvani()));
  } else if (typeof ROZETLER !== "undefined" && ROZETLER[yorum.rumuz]) {
    ust.append(el("span", "rozet-mini", ROZETLER[yorum.rumuz]));
  }
  balon.append(ust);

  /* Gerçek yanıt: kaydedilmiş alıntı kutusu — tıklayınca kaynağa kayar. */
  if (yorum.yanit) {
    const alinti = el("button", "yanit-alinti");
    alinti.type = "button";
    alinti.append(el("span", "rumuz", yorum.yanit.rumuz), el("span", "ozet", kisalt(yorum.yanit.metin, 72)));
    alinti.addEventListener("click", () => {
      const hedefEl = document.getElementById("yorum-" + konuId + "-" + yorum.yanit.hedef);
      if (hedefEl) {
        hedefEl.scrollIntoView({ behavior: "smooth", block: "center" });
        hedefEl.classList.add("vurgula");
        setTimeout(() => hedefEl.classList.remove("vurgula"), 1400);
      }
    });
    balon.append(alinti);
  }
  const escip = (yorum.metin || "").match(/^@([\p{L}\p{N}_]+)/u);
  if (!yorum.yanit && escip) balon.append(el("span", "yanit-cip", "↩ @" + escip[1]));

  balon.append(el("p", null, yorum.metin || ""));

  const altSatir = el("div", "balon-alt");
  altSatir.append(
    tepkiButonu("begeni", "♥", konuId, sira, yorum),
    tepkiButonu("alev", "🔥", konuId, sira, yorum),
    tepkiButonu("tuz", "🧂", konuId, sira, yorum),
    yanitlaButonu(konuId, sira, yorum)
  );
  balon.append(altSatir);
  li.append(balon);
  return li;
}

/* Üç tepki tek fabrikadan çıkar; ♥ eski localStorage anahtarını korur (kayıp beğeni olmaz). */
function tepkiButonu(tur, simge, konuId, sira, yorum) {
  const anahtar = (tur === "begeni" ? "yg-begeni-" : "yg-tepki-" + tur + "-") + konuId + "-" + sira;
  const uzunluk = (yorum.metin || "").length; /* Denetim #9: alansız kayıt sayfayı düşürmesin */
  const tabanlar = {
    begeni: (uzunluk % 17) + 2,
    alev: (uzunluk * 7) % 13,
    tuz: (uzunluk * 3) % 7
  };
  const taban = tabanlar[tur];
  const btn = el("button", "begeni-btn tepki-" + tur);
  btn.type = "button";
  const ciz = () => {
    const acik = localStorage.getItem(anahtar) === "1";
    btn.setAttribute("aria-pressed", acik ? "true" : "false");
    btn.textContent = simge + " " + (taban + (acik ? 1 : 0));
  };
  btn.addEventListener("click", () => {
    const acik = localStorage.getItem(anahtar) === "1";
    localStorage.setItem(anahtar, acik ? "0" : "1");
    ciz();
  });
  ciz();
  return btn;
}

function yanitlaButonu(konuId, sira, yorum) {
  const btn = el("button", "begeni-btn yanitla-btn", "↩ Yanıtla");
  btn.type = "button";
  btn.addEventListener("click", () => {
    aktifYanit = { rumuz: yorum.rumuz, metin: yorum.metin, hedef: sira };
    yanitCubuguGuncelle();
    const alan = document.querySelector(".yorum-form textarea");
    if (alan) { alan.scrollIntoView({ behavior: "smooth", block: "center" }); alan.focus({ preventScroll: true }); }
  });
  return btn;
}

/* Formun üstündeki "şuna yanıt veriyorsun" çubuğu. */
function yanitCubuguGuncelle() {
  const cubuk = document.getElementById("yanit-cubugu");
  if (!cubuk) return;
  cubuk.textContent = "";
  if (!aktifYanit) return;
  const cip = el("span", "yanit-cip");
  cip.append(document.createTextNode("↩ " + aktifYanit.rumuz + "'a yanıt veriyorsun — “" + kisalt(aktifYanit.metin, 46) + "”"));
  const iptal = el("button", "yanit-iptal", "✕");
  iptal.type = "button";
  iptal.setAttribute("aria-label", "Yanıtı iptal et");
  iptal.addEventListener("click", () => { aktifYanit = null; yanitCubuguGuncelle(); });
  cip.append(iptal);
  cubuk.append(cip);
}

/* Form içi hata satırı: sessiz başarısızlık yerine görünür, ekran-okur dostu mesaj. */
function formHata(form, mesaj) {
  let satir = form.querySelector(".form-hata");
  if (!satir) {
    satir = el("p", "form-hata");
    satir.setAttribute("role", "alert");
    form.append(satir);
  }
  satir.textContent = mesaj;
}

function yorumFormu(konu) {
  const uye = uyeGetir();
  const form = el("form", "yorum-form");
  form.id = "yorum-form";
  form.append(el("h2", null, "Söze karış"));

  let rumuz = null;
  if (uye) {
    const kimlik = el("p", "form-kimlik");
    const mini = el("span", "avatar mini", uye.rumuz.charAt(0));
    mini.style.background = uye.renk || AVATAR_RENKLERI[5];
    kimlik.append(mini, document.createTextNode(uye.rumuz + " olarak yazıyorsun"));
    form.append(kimlik);
  } else {
    rumuz = el("input");
    rumuz.name = "rumuz"; rumuz.placeholder = "Rumuzun"; rumuz.required = true; rumuz.maxLength = 24;
    form.append(rumuz);
  }

  const yanitCubugu = el("div");
  yanitCubugu.id = "yanit-cubugu";
  const metin = el("textarea");
  metin.name = "metin"; metin.placeholder = "Yorumunu yaz…"; metin.required = true; metin.maxLength = 1000;
  const gonder = el("button", null, "Gönder");
  gonder.type = "submit";
  form.append(yanitCubugu, metin, gonder);

  if (!uye) {
    const ipucu = el("p", "form-ipucu");
    const git = el("a", null, "Üye olursan rumuzun ve rengin hatırlanır →");
    git.href = "uye.html";
    ipucu.append(git);
    form.append(ipucu);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    /* Denetim #3: boşluk-rumuz sessizce yutulup metni SİLİYORDU — önce doğrula. */
    const kim = uye ? uye.rumuz : rumuz.value.trim();
    const soz = metin.value.trim();
    if (!kim || !soz) {
      formHata(form, "Rumuz ve yorum boş olamaz.");
      return;
    }
    if (!yorumKaydet(konu.id, kim, soz, aktifYanit)) {
      formHata(form, "Yorum kaydedilemedi — tarayıcı depolaması kapalı ya da dolu olabilir.");
      return;
    }
    aktifYanit = null;
    try { konuSayfasi(); } catch (hata) {
      /* Kayıt BAŞARILI; tazeleme çökerse boş sayfa yerine yeniden yükle. */
      console.error(hata);
      location.reload();
    }
  });
  return form;
}

/* ---------- kalıcılık ----------
   🎓 Strateji kararı (B: tek ortak anahtar) yeni ekip arkadaşına ait:
   tüm yorumlar "yg-yorumlar" anahtarında {konuId: [yorumlar]} haritası olarak durur. */

const YORUM_ANAHTARI = "yg-yorumlar";

/* Depolama emniyeti (sessiz-hata denetimi #1-2, #4):
   - Bozuk JSON ASLA üzerine yazılmaz: önce "-bozuk" anahtarına yedeklenir,
     sonra temizlenir — kurtarılabilir veri kaybolmaz.
   - Yazma hataları (kota dolu / depolama engelli) boolean olarak yüzeye çıkar,
     formlar kullanıcıya söyleyebilir. */
function guvenliOku(anahtar, varsayilan) {
  try {
    const ham = localStorage.getItem(anahtar);
    if (ham === null) return varsayilan;
    const deger = JSON.parse(ham);
    return deger === null || deger === undefined ? varsayilan : deger;
  } catch (e) {
    try {
      localStorage.setItem(anahtar + "-bozuk", localStorage.getItem(anahtar));
      localStorage.removeItem(anahtar);
    } catch (e2) { /* depolama tamamen engelli: varsayılana düş */ }
    return varsayilan;
  }
}

function guvenliYaz(anahtar, deger) {
  try { localStorage.setItem(anahtar, deger); return true; } catch (e) { return false; }
}

function yorumKaydet(konuId, rumuz, metin, yanit) {
  if (!rumuz || !metin) return false;
  let hepsi = guvenliOku(YORUM_ANAHTARI, {});
  if (typeof hepsi !== "object" || hepsi === null || Array.isArray(hepsi)) hepsi = {};
  const tarih = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const kayit = { rumuz, tarih, metin };
  /* Alıntı snapshot olarak saklanır: liste ileride değişse de alıntı doğru kalır. */
  if (yanit) kayit.yanit = { rumuz: yanit.rumuz, metin: yanit.metin, hedef: yanit.hedef };
  (hepsi[konuId] = Array.isArray(hepsi[konuId]) ? hepsi[konuId] : []).push(kayit);
  return guvenliYaz(YORUM_ANAHTARI, JSON.stringify(hepsi));
}

function kullaniciYorumlari(konuId) {
  const hepsi = guvenliOku(YORUM_ANAHTARI, {});
  const dizi = hepsi && hepsi[konuId];
  return Array.isArray(dizi) ? dizi : [];
}
