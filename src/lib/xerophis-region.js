/**
 * Xerophis Bot — Region & Phone Helper (multi-country)
 * =====================================================
 * Bot ini berjalan di nomor negara MANAPUN.
 * Negara utama: Mali (+223, Africa/Bamako) & Rusia (+7, Europe/Moscow).
 *
 * Aturan normalisasi (tidak ada lagi paksaan kode "62"):
 *  - Bersihkan semua karakter non-digit (+, spasi, strip, dll).
 *  - Awalan "00" (format internasional) -> dibuang.
 *  - Awalan "0" (format lokal) -> diganti kode negara default
 *    (BOT_TZ env DEFAULT_COUNTRY, bawaan "223" = Mali).
 *  - Selain itu nomor dibiarkan apa adanya (format internasional penuh).
 *
 * Contoh:
 *  normalizePhone("+223 70 12 34 56") -> "22370123456"  (Mali)
 *  normalizePhone("79225440657")       -> "79225440657" (Rusia)
 *  normalizePhone("62812-3456-7890")   -> "6281234567890" (Indonesia)
 *  normalizePhone("081234567890")      -> "22381234567890" (lokal -> Mali)
 *  normalizePhone("0033751234567")     -> "33751234567" (Prancis via 00)
 */

export const TIMEZONE =
  process.env.BOT_TZ || process.env.TZ || "Africa/Bamako";

export const LOCALE = process.env.BOT_LOCALE || "id";

/** Kode negara default untuk nomor format lokal "0..." (Mali = 223). */
export const DEFAULT_COUNTRY_CODE = String(
  process.env.DEFAULT_COUNTRY || "223",
).replace(/\D/g, "");

/** Label zona waktu untuk teks tampilan (GMT / MSK / WIB / ...). */
const TZ_ABBR = {
  "Africa/Bamako": "GMT",
  "Europe/Moscow": "MSK",
  "Asia/Jakarta": "WIB",
  "Asia/Makassar": "WITA",
  "Asia/Jayapura": "WIT",
  UTC: "UTC",
};
export const TZ_LABEL =
  TZ_ABBR[TIMEZONE] || TIMEZONE.split("/").pop().replace(/_/g, " ");

/** Negara prioritas — bot dijamin berjalan di semuanya. */
export const SUPPORTED_COUNTRIES = [
  { name: "Mali", code: "223", timezone: "Africa/Bamako", example: "22370123456" },
  { name: "Rusia", code: "7", timezone: "Europe/Moscow", example: "79225440657" },
  { name: "Indonesia", code: "62", timezone: "Asia/Jakarta", example: "6281234567890" },
];

/** Ambil digit saja dari input apa pun. */
export function cleanDigits(input) {
  return String(input ?? "").replace(/\D/g, "");
}

/**
 * Normalisasi nomor ke format internasional TANPA "+" (siap jadi JID WA).
 * @param {string} input nomor mentah (boleh +62..., 08..., 00..., spasi, strip)
 * @param {string} [fallbackCountry] kode negara untuk format lokal "0..."
 * @returns {string} digit internasional, "" jika kosong
 */
export function normalizePhone(input, fallbackCountry = DEFAULT_COUNTRY_CODE) {
  let d = cleanDigits(input);
  if (!d) return "";
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) {
    const cc = cleanDigits(fallbackCountry) || DEFAULT_COUNTRY_CODE;
    d = cc + d.slice(1);
  }
  return d;
}

/** "22370..." -> "22370...@s.whatsapp.net" */
export function toJid(input, fallbackCountry) {
  const n = normalizePhone(input, fallbackCountry);
  return n ? `${n}@s.whatsapp.net` : "";
}

/** Validasi panjang nomor internasional (8–15 digit, standar E.164 maks 15). */
export function isValidPhone(input, minLen = 8, maxLen = 15) {
  const d = normalizePhone(input);
  return d.length >= minLen && d.length <= maxLen;
}

/** Tebak negara dari kode panggilan (untuk label tampilan saja). */
export function detectCountry(input) {
  const d = cleanDigits(input);
  const sorted = [...SUPPORTED_COUNTRIES].sort(
    (a, b) => b.code.length - a.code.length,
  );
  for (const c of sorted) {
    if (d.startsWith(c.code)) return c;
  }
  return null;
}

/** Nama negara atau "Internasional" bila tak dikenal. */
export function countryOf(input) {
  return detectCountry(input)?.name || "Internasional";
}

/**
 * Format tampil "+223 70 12 34 56" untuk nomor apa pun.
 * Tidak pernah melempar error (fallback "+digit").
 */
export async function formatIntl(input) {
  const d = normalizePhone(input);
  if (!d) return "Unknown";
  try {
    const { parsePhoneNumber } = await import("awesome-phonenumber");
    const pn = parsePhoneNumber("+" + d);
    if (pn?.valid) return pn.number.international;
  } catch {}
  return "+" + d;
}

/** Versi sinkron (tanpa lib): cukup "+digit". */
export function formatIntlSync(input) {
  const d = normalizePhone(input);
  return d ? "+" + d : "Unknown";
}
