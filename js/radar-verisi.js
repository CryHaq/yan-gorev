/* Radar — GERÇEK DÜNYA verisi. Kurgu evrenin tek istisnası, ayrı sayfada yaşar.
   Kaynak: Steam ISteamChartsService + mağaza API (28 Temmuz 2026 anlık görüntüsü).
   Görseller/videolar Steam CDN'inden ve YouTube resmî gömme yoluyla atıfla gösterilir.
   "tanim" ve "not" metinleri Yan Görev'in KENDİ cümleleridir (mağaza metni kopyalanmaz). */
const RADAR = {
  guncelleme: "28 Temmuz 2026",
  oyunlar: [
    {
      sira: 1, appid: 730, ad: "Counter-Strike 2", gelistirici: "Valve", cikis: "2012 · CS2: 2023", tur: "Taktiksel Nişancı", zirve: 1275982,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/256972298/movie480.mp4" },
      tanim: "Valve'ın efsanevi 5'e 5 taktiksel nişancısının Source 2 motoruyla yeniden inşa edilmiş hâli: bomba kurma-çözme ekseninde ekonomi yönetimi, harita bilgisi ve refleksin buluştuğu e-spor standardı.",
      not: "Radar'ın zirvesinde olması sürpriz değil: yirmi yılı aşkındır aynı beş saniyelik düellonun daha adilini arayan bir oyun bu. Öğrenmesi acımasız, bırakması imkânsız."
    },
    {
      sira: 2, appid: 578080, ad: "PUBG: BATTLEGROUNDS", gelistirici: "PUBG Corporation", cikis: "2017", tur: "Battle Royale", zirve: 732248,
      video: { yt: "wRfo2dDtoMI" },
      tanim: "Yüz oyuncunun tek adada, sürekli daralan güvenli bölgeye sıkıştığı battle royale türünün kurucularından: yağma, konumlanma ve son çember sinir harbi.",
      not: "Tür ne kadar kalabalıklaşırsa kalabalıklaşsın PUBG'nin gerginliği kendine has kaldı: sessiz on dakika, kalp krizi gibi on saniye."
    },
    {
      sira: 3, appid: 570, ad: "Dota 2", gelistirici: "Valve", cikis: "2013", tur: "MOBA", zirve: 635321,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/256692021/movie480.mp4" },
      tanim: "Valve'ın MOBA devi: 5'e 5, yüzü aşkın kahraman ve her maçı satranç derinliğine taşıyan ekonomi-harita kontrolü dengesi.",
      not: "Öğrenme eğrisi dik bir uçurum; ama zirvesindeki strateji derinliğine bugün bile hiçbir rakip tam yaklaşamadı."
    },
    {
      sira: 5, appid: 1172470, ad: "Apex Legends", gelistirici: "Respawn", cikis: "2019 · Steam: 2020", tur: "Kahraman Battle Royale", zirve: 284062,
      video: { yt: "innmNewjkuk" },
      tanim: "Respawn'un kahraman tabanlı battle royale'i: üç kişilik takımlar, kayıp-tırmanarak akan hareket sistemi ve karakter yeteneklerinin takım oyununa örüldüğü hızlı düellolar.",
      not: "Türün en iyi hareket hissi hâlâ burada; iyi bir takımla oynandığında nişancıdan çok dans gibi."
    },
    {
      sira: 6, appid: 2868840, ad: "Slay the Spire 2", gelistirici: "Mega Crit", cikis: "2026 (Erken Erişim)", tur: "Deste Kurmalı Roguelike", zirve: 196023,
      video: { yt: "ttVtllHkb4E" },
      tanim: "Deste kurmalı roguelike türünü doğuran Mega Crit'in devam oyunu: her tırmanışta desteni yeniden inşa ediyor, her ölümde biraz daha akıllanıyorsun.",
      not: "İlk oyun bir türün atasıydı; ikincisi erken erişimde bile aynı laneti taşıyor: 'son bir el' diye diye sabah oluyor."
    },
    {
      sira: 7, appid: 3241660, ad: "R.E.P.O.", gelistirici: "semiwork", cikis: "2025 (Erken Erişim)", tur: "Kooperatif Korku", zirve: 94560,
      video: { yt: "0ais4U7UX14" },
      tanim: "semiwork'ün kooperatif korku-ekstraksiyonu: arkadaşlarınla değerli eşyaları toplayıp fizik motorunun insafında sağ salim dışarı çıkarmaya çalışıyorsun.",
      not: "Viral olmasının sırrı korkudan çok kahkaha üretmesi — özellikle mikrofonlar açıkken. Az bileşenle çok eğlence dersi."
    },
    {
      sira: 8, appid: 271590, ad: "Grand Theft Auto V Legacy", gelistirici: "Rockstar North", cikis: "2013 · PC: 2015", tur: "Açık Dünya Aksiyon", zirve: 98540,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/257109786/movie480.mp4" },
      tanim: "Rockstar'ın üç kahramanlı Los Santos destanı; çevrimiçi dünyasıyla on yılı aşkındır büyümeye devam eden açık dünya ölçütü.",
      not: "Hâlâ Radar'da olması oyunun yaşlandığını değil, Los Santos'un yaşlanmadığını gösteriyor."
    },
    {
      sira: 10, appid: 322170, ad: "Geometry Dash", gelistirici: "RobTop Games", cikis: "2014", tur: "Ritim Platform", zirve: 68410,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/2036304/movie480.mp4" },
      tanim: "RobTop'un tek dokunuşlu ritim-platform oyunu: müzikle senkron engellerden milimetrik zamanlamayla geçiyorsun; topluluk editörü sayesinde seviye arzı bitmiyor.",
      not: "On yıldır listelerden düşmüyor, çünkü 'bir deneme daha' hissinin en saf, en damıtılmış hâli."
    },
    {
      sira: 11, appid: 236390, ad: "War Thunder", gelistirici: "Gaijin Entertainment", cikis: "2013", tur: "Askeri MMO", zirve: 88336,
      video: { yt: "miVz9nsMYEw" },
      tanim: "Tankı, uçağı ve gemisiyle kombine muharebe MMO'su: gerçekçi balistik ve zırh modellemesiyle oynanabilir bir tarihî araç ansiklopedisi.",
      not: "Sabır isteyen bir derinlik; karşılığı, başka hiçbir oyunda olmayan kombine muharebe hissi."
    },
    {
      sira: 12, appid: 359550, ad: "Tom Clancy's Rainbow Six Siege", gelistirici: "Ubisoft Montreal", cikis: "2015", tur: "Taktiksel Nişancı", zirve: 81259,
      video: { yt: "2TLbT4FTlNQ" },
      tanim: "Operatör tabanlı taktiksel nişancı: yıkılabilir duvarlar, gadget zekâsı ve saniyelik bilgi savaşının kuşatma düellosu.",
      not: "On yıla yaklaşan e-spor ömrünü duvar deliklerine borçlu: her turda haritanın kendisi yeniden yazılıyor."
    }
  ]
};
