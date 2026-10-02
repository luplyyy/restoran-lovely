const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME || "db_restoran",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;