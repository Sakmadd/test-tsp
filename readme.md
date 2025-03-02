# 🚀 Panduan Menjalankan Aplikasi dengan & tanpa Docker

Selamat datang! Terima kasih telah meluangkan waktu untuk mereview proyek ini. Berikut adalah panduan lengkap untuk menjalankan aplikasi ini dengan mudah.

---

## 🐳 Menjalankan dengan Docker (Direkomendasikan)

**Pastikan port `3000` (backend) dan `4173` (frontend) tersedia.**

### 1️⃣ **Buka Terminal**

Navigasikan ke folder yang berisi file `docker-compose.yml`.

### 2️⃣ **Jalankan perintah berikut:**

```sh
docker-compose up --build
```

Tunggu hingga proses selesai, lalu aplikasi siap digunakan! 🎉

---

## ⚡ Menjalankan Secara Manual (Tanpa Docker)

Pastikan Anda telah menginstal **Node.js** dan **npm** di sistem Anda.

### 1️⃣ **Buat file `.env` di root project frontend & backend**

Isi file `.env` sesuai kebutuhan masing-masing aplikasi.

### 2️⃣ **Jalankan Backend**

**Mode Development:**

```sh
cd backend
npm install
npm run dev
```

**Mode Production:**

```sh
cd backend
npm install
npm run build
npm run start
```

### 3️⃣ **Jalankan Frontend**

**Mode Development:**

```sh
cd frontend
npm install
npm run dev
```

**Mode Production:**

```sh
cd frontend
npm install
npm run build
npm run preview
```

---

## ❤️ Terima Kasih!

Saya **Ahmad Safii**, sangat berterima kasih atas waktu dan perhatian Anda dalam mereview proyek ini. Setiap detik yang Anda luangkan sangat berarti bagi saya. Semoga aplikasi ini bermanfaat! 🚀
