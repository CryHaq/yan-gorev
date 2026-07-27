/* Yan Görev — render motoru ve sahte etkileşim.
   Veri kaynağı: js/data.js (OYUNLAR, KONULAR). Sunucu yok; kalıcılık localStorage. */

document.addEventListener("DOMContentLoaded", sayfayiKur);

function sayfayiKur() {
  temaDugmesiKur();
  uyeNavGuncelle();
  const sayfa = location.pathname.split("/").pop() || "index.html";
  if (sayfa === "oyun.html") oyunSayfasi();
  else if (sayfa === "konu.html") konuSayfasi();
  else if (sayfa === "forum.html") forumSayfasi();
  else if (sayfa === "uye.html") uyeSayfasi();
  else anaSayfa();
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
    const kapakImg = el("img");
    kapakImg.src = o.gorsel;
    kapakImg.alt = o.ad + " oyununun tanıtım görseli";
    kapakImg.loading = "lazy";
    kapak.append(kapakImg);
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
  KONULAR.forEach(k => {
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
  icerik.append(hero, incelemeBaslik, grid, forumBaslik, liste, tumForum);
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
    el("p", "alt", "Oyun biter, sohbet başlar. Kurgu topluluğumuzun meydanı.")
  );
  icerik.append(baslik);

  /* En çok yorum alan konu manşete çıkar — kullanıcı yorumları da sayılır,
     yani topluluk yazdıkça manşet gerçekten el değiştirebilir. */
  const veriler = KONULAR.map(k => ({
    konu: k,
    oyun: OYUNLAR.find(o => o.konuId === k.id),
    toplam: k.yorumlar.length + kullaniciYorumlari(k.id).length
  }));
  const oneCikan = veriler.reduce((a, b) => (b.toplam > a.toplam ? b : a));
  icerik.append(konuKarti(oneCikan, true));

  const izgara = el("div", "forum-izgara");
  veriler.filter(v => v !== oneCikan).forEach(v => izgara.append(konuKarti(v, false)));
  icerik.append(izgara);
  canlandir();
}

function konuKarti(veri, oneCikan) {
  const k = veri.konu, oyun = veri.oyun;
  const kutu = el("article", (oneCikan ? "forum-konu forum-one-cikan" : "forum-konu dikey") + " js-reveal");

  if (oyun) {
    const kapak = el("a", "konu-kapak");
    kapak.href = "oyun.html?id=" + oyun.id;
    kapak.setAttribute("aria-label", oyun.ad + " incelemesine git");
    const img = el("img");
    img.src = oyun.gorsel;
    img.alt = oyun.ad + " oyununun görseli";
    img.loading = "lazy";
    kapak.append(img);
    kutu.append(kapak);
  }

  const govde = el("div", "konu-govde");
  if (oneCikan) govde.append(el("p", "one-cikan-eyebrow", "🔥 Günün En Çok Tartışılanı"));
  if (oyun) {
    const oyunSatiri = el("p", "konu-oyun");
    const oyunLink = el("a", null, oyun.ad);
    oyunLink.href = "oyun.html?id=" + oyun.id;
    oyunSatiri.append(oyunLink, el("span", "tur-etiket", oyun.tur));
    govde.append(oyunSatiri);
  }
  const h2 = el("h2", "konu-alt-baslik");
  const a = el("a", null, k.baslik);
  a.href = "konu.html?id=" + k.id;
  h2.append(a);
  govde.append(h2);
  govde.append(el("p", "meta", k.acan + " açtı · " + k.tarih + " · " + veri.toplam + " yorum"));
  govde.append(el("p", "onizleme", k.mesaj));
  const kullaniciSon = kullaniciYorumlari(k.id).slice(-1)[0];
  const son = kullaniciSon || k.yorumlar[k.yorumlar.length - 1];
  if (son) {
    const sonEl = el("p", "son-mesaj");
    sonEl.append(el("span", "rumuz", "Son söz — " + son.rumuz + ": "), document.createTextNode(kisalt(son.metin, oneCikan ? 140 : 80)));
    govde.append(sonEl);
  }
  kutu.append(govde);
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
    el("p", "alt", uye ? "Profilini buradan güncelleyebilirsin." : "Bir rumuz seç, rengini kap, tartışmaya karış.")
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

  const baslik = el("header", "inceleme-baslik");
  baslik.append(el("p", "eyebrow", "İnceleme"), el("h1", null, oyun.ad), puanRozet(oyun.puan));
  const kunye = el("ul", "kunye");
  [["Tür", oyun.tur], ["Stüdyo", oyun.studyo], ["Çıkış", oyun.cikis], ["Platform", oyun.platformlar.join(", ")]]
    .forEach(([ad, deger]) => {
      const li = el("li");
      li.append(el("b", null, ad + ": "), document.createTextNode(deger));
      kunye.append(li);
    });
  baslik.append(kunye);

  const govde = el("div", "inceleme-govde");
  if (oyun.inceleme.length === 0) {
    govde.append(el("p", null, "Bu incelemenin metni yayına hazırlanıyor — Yan Görev ekibi klavye başında."));
  } else {
    oyun.inceleme.forEach(p => govde.append(el("p", null, p)));
  }

  icerik.append(baslik, govde);

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
    icerik.append(kutu);
  }

  const cta = el("a", "forum-cta", "Bu oyunu forumda tartış →");
  cta.href = "konu.html?id=" + oyun.konuId;
  icerik.append(cta);
  canlandir();
}

/* ---------- forum konusu ---------- */

function konuSayfasi() {
  const konu = KONULAR.find(k => k.id === paramId(KONULAR[0].id)) || KONULAR[0];
  document.title = konu.baslik + " — Yan Görev Forum";
  const icerik = document.getElementById("icerik");
  icerik.textContent = "";

  const baslik = el("header", "konu-baslik");
  baslik.append(
    el("p", "eyebrow", "Yan Görev · Forum"),
    el("h1", null, konu.baslik),
    el("p", "meta", konu.acan + " açtı · " + konu.tarih)
  );

  const acilis = el("div", "acilis-mesaj");
  acilis.append(el("p", null, konu.mesaj));

  const liste = el("ul", "yorumlar");
  const tumYorumlar = [
    ...konu.yorumlar.map(y => ({ ...y, kullanici: false })),
    ...kullaniciYorumlari(konu.id).map(y => ({ ...y, kullanici: true }))
  ];
  tumYorumlar.forEach((y, i) => liste.append(yorumSatiri(konu.id, y, i)));

  icerik.append(baslik, acilis, liste, yorumFormu(konu));
  canlandir();
}

/* Rumuzdan deterministik pastel renk: aynı kişi her sayfada aynı renkte görünür. */
function avatarRengi(rumuz) {
  let h = 0;
  for (const harf of rumuz) h = (h * 31 + harf.charCodeAt(0)) % 360;
  return "hsl(" + h + " 62% 66%)";
}

function yorumSatiri(konuId, yorum, sira) {
  const li = el("li", "yorum js-reveal" + (yorum.kullanici ? " kullanici" : ""));
  const avatar = el("span", "avatar", (yorum.rumuz || "?").charAt(0));
  const uye = uyeGetir();
  if (!yorum.kullanici) avatar.style.background = avatarRengi(yorum.rumuz || "?");
  else if (uye && uye.renk) avatar.style.background = uye.renk;
  li.append(avatar);
  const balon = el("div", "balon");
  const ust = el("div", "ust");
  ust.append(el("span", "rumuz", yorum.rumuz), el("span", "tarih", yorum.tarih));
  if (yorum.kullanici) ust.append(el("span", "sen", "sen"));
  balon.append(ust);
  const yanit = (yorum.metin || "").match(/^@([\p{L}\p{N}_]+)/u);
  if (yanit) balon.append(el("span", "yanit-cip", "↩ @" + yanit[1]));
  balon.append(el("p", null, yorum.metin), begeniButonu(konuId, sira, yorum));
  li.append(balon);
  return li;
}

function begeniButonu(konuId, sira, yorum) {
  const anahtar = "yg-begeni-" + konuId + "-" + sira;
  /* Deterministik kurgu taban: sayaçlar canlı görünsün ama her yüklemede aynı kalsın. */
  const taban = (yorum.metin.length % 17) + 2;
  const btn = el("button", "begeni-btn");
  btn.type = "button";
  const ciz = () => {
    const acik = localStorage.getItem(anahtar) === "1";
    btn.setAttribute("aria-pressed", acik ? "true" : "false");
    btn.textContent = "♥ " + (taban + (acik ? 1 : 0));
  };
  btn.addEventListener("click", () => {
    const acik = localStorage.getItem(anahtar) === "1";
    localStorage.setItem(anahtar, acik ? "0" : "1");
    ciz();
  });
  ciz();
  return btn;
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

  const metin = el("textarea");
  metin.name = "metin"; metin.placeholder = "Yorumunu yaz…"; metin.required = true; metin.maxLength = 1000;
  const gonder = el("button", null, "Gönder");
  gonder.type = "submit";
  form.append(metin, gonder);

  if (!uye) {
    const ipucu = el("p", "form-ipucu");
    const git = el("a", null, "Üye olursan rumuzun ve rengin hatırlanır →");
    git.href = "uye.html";
    ipucu.append(git);
    form.append(ipucu);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    yorumKaydet(konu.id, uye ? uye.rumuz : rumuz.value.trim(), metin.value.trim());
    konuSayfasi(); // listeyi tazele
  });
  return form;
}

/* ---------- kalıcılık ----------
   🎓 Strateji kararı (B: tek ortak anahtar) yeni ekip arkadaşına ait:
   tüm yorumlar "yg-yorumlar" anahtarında {konuId: [yorumlar]} haritası olarak durur. */

const YORUM_ANAHTARI = "yg-yorumlar";

function yorumKaydet(konuId, rumuz, metin) {
  if (!rumuz || !metin) return;
  const hepsi = JSON.parse(localStorage.getItem(YORUM_ANAHTARI) || "{}");
  const tarih = new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  (hepsi[konuId] = hepsi[konuId] || []).push({ rumuz, tarih, metin });
  localStorage.setItem(YORUM_ANAHTARI, JSON.stringify(hepsi));
}

function kullaniciYorumlari(konuId) {
  const hepsi = JSON.parse(localStorage.getItem(YORUM_ANAHTARI) || "{}");
  return hepsi[konuId] || [];
}
