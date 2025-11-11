// db.js
require('dotenv').config();
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    connectionLimit: 5
});

// Fungsi untuk mendapatkan koneksi
async function getConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        return conn;
    } catch (err) {
        console.error("Kesalahan koneksi database:", err);
        throw err;
    }
}

module.exports = {
    getConnection
};