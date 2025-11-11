## 📄 Sintaks Dasar Dockerfile

Dockerfile adalah cetak biru untuk membuat *image*. Setiap perintah menciptakan sebuah *layer*.

### 1. Instruksi Dasar

* **`FROM <image>:<tag>`**
    * **Deskripsi:** Perintah **wajib pertama**. Menentukan *Base Image* yang akan digunakan sebagai fondasi.
    * **Contoh:**
        ```markdown
        FROM node:20-alpine
        ```

* **`RUN <command>`**
    * **Deskripsi:** Mengeksekusi perintah dalam *shell* baru (misalnya instalasi paket). Perintah ini menciptakan **Layer baru**.
    * **Contoh:**
        ```markdown
        RUN apk update && apk add git
        ```

* **`COPY <src> <dest>`**
    * **Deskripsi:** Menyalin file atau direktori dari sistem *host* (di dalam *Build Context*) ke *image* Docker.
    * **Contoh:**
        ```markdown
        COPY package.json /app/
        ```

* **`CMD ["executable", "param1", "param2"]`**
    * **Deskripsi:** Menyediakan perintah *default* yang akan dieksekusi saat kontainer diluncurkan. Hanya boleh ada **satu**.
    * **Contoh:**
        ```markdown
        CMD ["npm", "start"]
        ```

* **`ENTRYPOINT ["executable", "param1"]`**
    * **Deskripsi:** Mengkonfigurasi kontainer untuk dijalankan sebagai *executable*. Sering digunakan untuk *script* inisialisasi.
    * **Contoh:**
        ```markdown
        ENTRYPOINT ["/usr/src/app/start.sh"]
        ```

### 2. Konfigurasi Lingkungan

* **`WORKDIR /path/to/workdir`**
    * **Deskripsi:** Menetapkan direktori kerja untuk semua perintah `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, dan `ADD` selanjutnya.
    * **Contoh:**
        ```markdown
        WORKDIR /usr/src/app
        ```

* **`ENV <key>=<value>`**
    * **Deskripsi:** Menyetel variabel lingkungan di dalam *image*. Variabel ini tersedia saat *build* dan *runtime*.
    * **Contoh:**
        ```markdown
        ENV NODE_ENV=production
        ```

* **`EXPOSE <port>`**
    * **Deskripsi:** Mendokumentasikan port yang didengarkan oleh aplikasi di dalam kontainer (bukan membuka port *firewall*).
    * **Contoh:**
        ```markdown
        EXPOSE 3000
        ```

* **`VOLUME /path/to/volume`**
    * **Deskripsi:** Menandai *mount point* yang akan menyimpan data persisten di luar kontainer.
    * **Contoh:**
        ```markdown
        VOLUME /var/lib/mysql
        ```

---

## 🐳 Perintah Dasar Docker CLI

Perintah yang digunakan untuk berinteraksi dengan **Docker Daemon** (Host Docker).

### 1. Manajemen Kontainer

| Perintah | Deskripsi | Contoh |
| :--- | :--- | :--- |
| **`docker run`** | Membuat dan menjalankan kontainer baru dari *image*. Menggunakan flag `-d` untuk *detached* (background) dan `-p` untuk *port mapping*. | `docker run -d -p 80:80 --name webserver nginx` |
| **`docker ps`** | Menampilkan daftar kontainer yang **sedang berjalan**. Gunakan `-a` untuk semua kontainer (berjalan & berhenti). | `docker ps -a` |
| **`docker start` / `docker stop`** | Memulai / menghentikan kontainer yang sudah ada. | `docker start webserver` |
| **`docker rm`** | Menghapus satu atau lebih kontainer yang sudah berhenti. | `docker rm webserver` |
| **`docker logs`** | Mengambil dan menampilkan *output log* dari kontainer. | `docker logs -f webserver` |
| **`docker exec`** | Menjalankan perintah di dalam kontainer yang **sedang berjalan**. | `docker exec -it webserver /bin/bash` |

### 2. Manajemen Image

| Perintah | Deskripsi | Contoh |
| :--- | :--- | :--- |
| **`docker build`** | Membuat Docker *image* dari **Dockerfile** di direktori saat ini. | `docker build -t my-app:v1 .` |
| **`docker images`** | Menampilkan daftar *image* yang tersimpan di mesin lokal. | `docker images` |
| **`docker pull`** | Mengunduh *image* dari *registry* (misalnya Docker Hub). | `docker pull ubuntu:latest` |
| **`docker push`** | Mengunggah *image* lokal ke *registry*. | `docker push username/my-app:v1` |
| **`docker rmi`** | Menghapus satu atau lebih *image* dari mesin lokal. | `docker rmi my-app:v1` |

### 3. Perintah Pembersihan

* **`docker system prune`**
    * **Deskripsi:** Membersihkan sumber daya Docker yang tidak digunakan (*unused*): kontainer yang berhenti, jaringan yang tidak terhubung, *cache build*, dan *image* yang "menggantung" (*dangling*).
    * **Contoh:**
        ```markdown
        docker system prune -a
        ```

## 📝 Sintaks Dasar Docker Compose YAML

Docker Compose menggunakan file YAML (biasanya `docker-compose.yaml`) untuk mendefinisikan *services*, *networks*, dan *volumes* aplikasi multi-kontainer.

### 1. Struktur Utama

* **`version: "<string>"`**
    * **Deskripsi:** Mendefinisikan versi Compose file format yang digunakan. Versi `3.x` adalah yang paling umum untuk *deployment*.
    * **Contoh:**
        ```yaml
        version: "3.8"
        ```

* **`services:`**
    * **Deskripsi:** Bagian utama tempat Anda mendefinisikan semua kontainer (layanan) yang membentuk aplikasi Anda. Setiap *key* di bawahnya adalah nama *service* (yang juga menjadi *hostname* internal).
    * **Contoh:**
        ```yaml
        services:
          web:
            # ... konfigurasi layanan web
          db:
            # ... konfigurasi layanan database
        ```

### 2. Konfigurasi Layanan (`services`)

* **`image: <string>`**
    * **Deskripsi:** Menentukan *image* Docker yang akan digunakan untuk *service* ini.
    * **Contoh:**
        ```yaml
        image: nginx:latest
        ```

* **`build: <context>`**
    * **Deskripsi:** Memberi tahu Compose untuk membangun *image* secara lokal menggunakan `Dockerfile` yang ada di direktori `<context>` (biasanya `.` atau `path/to/dir`).
    * **Contoh:**
        ```yaml
        build: . 
        ```

* **`ports: [ "HOST_PORT:CONTAINER_PORT" ]`**
    * **Deskripsi:** Memetakan port dari kontainer ke port di mesin *Host* (untuk akses eksternal).
    * **Contoh:**
        ```yaml
        ports:
          - "8080:80"
        ```

* **`volumes: [ "HOST_PATH:CONTAINER_PATH" ]`**
    * **Deskripsi:** Untuk *Bind Mounts* (menghubungkan folder *host* ke kontainer). Juga digunakan untuk mendefinisikan *Named Volumes*.
    * **Contoh:**
        ```yaml
        volumes:
          - ./app:/usr/src/app  # Bind Mount untuk kode
          - db_data:/var/lib/mysql # Named Volume
        ```

* **`environment:`**
    * **Deskripsi:** Menetapkan variabel lingkungan di dalam kontainer. Penting untuk konfigurasi database, kunci API, dll.
    * **Contoh:**
        ```yaml
        environment:
          MYSQL_ROOT_PASSWORD: secret
          NODE_ENV: production
        ```

* **`depends_on: [ "<service_name>" ]`**
    * **Deskripsi:** Mendefinisikan urutan ketergantungan *startup* layanan (misalnya, *web* harus menunggu *db* dimulai).
    * **Contoh:**
        ```yaml
        depends_on:
          - db
        ```

* **`restart: <policy>`**
    * **Deskripsi:** Menentukan kapan kontainer harus dimulai ulang secara otomatis.
    * **Contoh:**
        ```yaml
        restart: always  # Selalu restart
        restart: on-failure # Restart jika keluar dengan kode error
        ```

### 3. Volume dan Jaringan

* **`volumes:`**
    * **Deskripsi:** Mendefinisikan *Named Volumes* yang digunakan untuk persistensi data, terpisah dari `services:`.
    * **Contoh:**
        ```yaml
        volumes:
          db_data: # Nama volume
        ```

* **`networks:`**
    * **Deskripsi:** Mendefinisikan jaringan kustom. Secara *default*, Compose membuat jaringan *bridge* untuk semua *services*.
    * **Contoh:**
        ```yaml
        networks:
          app_net:
            driver: bridge
        ```

---

## 💻 Perintah Dasar Docker Compose CLI

Perintah-perintah ini dijalankan di direktori yang berisi file `docker-compose.yaml`.

| Perintah | Deskripsi | Contoh |
| :--- | :--- | :--- |
| **`docker compose up`** | Membangun *image* yang diperlukan (jika belum ada) dan membuat serta menjalankan kontainer untuk semua layanan dalam file YAML. | `docker compose up -d` |
| **`-d` (flag)** | Menjalankan kontainer dalam mode *detached* (di *background*). | `docker compose up -d` |
| **`docker compose down`** | Menghentikan dan menghapus kontainer serta jaringan yang dibuat oleh `up`. Tambahkan `--volumes` untuk menghapus *Named Volumes*. | `docker compose down --volumes` |
| **`docker compose ps`** | Menampilkan status kontainer yang sedang berjalan dalam proyek Compose saat ini. | `docker compose ps` |
| **`docker compose build`** | Membangun atau membangun ulang *image* untuk layanan yang memiliki instruksi `build:` tanpa menjalankan kontainer. | `docker compose build` |
| **`docker compose logs`** | Menampilkan *output log* dari semua layanan. | `docker compose logs -f` |
| **`docker compose exec`** | Menjalankan perintah di dalam kontainer yang sedang berjalan. | `docker compose exec web /bin/sh` |
| **`docker compose start` / `stop`** | Memulai / menghentikan kontainer yang ada tanpa menghapusnya. | `docker compose stop db` |