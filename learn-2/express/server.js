// server.js
const express = require('express');
const { getConnection } = require('./db');

const app = express();
const port = 3000;

// Middleware untuk parsing body JSON
app.use(express.json());

// --- Rute API ---

// 1. POST /api/logs: Mencatat Log Baru
app.post('/api/logs', async (req, res) => {
    const { level, message } = req.body;

    if (!level || !message) {
        return res.status(400).json({ error: 'Level dan message diperlukan.' });
    }

    let conn;
    try {
        conn = await getConnection();
        
        const result = await conn.query(
            "INSERT INTO logs (level, message) VALUES (?, ?)", 
            [level, message]
        );

        res.status(201).json({ 
            id: result.insertId, 
            level, 
            message, 
            timestamp: new Date() 
        });

    } catch (err) {
        console.error("Kesalahan saat mencatat log:", err);
        res.status(500).json({ error: 'Gagal mencatat log ke database.' });
    } finally {
        if (conn) conn.end(); // Akhiri koneksi
    }
});

// 2. GET /api/logs: Mengambil Semua Log
app.get('/api/logs', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        const logs = await conn.query("SELECT * FROM logs ORDER BY timestamp DESC");
        res.status(200).json(logs);

    } catch (err) {
        console.error("Kesalahan saat mengambil log:", err);
        res.status(500).json({ error: 'Gagal mengambil log dari database.' });
    } finally {
        if (conn) conn.end();
    }
});

// --- Menjalankan Server ---
app.listen(port, () => {
    console.log(`Server log sederhana berjalan di http://localhost:${port}`);
});