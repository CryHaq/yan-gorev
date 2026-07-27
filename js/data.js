/* Yan Görev — kurgu veri. Tüm oyunlar, stüdyolar ve kullanıcılar hayal ürünüdür. */

const OYUNLAR = [
  {
    id: "kul-ve-fener",
    gorsel: "img/kul-ve-fener.jpg",
    video: "video/hero-fener.mp4",
    ad: "Kül ve Fener",
    tur: "Aksiyon-Macera",
    studyo: "Karakutu Interactive",
    cikis: "Mart 2026",
    platformlar: ["PC", "Konsol"],
    puan: 9.1,
    ozet: "Sönmüş bir deniz fenerini yeniden yakmak için hatıralarını takas ettiğin, sisli ve unutulmaz bir macera.",
    manset: true,
    inceleme: [
      "Kül ve Fener, daha açılış sahnesinde niyetini belli ediyor: burası hızın değil, ağırlığın oyunu. Terk edilmiş bir kıyı kasabasına fener bekçisi olarak atanıyorsunuz; tek görev tanımınız, kırk yıldır yanmayan feneri yeniden yakmak. Ama fenerin yakıtı gaz değil — hatıra. Her bölümde kendi geçmişinizden bir parçayı ışığa dönüştürüyorsunuz ve oyun, neyi unutmayı göze aldığınızı size gerçekten sorduruyor.",
      "Karakutu Interactive'in ışık-gölge bulmacaları türün son yıllardaki en zekice tasarımları. Fenerin döner ışığını aynalarla kasabanın sokaklarına taşıyor, gölgede kalan geçmiş sahnelerini aydınlatarak keşfediyorsunuz. Hiçbir bulmaca çözümünü size söylemiyor; ama hiçbirinde de haksızlığa uğramış hissetmiyorsunuz. Bu denge, kâğıt üstünde kolay, pratikte nadirdir.",
      "Kasabanın sakinleri — hepsi birer siluet, hepsi yarım bir cümleyle konuşuyor — oyunun asıl yükünü taşıyor. Kimin gerçek, kimin sizin unuttuğunuz biri olduğunu oyun sonuna dek kestiremiyorsunuz. Müzik ise ayrı bir başyapıt: dalga sesiyle akordeon arasında gidip gelen tema, jenerikten günler sonra bile akılda kalıyor.",
      "Kusursuz değil. Son bölüm, ilk iki perdenin sabrını gösteremeden aceleyle kapanıyor ve bazı hatıra takaslarının sonucu yeterince hissedilmiyor. Yine de Kül ve Fener, bu yılın en cesur büyük yapımı; ışığı söndüğünde bile içinizde yanmaya devam ediyor."
    ],
    arti: ["Işık/gölge bulmacalarının zekâsı", "Hatıra takası fikrinin oyuna gerçekten işlemesi", "Müzik ve ses tasarımı", "Sis içinde bile yön duygusu veren sanat yönetimi"],
    eksi: ["Son bölümün aceleci temposu", "Bazı hatıra seçimlerinin sonuçsuz kalması"],
    konuId: "kul-ve-fener-final"
  },
  {
    id: "gece-vardiyasi",
    gorsel: "img/gece-vardiyasi.jpg",
    ad: "Gece Vardiyası",
    tur: "Korku / Simülasyon",
    studyo: "Uykusuz Oyun",
    cikis: "Ocak 2026",
    platformlar: ["PC"],
    puan: 7.8,
    ozet: "Sabaha karşı üçte kasada sen varsın, raflarda ise olmaması gereken şeyler.",
    manset: false,
    inceleme: [
      "Gece Vardiyası basit bir vaatle açılıyor: 24 saat açık bir marketin gece kasiyerisiniz, vardiya sekizde başlıyor, altıda bitiyor. İlk gece gerçekten de sadece kasa fişi kesiyor, raf diziyor, yerleri siliyorsunuz. Oyunun dehşeti, bu sıkıcılığı ciddiye almasında: rutine o kadar alışıyorsunuz ki ikinci gece rafta bir ürünün size dönük durduğunu fark ettiğinizde elleriniz gerçekten soğuyor.",
      "Uykusuz Oyun, korkuyu bağırarak değil fısıldayarak kuruyor. Kamera sabit, müzik neredeyse yok; tek silahınız market spikerinin bozuk anonsları ve buzdolabı uğultusu. Müşteriler — gecenin o saatinde market gezen herkes gibi — tuhaf ama nazik. Hangisinin insan olmadığını anlamaya çalışmak, oyunun en iyi mini oyunu.",
      "Sorun, formülün beşinci geceden sonra kendini tekrar etmesi. Korku tırmanacağına yatay ilerliyor ve envanter-temizlik döngüsü sonlara doğru angaryaya dönüşüyor. Üç farklı son da yeterince ayrışmıyor.",
      "Yine de Gece Vardiyası, bir mikro bütçeyle atmosferin nasıl kurulacağının ders kitabı. Kulaklıkla, ışıklar kapalı, tek oturuşta bitirin — sabah marketten ekmek alırken rafları eskisi gibi görmeyeceksiniz."
    ],
    arti: ["Fısıltıyla kurulan korku atmosferi", "Rutin-tuhaflık dengesi", "Ses tasarımının cimriliğinin isabeti"],
    eksi: ["Beşinci geceden sonra tekrar hissi", "Sonların birbirine fazla benzemesi"],
    konuId: "gece-vardiyasi-ipuclari"
  },
  {
    id: "pas-ve-pervane",
    gorsel: "img/pas-ve-pervane.jpg",
    ad: "Pas ve Pervane",
    tur: "Zanaat / Keşif",
    studyo: "Tersane Dijital",
    cikis: "Kasım 2025",
    platformlar: ["PC", "Konsol", "El Konsolu"],
    puan: 8.4,
    ozet: "Hurdalıkta bulduğun mekanik bir leyleği parça parça onarıp gökyüzünü geri kazanıyorsun.",
    manset: false,
    inceleme: [
      "Pas ve Pervane'nin dünyasında gökyüzü yasak değil, sadece unutulmuş. Rüzgârın durduğu bir vadide, hurdalıkta paslanmış mekanik bir leylek buluyorsunuz; oyunun tamamı bu kuşu yeniden uçurma çabanız. Her kanat çubuğu, her dişli, vadinin başka bir köşesinden sökülüp getiriliyor — ve her parçanın eski sahibiyle küçük bir hikâyesi var.",
      "Zanaat sistemi, tür ortalamasının aksine menülerde değil ellerinizde yaşıyor. Parçaları gerçekten hizalıyor, perçinliyor, yağlıyorsunuz; beceriksizce taktığınız bir pervane uçuşta gerçekten titriyor. Bu dokunsallık, her onarımı küçük bir ritüele çeviriyor.",
      "Uçuş ise oyunun hediyesi. İlk yükselişte vadiyi yukarıdan gördüğünüz an, türün son yıllardaki en saf sevinç anlarından biri. Rüzgâr akımlarını okuyarak süzülmek, mekanik kanatların gıcırtısıyla birleşince tuhaf bir huzur veriyor.",
      "Eksikler yok değil: hikâyenin orta kısmı fazla sessiz ilerliyor ve bazı parça arayışları belirgin işaretleme olmadığı için gereksiz uzuyor. Ama Tersane Dijital'in bu ilk oyunu, 'küçük ekip, büyük gönül' kategorisinin yeni ölçütü."
    ],
    arti: ["Dokunsal onarım sistemi", "İlk uçuş anının büyüsü", "Parçaların kendi mikro hikâyeleri"],
    eksi: ["Orta bölümün sessizliği", "İşaretsiz parça arayışlarının uzaması"],
    konuId: "pas-ve-pervane-rotalar"
  },
  {
    id: "son-otobus",
    gorsel: "img/son-otobus.jpg",
    ad: "Son Otobüs",
    tur: "Anlatı",
    studyo: "Peron İşleri",
    cikis: "Eylül 2025",
    platformlar: ["PC", "Mobil"],
    puan: 6.9,
    ozet: "Gece yarısı kalkan şehirlerarası bir otobüste yedi yolcu, yedi hikâye ve inmek zorunda olduğun bir durak.",
    manset: false,
    inceleme: [
      "Son Otobüs, tek mekânda geçen bir anlatı oyunundan bekleneni önce fazlasıyla veriyor: gece yarısı kalkan bir şehirlerarası otobüs, camda yağmur, koltuklarda birbirine yabancı yedi yolcu. Siz koridorda ilerledikçe sohbetlere kulak misafiri oluyor, kimin yanına oturacağınızı seçiyorsunuz — ve her seçim, birinin hikâyesini açarken diğerininkini sonsuza dek kapatıyor.",
      "Yazı işçiliği yer yer gerçekten parlıyor. Emekli öğretmenin bavulundaki mektup ve asker uğurlamasından dönen babanın sessizliği, türün iyi örneklerinde bile az rastlanır bir incelikle yazılmış. Türkçe yerelleştirme değil, doğrudan Türkçe düşünülmüş diyaloglar okumak da ayrı bir keyif.",
      "Ne yazık ki yapı, yazının gerisinde kalıyor. Yedi hikâyenin ancak üçü doyurucu bir sona bağlanıyor; ikinci oynayışta tekrar eden ara sahneler atlanamıyor ve iki saatlik oyun, dört sonu görmek isteyince kendini altı saat gibi hissettiriyor.",
      "Son Otobüs, güzel anları olan ama toplamı parçalarından küçük kalan bir yolculuk. İndirimde denemesi kolay; yolun hakkını en çok, tek oynayışla yetinip otobüsten kendi durağında inenler alacak."
    ],
    arti: ["Doğrudan Türkçe düşünülmüş diyaloglar", "Koltuk seçiminin gerçek bedeli"],
    eksi: ["Yedi hikâyenin dördünün havada kalması", "Atlanamayan tekrar sahneleri", "Kısa içeriğe rağmen uzatılmış yapı"],
    konuId: "son-otobus-sonlar"
  },
  {
    id: "bahcivan-krali",
    gorsel: "img/bahcivan-krali.jpg",
    ad: "Bahçıvan Kralı",
    tur: "Strateji / Şehir Kurma",
    studyo: "Yeşim Stüdyo",
    cikis: "Mayıs 2026",
    platformlar: ["PC"],
    puan: 8.8,
    ozet: "Taht odası yerine sera: krallığını ordularla değil, aşı kalemi ve sabırla büyütüyorsun.",
    manset: false,
    inceleme: [
      "Bahçıvan Kralı'nın açılış cümlesi tüm oyunu özetliyor: 'Babanız size bir ordu bıraktı; siz bir bahçe istediniz.' Savaşan komşu krallıkların ortasında, fethetmek yerine yeşertmek zorunda olduğunuz bir avuç toprakla başlıyorsunuz. Diplomasinin para birimi çiçek soğanı, ordunuz arı kovanları, surlarınız gül çitleri.",
      "Strateji katmanı görünenden çok daha dişli. Her bitkinin mevsimi, toprağı ve komşusu var; yanlış planlanan bir sera, üç mevsim sonra kıtlığa dönüşüyor. Yeşim Stüdyo, 'rahatlatıcı görünüp derinden hesap soran' dengeyi Anadolu bozkırından ödünç motiflerle süsleyerek kurmuş — nazar boncuklu korkuluklar birim değil ama moral aurası veriyor, ki bu bile tasarım zekâsının göstergesi.",
      "Komşu krallıkların yağma akınları, oyunun en tartışmalı sistemi. Savunmanız tamamen pasif: çitler, kokular, arılar. İlk akında çaresiz hissetmek tasarımın niyeti; ama bazı oyuncular için bu çaresizlik huzur bozucu olabilir. Biz cephesinde, kaybedilen her tarhın yeniden ekilmesindeki inat, oyunun asıl mesajı gibi okundu.",
      "Elli saatlik kayıttan sonra hâlâ açılmamış tohum sandıklarımız var. Bahçıvan Kralı, yılın en zarif strateji oyunu; sesi yükseltmeden derdini anlatan nadir yapımlardan."
    ],
    arti: ["Fethetmeden büyüme fikrinin sistemlere gerçekten işlemesi", "Mevsim-toprak-komşu üçlüsünün derinliği", "Anadolu motiflerinin süs değil sistem olarak kullanımı"],
    eksi: ["Pasif savunmanın herkese göre olmaması", "Arayüzün ilk saatlerdeki kalabalığı"],
    konuId: "bahcivan-krali-taktik"
  },
  {
    id: "derin-uyku",
    gorsel: "img/derin-uyku.jpg",
    ad: "Derin Uyku",
    tur: "Bilimkurgu / Keşif",
    studyo: "Mercan Yazılım",
    cikis: "Haziran 2026",
    platformlar: ["PC", "Konsol"],
    puan: 8.2,
    ozet: "Uyuyan bir uzay kolonisinin ortak rüyasına dalıp, kimsenin hatırlamak istemediği şeyi bulman gerekiyor.",
    manset: false,
    /* 🎓 Bu inceleme yeni ekip arkadaşıyla birlikte yazıldı (Task 5, Katkı #2). */
    inceleme: [
      "Derin Uyku'nun evreninde insanlığın son gemisi yüz on iki yolcusuyla yıldızlara doğru süzülürken herkes uyuyor — ve hepsi aynı rüyayı görüyor. Siz, koloninin 'dalgıç'ı olarak bu ortak rüyaya inip geminin unutmaya çalıştığı şeyi bulmakla görevlisiniz. Mercan Yazılım'ın ilk büyük yapımı, daha ilk dalışta belli ediyor: burası bir korku oyunu değil; unutmanın da bir mühendislik olduğu, hüzünlü bir bilimkurgu.",
      "Rüya katmanlarında yalnız değilsiniz: kolonistlerin rüyada başıboş kalmış kopyaları — yüzleri silinmiş, koridorlarda sürüyle gezinen 'uyurgezerler' — oyunun en gerilimli anlarını taşıyor. Onlardan kaçarken kullandığınız dalış mekanikleri ve rüya fiziği kusursuz ayarlanmış; görsel tarafta ise Mercan Yazılım, suyla uzayın karıştığı katmanlarda gerçekten büyüleyici işler çıkarmış.",
      "Ne var ki hikâye aynı özeni her yerde gösteremiyor: bazı ipuçları hiçbir yere bağlanmıyor, orta bölümde kim olduğunuz sorusu askıda bırakılıyor. Revirdeki fazladan uyku kapsülü gibi ustaca ekilmiş sırlar bile, finale gelindiğinde hak ettikleri cevabı tam alamıyor.",
      "Yine de dibe inmeyi göze alanları büyük bir ödül bekliyor: cevaplarını kolay vermeyen, ritmini aceleye getirmeyen bir dalış bu. Derin Uyku, sabırlı oyuncular için kaçırılmaz."
    ],
    arti: ["Dalış mekanikleri ve rüya fiziğinin ayarı", "Su ile uzayın karıştığı görsel katmanlar", "Uyurgezerlerin sessiz gerilimi"],
    eksi: ["Hiçbir yere bağlanmayan ipuçları", "Orta bölümde askıda kalan kimlik sorusu"],
    konuId: "derin-uyku-teoriler"
  },
  {
    id: "vites",
    gorsel: "img/vites.jpg",
    ad: "Vites",
    tur: "Yarış / Arcade",
    studyo: "Şanzıman Interactive",
    cikis: "Nisan 2026",
    platformlar: ["PC", "Konsol"],
    puan: 8.5,
    ozet: "Karayel'in yağmurlu gece yollarında, polis telsizinin cızırtısı eşliğinde vites küçültüp virajlara yatıyorsun.",
    manset: false,
    inceleme: [
      "Vites, ilk beş dakikada ne olduğunu söylüyor: kontak, yağmur, gece ve arkanızda kalan şehir ışıkları. Kurgu liman kenti Karayel'in çevre yollarında geçen bu arcade yarış oyunu, simülasyon ciddiyetine hiç öykünmüyor — el freni bir enstrüman, bariyerler ise öneriden ibaret.",
      "Sürüş hissi türün son yıllardaki en iyisi. Islak asfaltta arka teker kayarken direksiyonun toparlanma anı öyle iyi ayarlanmış ki her viraj küçük bir alkış gibi. Polis kovalamacalarında telsiz cızırtısından rakip devriyelerin rotasını kestirmek, oyunun en zekice dokunuşu.",
      "Müzik ayrı bir karakter: sentezle bağlama arasında gidip gelen gece radyosu, hız düştükçe yavaşlıyor, drift'te bas gömülüyor. Karayel'in mahalleleri arasında radyo istasyonu değişince şehrin ruh hali de değişiyor.",
      "Kusur, ilerleme sisteminde: lastik ve yakıt ekonomisi orta oyunda belirgin bir tekrara zorluyor, aynı üç kovalamaca şablonu sık dönüyor. Yine de Vites, gaz pedalına her bastığınızda yüzünüzü güldüren, nadir 'bir tur daha' oyunlarından."
    ],
    arti: ["Drift ve toparlanma hissinin ayarı", "Telsizle rota kestirme fikri", "Gece radyosunun dinamik müziği"],
    eksi: ["Orta oyunda ilerleme tekrara bağlıyor", "Kovalamaca şablonlarının azlığı"],
    konuId: "vites-kestirmeler"
  },
  {
    id: "hoyuk",
    gorsel: "img/hoyuk.jpg",
    ad: "Höyük",
    tur: "Bulmaca / Keşif",
    studyo: "Katman Yapım",
    cikis: "Şubat 2026",
    platformlar: ["PC", "Mobil"],
    puan: 8.9,
    ozet: "Bir fırça, bir defter ve dört bin yıllık bir tepe: kazdıkça uygarlık değil, kendi ailenin izleri çıkıyor.",
    manset: false,
    inceleme: [
      "Höyük'te aceleye yer yok. Dedenizden kalan tozlu bir kazı defteriyle Anadolu'da kurgu bir tepeye geliyorsunuz; elinizde fırça, mala ve bitmeyen bir sabır. Her katman bir çağ, her çağ bir bulmaca — ve defterdeki el yazısı, kazdıkça sizin aile tarihinize doğru kıvrılıyor.",
      "Oyunun kalbi mühür alfabesi. Kırık tabletlerdeki işaretleri karşılaştırıp anlam çıkarıyor, çözdüğünüz her kelimeyle hem uygarlığın hem hikâyenin bir odasını açıyorsunuz. Kimse size doğrulama vermiyor; bir çevirinin oturduğunu, sonraki tabletin birden anlam kazanmasından anlıyorsunuz. Bu güven, türde eşine az rastlanır bir tasarım cesareti.",
      "Görsel dil, sıcak toprak tonları ve gün doğumu ışığıyla adeta meditasyon. Fırça sesleri, uzaktan gelen guguk kuşu ve rüzgâr — Katman Yapım, 'sessiz oyun' yapmanın ders kitabını yazmış.",
      "Mobil tarafta hassas fırça kontrolleri zaman zaman inatlaşıyor ve son perdenin duygusal vuruşu biraz erken haber veriliyor. Ama Höyük, bu yılın en zarif bulmaca oyunu; toprağın altından çıkan şeyin en çok kendiniz olduğu ender yapımlardan."
    ],
    arti: ["Mühür alfabesinin doğrulamasız çözüm güveni", "Katman katman anlatılan aile hikâyesi", "Ses ve ışık tasarımının dinginliği"],
    eksi: ["Mobilde fırça hassasiyeti", "Finalin kendini erken belli etmesi"],
    konuId: "hoyuk-muhurler"
  },
  {
    id: "meydan",
    gorsel: "img/meydan.jpg",
    ad: "Meydan",
    tur: "Çevrimiçi Arena",
    studyo: "Meydan Oyun Kolektifi",
    cikis: "Erken Erişim",
    platformlar: ["PC"],
    puan: 7.4,
    ozet: "Üçe üç kadim meydan güreşi + unsur büyüsü: muhteşem anlar, kaotik denge yamaları.",
    manset: false,
    inceleme: [
      "Meydan'ın fikri kâğıt üstünde bile heyecan verici: antik bir taş meydanda, yağlı güreş geleneğiyle unsur büyüsünü birleştiren üçe üç takım kapışmaları. Kispetli bir devle rüzgâr okuyucusunu aynı takımda görmek ilk başta absürt geliyor; üç maç sonra 'başka türlüsü nasıl olurdu' diyorsunuz.",
      "Çekirdek döngü gerçekten parlak. Tutuş-fırlatma sistemi, büyü iptalleriyle örülünce her kapışma küçük bir satranç hamlesine dönüyor; iyi bir peşrev, iyi bir ekip sözleşmesi kadar değerli. Ağ kodu da erken erişim standardının üstünde — yenilgide bahane bulamıyorsunuz, ki bu forumda görüleceği üzere herkesi memnun etmiyor.",
      "Sorun, dengede. Kolektif, yama notlarını cesur yazıyor ama 1.7'de olduğu gibi bir karakteri bir gecede baş tacından yedek kulübesine gönderebiliyor. Yeni başlayan eğrisi de dik: ilk on saatinizde meydana değil, tahtaya bakıyorsunuz.",
      "Meydan bugün 7,4'lük bir oyun; ama bir gün dengesini bulursa, buradaki tavan 9'ların işi. Şimdilik: arkadaşlarınızla girin, yalnız girecekseniz kalın derinizi de getirin."
    ],
    arti: ["Tutuş + büyü iptalinin taktik derinliği", "Erken erişime göre sağlam ağ kodu", "Takım kimyasının gerçekten hissedilmesi"],
    eksi: ["Yamalarla savrulan denge", "Dik öğrenme eğrisi", "Tek başına eşleşmenin acımasızlığı"],
    konuId: "meydan-denge"
  },
  {
    id: "ocakbasi",
    gorsel: "img/ocakbasi.jpg",
    ad: "Ocakbaşı",
    tur: "Kooperatif / Parti",
    studyo: "Közhane Interactive",
    cikis: "Temmuz 2026",
    platformlar: ["PC", "Konsol"],
    puan: 8.0,
    ozet: "Dört arkadaş, bir ocakbaşı, sonsuz sipariş: dostluğunuzun gerçek testi mangal dumanında.",
    manset: false,
    inceleme: [
      "Ocakbaşı'nın önermesi tek cümle: dört kişilik bir ocakbaşı lokantasını batırmadan sabahı edin. Biri şişleri diziyor, biri közün başında ter döküyor, biri servis koşturuyor, biri bulaşığa gömülüyor — ve üç dakika sonra herkes aynı anda bağırıyor. Közhane Interactive, 'arkadaşlıkla stres testi' türüne Türk mutfağının ritmini getirmiş.",
      "Sistemler basit ama acımasız: köz düşerse şiş yanar, şiş yanarsa müşteri gider, müşteri giderse akşamın sonunda dükkânın kirası çıkmaz. En zekice dokunuş közün gerçek bir kaynak olması — közü canlı tutmak başlı başına bir görev ve 'köz kimde' kavgası, oyunun gayriresmî beşinci oyuncusu.",
      "Seslendirme ve mizah tam yerinde: müşterilerin sabırsız tıklamaları, ustanın dükkân kapanınca söylediği yorgun türkü, cam buğusuna yazılan skorlar. Tek kişilik mod da var ama bu oyun kalabalıkla, tercihen aynı kanepede oynanmak için yapılmış.",
      "Sekizinci akşamdan sonra sipariş çeşitliliği inceliyor ve bazı haritalarda servis yolu haksız derecede dar. Ama Ocakbaşı, yılın en samimi kooperatif oyunu: kavga ettiriyor, güldürüyor, bir tur daha dedirtiyor."
    ],
    arti: ["Közün gerçek kaynak olarak işlenmesi", "Kanepe kooperatifinin kaotik keyfi", "Ses ve mizah ayarı"],
    eksi: ["Sipariş çeşitliliğinin geç oyunda incelmesi", "Bazı haritalarda dar servis yolu"],
    konuId: "ocakbasi-gorev-dagilimi"
  }
];

const KONULAR = [
  {
    id: "kul-ve-fener-final",
    baslik: "Kül ve Fener'in finali hakkında (spoiler)",
    acan: "fenerbekcisi",
    tarih: "24 Temmuz 2026",
    mesaj: "Dün gece bitirdim ve hâlâ toparlanamadım. Feneri yakmak için EN son hatırayı verdiğinizde kasabanın tepkisi bende şöyle oldu: herkes silüetten gerçek insana döndü ama bekçi kulübesindeki fotoğraf boş kaldı. Sizde de öyle mi, yoksa hangi hatıraları verdiğinize göre değişiyor mu?",
    yorumlar: [
      { rumuz: "pikselavcisi", tarih: "24 Temmuz 2026", metin: "Bende fotoğraf boş değildi ama çerçeve kırıktı. Sanırım müzik kutusu hatırasını tutmana göre değişiyor; ben onu hiç vermedim." },
      { rumuz: "sisli_liman", tarih: "24 Temmuz 2026", metin: "Üç kez bitirdim, üçünde de farklıydı. İkinci oynayışta feneri hiç yakmadan da jenerik alabiliyorsunuz, kasaba karanlıkta kalıyor ama kimse gitmiyor. Bence asıl son o." },
      { rumuz: "notdefteri", tarih: "25 Temmuz 2026", metin: "Karanlık sonu ben de aldım ve bana kötü son gibi gelmedi. Oyunun derdi zaten 'ışık kimin için' sorusu değil mi? Kasabalı ışıksız da kalabiliyorsa fener bekçiye hediye." },
      { rumuz: "koltukaltikumanda", tarih: "25 Temmuz 2026", metin: "Siz finali konuşurken ben hâlâ üçüncü bölümdeki ayna bulmacasındayım, kimse bir şey söylemesin lütfen. Sadece şunu sorayım: akordeoncu adam önemli mi?" },
      { rumuz: "fenerbekcisi", tarih: "25 Temmuz 2026", metin: "@koltukaltikumanda önemli demeyeyim ama akordeonun SUSTUĞU yerleri not al. Sonra bana teşekkür edersin." }
    ]
  },
  {
    id: "gece-vardiyasi-ipuclari",
    baslik: "Gece Vardiyası — hangi müşteri insan değil? (ipucu derlemesi)",
    acan: "gecegezen",
    tarih: "19 Temmuz 2026",
    mesaj: "Topluluk olarak bir liste yapalım dedim. Kesinleşen ipuçları: (1) İnsan olmayanlar hiç nakit kullanmıyor. (2) Buzdolabı uğultusu yaklaştıklarında inceliyor. (3) Fiş koparken yırtılma sesi gelmiyorsa kasadaki sensin ama müşteri değil. Başka?",
    yorumlar: [
      { rumuz: "kasiyer_umut", tarih: "19 Temmuz 2026", metin: "Dördüncü gece sakız reyonuna bakan kadın: alışveriş sepeti boştu ama poşet istedi. Poşet isteyip sepeti boş olan herkesten şüphelenin." },
      { rumuz: "uykusuz42", tarih: "20 Temmuz 2026", metin: "Uğultu ipucu her zaman tutmuyor, buzdolabının motoru zaten aralıklı çalışıyor. Ben anons sistemine güveniyorum: isim anonsu yapılan müşteri o an markette DEĞİLSE, birazdan gelecek demektir." },
      { rumuz: "gecegezen", tarih: "20 Temmuz 2026", metin: "@uykusuz42 doğru, uğultuyu listeden düşürüyorum. Anons teorisi üç gecedir bende de tutuyor." },
      { rumuz: "rafduzenleyici", tarih: "21 Temmuz 2026", metin: "Kimse konuşmuyor ama: mop kovasındaki su hiç kirlenmiyorsa o gece kimse gelmeyecek demektir. Paranoya mı bilmiyorum, üç kez denk geldi." },
      { rumuz: "sonmusteri", tarih: "22 Temmuz 2026", metin: "En garantisi göz teması. İnsan olanlar kasada gözünüze bakmıyor, herkes gibi. Bakanlar... neyse. İyi vardiyalar." }
    ]
  },
  {
    id: "pas-ve-pervane-rotalar",
    baslik: "Pas ve Pervane: vadideki gizli rüzgâr akımları (rota paylaşımı)",
    acan: "tamirci_aysel",
    tarih: "12 Temmuz 2026",
    mesaj: "Değirmen tepesinden kalkıp TEK süzülüşle kuzey şelalesine ulaşan var mı? Haritada üç termal görüyorum ama ikincisine geldiğimde irtifa hep yetmiyor. Kanat konfigürasyonum: geniş çubuk + keten kaplama + çift yağlama.",
    yorumlar: [
      { rumuz: "vadi_postasi", tarih: "12 Temmuz 2026", metin: "Keten kaplama orada seni yavaşlatıyor, şelale rotası için muşamba şart. Ağır ama termalde daha çok yükseliyorsun, matematiği ters çalışıyor." },
      { rumuz: "percinci", tarih: "13 Temmuz 2026", metin: "İkinci termali unutun. Değirmenden çıkınca dümdüz göl üstüne inin, su üstünde alçak uçuş yapınca leylek 'balıkçı modu'na geçiyor ve kanat çırpma bedava. Oradan şelaleye tek hamle." },
      { rumuz: "tamirci_aysel", tarih: "13 Temmuz 2026", metin: "@percinci balıkçı modu?? 40 saattir oynuyorum, bunu nereden öğrendin? Denedim ve OLUYOR. Bu oyun dipsiz kuyu." },
      { rumuz: "hurdaci_baba", tarih: "14 Temmuz 2026", metin: "Balıkçı modunun bir üstü var: gölde alçak uçarken pervaneyi durdurun. Leylek kendi kendine süzülüyor ve gıcırtı kesiliyor. Oyunun en huzurlu 20 saniyesi." }
    ]
  },
  {
    id: "son-otobus-sonlar",
    baslik: "Son Otobüs'ün dört sonu — sıralama ve tartışma",
    acan: "peron9",
    tarih: "5 Temmuz 2026",
    mesaj: "Dört sonu da gördüm, kişisel sıralamam: Şoförle kalan son > öğretmenin durağı > hiç inmeme sonu > kendi durağın. 'Kendi durağın' sonunun bu kadar düz olması yazık olmuş, oyunun adı oradan geliyor sonuçta. Sizin sıralamanız?",
    yorumlar: [
      { rumuz: "camkenari", tarih: "5 Temmuz 2026", metin: "Hiç inmeme sonunu küçümsemişsin. Otobüs garaja girerken şoförün aynadan bakışı bence oyunun en iyi tek karesi." },
      { rumuz: "bavul", tarih: "6 Temmuz 2026", metin: "Öğretmenin durağı açık ara birinci. Mektubu okuMAdan inersen farklı bir sahne var, biliyor muydunuz? İkinci oynayışa değen tek şey o sahne." },
      { rumuz: "peron9", tarih: "6 Temmuz 2026", metin: "@bavul bilmiyordum ve şimdi üçüncü kez açmam gerekecek. Atlanamayan sahnelerle... Neyse. Oyun bunu hak ediyor mu, orası tartışılır ama merak kazandı." },
      { rumuz: "gececi", tarih: "7 Temmuz 2026", metin: "Bence dördü de aynı sonun makyajlı halleri. Bu oyunda son değil yol önemliydi zaten — asker babasının sessizliği sahnesini dört sona da değişmem." }
    ]
  },
  {
    id: "bahcivan-krali-taktik",
    baslik: "Bahçıvan Kralı: ilk kış için tarh dizilimi (yeni başlayan rehberi)",
    acan: "cimenbicen",
    tarih: "15 Temmuz 2026",
    mesaj: "Yeni başlayanlar ilk kışta topluca krallığı batırıyor (ben dahil, iki kez). Öğrendiklerim: lavantayı gül çitinin İÇİNE değil dışına dizin, arılar önce çite uğrasın. Soğan ambarını seranın kuzeyine koyun, güneşi kesmesin. Ve ne olursa olsun ilk yıl komşuya tohum borçlanMAyın. Ekleyin.",
    yorumlar: [
      { rumuz: "serasever", tarih: "15 Temmuz 2026", metin: "Tohum borcu tuzağına düşen biri olarak imzalıyorum. İkinci bahar geldiğinde faiz olarak nadide fide istiyorlar ve vermeyince akın moral bonusuyla geliyor." },
      { rumuz: "nazarlik", tarih: "16 Temmuz 2026", metin: "Korkulukları köşelere değil patika kesişimlerine dikin. Moral aurası yolda yürüyen köylüye işliyor, boş köşeye değil. Bunu 30 saat sonra fark ettim." },
      { rumuz: "kislikelma", tarih: "16 Temmuz 2026", metin: "İlk kış için en önemlisi bence şu: her tarhın yanına bir 'boş' tarh bırakın. İlkbaharda oraya ne ekeceğinizi kış boyunca planlamak oyunun asıl keyfi zaten." },
      { rumuz: "cimenbicen", tarih: "17 Temmuz 2026", metin: "@kislikelma buna 'nadas felsefesi' diyorum ve rehberin başına ekliyorum. Bu oyunun forumu bile huzur veriyor." },
      { rumuz: "gulbudayan", tarih: "18 Temmuz 2026", metin: "Kimse söylememiş: kraliyet serasındaki eski taht var ya — satmayın. Sonbahar güncellemesinde ne işe yaradığını söylemeyeceğim ama satmayın." }
    ]
  },
  {
    id: "derin-uyku-teoriler",
    baslik: "Derin Uyku teorileri: koloni gerçekten uyuyor mu?",
    acan: "derindalgic",
    tarih: "22 Temmuz 2026",
    mesaj: "Oyunu bitirenlerle konuşmak istiyorum. Rüya katmanlarında aşağı indikçe tarih ileri gidiyor, fark eden oldu mu? Üçüncü katmandaki takvim, koloninin kalkış tarihinden SONRASINI gösteriyor. Bence biz uyuyanı uyandırmıyoruz; uyanık birini uyutmaya çalışıyoruz.",
    yorumlar: [
      { rumuz: "reveri", tarih: "22 Temmuz 2026", metin: "Takvimi ben de gördüm ama tersini düşündüm: rüyada zaman ileri akıyorsa, koloni çoktan varmış ve biz yolculuğu rüyasında yeniden görüyoruz olabilir mi?" },
      { rumuz: "kapsul7", tarih: "23 Temmuz 2026", metin: "İkinize de katılmıyorum. Revirdeki boş uyku kapsülünü sayan var mı? Mürettebat listesi 112 kişi, kapsül 113 tane. Fazla kapsül kimin?" },
      { rumuz: "derindalgic", tarih: "23 Temmuz 2026", metin: "@kapsul7 ...oyunu tekrar açıyorum. Eğer 113. kapsül bizim karakterinse bu her şeyi değiştirir." },
      { rumuz: "sayiklama", tarih: "24 Temmuz 2026", metin: "Bu başlığı okumadan önce oyun hakkında hiçbir teorim yoktu, şimdi uyuyamıyorum. Yan Görev incelemesi ne zaman geliyor, merakla bekliyorum." }
    ]
  },
  {
    id: "vites-kestirmeler",
    baslik: "Vites: Karayel'in gizli kestirmeleri (harita paylaşımı)",
    acan: "elfreni",
    tarih: "26 Temmuz 2026",
    mesaj: "Liman turundaki rekoru kırmak istiyorsanız yazıyorum: tersane kapısındaki bariyer 23:00'ten sonra AÇIK. Vinçlerin altından geçen yol sizi doğrudan gümrük rampasına çıkarıyor, düz yoldan tam dört saniye kazandırıyor. Başka bilen var mı benzer yerleri?",
    yorumlar: [
      { rumuz: "karayelli", tarih: "26 Temmuz 2026", metin: "Tersaneyi herkes öğrendiğinden beri devriye orada bekliyor, haberin olsun. Ben stadyum otoparkını kullanıyorum: maç günü kapalı ama diğer günler içinden geçince telsiz menzilinden tamamen çıkıyorsun." },
      { rumuz: "elfreni", tarih: "26 Temmuz 2026", metin: "@karayelli devriye beklese de vinç rotasında ışıklar sönükse riske değiyor bence, iki tur üst üste temiz geçtim. Stadyumu deneyeceğim, teşekkürler." },
      { rumuz: "dortcyeker", tarih: "27 Temmuz 2026", metin: "Kimse yazmamış: sahil şeridindeki balıkçı iskelesine radyoyu Kıyı FM'e çevirip girerseniz gizli bir süre denemesi açılıyor. Şaka değil, deneyin. Ödülü söylemiyorum, sürpriz." },
      { rumuz: "vitesbesteci", tarih: "27 Temmuz 2026", metin: "@dortcyeker bunu okuyup denedim ve oyunda müziğin neden dinamik olduğunu şimdi anladım. Herkes dursun ve bunu denesin. Şanzıman Interactive neyin peşindeymiş meğer." }
    ]
  },
  {
    id: "hoyuk-muhurler",
    baslik: "Höyük mühür alfabesi — topluluk çevirisi ilerlemesi",
    acan: "katmankazici",
    tarih: "25 Temmuz 2026",
    mesaj: "Topluluk çeviri tablosunu güncelliyorum. Kesinleşenler: dalga işareti = su/nehir, üç nokta üst üste = tahıl ambarı, içi çizgili daire = mühür sahibinin kendisi. Tartışmalı olan: kırık ay işareti. Ben 'yas' diyorum, bazıları 'borç' diyor. Elinde üçüncü tabletten örnek olan var mı?",
    yorumlar: [
      { rumuz: "fircadarbesi", tarih: "25 Temmuz 2026", metin: "Kırık ay bende iki kez borç bağlamında geçti: ambar tabletinde tahıl işaretinin YANINDA. Yas olsaydı mezar katmanında da görürdük, orada hiç yok." },
      { rumuz: "katmankazici", tarih: "25 Temmuz 2026", metin: "@fircadarbesi mezar katmanında var ama — dedenin defterinin 41. sayfasındaki eskizde, lahit kenarında. Oyun defteri de kanıt sayıyor bence, sonuçta aynı evren." },
      { rumuz: "gugukkusu", tarih: "26 Temmuz 2026", metin: "İkiniz de haklı olabilirsiniz: kırık ay 'kayıp' demekse hem borçta hem yasta kullanılır. Tahıl kaybı = borç, insan kaybı = yas. Çeviri tablosuna 'kayıp' yazalım, bağlam gerisini halleder." },
      { rumuz: "tozlufirca", tarih: "26 Temmuz 2026", metin: "@gugukkusu bu yorum için üye oldum. Katman Yapım'ın istediği tam da bu galiba — tek doğru çeviri yok, bağlam var. Oyunun kendisi gibi." },
      { rumuz: "malakadar", tarih: "27 Temmuz 2026", metin: "Tabloyu bozmayayım ama beşinci katmanda dalga işaretinin TERS çizildiği bir tablet buldum. Ters su... kuraklık mı? Kimsede var mı?" }
    ]
  },
  {
    id: "meydan-denge",
    baslik: "1.7 yaması: Pehlivan nerfi haklı mı?",
    acan: "meydanokuyan",
    tarih: "27 Temmuz 2026",
    mesaj: "Yama notları çıktı: Pehlivan'ın tutuş menzili yüzde on beş kısaldı, toprak sarsması artık büyüyle iptal edilebiliyor. Kolektif 'kullanım oranı çok yüksekti' diyor. Turnuva sahnesinden kazan-oranı verileriyle tartışalım: bu nerf haklı mı, yoksa panik yaması mı?",
    anket: {
      soru: "Sence 1.7 Pehlivan nerfi?",
      secenekler: [
        { metin: "Haklı — veri ortada", taban: 128 },
        { metin: "Panik yaması, geri alınsın", taban: 97 },
        { metin: "Kararsızım, meydan konuşsun", taban: 41 }
      ]
    },
    yorumlar: [
      { rumuz: "kispetli", tarih: "27 Temmuz 2026", metin: "Kazan oranı yüzde elli ikiydi, elli iki! Baş tacı falan değildi, sadece HERKES oynuyordu çünkü oynaması keyifliydi. Popülerliği güce çevirip nerflemek matematik değil halkla ilişkiler." },
      { rumuz: "sazandisi", tarih: "27 Temmuz 2026", metin: "Pehlivan'ı nerflemek meydanın ruhunu bilmemektir. Sorun karakterde değil, düz yürüyen bir devden kaçamayanlarda. Yenilgiyi yamada değil aynada arayın." },
      { rumuz: "ruzgarokuyan", tarih: "27 Temmuz 2026", metin: "@sazandisi 'aynada arayın' demek kolay, Pehlivan köşeye sıkıştırınca üç saniye boyunca oyun oynamıyorsun, seyrediyorsun. Karşı-hamlesi olmayan güç güç değildir, tasarım hatasıdır." },
      { rumuz: "sazandisi", tarih: "27 Temmuz 2026", metin: "@ruzgarokuyan karşı-hamlesi VAR: tutuşa girmeden peşrevde mesafeyi açacaksın. Millet büyüye basıp kaçmayı taktik sanıyor, meydan bu değil. Peşrev okumayan Pehlivan'a yenilir, yenilmeli de." },
      { rumuz: "meydanokuyan", tarih: "27 Temmuz 2026", metin: "@sazandisi veriyi getirdim: turnuvada Pehlivan pick oranı yüzde kırk bir, YASAKLANMA oranı yüzde otuz sekiz. Elli iki kazanç oranı, herkes ona göre takım kurduğu için 'sadece' elli iki. Nerf haklı." },
      { rumuz: "yedekkulubesi", tarih: "27 Temmuz 2026", metin: "İki gündür bu başlıktayım ve fikrimi dört kez değiştirdim. Meydan'ın asıl başarısı bu galiba: dengesiz bile olsa hepimiz hâlâ buradayız." }
    ]
  },
  {
    id: "ocakbasi-gorev-dagilimi",
    baslik: "Ocakbaşı: 4 kişilik vardiyada görev dağılımı (kavgasız rehber)",
    acan: "sisci",
    tarih: "27 Temmuz 2026",
    mesaj: "Her akşam aynı kavga: herkes köze geçmek istiyor, kimse bulaşığa girmiyor. Bizim ekipte oturttuğumuz düzen şu: en soğukkanlı köze, en hızlı parmak servise, en konuşkan siparişe, en fedakâr bulaşığa. İki haftadır tek dükkân batırmadık. Sizin düzeniniz ne?",
    yorumlar: [
      { rumuz: "kozbekcisi", tarih: "27 Temmuz 2026", metin: "'En soğukkanlı köze' doğru ama eksik: köze geçen kişi ASLA servis çağrısına cevap vermeyecek. Bizim dükkân üç kez közcü 'geliyorum' dediği için yandı." },
      { rumuz: "bulasikci_veli", tarih: "27 Temmuz 2026", metin: "Bulaşığı fedakârlık sananlara itirazım var. Bulaşık bu oyunun kalecisidir: iyi bulaşıkçı hiç görünmez ama o olmadan hiçbir servis çıkmaz. Kendime saygım tam." },
      { rumuz: "sisci", tarih: "27 Temmuz 2026", metin: "@bulasikci_veli haklısın, 'fedakâr' kelimesini geri alıyorum — bulaşık bir sanattır. Rehberi 'en sabırlı bulaşığa' diye güncelliyorum." },
      { rumuz: "cifte_sis", tarih: "27 Temmuz 2026", metin: "Kimse söylememiş: iki kişilik oynuyorsanız görevleri BÖLMEYİN, ikiniz de her işi yapın ama dükkânın yarısını paylaşın. Bölge sistemi rol sisteminden iyi çalışıyor, deneyin." },
      { rumuz: "acemi_ciragi", tarih: "27 Temmuz 2026", metin: "@cifte_sis bunu okuyup kardeşimle denedim, ilk kez kira çıktı. Bu forum resmen aile terapisi." }
    ]
  }
];

/* İpuçları: forum kanonuyla birebir tutarlı — çoğu, topluluğun keşfettiklerinin
   derlenmiş hali. spoiler:true olanlar sayfada bulanık gelir, tıklayınca açılır. */
const IPUCLARI = [
  { oyunId: "kul-ve-fener", liste: [
    { metin: "Akordeoncunun SUSTUĞU yerleri not edin — o sessizlikler müzik değil, harita." },
    { metin: "Aynaları döndürmeden önce fenerin ışığının size gelmesini bekleyin; ışık sizden hızlıdır, siz yönünü seçin." },
    { metin: "Müzik kutusu hatırasını sona saklayın: finalde bekçi kulübesindeki fotoğrafın kaderini o belirliyor.", spoiler: true }
  ]},
  { oyunId: "gece-vardiyasi", liste: [
    { metin: "Sepeti boş olup poşet isteyen müşteriye fiş kesmeyin. Nedenini sormayın." },
    { metin: "İsim anonsu yapılan müşteri markette değilse, birazdan gelecek demektir — reyona sırtınızı dönmeyin." },
    { metin: "Kasada gözünüze bakan müşteri insan değildir. Vardiyayı sessizce bitirin, sabah konuşursunuz.", spoiler: true }
  ]},
  { oyunId: "pas-ve-pervane", liste: [
    { metin: "Göl üstünde alçak uçuş 'balıkçı modu'nu açar: kanat çırpma bedavaya gelir." },
    { metin: "Rotaya göre kaplama seçin: keten hız, muşamba termal tırmanış içindir." },
    { metin: "Balıkçı modundayken pervaneyi tamamen durdurun — leylek kendi kendine süzülür ve gıcırtı kesilir. Oyunun en huzurlu yirmi saniyesi.", spoiler: true }
  ]},
  { oyunId: "son-otobus", liste: [
    { metin: "İlk oynayışta koltuk değiştirmeyin: bir hikâyeyi tam dinlemek, yedisini yarım dinlemekten iyidir." },
    { metin: "Öğretmenin mektubunu OKUMADAN inerseniz bambaşka bir sahne açılır. İkinci oynayışa değen tek sır bu.", spoiler: true }
  ]},
  { oyunId: "bahcivan-krali", liste: [
    { metin: "Lavantayı gül çitinin İÇİNE değil dışına dizin; arılar önce çite uğrasın." },
    { metin: "Korkulukları köşelere değil patika kesişimlerine dikin — moral aurası yolda yürüyen köylüye işler." },
    { metin: "İlk yıl komşuya tohum borçlanMAyın: baharda faizi nadide fide olarak isterler, veremeyince akın moralli gelir." },
    { metin: "Kraliyet serasındaki eski tahtı sakın satmayın. Sonbaharı bekleyin.", spoiler: true }
  ]},
  { oyunId: "derin-uyku", liste: [
    { metin: "Katmanlardaki takvimlere bakın: zamanın hangi yöne aktığı, hikâyenin kendisidir." },
    { metin: "Revirdeki uyku kapsüllerini sayın ve mürettebat listesiyle karşılaştırın. Fazlalık kimin?", spoiler: true }
  ]},
  { oyunId: "vites", liste: [
    { metin: "Stadyum otoparkı maç günü dışında açıktır ve telsiz menzilinden tamamen çıkarır." },
    { metin: "Tersane kapısı 23:00'ten sonra açık — ama artık herkes biliyor, devriye orada bekliyor. Vinç ışıkları sönükse riske değer." },
    { metin: "Sahil iskelesine radyo Kıyı FM'deyken girin: gizli bir süre denemesi açılır. Ödülü söylemiyoruz.", spoiler: true }
  ]},
  { oyunId: "hoyuk", liste: [
    { metin: "Kırık ay işaretini 'kayıp' diye çevirin: tahıl kaybı borç, insan kaybı yas olur — bağlam gerisini halleder." },
    { metin: "Dedenizin defterindeki eskizler de kanıt sayılır; 41. sayfayı erken açın." }
  ]},
  { oyunId: "meydan", liste: [
    { metin: "Pehlivan'a karşı büyüye değil peşreve güvenin: tutuşa hiç girmeyin, mesafeyi açın." },
    { metin: "İlk on saati bir arkadaşla oynayın; öğrenme eğrisi ikiye bölünür, moral iki katına çıkar." }
  ]},
  { oyunId: "ocakbasi", liste: [
    { metin: "Közcü servise KOŞMAZ. Köz başında 'geliyorum' diyen dükkân yakar." },
    { metin: "İki kişilik oyunda rolleri değil dükkânı bölün: bölge sistemi rol sisteminden iyi çalışır." },
    { metin: "Bulaşık fedakârlık değil kaleciliktir: iyi bulaşıkçı görünmez ama onsuz hiçbir servis çıkmaz." }
  ]}
];

/* En Çok Aranan İpucu: ayın gününe göre döner — demo'da "arama verisi"nin dürüst hali. */
const ARANAN_ADAYLAR = [
  { oyunId: "pas-ve-pervane", ipucu: 0 },
  { oyunId: "gece-vardiyasi", ipucu: 1 },
  { oyunId: "bahcivan-krali", ipucu: 0 }
];

/* Günün Tartışması: gün-of-ay'a göre bu adaylardan biri manşete çıkar. */
const TARTISMA_ADAYLARI = [
  { konuId: "meydan-denge", yorum: 1 },
  { konuId: "kul-ve-fener-final", yorum: 2 },
  { konuId: "son-otobus-sonlar", yorum: 3 }
];
