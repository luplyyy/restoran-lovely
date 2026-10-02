const db = require("../config/database");
const sortColumns = { id: "id", nama: "nama", harga: "harga" };

function validateMenu(menu) {
    if (!String(menu.nama || "").trim() || !String(menu.kategori || "").trim()) return "Nama dan kategori wajib diisi";
    if (!Number.isFinite(Number(menu.harga)) || Number(menu.harga) <= 0) return "Harga harus lebih besar dari 0";
    if (!["tersedia", "habis"].includes(menu.status)) return "Status menu tidak valid";
    return null;
}

async function getAllMenu(req, res) {
    try {
        const conditions = [];
        const values = [];
        const search = String(req.query.q || req.query.search || "").trim();
        const category = String(req.query.kategori || "").trim();
        const status = String(req.query.status || "").trim();
        if (search) {
            conditions.push("(nama LIKE ? OR deskripsi LIKE ?)");
            values.push(`%${search}%`, `%${search}%`);
        }
        if (category && category !== "Semua") {
            conditions.push("kategori = ?");
            values.push(category);
        }
        if (["tersedia", "habis"].includes(status)) {
            conditions.push("status = ?");
            values.push(status);
        }
        const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 12));
        const offset = (page - 1) * limit;
        const sortColumn = sortColumns[req.query.sortBy] || "id";
        const direction = String(req.query.order || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";
        const [[{ totalItems }]] = await db.query(`SELECT COUNT(*) AS totalItems FROM menu${where}`, values);
        const [rows] = await db.query(
            `SELECT * FROM menu${where} ORDER BY ${sortColumn} ${direction} LIMIT ? OFFSET ?`,
            [...values, limit, offset]
        );
        res.json({
            success: true,
            data: rows,
            pagination: { totalItems: Number(totalItems), totalPages: Math.max(1, Math.ceil(Number(totalItems) / limit)), currentPage: page, limit }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil data menu" });
    }
}

async function getCategories(req, res) {
    try {
        const [rows] = await db.query("SELECT kategori, COUNT(*) AS count FROM menu GROUP BY kategori ORDER BY kategori ASC");
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil kategori menu" });
    }
}

async function getMenuStats(req, res) {
    try {
        const [[stats]] = await db.query(`
            SELECT COUNT(*) AS totalMenu, COALESCE(SUM(status = 'tersedia'), 0) AS totalTersedia,
                   COUNT(DISTINCT kategori) AS totalKategori, COALESCE(AVG(harga), 0) AS hargaRataRata
            FROM menu
        `);
        res.json({ success: true, data: {
            totalMenu: Number(stats.totalMenu), totalTersedia: Number(stats.totalTersedia),
            totalKategori: Number(stats.totalKategori), hargaRataRata: Number(stats.hargaRataRata)
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil statistik menu" });
    }
}

async function getMenuById(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal mengambil data menu" });
    }
}

async function createMenu(req, res) {
    const menu = {
        nama: String(req.body.nama || "").trim(), kategori: String(req.body.kategori || "").trim(),
        harga: Number(req.body.harga), deskripsi: String(req.body.deskripsi || "").trim(),
        status: req.body.status || "tersedia", gambar: String(req.body.gambar || "").trim() || null
    };
    const validationError = validateMenu(menu);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    try {
        const [result] = await db.query(
            "INSERT INTO menu (nama, kategori, harga, deskripsi, status, gambar) VALUES (?, ?, ?, ?, ?, ?)",
            [menu.nama, menu.kategori, menu.harga, menu.deskripsi, menu.status, menu.gambar]
        );
        res.status(201).json({ success: true, message: "Menu berhasil ditambahkan", data: { id: result.insertId, ...menu } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal menambahkan menu" });
    }
}

async function updateMenu(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM menu WHERE id = ?", [req.params.id]);
        if (!rows.length) return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });
        const existing = rows[0];
        const menu = {
            nama: String(req.body.nama ?? existing.nama).trim(),
            kategori: String(req.body.kategori ?? existing.kategori).trim(),
            harga: Number(req.body.harga ?? existing.harga),
            deskripsi: String(req.body.deskripsi ?? existing.deskripsi ?? "").trim(),
            status: req.body.status ?? existing.status,
            gambar: String(req.body.gambar ?? existing.gambar ?? "").trim() || null
        };
        const validationError = validateMenu(menu);
        if (validationError) return res.status(400).json({ success: false, message: validationError });
        await db.query(
            "UPDATE menu SET nama = ?, kategori = ?, harga = ?, deskripsi = ?, status = ?, gambar = ? WHERE id = ?",
            [menu.nama, menu.kategori, menu.harga, menu.deskripsi, menu.status, menu.gambar, req.params.id]
        );
        res.json({ success: true, message: "Menu berhasil diperbarui", data: { id: Number(req.params.id), ...menu } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal memperbarui menu" });
    }
}

async function deleteMenu(req, res) {
    try {
        const [result] = await db.query("DELETE FROM menu WHERE id = ?", [req.params.id]);
        if (!result.affectedRows) return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });
        res.json({ success: true, message: "Menu berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Gagal menghapus menu" });
    }
}

module.exports = { getAllMenu, getCategories, getMenuStats, getMenuById, createMenu, updateMenu, deleteMenu };
