-- Inisialisasi schema dan tabel untuk aplikasi log
-- File ini akan dijalankan otomatis oleh image MariaDB saat pertama kali container dibuat

-- Pastikan menggunakan database yang dibuat melalui variabel MARIADB_DATABASE
USE log_db;

CREATE TABLE IF NOT EXISTS logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index opsional untuk pencarian berdasarkan waktu
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs (timestamp);