## Cara Menjalankan Program dengan Docker Compose

Untuk menjalankan program ini menggunakan Docker, ikuti langkah-langkah berikut:

1. **Pastikan Docker dan Docker Compose sudah terinstal di komputer Anda.**

2. **Buka terminal atau command prompt, lalu arahkan ke direktori proyek ini.**

3. **Jalankan perintah berikut untuk membangun dan menjalankan container secara otomatis di background:**

   ```
   docker-compose up --build -d
   ```

   - `--build`: Memastikan image Docker dibangun ulang sebelum dijalankan.
   - `-d`: Menjalankan container dalam mode detached (background).

4. **Untuk memastikan semua service sudah berjalan, gunakan perintah:**

   ```
   docker-compose ps
   ```

5. **Jika ingin menghentikan semua container, gunakan perintah:**

   ```
   docker-compose down
   ```