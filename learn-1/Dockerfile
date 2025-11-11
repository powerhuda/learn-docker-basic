# Tahap 1: Tentukan Base Image
# Menggunakan image Nginx resmi yang stabil (alpine adalah versi ringan)
FROM nginx:stable-alpine

# Tahap 2: Copy File ke Dalam Image
# Menyalin file index.html lokal ke direktori default Nginx
# /usr/share/nginx/html/ adalah lokasi di mana Nginx mencari file web.
COPY index.html /usr/share/nginx/html/index.html

# Tahap 3: Ekspos Port
# Memberi tahu Docker bahwa kontainer akan mendengarkan pada port 80 (port default HTTP)
EXPOSE 80

# Tahap 4: Menjalankan Perintah (Opsional tapi sering ada)
# Nginx base image sudah memiliki CMD default, jadi ini tidak wajib.
# Namun, secara umum CMD/ENTRYPOINT menentukan perintah yang dijalankan saat kontainer dimulai.
CMD ["nginx", "-g", "daemon off;"]