#langkah-langkah build dan menjalankan dockerfile

## Prasyarat
- Pastikan Docker Desktop terpasang dan berjalan di Windows.
- Pastikan file `Dockerfile` dan `index.html` berada di folder ini: `d:\program-security\learn\learn-docker-basic\learn-1\`.

## 1) Masuk ke folder proyek
```bash
cd /d d:\program-security\learn\learn-docker-basic\learn-1
```

## 2) Build image dari Dockerfile
- Perintah ini akan membuat image bernama `nginx-static:latest`.
```bash
docker build -t nginx-static:latest .
```

## 3) Jalankan container
- Map port host `8080` ke port container `80` (sesuai `EXPOSE 80` di Dockerfile).
```bash
docker run --name nginx-static -d -p 8080:80 nginx-static:latest
```

## 4) Verifikasi
- Buka browser dan akses `http://localhost:8080` untuk melihat `index.html` yang disajikan oleh Nginx.
- Cek container yang berjalan:
```bash
docker ps
```
- Lihat log container (opsional):
```bash
docker logs -f nginx-static
```

## 5) Hentikan & bersihkan (opsional)
- Hentikan container:
```bash
docker stop nginx-static
```
- Hapus container:
```bash
docker rm nginx-static
```
- Hapus image (jika tidak diperlukan lagi):
```bash
docker rmi nginx-static:latest
```

## Catatan
- Jika `http://localhost:8080` tidak bisa diakses (port 8080 sudah dipakai), ganti port host, misalnya:
```bash
docker run --name nginx-static -d -p 8081:80 nginx-static:latest
```
- Baris `COPY index.html /usr/share/nginx/html/index.html` di Dockerfile memastikan file HTML lokal Anda disajikan oleh Nginx di dalam container.