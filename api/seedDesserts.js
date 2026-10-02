const db = require("./config/database");
const initDatabase = require("./config/initDb");

const desserts = [
    {
        nama: "Strawberry Shortcake Luvv's",
        harga: 42000,
        deskripsi: "Sponge cake vanila lembut berlapis krim ringan dan stroberi segar manis-asam.",
        gambar: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Burnt Cheesecake Caramel",
        harga: 39000,
        deskripsi: "Basque cheesecake creamy dengan permukaan karamel panggang dan rasa keju yang kaya.",
        gambar: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Red Velvet Cupcake Cream Cheese",
        harga: 24000,
        deskripsi: "Cupcake red velvet lembut dengan frosting cream cheese dan remah kue merah.",
        gambar: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Brownies Fudge Es Krim Vanila",
        harga: 33000,
        deskripsi: "Brownies cokelat pekat hangat dengan satu scoop es krim vanila yang lembut.",
        gambar: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Mille Crepes Matcha Kyoto",
        harga: 36000,
        deskripsi: "Lapisan crepe tipis dengan krim matcha harum dan taburan bubuk teh hijau.",
        gambar: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Crepe Stroberi Cloud Cream",
        harga: 34000,
        deskripsi: "Crepe lembut berisi whipped cream, stroberi segar, dan saus berry buatan rumah.",
        gambar: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Mango Sticky Rice Thai",
        harga: 31000,
        deskripsi: "Mangga matang manis dengan ketan gurih santan dan taburan wijen sangrai.",
        gambar: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Donat Custard Gula Kayu Manis",
        harga: 19000,
        deskripsi: "Donat empuk isi custard vanila, dibalut gula kayu manis yang harum.",
        gambar: "https://images.unsplash.com/photo-1551024506-0BCCd828D307?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Puding Karamel Susu Lembut",
        harga: 22000,
        deskripsi: "Puding susu halus dengan saus karamel rumahan yang manis dan sedikit pahit.",
        gambar: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Macaron Berry isi 4",
        harga: 38000,
        deskripsi: "Empat macaron renyah-lembut dengan isian krim raspberry dan stroberi.",
        gambar: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Choco Souffle Lava Hangat",
        harga: 35000,
        deskripsi: "Souffle cokelat panggang dengan bagian tengah lumer dan taburan gula halus.",
        gambar: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },
    {
        nama: "Pavlova Mini Buah Musim",
        harga: 32000,
        deskripsi: "Meringue renyah di luar, lembut di dalam, dengan krim dan buah segar.",
        gambar: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80"
    }
].map(item => ({ ...item, kategori: "Dessert", status: "tersedia" }));

async function seedDesserts() {
    await initDatabase();
    let added = 0;
    for (const item of desserts) {
        const [existing] = await db.query("SELECT id FROM menu WHERE nama = ? LIMIT 1", [item.nama]);
        if (existing.length) continue;
        await db.query(
            "INSERT INTO menu (nama, kategori, harga, deskripsi, status, gambar) VALUES (?, ?, ?, ?, ?, ?)",
            [item.nama, item.kategori, item.harga, item.deskripsi, item.status, item.gambar]
        );
        added++;
    }
    console.log(`Dessert ditambahkan: ${added}; total dessert baru tersedia: ${desserts.length}`);
}

if (require.main === module) {
    seedDesserts()
        .catch(error => {
            console.error("Gagal menambahkan dessert:", error.message);
            process.exitCode = 1;
        })
        .finally(() => db.end());
}

module.exports = { seedDesserts, desserts };
