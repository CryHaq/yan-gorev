/* Radar — GERÇEK DÜNYA verisi. Kurgu evrenin tek istisnası, ayrı sayfada yaşar.
   Kaynak: Steam ISteamChartsService + mağaza API (28 Temmuz 2026 anlık görüntüsü).
   Görseller/videolar Steam CDN'inden ve YouTube resmî gömme yoluyla atıfla gösterilir.
   "tanim" ve "gorus" metinleri Yan Görev'in KENDİ cümleleridir (mağaza metni kopyalanmaz).
   KURAL: her görüşün okuma süresi ≈ tanıtım videosunun süresi (videoSn, ~180 kelime/dk).
   Video 20 saniyeyse görüş bir soluk, video üç dakikaysa görüş bir deneme olur. */
const RADAR = {
  guncelleme: "28 Temmuz 2026",
  oyunlar: [
    {
      sira: 1, appid: 730, ad: "Counter-Strike 2", gelistirici: "Valve", cikis: "2012 · CS2: 2023", tur: "Taktiksel Nişancı", zirve: 1275982,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/256972298/movie480.mp4" }, videoSn: 56,
      tanim: "Valve'ın efsanevi 5'e 5 taktiksel nişancısının Source 2 motoruyla yeniden inşa edilmiş hâli: bomba kurma-çözme ekseninde ekonomi yönetimi, harita bilgisi ve refleksin buluştuğu e-spor standardı.",
      gorus: [
        "CS2 hakkında söylenecek yeni bir şey bulmak zor, çünkü oyunun kendisi yeniyi reddediyor: yirmi yıldır aynı iki takım, aynı bomba, aynı otuz saniye. Source 2 geçişi de grafikleri değil, adaleti güncelledi — mermi artık nereye gittiyse oraya gitti demektir; sunucu mazereti resmen bitti. Bu, hâlâ türün en radikal vaadi: kusurlu olan tek değişken sizsiniz.",
        "Asıl müfredat ise skor tablosunda görünmeyen yerde işliyor: ekonomi. Tabanca turunu kazanan maçın ritmini yazar; üçüncü turda sabırsızlanıp zorlama alım yapan, beşinci turu çorapla oynar. CS2'nin öğrettiği ilk şey nişan değil, tasarruf disiplinidir. İkincisi de susmayı bilmek: bilgi bu oyunda mermiden pahalıdır ve en iyi takımlar, en az konuşup en çok şey söyleyenlerdir.",
        "Bizim meydanda CS2 tartışması hiç bitmez ve bitmemeli: rank dağılımı, subtick hissi, Mirage yorgunluğu... Ama şu gerçek değişmiyor: beş kişiyle girip tek kelime etmeden çıktığınız bir maç bile size bir şey öğretmiştir. Öğrenmesi acımasız, bırakması imkânsız — yirmi yıldır formül bu ve daha iyisini kuran henüz çıkmadı. Atölye haritalarını da saymıyoruz bile; onlar başlı başına ikinci bir ömür."
      ]
    },
    {
      sira: 2, appid: 578080, ad: "PUBG: BATTLEGROUNDS", gelistirici: "PUBG Corporation", cikis: "2017", tur: "Battle Royale", zirve: 732248,
      video: { yt: "wRfo2dDtoMI" }, videoSn: 88,
      tanim: "Yüz oyuncunun tek adada, sürekli daralan güvenli bölgeye sıkıştığı battle royale türünün kurucularından: yağma, konumlanma ve son çember sinir harbi.",
      gorus: [
        "PUBG, battle royale furyasını başlatan oyun olarak tarihe geçti; ama bizce asıl mirası tempo cesareti. Rakipleri her yıl daha hızlı, daha neonlu, daha bağışlayıcı olurken PUBG sessizliğin gerilimini savundu: bir tarlada sırtüstü yatarken kendi kalp atışınızı duyduğunuz tek modern nişancı hâlâ bu. Tür onun açtığı yoldan koşarak uzaklaştı; PUBG aynı yolda yürümeye devam etti ve haklı çıktı.",
        "Bu inat mekaniğin her hücresinde görülüyor. Silah sesi üç yüz metreden kimlik gibi okunur; bir kapının açık ya da kapalı olması hayat meselesidir; tepenin öteki yüzü, dünyanın en uzun üç saniyesidir. Erangel'in çimeniyle Miramar'ın tozu arasındaki fark başka bir oyunda harita çeşitliliği sayılırdı — burada düpedüz mizaç farkı: biri pusuyu, öteki sabrı ödüllendirir.",
        "Oyuncu tipolojisi de ikiye ayrılmış durumda ve iki taraf da haklı olduğuna yemin ediyor. Sıcak inişçiler için ilk doksan saniyede üç çatışma görmeyen tur boşa geçmiştir; kenar sakinleri içinse asıl oyun, kimseye görünmeden çemberin kalbine yerleşme sanatıdır. Aynı adada iki ayrı oyun oynanır ve final çemberi, iki okulun diploma törenidir.",
        "Bugün dönen oyuncu iki şey buluyor: yıllarla keskinleşmiş bir kitle ve ücretsiz geçiş sonrası kalabalıklaşan ama karakterini kaybetmeyen sunucular. İlk gece art arda ölmek diriltici bir alçakgönüllülük dersi; ama onuncu maçta ilk top 10'unuz geldiğinde, o eski heyecanın hiç eskimeden yerli yerinde beklediğini göreceksiniz.",
        "Ve son çember... Kimin nerede olduğunu BİLMEDEN nefes tutmak, duyulan her ayak sesiyle planı baştan yazmak, kazanınca sandalyeden kalkıp iki adım yürüme ihtiyacı duymak. Radar listesinde kalıcı bir sakin; modası değil, sabrı sayesinde. Tavuklu akşam yemeği ekranının hâlâ bir tören gibi hissettirmesi tesadüf değil."
      ]
    },
    {
      sira: 3, appid: 570, ad: "Dota 2", gelistirici: "Valve", cikis: "2013", tur: "MOBA", zirve: 635321,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/256692021/movie480.mp4" }, videoSn: 43,
      tanim: "Valve'ın MOBA devi: 5'e 5, yüzü aşkın kahraman ve her maçı satranç derinliğine taşıyan ekonomi-harita kontrolü dengesi.",
      gorus: [
        "Dota 2 bir oyun değil, bir müfredat. Yüz saatlik öğrenci hâlâ acemidir, bin saatlik oyuncu hâlâ her maçta yeni bir şey görür; on bin saatlik olanıysa artık kimse sorgulamaz. Valve'ın yaklaşımı da aynı ciddiyette: para kazanma kozmetikte kalır, güç asla satılmaz — türün en dürüst ekonomilerinden biri bu ve on üç yıldır tavizsiz.",
        "Meydan gözünden itiraf: Dota başlıkları forumumuzun en uzun kavgalarını üretir, çünkü her karar savunulabilir. Ward nereye dikilir, Roshan ne zaman denenir, hangi kayıp gerçekten kayıptır — hepsi ayrı bir tez konusu. Bu da tam olarak iyi strateji oyununun tanımıdır. Uçuruma tırmanmayı göze alana söyleyebileceğimiz tek şey şu: zirvedeki manzara rakipsiz, ama kimse size teleferik sözü vermedi. Başlamak için en kötü gün dündü; en iyisi bugün."
      ]
    },
    {
      sira: 5, appid: 1172470, ad: "Apex Legends", gelistirici: "Respawn", cikis: "2019 · Steam: 2020", tur: "Kahraman Battle Royale", zirve: 284062,
      video: { yt: "innmNewjkuk" }, videoSn: 139,
      tanim: "Respawn'un kahraman tabanlı battle royale'i: üç kişilik takımlar, kayıp-tırmanarak akan hareket sistemi ve karakter yeteneklerinin takım oyununa örüldüğü hızlı düellolar.",
      gorus: [
        "Apex'in sırrı silahlarında değil, yerçekimiyle kurduğu pazarlıkta. Kaymak, tırmanmak, zipline'dan momentumla kopmak, bir yamacı hız kaybetmeden kayarak inmek — Respawn hareketi bir beceri ağacı değil, bir dil olarak tasarladı. Bu dili akıcı konuşan biri, nişanı ortalama olsa bile sahnenin yıldızı olur; çünkü Apex'te vurulmamak, vurmak kadar puan yazar.",
        "Karakter yetenekleri bu dilin lehçeleri. Wraith'in boşluğu, Pathfinder'ın kancası, Gibraltar'ın kubbesi — hiçbiri tek başına maç kazanmaz, ama iyi bir takım üç lehçeyi tek cümlede birleştirir. Kadro seçimi bu yüzden bir kişilik testi gibidir: agresif fragger mi, sabırlı gözcü mü, ekibi taşıyan destek mi olduğunuzu Apex size üç maçta söyler.",
        "Türe en büyük armağanı ise mikrofon gerektirmeyen iletişim: ping sistemi. Tek tuşla düşman işaretlemek, silah önermek, bölge çağırmak — 2019'da devrimdi, bugün her rakibinde standart. Sözsüz üç yabancının koordineli bir baskın yapabilmesi, oyun tasarımının sosyal mühendislik hâlidir ve Respawn bu dersi herkesten önce verdi.",
        "İkinci armağan da az konuşulur ama büyüktür: ölüm, maçtan atılma değildir. Düşen arkadaşın bayrağını alıp diriltme noktasına koşmak, battle royale'in acımasız aritmetiğine eklenmiş bir umut mekaniğidir. Kaybedilmiş görünen maçın son çemberde tam kadro dönmesi — Apex'in en iyi hikâyeleri hep bu köprüden geçer ve o hikâyeleri anlatan, bir daha bırakamaz.",
        "Silah hissi de Titanfall mirasının en görünür kanıtı: her tetik düşüşü tok, her şarjör değişimi ritmik. Görece uzun öldürme süresi bilinçli bir tercih — düellolar tek kurşunluk piyangolar değil; pozisyon değiştiren, kalkan kıran, geri çekilip dönen küçük müzakereler. Kaybettiğiniz çatışmanın nedenini burada neredeyse her zaman bilirsiniz ve bu, öfkeyi derse çevirir.",
        "Haritalar da bu dansın sahneleri ve her biri ayrı bir koreografi dayatıyor: dar boğazların pusu ekonomisi, açık ovaların üçüncü taraf paranoyası, dikeyliğin hareket diline açtığı alan... Sezonluk rotasyon eski sahneleri geri çağırdıkça meydanda nostalji başlıkları açılır, iki gün sonra aynı başlıklar 'iyi ki dönmüş' ile 'niye dönmüş' arasında ikiye bölünür. Harita tartışması bitmeyen oyun, yaşayan oyundur.",
        "Dürüst olalım: solo kuyruğun çilesi gerçek. Sezon ekonomisi yoğun, battle pass takvimi acelesiz oyuncuyu zorluyor ve pinginize küfreden takım arkadaşı evrensel bir sabit. Apex'in düşüşünü ilan eden başlıklar meydanımızda yılda iki kez zirve yapar; sonra yeni sezon gelir ve aynı imzalar sessizce oyuna döner.",
        "Çünkü üç kişi toplanıp girdiğinizde mesele değişiyor: rotasyon planlanır, lehçeler birleşir, o dans başlar. Battle royale rafında daha kalabalık kutular var; ama hareketi bir dil, takımı bir cümle sayan başka oyun yok. Apex, türün hâlâ en zarif dansı — ve pistin tozunu atmaya niyeti görünmüyor."
      ]
    },
    {
      sira: 6, appid: 2868840, ad: "Slay the Spire 2", gelistirici: "Mega Crit", cikis: "2026 (Erken Erişim)", tur: "Deste Kurmalı Roguelike", zirve: 196023,
      video: { yt: "ttVtllHkb4E" }, videoSn: 90,
      tanim: "Deste kurmalı roguelike türünü doğuran Mega Crit'in devam oyunu: her tırmanışta desteni yeniden inşa ediyor, her ölümde biraz daha akıllanıyorsun.",
      gorus: [
        "İlk Slay the Spire bir türü tek başına doğurdu; deste kurmalı roguelike artık koca bir raf ve o raf Mega Crit'in omuzlarında duruyor. Devam oyununun en zor sınavı da buydu: kendi mirasının kopyası olmamak. Sekiz yıl bekleyen bir topluluğa 'aynısından ama daha çok' vermek en güvenli yoldu — Mega Crit güvenli yolu seçmedi ve iyi ki seçmedi.",
        "İlk tırmanışlarımız sınavın geçildiğini söylüyor: kartlar tanıdık kokuyor ama kararlar yepyeni. Yeni kaynak sistemleri her dövüşü küçük bir pazarlığa çeviriyor, kat yapıları ezber rotaları bozuyor, karakterler ilk oyunun arketiplerini tekrar etmek yerine onlarla dalga geçiyor. Eski tanıdıklar yeni numaralarla dönmüş, yeni yüzler ilk oyunda hiç olmayan fikirler taşıyor. 'Bir el daha' hissi aynı; o ele giden düşünce zinciri tamamen yeni.",
        "Erken erişim etiketi sizi yanıltmasın: temel döngü şimdiden pırıl pırıl, denge şaşırtıcı derecede oturmuş. Eksik olan cila değil, hacim — içerik yol haritası önümüzdeki aylara yayılmış durumda ve Mega Crit'in ilk oyundaki yama disiplinini bilenler için bu bir risk değil, takvim. Üstelik topluluk şimdiden teoriler, rehberler, deste günlükleriyle boşluğu kendisi dolduruyor; iyi tasarımın en net işareti budur.",
        "Zorluk merdiveni de yerli yerinde: kuleyi bir kez devirince oyunun bittiğini sananlar, yükseliş katlarının ilk basamağında gerçekle tanışıyor. Her kat bir kuralı sertleştiriyor ve 'bunu da mı geçeyim yani' sorusunun cevabı, üç gün sonra gece üçte kendiliğinden geliyor.",
        "Ve o lanet aynen yerinde: 'son bir el' dersiniz, kule sizi sabaha teslim eder. Bizim tavsiyemiz ilk günden beri değişmedi: az kart, çok dost — desteyi şişirmeyin, kaldırmayı öğrenin. Ölümü de öğretmen bilin; bu kulede sınıfta kalmak, müfredatın ta kendisi."
      ]
    },
    {
      sira: 7, appid: 3241660, ad: "R.E.P.O.", gelistirici: "semiwork", cikis: "2025 (Erken Erişim)", tur: "Kooperatif Korku", zirve: 94560,
      video: { yt: "0ais4U7UX14" }, videoSn: 64,
      tanim: "semiwork'ün kooperatif korku-ekstraksiyonu: arkadaşlarınla değerli eşyaları toplayıp fizik motorunun insafında sağ salim dışarı çıkarmaya çalışıyorsun.",
      gorus: [
        "R.E.P.O.'nun bütçesi mütevazı, fizik motoru terbiyesiz, sonucu ise son yılların en bulaşıcı kahkahası. semiwork'ün formülü zarif: değerli eşya + beceriksiz eller + açık mikrofon = anlatılacak hikâye. Korku burada bir tür değil, komedinin kurulum cümlesi — canavar sizi kovalarken kaybettiğiniz şey canınızdan çok, taşıdığınız porselen vazonun sigortasız değeri.",
        "Oyunun asıl zekâsı, gerilimi ve kahkahayı aynı saniyeye sıkıştırması. Fısıltıyla plan yaparken devrilen bir lamba, panikle fırlatılan bir çanta, yanlış yere yüklenen ganimet... Her tur kendi felaket senaryosunu yazıyor ve fizik motoru, dünyanın en acımasız senaristi olarak hiçbir tekrarda aynı şakayı iki kez yapmıyor. Kooperatif korkunun büyük dalgasında yürüyor evet; ama şakayı jump-scare'e değil fiziğe anlattıran tek oyun bu.",
        "Erken erişim temposu da güven veriyor: küçük ekip, sık yama, topluluğu dinleyen bir yol haritası. Her güncelleme yeni bir canavar ya da yeni bir taşınamayacak eşya demek — yani yeni bir felaket türü.",
        "Meydanımızın felaket anıları başlığı boşuna en sevdiğimiz köşelerden değil: bu oyun bir anı üretme makinesi. Vazoyu değil arkadaşını fırlatanlar, asansöre çantayı koyup kendini unutanlar, piyanoyu merdivenden 'kontrollü' indirmeye çalışanlar — hepsi bizden, hepsi belgeli. Dört kişi bulun, mikrofonları açın, sigorta poliçesini okumayın; gerisi kendiliğinden yazılır."
      ]
    },
    {
      sira: 8, appid: 271590, ad: "Grand Theft Auto V Legacy", gelistirici: "Rockstar North", cikis: "2013 · PC: 2015", tur: "Açık Dünya Aksiyon", zirve: 98540,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/257109786/movie480.mp4" }, videoSn: 20,
      tanim: "Rockstar'ın üç kahramanlı Los Santos destanı; çevrimiçi dünyasıyla on yılı aşkındır büyümeye devam eden açık dünya ölçütü.",
      gorus: [
        "Fragmanı yirmi saniye; biz de sözü uzatmayacağız. Los Santos on yılı aşkındır açık dünyanın ölçütü: üç kahraman, tek şehir, büyümeyi bırakmayan bir Online ekonomisi. Hikâyeyi oynamadıysanız sırf yazarlık dersi için oynayın; oynadıysanız gece yarısı Vinewood tepelerinde amaçsız bir sürüş atın. Halef kapıyı çalarken bu şehre veda etmenin en doğru yolu da bu — çünkü Los Santos'un en iyi görevi, görev olmayanıdır."
      ]
    },
    {
      sira: 10, appid: 322170, ad: "Geometry Dash", gelistirici: "RobTop Games", cikis: "2014", tur: "Ritim Platform", zirve: 68410,
      video: { mp4: "https://cdn.akamai.steamstatic.com/steam/apps/2036304/movie480.mp4" }, videoSn: 47,
      tanim: "RobTop'un tek dokunuşlu ritim-platform oyunu: müzikle senkron engellerden milimetrik zamanlamayla geçiyorsun; topluluk editörü sayesinde seviye arzı bitmiyor.",
      gorus: [
        "Geometry Dash on yıldır listelerde ve bunun tek bir açıklaması var: saf, damıtılmış, mazeretsiz zorluk. Tek tuş, tek şans, milimetrik ritim. RobTop'un dehası oyunu müziğe bağlamasında — kaybettiğinizde şarkıya kızarsınız, şarkı sizi geri çağırır; parmak hafızası dediğiniz şeyin aslında bir melodi hafızası olduğunu burada öğrenirsiniz. Practice modunda ezberlenen her bölüm, gerçek denemede başka bir şarkıya dönüşür; oyunun en tatlı ihaneti budur.",
        "Topluluk editörü ise görünmez ikinci oyun: milyonlarca seviye, kendi yıldız sistemi, kendi demon hiyerarşisi, kendi efsaneleri ve kendi tarih yazımı. Bir topluluk seviyesinin yıllar süren ortak emekle bitirilmesi burada olağan haber sayılır. Yüzde doksan sekizde ölmenin acısı yaşamayana anlatılmaz; yaşamış olan zaten şu an oyunu tekrar açmış durumda. Sabır tapınağına saygıyla — mumları biz yakmadık, sadece sırada bekliyoruz; sıra da tahminimizden uzun, çünkü kimse tapınaktan çıkmıyor."
      ]
    },
    {
      sira: 11, appid: 236390, ad: "War Thunder", gelistirici: "Gaijin Entertainment", cikis: "2013", tur: "Askeri MMO", zirve: 88336,
      video: { yt: "miVz9nsMYEw" }, videoSn: 197,
      tanim: "Tankı, uçağı ve gemisiyle kombine muharebe MMO'su: gerçekçi balistik ve zırh modellemesiyle oynanabilir bir tarihî araç ansiklopedisi.",
      gorus: [
        "War Thunder, ansiklopedi ile oyun arasındaki çizgide yaşıyor: zırh kalınlıkları gerçek, balistik gerçek, motor sesleri koleksiyonluk. Gaijin'in on üç yıl önceki kumarı şuydu: gerçekçilik, hardcore bir azınlığın fantezisi değil, sabırlı bir çoğunluğun talebi olabilir. Sayılar her yıl aynı cevabı veriyor — kumar tutmuş, hem de katlanarak.",
        "Yelpaze de başlı başına bir müze: iki savaş arası çift kanatlılardan soğuk savaş jetlerine, ilk seri tanklardan modern ana muharebe tanklarına uzanan bir koleksiyon. Her aracın gerçek tarihî künyesi, gerçek zaafları, gerçek şöhreti var. Bir aracı araştırmak burada menüden satın alma değil, küçük bir tarih dersinin sonunda anahtar teslim alma törenidir.",
        "Elindeki asıl koz ise başka hiçbir oyunun sunmadığı şey: kombine muharebe. Tankınız bir tepeyi tutarken üstünüzden gerçek bir oyuncunun uçağı dalışa geçer, kıyıda bir başkasının muhribi topçu desteği verir. Üç ayrı türün oyuncusu aynı savaşın parçasıdır ve bu ölçek duygusunu ilk yaşadığınız an, War Thunder'ın neden vazgeçilmez olduğunu kelimesiz anlarsınız.",
        "Aslında tek oyun da değil, üç mizaç: Arcade, kapıdan giren herkese sıcak çorba; Realistic, nişan açısıyla mermi düşüşünü aynı denkleme koyan orta yol; Simülatör ise kokpit camından başka ekran tanımayanların ibadethanesi. Aynı araç üç modda üç ayrı karakter kazanır ve topluluğun en tatlı kavgaları, hangi modun 'gerçek' War Thunder olduğu üzerinedir.",
        "Ölümün bile müfredatı var. Vurulduğunuzda ekran size mermi yolunu röntgen gibi gösterir: hangi plakaya hangi açıyla girdi, nerede sekti, hangi mürettebatı aldı. İlk yüz ölüm ceza gibi gelir; sonra bir gün zırh açısını hesaplayıp sekeni kendiniz izlersiniz. Mermi türlerinin isimlerini söktüğünüz gün ise geri dönüş yoktur — bu oyun kaybetmeyi ders notuna çevirmiştir.",
        "Yeni başlayana meydanın ortak tavsiyesi hâlâ net: tek ağaç seçin ve sadık kalın. Üç ulusun üç aracını yarım bilen, tek ulusun tek aracını tam bilene her zaman yenilir. Araştırma ağacı bir maraton ekonomisi; premium araçlar tempoyu hızlandırır ama asıl sermaye sabırdır ve bu, Gaijin'in fiyat listesindeki en pahalı kalemdir.",
        "Hangar da başlı başına bir oda hobisi: kamuflajlar, çıkartmalar, gerçek birliklerin işaretleri, özenle dizilmiş mürettebat... Kimi oyuncu savaşmaktan çok koleksiyonunu parlatır ve buna kimse tuhaf bakmaz — model uçak kutusunu maketçiden alan neslin dijital rafı burasıdır. Bir aracı sırf 'hangarda güzel duruyor' diye araştıran adam sayısı, Gaijin'in resmî istatistiklerine girmese de meydanda iyi bilinir.",
        "Grind tartışması topluluğun bitmeyen türküsü — tamir ücretleri, sessiz katsayı ayarları, etkinlik takvimleri... Öfke gerçek, sevgi de öyle: aynı oyuncu sabah forumda ekonomiye söylenip akşam beş saat sortiye çıkar. Bu gelgite dışarıdan bakan şaşırır; içeriden bakan, uzun evliliklerin kavgasız olmadığını bilir.",
        "Takvim de boş durmuyor: temalı etkinlikler, tarihî yıl dönümü görevleri, sınırlı süreli modlar derken oyun kendi müze rehberliğini kendisi yapıyor. Bir hafta sonu etkinliği için oyuna dönen 'emekli' oyuncu, pazartesi sabahı kendini yine araştırma ağacının başında bulur — bu döngüyü hepimiz biliyoruz, kimse itiraf etmiyor.",
        "Folklor faslını atlamak olmaz: War Thunder, oyunundaki tankın gerçeğine yeterince benzemediğini kanıtlamak için forumlarına gizli askeri belge sızdırılan muhtemelen tek oyundur — ve bu, bir değil birkaç kez oldu. Doğruluk tutkusunun millî güvenlik meselesine dönüştüğü başka bir topluluk tanımıyoruz; bununla gurur mu duyulur bilinmez, ama hikâyesi her seferinde zevkle anlatılır.",
        "Ödül, bütün bu sabrın karşılığı olan o kombine an: kulaklığınızda uzaklaşan bir uçak motoru, dürbününüzde bir kule silueti, telsizde 'üstünüzdeyim' diyen bir dost. Tankın, uçağın ve geminin aynı cümlenin öğeleri olduğu o saniye — on üç yıldır kimse daha iyisini kuramadı ve açıkçası deneyen de pek görünmüyor."
      ]
    },
    {
      sira: 12, appid: 359550, ad: "Tom Clancy's Rainbow Six Siege", gelistirici: "Ubisoft Montreal", cikis: "2015", tur: "Taktiksel Nişancı", zirve: 81259,
      video: { yt: "2TLbT4FTlNQ" }, videoSn: 170,
      tanim: "Operatör tabanlı taktiksel nişancı: yıkılabilir duvarlar, gadget zekâsı ve saniyelik bilgi savaşının kuşatma düellosu.",
      gorus: [
        "Siege, on yılı aşan ömrünü tek bir tasarım kararına borçlu: duvarların söz hakkı olması. Her delik bir bilgi, her patlama bir cümle, her turda harita kendini baştan yazıyor. Başka nişancılar size bir arena verir; Siege bir arena vaadi verir ve onu nasıl şekillendireceğinizi tamamen size bırakır — iki takımın mimarlık kavgası, çatışmanın kendisinden önce başlar.",
        "İkinci ders sesle ilgili: bu oyunda kulak, gözden kıdemlidir. Üst kattaki adım, duvar arkasındaki takviye çakması, uzaktaki drone vızıltısı — hepsi koordinat verir. Meydanın rehber yazarları yıllardır aynı cümleyi kurar: ses altıncı operatördür. İyi bir kulaklıkla oynanan ilk gece, aylardır oynadığınız oyunun aslında hiç tanımadığınız bir oyun olduğunu öğrenirsiniz.",
        "Üçüncüsü peşrev faslı: drone. Kapıdan önce kamera girer, bilgi mermiden önce ölür ya da öldürür. Hazırlık evresinde kazanılan on saniyelik istihbarat, çatışma evresinde on saniyelik ömür demektir. Siege'in en sevdiğimiz paradoksu bu — en ölümcül anları, kimsenin tetiğe basmadığı anlardır.",
        "Operatör listesi yüzü aştı ve her yeni isim, meta denizine atılmış bir taş: yasaklama fazı, harita havuzu, sezonluk denge yamaları derken Siege bir nişancıdan çok yaşayan bir kurallar anayasasına dönüştü. Her operatör aslında tasarım diliyle sorulmuş bir sorudur — 'duvarı delemezsen ne yaparsın, sesi kesersem ne duyarsın' — ve meta, topluluğun bu sorulara verdiği kolektif cevaptır.",
        "On yıl, canlı serviste bir jeolojik çağ demek; Siege bu çağı krizsiz atlatmadı ama küllenmedi de. Siege X hamlesiyle yenilenen erişim modeli kapıyı yeni kitleye genişletti, e-spor sahnesi kendi yıldız kültürünü ve tekrar izlenen efsane maçlarını üretti. Ama içeride sizi karşılayan soru ilk günden beri aynı: bu duvarın arkasında kim var?",
        "Klip kültürü de bu derinliğin doğal ürünü: bir 1v5 geri dönüşü, milimetrik bir açı tutuşu, duvar deliğinden yazılan bir son cümle... Siege klibi başka oyunların kliplerine benzemez; refleksin değil planın alkışlandığı ender sahnedir. Meydanda paylaşılan her klibin altında aynı iki yorum bulunur: 'nasıl düşündün bunu' ve 'rakip ne yaşadı şimdi' — ikisi de içten sorulur.",
        "Rekabet merdiveni ise ayrı bir sosyoloji: solo tırmananın çilesi, tam ekiple çıkanın senfonisi. Rank kaygısı gerçek, sezon sonu rozet hesabı gerçek; ama bu oyunda yükselmenin tek güvenilir yolu daha hızlı nişan değil, daha az ölmeyi öğrenmek. Beş kişilik düzenli bir ekip bulduğunuz gün Siege'in başka bir oyuna dönüştüğünü göreceksiniz — takvimli, sözleşmeli, aile grubundan ciddi bir ilişki.",
        "Dürüstlük borcumuz da var: eğri diktir ve düşüş acıtır. İlk haftalarda spawn'dan çıkmadan ölmek, kendi kalkanınıza takılmak, takviyeyi yanlış duvara çakmak müfredata dahil. Meydanın tavsiyesi net: önce operatör değil, harita öğrenilir. Objenin nerede olduğunu bilmeyen, en pahalı gadget'la bile yalnızca iyi giyimli bir kayıp istatistiğidir.",
        "Bu bedeli ödemeyi kabullenen içinse Siege, taktiksel nişancının hâlâ en derin hâli. Her turu bir satranç açılışı, her rakibi bir ders, her yenilgiyi bir tekrar izleme davetiyesi sayan bu oyun, on yıldır aynı vaatle ayakta: düşünen, her zaman hızlı olandan bir adım öndedir. Kulaklığı takın, drone'u sürün — gerisi mimarlık."
      ]
    }
  ]
};
