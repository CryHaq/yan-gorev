/* Yan Görev — render motoru ve sahte etkileşim.
   Veri kaynağı: js/data.js (OYUNLAR, KONULAR). Sunucu yok; kalıcılık localStorage. */

document.addEventListener("DOMContentLoaded", sayfayiKur);

function sayfayiKur() {
  const sayfa = location.pathname.split("/").pop() || "index.html";
  if (sayfa === "oyun.html") oyunSayfasi();
  else if (sayfa === "konu.html") konuSayfasi();
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
  const hero = el("section", "hero");
  const heroGorsel = el("img", "hero-gorsel");
  heroGorsel.src = manset.gorsel;
  heroGorsel.alt = manset.ad + " oyununun tanıtım görseli";
  const heroIcerik = el("div", "hero-icerik");
  heroIcerik.append(el("p", "eyebrow", "Ana Görev · Haftanın İncelemesi"));
  const h1 = el("h1");
  const h1a = el("a", null, manset.ad);
  h1a.href = "oyun.html?id=" + manset.id;
  h1.append(h1a);
  heroIcerik.append(h1, el("p", "ozet", manset.ozet));
  hero.append(heroGorsel, puanRozet(manset.puan), heroIcerik);

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
  icerik.append(hero, incelemeBaslik, grid, forumBaslik, liste);
  canlandir();
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
  if (!yorum.kullanici) avatar.style.background = avatarRengi(yorum.rumuz || "?");
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
  const form = el("form", "yorum-form");
  form.id = "yorum-form";
  form.append(el("h2", null, "Söze karış"));
  const rumuz = el("input");
  rumuz.name = "rumuz"; rumuz.placeholder = "Rumuzun"; rumuz.required = true; rumuz.maxLength = 24;
  const metin = el("textarea");
  metin.name = "metin"; metin.placeholder = "Yorumunu yaz…"; metin.required = true; metin.maxLength = 1000;
  const gonder = el("button", null, "Gönder");
  gonder.type = "submit";
  form.append(rumuz, metin, gonder);
  form.addEventListener("submit", e => {
    e.preventDefault();
    yorumKaydet(konu.id, rumuz.value.trim(), metin.value.trim());
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
