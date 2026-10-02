const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const initDatabase = require("./config/initDb");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/api/health", (req, res) => {
    res.json({ success: true, status: "ok", message: "API Luvv's siap digunakan" });
});
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

async function startServer() {
    await initDatabase();
    return new Promise((resolve, reject) => {
        const server = app.listen(PORT, () => {
            console.log(`Luvv's berjalan di http://localhost:${PORT}`);
            resolve(server);
        });
        server.once("error", reject);
    });
}

if (require.main === module) {
    startServer().catch(error => {
        console.error("Server gagal dijalankan:", error.message);
        process.exitCode = 1;
    });
}

module.exports = { app, startServer };