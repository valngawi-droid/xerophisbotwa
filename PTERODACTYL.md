# 🦖 XEROPHIS BOT di PTERODACTYL (via Termux → ZIP → Upload)

Alur resmi: **git clone di Termux → edit `config.js` → zip → upload ke panel → install → start.**

Bot mendukung nomor negara manapun — utama **Mali (+223)** & **Rusia (+7)**.

---

## 1️⃣ Di Termux (HP)

```bash
pkg update && pkg install git zip nano nodejs -y
git clone https://github.com/valngawi-droid/xerophisbotwa.git
cd xerophisbotwa
nano config.js
```

### Yang WAJIB diisi di `config.js`

| Bagian | Isi | Contoh |
|---|---|---|
| `session.pairingNumber` | Nomor WA bot, format internasional TANPA `+` | `"22370123456"` (Mali) / `"79225440657"` (Rusia) |
| `owner.number` | Nomor owner (bisa banyak) | `["22370123456", "79225440657"]` |
| `bot.name` / `bot.developer` | Sudah `Xerophis Bot` / `Pall`, ubah bila mau | — |
| `region` | Zona waktu & kode default | `timezone: "Africa/Bamako"` (Mali), `"Europe/Moscow"` (Rusia) |

> Nomor format `+223...`, `00223...`, `223...`, sampai lokal `07...` semuanya diterima.
> Fitur `.cekxl` doang yang khusus nomor Indonesia — sisanya global.

### Bikin zip-nya

```bash
bash zip-for-panel.sh
# hasil: xerophis-bot-panel.zip
```

Pindahkan zip ke tempat yang gampang diakses, atau upload langsung dari HP.

---

## 2️⃣ Di Panel Pterodactyl

1. **Server pakai egg `NodeJS`** (versi 22). Startup command:
   ```
   node index.js
   ```
   (atau `npm start` — sama saja)
2. **Upload** `xerophis-bot-panel.zip` via File Manager → klik kanan → **Extract**.
3. Buka tab **Console**, jalankan sekali:
   ```bash
   npm install
   ```
   Tunggu sampai selesai (bot butuh `ffmpeg`, `sharp`, `canvas` — butuh internet di node panel).
4. Klik **Start**. Kalau `pairingNumber` kosong, bot akan **menanya nomor di console** — ketik langsung di console, pairing code muncul di situ.
5. Buka WA di HP → *Perangkat Tertaut → Tautkan* → masukkan kode. ✅

### Yang jangan dihapus di panel

| Folder | Isi | Keterangan |
|---|---|---|
| `storage/` | Session login WA | **Jangan share/hapus** — kalau hilang harus pairing ulang |
| `database/` | Data user, premium, sewa, setting | Backup berkala via `.backupsc` |
| `config.js` | Semua pengaturan | Edit di Termux lalu upload ulang, atau edit di File Manager |

> Tombol **Reinstall** di panel = semua file balik fresh. Backup `storage/` + `database/` + `config.js` dulu sebelum reinstall.

---

## 3️⃣ Spek & Troubleshooting

- **RAM minimal 1 GB** (2 GB nyaman — 760 plugin + canvas berat di awal).
- `npm install` gagal (sharp/canvas)? Coba `npm install --ignore-scripts`, sebagian fitur gambar nonaktif tapi bot tetap jalan.
- Kena **konflik 440 / logout sendiri** = ada 2 bot pakai session sama. Matikan salah satu, atau hapus `storage/` lalu pairing ulang.
- Ganti nomor bot = ubah `pairingNumber`, hapus folder `storage/`, restart.
- API key error (transkrip/AI tertentu)? Isi key sendiri di `config.js` → `APIkey` (groq gratis di `console.groq.com`).
- `.updatescript` akan **menimpa Xerophis kembali ke Ourin** — jangan dijalankan kecuali memang mau balik ke script asli.

Selamat menjalankan Xerophis Bot! 🤖
