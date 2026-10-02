const axios = require("axios");

async function runTests() {
    const { startServer } = require("./server");
    const server = await startServer();

    const base = "http://localhost:3000/api";

    try {
        console.log("=== RUNNING API VERIFICATION TESTS ===");

        // 1. Health check
        const healthRes = await axios.get(`${base}/health`);
        console.log("✔ Health Check:", healthRes.data.status);

        // 2. Stats
        const statsRes = await axios.get(`${base}/menu/stats`);
        console.log("✔ Stats Endpoint:", statsRes.data.data);

        // 3. Categories
        const catRes = await axios.get(`${base}/menu/categories`);
        console.log("✔ Categories count:", catRes.data.data.length);

        // 4. Search query
        const searchRes = await axios.get(`${base}/menu?search=rendang`);
        console.log(`✔ Search 'rendang' found: ${searchRes.data.pagination.totalItems} items`);

        // 5. Category filter & pagination
        const seafoodRes = await axios.get(`${base}/menu?kategori=Seafood&limit=5`);
        console.log(`✔ Filter Seafood: got ${seafoodRes.data.data.length} items of ${seafoodRes.data.pagination.totalItems}`);

        // 6. Create Menu
        const createRes = await axios.post(`${base}/menu`, {
            nama: "Teh Talua Bukittinggi Super",
            kategori: "Minuman",
            harga: 17000,
            deskripsi: "Minuman tradisional khas Minang dari seduhan teh pekat berbusa telur bebek lembut.",
            status: "tersedia"
        });
        const createdId = createRes.data.data.id;
        console.log(`✔ Created Item ID: ${createdId} (${createRes.data.data.nama})`);

        // 7. Update Menu
        const updateRes = await axios.put(`${base}/menu/${createdId}`, {
            harga: 19000,
            status: "tersedia"
        });
        console.log(`✔ Updated Item ID ${createdId} new price: Rp ${updateRes.data.data.harga}`);

        // 8. Delete Menu
        const deleteRes = await axios.delete(`${base}/menu/${createdId}`);
        console.log(`✔ Delete Item ID ${createdId}: ${deleteRes.data.message}`);

        console.log("=========================================");
        console.log("🎉 ALL API ENDPOINTS FUNCTION PERFECTLY!");
        console.log("=========================================");
    } catch (error) {
        console.error("❌ Test failed:", error.response ? error.response.data : error.message);
        process.exitCode = 1;
    } finally {
        await new Promise(resolve => server.close(resolve));
        await require("./config/database").end();
    }
}

runTests();
