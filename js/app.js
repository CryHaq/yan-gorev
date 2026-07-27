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
  if (sayfa === "oyun.html") oyunSayfasi();
  else if (sayfa === "konu.html") konuSayfasi();
  else if (sayfa === "forum.html") forumSayfasi();
  else if (sayfa === "ipuclari.html") ipuclariSayfasi();
  else if (sayfa === "uye.html") uyeSayfasi();
  else anaSayfa();
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
  if (adayIpucu && adayOyun) {
    const manset = el("article", "ipucu-kart forum-one-cikan js-reveal");
    const mansetKapak = el("a", "konu-kapak");
    mansetKapak.href = "oyun.html?id=" + adayOyun.id;
    mansetKapak.setAttribute("aria-label", adayOyun.ad + " incelemesine git");
    mansetKapak.append(kapakGorseli(adayOyun, "(max-width: 640px) 100vw, 480px"));
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
    mansetGit.append(document.createTextNode("Bu ipucunu tartış"), el("span", "ok-mini", "→"));
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
        const ac = () => li.classList.add("acik");
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
    git.append(document.createTextNode("Bu ipuçlarını tartış"), el("span", "ok-mini", "→"));
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

/* Kart görselleri: 720px orta varyant varsayılan, retina/geniş için tam boy srcset. */
function kapakGorseli(oyun, boyutlar) {
  const img = el("img");
  const orta = oyun.gorsel.replace("img/", "img/orta/");
  img.src = orta;
  img.srcset = orta + " 720w, " + oyun.gorsel + " 1400w";
  img.sizes = boyutlar;
  img.alt = oyun.ad + " oyununun görseli";
  img.loading = "lazy";
  return img;
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

  const heroGorsel = el("img", "hero-gorsel");
  heroGorsel.src = manset.gorsel;
  heroGorsel.alt = manset.ad + " oyununun tanıtım görseli";
  hero.append(heroGorsel);

  /* Video varsa görselin üzerine biner; hareket azaltma tercihinde hiç eklenmez. */
  if (manset.video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    hero.append(video);
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
  /* Son aktivite şeridi: bugünün konularının son sözleri, kurgu zaman damgalarıyla. */
  const aktivite = el("div", "aktivite js-reveal");
  const sureler = ["az önce", "4 dk önce", "11 dk önce"];
  tumKonular().filter(k => k.tarih === "27 Temmuz 2026" && k.yorumlar.length).slice(0, 3).forEach((k, i) => {
    const son = k.yorumlar[k.yorumlar.length - 1];
    const satir = el("p", "aktivite-satiri");
    const git = el("a", null, kisalt(k.baslik, 46));
    git.href = "konu.html?id=" + k.id;
    satir.append(
      el("span", "canli-nokta"),
      el("b", null, " " + son.rumuz),
      document.createTextNode(" " + (sureler[i] || "bugün") + " yazdı → "),
      git
    );
    aktivite.append(satir);
  });

  const tumForum = el("a", "forum-cta", "Forumun tamamı: büyük başlıklar, büyük kavgalar →");
  tumForum.href = "forum.html";
  icerik.append(hero, incelemeBaslik, grid, forumBaslik, liste, aktivite, tumForum);
  canlandir();
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
    kapak.append(kapakGorseli(oyun, oneCikan ? "(max-width: 640px) 100vw, 480px" : "(max-width: 640px) 100vw, 346px"));
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
  try { return new Set(JSON.parse(localStorage.getItem("yg-okunan")) || []); } catch (e) { return new Set(); }
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
    const liste = kullaniciKonulari();
    liste.push(yeni);
    localStorage.setItem("yg-konular", JSON.stringify(liste));
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
  try { return JSON.parse(localStorage.getItem("yg-uye")) || null; } catch (e) { return null; }
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
    document.documentElement.dataset.tema = yeni;
    localStorage.setItem("yg-tema", yeni);
    ciz();
  });
  ciz();
  nav.append(dugme);
}

/* Bulunulan sayfanın nav başlığı kobaltla işaretlenir. */
function navAktifIsaretle() {
  const sayfa = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-header nav a:not(#nav-uye)").forEach(a => {
    const hedef = (a.getAttribute("href") || "").split("#")[0];
    if (hedef === sayfa) a.classList.add("aktif");
  });
}

function uyeNavGuncelle() {
  const nav = document.getElementById("nav-uye");
  if (!nav) return;
  const uye = uyeGetir();
  nav.textContent = uye ? uye.rumuz : "Üye Ol";
  nav.classList.toggle("girisli", !!uye);
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
    if (!rumuz) return;
    const secili = form.querySelector("input[name=renk]:checked");
    localStorage.setItem("yg-uye", JSON.stringify({ rumuz: rumuz, renk: secili ? secili.value : AVATAR_RENKLERI[5] }));
    uyeNavGuncelle();
    uyeSayfasi();
  });

  kart.append(form);
  kart.append(el("p", "demo-not", "Demo üyelik: bilgin yalnızca bu tarayıcının localStorage'ında saklanır, sunucuya hiçbir şey gönderilmez. Bu yüzden şifre de istemiyoruz."));
  icerik.append(kart);
}

/* Günün Tartışması: adaylar arasından ayın gününe göre seçilir — her gün başka alıntı. */
function gununTartismasi() {
  const aday = TARTISMA_ADAYLARI[new Date().getDate() % TARTISMA_ADAYLARI.length];
  const konu = KONULAR.find(k => k.id === aday.konuId);
  const yorum = konu && konu.yorumlar[aday.yorum];
  if (!yorum) return null;
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
  tartis.append(document.createTextNode("Forumda tartış"), el("span", "ok-mini", "→"));
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
  try { return JSON.parse(localStorage.getItem("yg-konular")) || []; } catch (e) { return []; }
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
  baslik.append(
    el("p", "eyebrow", "Yan Görev · Forum"),
    el("h1", null, konu.baslik),
    el("p", "meta", konu.acan + " açtı · " + konu.tarih)
  );

  aktifYanit = null;

  /* Okundu izi: ziyaret edilen konular forumda soluklaşır. */
  const okunan = okunanlar();
  if (!okunan.has(konu.id)) {
    okunan.add(konu.id);
    localStorage.setItem("yg-okunan", JSON.stringify([...okunan]));
  }

  const acilis = el("div", "acilis-mesaj");
  acilis.append(el("p", null, konu.mesaj));

  const liste = el("ul", "yorumlar");
  const tumYorumlar = [
    ...konu.yorumlar.map(y => ({ ...y, kullanici: false })),
    ...kullaniciYorumlari(konu.id).map(y => ({ ...y, kullanici: true }))
  ];
  tumYorumlar.forEach((y, i) => liste.append(yorumSatiri(konu.id, y, i)));

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
    const oyum = localStorage.getItem(anahtar);
    const oyVerildi = oyum !== null;
    const toplam = konu.anket.secenekler.reduce((t, s) => t + s.taban, 0) + (oyVerildi ? 1 : 0);
    konu.anket.secenekler.forEach((s, i) => {
      const oySayisi = s.taban + (oyVerildi && Number(oyum) === i ? 1 : 0);
      const oran = Math.round((oySayisi / toplam) * 100);
      const secenek = el("button", "anket-secenek" + (oyVerildi ? " kilitli" : "") + (oyVerildi && Number(oyum) === i ? " secili" : ""));
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
  ust.append(el("span", "rumuz", yorum.rumuz), el("span", "tarih", yorum.tarih));
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

  balon.append(el("p", null, yorum.metin));

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
  const tabanlar = {
    begeni: (yorum.metin.length % 17) + 2,
    alev: (yorum.metin.length * 7) % 13,
    tuz: (yorum.metin.length * 3) % 7
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
    yorumKaydet(konu.id, uye ? uye.rumuz : rumuz.value.trim(), metin.value.trim(), aktifYanit);
    aktifYanit = null;
    konuSayfasi(); // listeyi tazele
  });
  return form;
}

/* ---------- kalıcılık ----------
   🎓 Strateji kararı (B: tek ortak anahtar) yeni ekip arkadaşına ait:
   tüm yorumlar "yg-yorumlar" anahtarında {konuId: [yorumlar]} haritası olarak durur. */

const YORUM_ANAHTARI = "yg-yorumlar";

function yorumKaydet(konuId, rumuz, metin, yanit) {
  if (!rumuz || !metin) return;
  const hepsi = JSON.parse(localStorage.getItem(YORUM_ANAHTARI) || "{}");
  const tarih = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const kayit = { rumuz, tarih, metin };
  /* Alıntı snapshot olarak saklanır: liste ileride değişse de alıntı doğru kalır. */
  if (yanit) kayit.yanit = { rumuz: yanit.rumuz, metin: yanit.metin, hedef: yanit.hedef };
  (hepsi[konuId] = hepsi[konuId] || []).push(kayit);
  localStorage.setItem(YORUM_ANAHTARI, JSON.stringify(hepsi));
}

function kullaniciYorumlari(konuId) {
  const hepsi = JSON.parse(localStorage.getItem(YORUM_ANAHTARI) || "{}");
  return hepsi[konuId] || [];
}
