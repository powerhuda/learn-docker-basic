# Dockerfile untuk aplikasi Express.js yang terhubung ke MariaDB

# Gunakan image Node.js yang ringan
FROM node:20-alpine

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file aplikasi
COPY server.js db.js ./

# Salin file environment agar dotenv bisa membacanya saat runtime
# Catatan: Anda juga bisa memasok environment lewat docker run atau docker compose
COPY .env.docker .env

# Inisialisasi project dan install dependency runtime
# (Karena tidak ada package.json di folder ini, kita init minimal lalu install paket yang dibutuhkan)
RUN npm init -y \
    && npm install express mariadb dotenv multer \
    && npm cache clean --force

# Set environment
ENV NODE_ENV=production

# Buka port aplikasi
EXPOSE 3000

# Perintah menjalankan server
CMD ["node", "server.js"]