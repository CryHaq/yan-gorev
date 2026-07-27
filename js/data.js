/* Yan Görev — kurgu veri. Tüm oyunlar, stüdyolar ve kullanıcılar hayal ürünüdür. */

const OYUNLAR = [
  {
    id: "kul-ve-fener",
    gorsel: "img/kul-ve-fener.jpg",
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
  }
];
