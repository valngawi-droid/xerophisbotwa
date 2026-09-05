# 🤖 XEROPHIS BOT

WhatsApp Multi-Device Bot **multi-negara** — berjalan di nomor negara manapun.
Negara utama: **Mali (+223)** & **Rusia (+7)**. Developer: **Pall**.

> 🦖 **Run di Pterodactyl?** Baca **[PTERODACTYL.md](PTERODACTYL.md)** —
> alur Termux (git clone → edit `config.js` → zip) → upload → install → start.

Fitur: 760+ plugin modular (AI, downloader, game, grup, stiker, RPG, store, panel, dsb),
pairing code & QR, multi-zona-waktu, owner multi-nomor, premium/partner/sewa grup.

## ⚡ Cara Jalanin

```bash
npm install
cp .env.example .env   # lalu isi nomor kamu
npm start
```

Isi `.env` minimal:

```env
PAIRING_NUMBER=22370123456   # nomor WA bot (Mali). Rusia contoh: 79225440657
OWNER_NUMBER=22370123456     # nomor owner (bisa banyak, koma)
BOT_TZ=Africa/Bamako         # Mali. Rusia: Europe/Moscow
DEFAULT_COUNTRY=223          # kode negara utk nomor lokal "07xx..."
```

Masukkan **pairing code** yang muncul di terminal ke WhatsApp:
*Pengaturan → Perangkat Tertaut → Tautkan Perangkat*. Selesai ✅

Tanpa `.env` pun bisa — bot akan **menanyakan nomor secara interaktif** saat start,
dan semua setting bisa diubah di `config.js`.

## 🌍 Multi-Region

| Negara | Kode | Zona waktu | Contoh |
|---|---|---|---|
| 🇲🇱 Mali | +223 | Africa/Bamako | 22370123456 |
| 🇷🇺 Rusia | +7 | Europe/Moscow | 79225440657 |
| 🇮🇩 Indonesia | +62 | Asia/Jakarta | 6281234567890 |

- Nomor format `+223...`, `00223...`, `223...`, `07...` (lokal) semuanya diterima.
- Jadwal harian/reset/sholat mengikuti `BOT_TZ`.
- Satu-satunya fitur khusus-Indonesia: `.cekxl` (cek kuota XL/Axis).

## ⚙️ Konfigurasi Penting (`config.js` / `.env`)

| Item | Lokasi |
|---|---|
| Nomor bot (pairing) | `PAIRING_NUMBER` / `config.session.pairingNumber` |
| Nomor owner | `OWNER_NUMBER` / `config.owner.number` |
| Nama bot / developer | `config.bot` (Xerophis Bot / Pall) |
| Prefix command | `config.command.prefix` (bawaan `.`) |
| API keys | `config.APIkey` / variabel `*_KEY` di `.env` |

## 📁 Struktur

```
index.js            → entry point
config.js           → semua pengaturan + nomor + API key
case/               → command inti (ping, dsb)
plugins/            → 760+ fitur per kategori
src/lib/            → library inti
  xerophis-region.js → helper multi-negara (timezone + nomor)
src/connection.js   → koneksi WhatsApp (pairing/QR)
database/           → data bot (jangan dihapus)
storage/            → session login (JANGAN dishare!)
```

## ⚠️ Penting

- Folder `storage/` = session login. **Jangan bagikan ke siapa pun.**
- Jangan jalankan 2 bot dengan session yang sama (kena konflik 440).
- Ganti API key bawaan dengan milikmu sendiri (lihat `.env.example`).
- Fitur `.updatescript` **dimatikan** — ia menarik script upstream yang akan menghapus identitas Xerophis.

## 📜 License

ISC — © Pall (Xerophis Bot)
