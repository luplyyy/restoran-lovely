const db = require("./config/database");
const initDatabase = require("./config/initDb");

const menuItems = [
    // --- 1. MAKANAN UTAMA (25 items) ---
    {
        nama: "Nasi Goreng Spesial Royal",
        kategori: "Makanan Utama",
        harga: 38000,
        deskripsi: "Nasi goreng aromatik dengan suwiran ayam kampung, udang segar, telur mata sapi, sate ayam, dan kerupuk udang renyah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Rendang Daging Sapi Minang",
        kategori: "Makanan Utama",
        harga: 48000,
        deskripsi: "Daging sapi pilihan dimasak perlahan selama 8 jam dengan rempah kelapa asli dan racikan rempah khas Minangkabau.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Sate Ayam Madura Saus Kacang",
        kategori: "Makanan Utama",
        harga: 35000,
        deskripsi: "10 tusuk sate daging ayam empuk dibakar arang kelapa dengan siraman saus kacang gurih kental dan lontong pulen.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ayam Bakar Taliwang Pedas Manis",
        kategori: "Makanan Utama",
        harga: 42000,
        deskripsi: "Ayam kampung muda dibakar dengan bumbu cabai taliwang khas Lombok yang harum jeruk limau dan terasi bakar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Bebek Goreng Kremes Crispy",
        kategori: "Makanan Utama",
        harga: 45000,
        deskripsi: "Potongan bebek berbumbu rempah kuning gurih digoreng garing dengan taburan remah kremesan dan sambal korek pedas nampol.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1514944298352-78d1222485f3?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Rawon Daging Surabaya Klasik",
        kategori: "Makanan Utama",
        harga: 46000,
        deskripsi: "Sup daging sapi kuah hitam kluwek khas Jawa Timur disajikan dengan tauge pendek segar, telur asin, dan sambal terasi.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Soto Betawi Kuah Susu Gurih",
        kategori: "Makanan Utama",
        harga: 45000,
        deskripsi: "Potongan daging sapi dan paru renyah dalam kuah kaldu rempah santan susu yang kaya rasa, emping melinjo, dan acar segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Sop Buntut Sapi Kuah Bening",
        kategori: "Makanan Utama",
        harga: 68000,
        deskripsi: "Buntut sapi impor Australia empuk dalam kuah kaldu bening kaya rempah pala dan cengkeh dengan potongan wortel serta kentang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Ulam Betawi Komplit",
        kategori: "Makanan Utama",
        harga: 36000,
        deskripsi: "Nasi bertabur serundeng kelapa sangrai harum, disajikan dengan dendeng sapi manis, bihun goreng, telur dadar iris, dan kemangi.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Liwet Solo Komplit",
        kategori: "Makanan Utama",
        harga: 37000,
        deskripsi: "Nasi gurih masak santan disajikan dengan suwiran ayam opor lembut, sayur labu siam gurih pedas, telur pindang, dan areh santan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ayam Betutu Khas Gilimanuk",
        kategori: "Makanan Utama",
        harga: 48000,
        deskripsi: "Ayam utuh diungkep bumbu base genep khas Bali yang berani rempah, disajikan dengan sambal matah dan plecing kangkung.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Gudeg Jogja Yu Djum Style",
        kategori: "Makanan Utama",
        harga: 39000,
        deskripsi: "Nangka muda manis gurih legit dimasak daun jati, disajikan bersama krecek pedas gurih, ayam suwir opor, dan telur bacem.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Campur Bali Satay Lilit",
        kategori: "Makanan Utama",
        harga: 45000,
        deskripsi: "Perpaduan nasi putih hangat dengan sate lilit ikan tenggiri, ayam suwir betutu, lawar kacang panjang, dan sambal embe.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ayam Pop Khas Bukittinggi",
        kategori: "Makanan Utama",
        harga: 32000,
        deskripsi: "Ayam kampung rebus air kelapa gurih digoreng sekejap, sangat lembut dan juicy dengan saus tomat cabai merah asam manis khas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Bogana Keraton Cirebon",
        kategori: "Makanan Utama",
        harga: 38000,
        deskripsi: "Nasi bungkus daun pisang dengan lauk lengkap: dendeng sapi ragi, opor ayam suwir, sambal goreng ati ampla, dan telur pindang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Soto Kudus Daging Kerbau/Sapi",
        kategori: "Makanan Utama",
        harga: 34000,
        deskripsi: "Soto khas mangkok poci mungil dengan kaldu rempah bening gurih, taburan bawang putih goreng renyah, dan sate puyuh bacem.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Iga Sapi Bakar Madu Pedas",
        kategori: "Makanan Utama",
        harga: 65000,
        deskripsi: "Potongan iga sapi premium empuk meresap bumbu bakar karamel madu dengan sentuhan cabai pedas dan sup kaldu pendamping.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Gado-Gado Penganten Saus Kacang Mete",
        kategori: "Makanan Utama",
        harga: 32000,
        deskripsi: "Aneka sayuran kukus segar, tahu tempe goreng, telur rebus disiram kuah saus kacang mete gurih legit dengan kerupuk emping.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Timbel Parahyangan Komplit",
        kategori: "Makanan Utama",
        harga: 42000,
        deskripsi: "Nasi berbalut daun pisang dengan ayam goreng lengkuas, tahu tempe bacem, ikan asin jambal roti, sayur asem, dan sambal terasi dadak.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Uduk Kebon Kacang Betawi",
        kategori: "Makanan Utama",
        harga: 34000,
        deskripsi: "Nasi wangi santan rempah serai pandan disajikan bersama ayam kalasan, semur tahu kentang, bihun gurih, dan sambal kacang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ayam Goreng Lengkuas Gurih",
        kategori: "Makanan Utama",
        harga: 35000,
        deskripsi: "Potongan ayam goreng rempah dengan taburan parutan lengkuas garing renyah keemasan dan sambal terasi segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Sop Iga Sapi Kuah Asam Pedas",
        kategori: "Makanan Utama",
        harga: 62000,
        deskripsi: "Iga sapi empuk kuah asam segar berpadu belimbing wuluh, tomat hijau, kemangi wangi, dan cabai rawit utuh meletup.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Mandhi Kambing Rempah Arab",
        kategori: "Makanan Utama",
        harga: 75000,
        deskripsi: "Nasi basmati aromatik kapulaga saffron dengan potongan daging paha kambing oven empuk tanpa bau prengus dan acar nanas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Biryani Daging Sapi Karamel",
        kategori: "Makanan Utama",
        harga: 68000,
        deskripsi: "Nasi basmati rempah India dipadu daging sapi empuk, taburan kismis manis gurih, bawang bombay goreng, dan raita yoghurt dingin.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nasi Bebek Madura Bumbu Hitam",
        kategori: "Makanan Utama",
        harga: 44000,
        deskripsi: "Bebek ungkep empuk goreng disiram bumbu hitam khas Madura yang kaya rempah kluwek ketumbar pedas gurih mendalam.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1514944298352-78d1222485f3?auto=format&fit=crop&w=600&q=80"
    },

    // --- 2. SEAFOOD (15 items) ---
    {
        nama: "Kepiting Saus Padang Spesial",
        kategori: "Seafood",
        harga: 95000,
        deskripsi: "Kepiting bakau segar berdaging tebal dimasak saus padang pedas gurih telur serabut yang kental dan menggugah selera.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Gurame Bakar Saus Madu Manis",
        kategori: "Seafood",
        harga: 65000,
        deskripsi: "Ikan gurame hidup segar dibelah kipas, dibakar dengan olesan kecap manis madu alami dan bumbu rempah bakar harum arang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Gurame Terbang Saus Asam Manis",
        kategori: "Seafood",
        harga: 65000,
        deskripsi: "Gurame fillet goreng garing bentuk terbang disiram saus asam manis oriental dengan nanas segar dan paprika warna-warni.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Udang Windu Bakar Jimbaran",
        kategori: "Seafood",
        harga: 58000,
        deskripsi: "Udang windu berukuran besar dipanggang arang dengan baluran pasta rempah Jimbaran Bali yang gurih pedas manis.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Udang Goreng Mayones Saus Wijen",
        kategori: "Seafood",
        harga: 54000,
        deskripsi: "Udang kupas balut tepung renyah keemasan berlumur saus mayones creamy dengan taburan biji wijen sangrai wangi.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Cumi Goreng Tepung Calamari Crispy",
        kategori: "Seafood",
        harga: 46000,
        deskripsi: "Cincin cumi segar laut dibalut tepung renyah bumbu bawang putih lada garam, disajikan dengan saus tartar homemade segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Cumi Bakar Saus Rica-Rica Manado",
        kategori: "Seafood",
        harga: 48000,
        deskripsi: "Cumi sero utuh dipanggang arang lalu dimasak dengan sambal rica-rica cabai rawit pedas menyengat daun kemangi wangi.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ikan Kerapu Kukus Saus Hongkong",
        kategori: "Seafood",
        harga: 78000,
        deskripsi: "Ikan kerapu laut segar dikukus lembut dengan irisan jahe segar, daun ketumbar, dan siraman minyak wijen kecap asin oriental.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ikan Kakap Merah Bakar Dabu-Dabu",
        kategori: "Seafood",
        harga: 68000,
        deskripsi: "Kakap merah segar dibakar wangi rempah disajikan dengan siraman sambal dabu-dabu iris segar tomat hijau dan perasan jeruk nipis.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Kerang Dara Rebus Saus Nanas Pedas",
        kategori: "Seafood",
        harga: 35000,
        deskripsi: "Kerang dara segar direbus serai jahe wangi disajikan hangat dengan cocolan saus sambal nanas asam manis pedas nikmat.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Kerang Hijau Saus Tiram Gurih",
        kategori: "Seafood",
        harga: 36000,
        deskripsi: "Kerang hijau pilihan ditumis dengan irisan bawang bombay, paprika merah, dan saus tiram pekat gurih beraroma bawang putih.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Kepiting Soka Goreng Telur Asin",
        kategori: "Seafood",
        harga: 75000,
        deskripsi: "Kepiting cangkang lunak digoreng renyah berlumur saus kuning telur asin creamy dengan daun kari wangi dan cabai rawit.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Lobster Bakar Garlic Butter Sauce",
        kategori: "Seafood",
        harga: 125000,
        deskripsi: "Baby lobster laut utuh dibelah dua dipanggang dengan baluran mentega bawang putih wangi parsley dan perasan lemon segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Sup Tom Yum Seafood Kuah Pedas",
        kategori: "Seafood",
        harga: 52000,
        deskripsi: "Sup khas Thailand dengan kuah merah asam pedas beraroma serai lengkuas, dipenuhi udang, cumi, jamur merang, dan fillet ikan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Salmon Teriyaki Glazed Panggang",
        kategori: "Seafood",
        harga: 85000,
        deskripsi: "Fillet salmon Norwegia segar dipanggang sempurna dengan lapisan saus manis teriyaki gurih, disajikan dengan tumis buncis jagung.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
    },

    // --- 3. MIE, PASTA & BAKSO (15 items) ---
    {
        nama: "Mie Goreng Jawa Kampung Telur Bebek",
        kategori: "Mie & Pasta",
        harga: 32000,
        deskripsi: "Mie kuning basah dimasak arang dengan kecap manis tradisional, sawi hijau, kubis, suwiran ayam kampung, dan telur bebek orak-arik.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Kwetiau Goreng Sapi Seafood Penang",
        kategori: "Mie & Pasta",
        harga: 39000,
        deskripsi: "Kwetiau beras pipih digoreng wok beraroma asap kuat (wok hei) dipadu irisan daging sapi empuk, udang, tauge, dan kucai segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Bihun Goreng Singapore Spesial",
        kategori: "Mie & Pasta",
        harga: 34000,
        deskripsi: "Bihun beras lembut ditumis bumbu kari tipis harum dengan udang, suwiran ayam, potongan paprika, dan telur orak-arik.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Mie Aceh Daging Kuah Kental Pedas",
        kategori: "Mie & Pasta",
        harga: 38000,
        deskripsi: "Mie tebal kuning khas Serambi Mekkah dimasak kuah kari rempah pekat pedas dengan potongan daging sapi, emping, dan acar bawang merah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Bakso Urat Malang Jumbo Komplit",
        kategori: "Mie & Pasta",
        harga: 35000,
        deskripsi: "Bakso urat sapi super kenyal dipadu bakso halus, siomay kukus, tahu bakso, dan pangsit goreng renyah dalam kuah kaldu sumsum sapi pekat.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Bakso Beranak Lava Pedas Mercon",
        kategori: "Mie & Pasta",
        harga: 42000,
        deskripsi: "Bakso raksasa berisikan cabai rawit giling pedas nampol dan aneka pentol kecil di dalamnya, sensasi pedas meledak di lidah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Spaghetti Bolognese Daging Cincang",
        kategori: "Mie & Pasta",
        harga: 45000,
        deskripsi: "Pasta spaghetti al dente disiram saus tomat oregano klasik Italia dengan cincangan daging sapi berlimpah dan taburan keju parmesan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1621996346565-e3d5d6281745?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Fettuccine Carbonara Creamy Smoked Beef",
        kategori: "Mie & Pasta",
        harga: 48000,
        deskripsi: "Pasta fettuccine pipih dalam balutan saus krim kental telur keju parmesan, potongan smoked beef gurih, dan taburan parsley lada hitam.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Spaghetti Aglio Olio Seafood Pedas",
        kategori: "Mie & Pasta",
        harga: 46000,
        deskripsi: "Spaghetti ditumis minyak zaitun extra virgin, bawang putih cincang wangi, serpihan cabai kering, udang dan cumi segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Lasagna Al Forno Keju Mozzarella Panggang",
        kategori: "Mie & Pasta",
        harga: 52000,
        deskripsi: "Lapisan pasta panggang dengan isian saus daging bolognese, krim bechamel lembut gurih, dan lelehan keju mozzarella keemasan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Japanese Beef Shoyu Ramen",
        kategori: "Mie & Pasta",
        harga: 48000,
        deskripsi: "Mie ramen kenyal dalam kuah kaldu shoyu Jepang otentik, disajikan dengan irisan daging sapi empuk, ajitsuke tamago, nori, dan daun bawang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Spicy Miso Ramen Telur Omega",
        kategori: "Mie & Pasta",
        harga: 49000,
        deskripsi: "Ramen kuah pasta kedelai miso gurih sedikit pedas dengan minced beef, jagung manis, rebung menma, dan lelehan butter harum.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Niku Udon Daging Sapi Kuah Dashi",
        kategori: "Mie & Pasta",
        harga: 47000,
        deskripsi: "Mie udon tebal lembut kenyal dalam kuah kaldu dashi jepang hangat dengan irisan daging sukiyaki manis gurih dan remah tempura.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Mie Ayam Jamur Pangsit Rebus Bakso",
        kategori: "Mie & Pasta",
        harga: 30000,
        deskripsi: "Mie keriting kenyal disajikan dengan potongan ayam jamur manis gurih, pangsit rebus lembut isi ayam udang, dan kuah kaldu wangi.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Macaroni Schotel Keju Panggang",
        kategori: "Mie & Pasta",
        harga: 36000,
        deskripsi: "Panggang makaroni telur susu dengan keju cheddar melimpah, smoked beef cincang, dan taburan pala harum serta kerak keju renyah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80"
    },

    // --- 4. STEAK, AYAM & WESTERN (15 items) ---
    {
        nama: "Sirloin Steak Saus Blackpepper",
        kategori: "Steak & Western",
        harga: 89000,
        deskripsi: "200gr daging sapi sirloin Australia juicy dipanggang sempurna dengan saus lada hitam kental pedas gurih, french fries, dan mix veggies.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ribeye Steak Saus Creamy Mushroom",
        kategori: "Steak & Western",
        harga: 98000,
        deskripsi: "Potongan ribeye dengan marbling gurih lumer di mulut, dipadukan saus jamur champignon krim kental gurih dan mashed potato lembut.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Tenderloin Meltique Steak BBQ",
        kategori: "Steak & Western",
        harga: 110000,
        deskripsi: "Daging tenderloin super lembut tanpa lemak keras, disiram saus barbekyu smokey karamel manis dan jagung bakar mentega.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Chicken Steak Crispy Saus Jamur",
        kategori: "Steak & Western",
        harga: 42000,
        deskripsi: "Dada ayam fillet berbalut tepung renyah keemasan disiram saus gravy jamur gurih, disajikan di atas hotplate membara.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Chicken Cordon Bleu Keju Leleh",
        kategori: "Steak & Western",
        harga: 48000,
        deskripsi: "Gulungan dada ayam berisi smoked beef dan keju mozzarella lumer melimpah saat dipotong, disajikan dengan saus keju spesial.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Classic Beef Burger Keju Cheddar",
        kategori: "Steak & Western",
        harga: 45000,
        deskripsi: "Bun brioche lembut panggang butter mengapit patty daging sapi murni 150gr, keju cheddar leleh, selada, tomat, dan saus burger rahasia.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Double Cheese BBQ Beef Burger",
        kategori: "Steak & Western",
        harga: 55000,
        deskripsi: "Dua lapis daging sapi panggang juicy dengan double cheddar cheese, onion ring krispi, dan siraman saus BBQ smokey.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Crispy Chicken Burger Spicy Mayo",
        kategori: "Steak & Western",
        harga: 38000,
        deskripsi: "Paha ayam goreng krispi berbumbu rempah pedas, selada renyah, coleslaw segar, dan saus mayo pedas beraroma jeruk nipis.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Pizza Margherita Klasik Italia",
        kategori: "Steak & Western",
        harga: 65000,
        deskripsi: "Adonan roti pizza tipis renyah khas Napoli dengan saus tomat San Marzano, keju mozzarella fior di latte, daun basil segar, dan minyak zaitun.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Pizza Meat Lovers Keju Berlimpah",
        kategori: "Steak & Western",
        harga: 78000,
        deskripsi: "Pizza bertabur aneka daging favorit: pepperoni sapi, sosis panggang, daging cincang, smoked beef, dan lelehan keju mozzarella tebal.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Chicken Katsu Curry Donburi",
        kategori: "Steak & Western",
        harga: 42000,
        deskripsi: "Fillet ayam goreng katsu krispi di atas semangkuk nasi putih Jepang hangat disiram kuah kari Jepang kaya wortel dan kentang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Beef Teriyaki Rice Bowl Spesial",
        kategori: "Steak & Western",
        harga: 45000,
        deskripsi: "Irisan tipis daging sapi sukiyaki ditumis saus teriyaki manis gurih dengan bawang bombay karamel, disajikan dengan telur onsen.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Ayam Geprek Mozzarella Sambal Bawang",
        kategori: "Steak & Western",
        harga: 32000,
        deskripsi: "Ayam krispi digeprek bersama cabai rawit merah pedas nampol lalu dilapisi keju mozzarella leleh yang ditorch harum gurih.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Fish and Chips Saus Tartar Lemon",
        kategori: "Steak & Western",
        harga: 48000,
        deskripsi: "Fillet ikan dory lembut berbalut adonan tepung crispy keemasan, disajikan bersama kentang goreng gurih dan saus tartar segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1524338198850-8a2ff63aaceb?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Roasted Herb Spring Chicken Set",
        kategori: "Steak & Western",
        harga: 55000,
        deskripsi: "Setengah ekor ayam muda dipanggang dengan rosemary, thyme, bawang putih dan mentega, disajikan bersama baby potato panggang.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80"
    },

    // --- 5. CEMILAN & APPETIZER (12 items) ---
    {
        nama: "Pempek Kapal Selam Palembang Asli",
        kategori: "Cemilan",
        harga: 28000,
        deskripsi: "Pempek ikan tenggiri asli dengan isian telur bebek utuh, digoreng garing di luar lembut di dalam, disiram kuah cuko hitam pedas asam manis.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Pempek Lenjer & Kulit Crispy",
        kategori: "Cemilan",
        harga: 26000,
        deskripsi: "Kombinasi pempek lenjer kenyal dan pempek kulit ikan tenggiri yang digoreng ekstra renyah gurih dengan kuah cuko kental.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Dimsum Siomay Ayam Udang Kukus",
        kategori: "Cemilan",
        harga: 25000,
        deskripsi: "4 pcs siomay kukus berisi cincangan daging ayam dan udang juicy bertabur wortel parut, disajikan bersama chili oil pedas harum.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Dimsum Hakau Udang Transparan",
        kategori: "Cemilan",
        harga: 28000,
        deskripsi: "Kulit gandum transparan kenyal membungkus udang utuh segar nan renyah manis alami, disajikan dalam klakat bambu panas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Tahu Walik Banyuwangi Saus Petis",
        kategori: "Cemilan",
        harga: 22000,
        deskripsi: "Tahu pong dibalik dengan isian adonan ayam udang gurih lalu digoreng sangat renyah, dicocol sambal kecap petis cabai rawit.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Tempe Mendoan Purwokerto Sambal Kecap",
        kategori: "Cemilan",
        harga: 18000,
        deskripsi: "Tempe lembaran tipis digoreng tepung daun bawang setengah matang (mendo), hangat gurih dicocol sambal kecap cabai rawit pedas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Bakwan Jagung Manis Renyah",
        kategori: "Cemilan",
        harga: 18000,
        deskripsi: "Perkedel jagung manis pipil segar digoreng garing dengan bumbu daun jeruk dan rempah ketumbar yang harum renyah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "French Fries Truffle Mayo Dip",
        kategori: "Cemilan",
        harga: 26000,
        deskripsi: "Kentang goreng potongan shoestring renyah bertabur garam laut, minyak aroma truffle Italia, dan cocolan mayones gurih.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Crispy Chicken Wings BBQ Honey",
        kategori: "Cemilan",
        harga: 32000,
        deskripsi: "6 pcs sayap ayam renyah diglasir saus madu barbekyu manis gurih pedas dengan taburan biji wijen putih sangrai.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1527477378377-1747806509f7?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Nachos Panggang Keju & Daging Cincang",
        kategori: "Cemilan",
        harga: 35000,
        deskripsi: "Keripik tortilla jagung renyah dilapisi saus daging bolognese, lelehan keju mozzarella, salsa tomat segar, dan krim asam.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Spring Roll Sayur Saus Bangkok Asam Manis",
        kategori: "Cemilan",
        harga: 22000,
        deskripsi: "Lumpia goreng isi wortel, jamur kuping, rebung, dan tauge segar digoreng renyah keemasan dengan cocolan saus plum manis pedas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Singkong Goreng Merekah Sambal Roa",
        kategori: "Cemilan",
        harga: 20000,
        deskripsi: "Singkong mentega empuk merekah berbumbu bawang putih gurih digoreng garing, dicocol sambal roa asap khas Manado pedas gurih.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
    },

    // --- 6. DESSERT (15 items) ---
    {
        nama: "Pisang Goreng Keju Cokelat Krispi",
        kategori: "Dessert",
        harga: 24000,
        deskripsi: "Pisang raja manis digoreng tepung kremes renyah, diberi topping parutan keju cheddar melimpah, meses cokelat, dan susu kental manis.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Roti Bakar Bandung Cokelat Keju Susu",
        kategori: "Dessert",
        harga: 25000,
        deskripsi: "Roti tebal empuk dibakar mentega wangi dengan isian cokelat pasta pekat dan keju parut lezat yang melimpah ruah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Tiramisu Klasik Espresso Mascarpone",
        kategori: "Dessert",
        harga: 35000,
        deskripsi: "Kue penutup khas Italia berlapis biskuit ladyfinger terendam kopi espresso, krim keju mascarpone lembut, dan taburan cokelat bubuk pekat.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Choco Lava Cake Leleh Es Krim Vanilla",
        kategori: "Dessert",
        harga: 32000,
        deskripsi: "Cake cokelat panggang dengan lelehan cokelat cair panas di bagian tengah saat dibelah, dipadu satu scoop es krim vanila dingin.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Churros Spanish Saus Cokelat Belgia",
        kategori: "Dessert",
        harga: 26000,
        deskripsi: "Stik kue goreng renyah khas Spanyol berbalut gula pasir dan bubuk kayu manis wangi, disajikan bersama saus celup cokelat kental hangat.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Panna Cotta Vanila Saus Saus Berry Segar",
        kategori: "Dessert",
        harga: 28000,
        deskripsi: "Puding krim susu sutra khas Italia yang lembut bergoyang disiram saus selai buah stroberi dan blueberry asam segar alami.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Waffle Belgia Crispy Sirup Karamel",
        kategori: "Dessert",
        harga: 30000,
        deskripsi: "Waffle renyah harum mentega dengan taburan potongan stroberi segar, satu scoop es krim gelato, dan kucuran sirup mapel karamel.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Martabak Manis Red Velvet Cream Cheese",
        kategori: "Dessert",
        harga: 38000,
        deskripsi: "Martabak tebal lembut bersarang warna merah velvet dengan olesan krim keju gurih lembut dan taburan remahan oreo renyah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Cendol Durian Montong Legit",
        kategori: "Dessert",
        harga: 30000,
        deskripsi: "Cendol hijau pandan alami disajikan bersama kuah santan gurih, gula aren cair kental, nangka wangi, dan daging durian manis legit.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Campur Spesial Resto Susu Manis",
        kategori: "Dessert",
        harga: 25000,
        deskripsi: "Es serut dingin dengan isian alpukat mentega, kelapa muda, nangka, tape singkong, kolang-kaling, agar-agar, cincau hitam, dan sirup cocopandan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Teler Durian Nangka Alpukat",
        kategori: "Dessert",
        harga: 28000,
        deskripsi: "Potongan buah alpukat matang, kerokan daging kelapa muda, nangka harum manis dalam kuah santan manis kental dan es batu menyegarkan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Klepon Tradisional Isi Gula Jawa Lumer",
        kategori: "Dessert",
        harga: 18000,
        deskripsi: "Bola-bola tepung ketan hijau pandan berisi lelehan gula merah aren asli yang meletup manis di mulut, dibalut parutan kelapa kukus gurih.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Pancake Lembut Saus Madu Mentega",
        kategori: "Dessert",
        harga: 26000,
        deskripsi: "Tumpukan 3 lapis pancake lembut fluffy beraroma vanila disajikan dengan potongan mentega tawar leleh dan sirup madu hutan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Cheesecake New York Saus Blueberry",
        kategori: "Dessert",
        harga: 36000,
        deskripsi: "Cake keju panggang lembut padat kaya krim keju dengan dasar biskuit gurih renyah, disiram selai blueberry asam segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Gelato Es Krim Duo Rasa Italia",
        kategori: "Dessert",
        harga: 28000,
        deskripsi: "Dua scoop es krim gelato artisan khas Italia pilihan rasa: Dark Chocolate Belgia & Fresh Mango Passionfruit yang segar pekat.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=600&q=80"
    },

    // --- 7. MINUMAN (18 items) ---
    {
        nama: "Kopi Susu Gula Aren Spesial",
        kategori: "Minuman",
        harga: 22000,
        deskripsi: "Perpaduan double shot espresso biji kopi arabika-robusta dengan susu segar creamy dan manis gurih alami sirup gula aren organik.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Caffe Latte Creamy Foam Panas/Dingin",
        kategori: "Minuman",
        harga: 26000,
        deskripsi: "Espresso pilihan berpadu dengan susu steamed lembut menghasilkan rasa kopi yang seimbang lembut dengan buih susu halus di atasnya.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Caramel Macchiato Dingin",
        kategori: "Minuman",
        harga: 30000,
        deskripsi: "Kopi susu segar dengan sentuhan sirup vanila beraroma manis dan saus karamel lezat yang disiram indah di lapisan atas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Americano Ice Cold Brew Segar",
        kategori: "Minuman",
        harga: 20000,
        deskripsi: "Kopi hitam segar dari seduhan biji kopi single origin dengan citarasa fruity asam segar dan bersih tanpa ampas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Matcha Green Tea Latte Uji Kyoto",
        kategori: "Minuman",
        harga: 28000,
        deskripsi: "Bubuk teh hijau matcha asli Jepang dari Kyoto diseduh dengan susu segar menghasilkan minuman gurih manis menenangkan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Teh Tarik Rempah Melayu",
        kategori: "Minuman",
        harga: 18000,
        deskripsi: "Seduhan teh hitam pekat ditarik berbusa dengan susu kental manis dan evaporasi gurih yang disajikan dingin segar.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Thai Tea Susu Original Dingin",
        kategori: "Minuman",
        harga: 18000,
        deskripsi: "Teh merah khas Thailand beraroma rempah vanila adas manis diseduh pekat dipadu susu kental manis gurih legit.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Lemon Tea Segar Daun Mint",
        kategori: "Minuman",
        harga: 16000,
        deskripsi: "Teh melati wangi diseduh segar dengan perasan sari lemon kuning asli dan daun mint segar yang membangkitkan semangat.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Teh Manis Melati Nusantara",
        kategori: "Minuman",
        harga: 8000,
        deskripsi: "Seduhan daun teh melati pilihan beraroma harum semerbak dengan manis gula tebu murni dan es batu melimpah.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Jeruk Peras Murni Segar",
        kategori: "Minuman",
        harga: 15000,
        deskripsi: "Perasan langsung dari buah jeruk manis segar alami kaya vitamin C tanpa pemanis buatan, sangat segar pelepas dahaga.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Jus Alpukat Keruk Cokelat Kental",
        kategori: "Minuman",
        harga: 22000,
        deskripsi: "Jus buah alpukat mentega segar kental manis alami dengan hiasan saus cokelat pasta di dinding gelas.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Jus Mangga Gedong Harum Manis",
        kategori: "Minuman",
        harga: 20000,
        deskripsi: "Jus buah mangga segar matang pohon bertekstur kental manis harum dengan potongan buah mangga di atasnya.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Jus Stroberi Segar Asam Manis",
        kategori: "Minuman",
        harga: 20000,
        deskripsi: "Jus buah stroberi pegunungan segar merah merona kaya antioksidan dengan rasa asam manis alami menyegarkan tenggorokan.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Es Kelapa Muda Jeruk Nipis Murni",
        kategori: "Minuman",
        harga: 22000,
        deskripsi: "Air kelapa muda segar asli lengkap dengan kerokan daging kelapa lembut dan perasan jeruk nipis serta gula aren cair.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Virgin Mojito Lime & Mint Soda",
        kategori: "Minuman",
        harga: 24000,
        deskripsi: "Minuman soda menyegarkan dengan tumbukan daun mint aromatik, potongan jeruk nipis segar, sirup gula tebu, dan es batu.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Lychee Tea Buah Leci Asli",
        kategori: "Minuman",
        harga: 22000,
        deskripsi: "Es teh manis wangi buah leci disajikan lengkap dengan 2 butir buah leci utuh segar kenyal di dalamnya.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Cokelat Panas Belgia Marshmallow",
        kategori: "Minuman",
        harga: 25000,
        deskripsi: "Cokelat leleh Belgia pekat diseduh susu murni hangat creamy dengan taburan marshmallow lembut di atasnya.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Wedang Jahe Merah Madu Herbal Hangat",
        kategori: "Minuman",
        harga: 16000,
        deskripsi: "Rebusan jahe merah segar berpadu kayu manis, serai wangi, cengkeh, dan madu murni penghangat tubuh alami.",
        status: "tersedia",
        gambar: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
    }
];

async function seedDatabase() {
    try {
        console.log("Preparing to seed 100 food menu items...");
        await initDatabase();

        // Check current count
        const [[{ count }]] = await db.query("SELECT COUNT(*) as count FROM menu");
        console.log(`Current items in database: ${count}`);

        // Clean out sample data or reset to exact 100 clean items
        console.log("Clearing existing menu data to ensure fresh high-quality 100 items...");
        await db.query("TRUNCATE TABLE menu");

        const insertQuery = `
            INSERT INTO menu (nama, kategori, harga, deskripsi, status, gambar)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        for (const item of menuItems) {
            await db.query(insertQuery, [
                item.nama,
                item.kategori,
                item.harga,
                item.deskripsi,
                item.status,
                item.gambar
            ]);
        }

        const [[{ newCount }]] = await db.query("SELECT COUNT(*) as newCount FROM menu");
        console.log(`✅ Seeding complete! Total menu items in database: ${newCount}`);

        const [categories] = await db.query("SELECT kategori, COUNT(*) as total FROM menu GROUP BY kategori ORDER BY total DESC");
        console.log("Categories summary:");
        categories.forEach(c => console.log(` - ${c.kategori}: ${c.total} items`));

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        throw error;
    }
}

if (require.main === module) {
    seedDatabase()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = { seedDatabase, menuItems };
