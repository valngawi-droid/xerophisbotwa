#!/bin/bash
# Xerophis Bot — bikin zip siap upload ke Pterodactyl.
# Dipakai di Termux / Linux setelah git clone & edit config.js:
#
#   git clone https://github.com/valngawi-droid/xerophisbotwa.git
#   cd xerophisbotwa
#   nano config.js   (isi nomor bot/owner, nama, dsb — lihat PTERODACTYL.md)
#   bash zip-for-panel.sh
#
# Hasil: xerophis-bot-panel.zip (tanpa .git, node_modules, session, .env)
# Upload file itu via File Manager panel -> Extract -> Install -> Start.

set -e
cd "$(dirname "$0")"

OUT="xerophis-bot-panel.zip"
rm -f "$OUT"

# zip tersedia? kalau belum: pkg install zip (Termux) / apt install zip (Linux)
if ! command -v zip >/dev/null 2>&1; then
  echo "❌ 'zip' belum terinstall."
  echo "   Termux : pkg install zip"
  echo "   Linux  : sudo apt install zip"
  exit 1
fi

zip -r -9 "$OUT" . \
  -x ".git/*" \
  -x "node_modules/*" \
  -x "storage/*" \
  -x "sessions/*" \
  -x "session/*" \
  -x "temp/*" "tmp/*" "logs/*" "*.log" \
  -x ".env" \
  -x "*.zip" \
  -x ".github/*" >/dev/null

echo "✅ Jadi: $OUT ($(du -h "$OUT" | cut -f1))"
echo "➡️  Upload ke Pterodactyl (File Manager) -> klik kanan -> Extract."
echo "➡️  Lalu buka Console panel, jalankan: npm install"
echo "➡️  Start server, masukkan nomor + pairing code. Lihat PTERODACTYL.md."
