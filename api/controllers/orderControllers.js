const crypto = require("crypto");
const db = require("../config/database");

async function createOrder(req, res) {
    const customerName = String(req.body.customerName || "").trim();
    const customerPhone = String(req.body.customerPhone || "").trim();
    const fulfillmentMethod = req.body.fulfillmentMethod;
    const deliveryAddress = String(req.body.deliveryAddress || "").trim();
    const notes = String(req.body.notes || "").trim();
    const phoneDigits = customerPhone.replace(/\D/g, "").length;
    const itemQuantities = new Map();

    if (customerName.length < 2 || customerName.length > 100) {
        return res.status(400).json({ success: false, message: "Nama pemesan harus 2-100 karakter" });
    }
    if (phoneDigits < 8 || phoneDigits > 16) {
        return res.status(400).json({ success: false, message: "Nomor telepon tidak valid" });
    }
    if (!["pickup", "delivery"].includes(fulfillmentMethod)) {
        return res.status(400).json({ success: false, message: "Pilih metode ambil atau antar" });
    }
    if (fulfillmentMethod === "delivery" && deliveryAddress.length < 8) {
        return res.status(400).json({ success: false, message: "Alamat antar harus diisi dengan lengkap" });
    }
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
        return res.status(400).json({ success: false, message: "Keranjang masih kosong" });
    }

    for (const item of req.body.items) {
        const menuId = Number(item.menuId);
        const quantity = Number(item.quantity);
        if (!Number.isInteger(menuId) || menuId < 1 || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            return res.status(400).json({ success: false, message: "Item atau jumlah pesanan tidak valid" });
        }
        itemQuantities.set(menuId, (itemQuantities.get(menuId) || 0) + quantity);
        if (itemQuantities.get(menuId) > 99 || itemQuantities.size > 20) {
            return res.status(400).json({ success: false, message: "Maksimal 20 jenis menu dan 99 item per menu" });
        }
    }

    let connection;
    let transactionOpen = false;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        transactionOpen = true;

        const menuIds = [...itemQuantities.keys()];
        const [menuRows] = await connection.query(
            "SELECT id, nama, harga, status FROM menu WHERE id IN (?) FOR UPDATE",
            [menuIds]
        );
        if (menuRows.length !== menuIds.length || menuRows.some(item => item.status !== "tersedia")) {
            await connection.rollback();
            transactionOpen = false;
            return res.status(409).json({ success: false, message: "Ada menu yang sudah tidak tersedia. Periksa keranjangmu." });
        }

        const menuById = new Map(menuRows.map(item => [Number(item.id), item]));
        const orderItems = menuIds.map(menuId => {
            const menu = menuById.get(menuId);
            const quantity = itemQuantities.get(menuId);
            const unitPrice = Number(menu.harga);
            return { menuId, menuName: menu.nama, quantity, unitPrice, lineTotal: unitPrice * quantity };
        });
        const totalAmount = orderItems.reduce((total, item) => total + item.lineTotal, 0);
        const orderCode = `LVV-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
        const [orderResult] = await connection.query(
            `INSERT INTO restaurant_orders
                (order_code, customer_name, customer_phone, fulfillment_method, delivery_address, order_notes, total_amount)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [orderCode, customerName, customerPhone, fulfillmentMethod, fulfillmentMethod === "delivery" ? deliveryAddress : null, notes || null, totalAmount]
        );

        for (const item of orderItems) {
            await connection.query(
                `INSERT INTO restaurant_order_items
                    (order_id, menu_id, menu_name, quantity, unit_price, line_total)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [orderResult.insertId, item.menuId, item.menuName, item.quantity, item.unitPrice, item.lineTotal]
            );
        }

        await connection.commit();
        transactionOpen = false;
        res.status(201).json({
            success: true,
            message: "Pesanan berhasil dicatat",
            order: {
                code: orderCode,
                status: "baru",
                totalAmount,
                fulfillmentMethod,
                items: orderItems.map(({ menuId, menuName, quantity, unitPrice, lineTotal }) => ({ menuId, menuName, quantity, unitPrice, lineTotal }))
            }
        });
    } catch (error) {
        if (connection && transactionOpen) await connection.rollback();
        console.error(error);
        res.status(500).json({ success: false, message: "Pesanan belum dapat disimpan. Silakan coba lagi." });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = { createOrder };
