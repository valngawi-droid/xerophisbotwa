import config from "../../config.js";
import { getDatabase } from "../../src/lib/ourin-database.js";
import { normalizePhone } from "../../src/lib/xerophis-region.js";

const pluginConfig = {
  name: "checkban",
  alias: [],
  category: "owner",
  description: "Cek status ban user (reply/tag/nomor, semua negara)",
  usage: ".checkban [@user|nomor]",
  isOwner: true,
};

async function handler(m, { sock }) {
  const db = getDatabase();

  // Target: reply > mention > argumen nomor > pengirim sendiri.
  // Nomor negara manapun diterima (Mali 223, Rusia 7, dst.)
  let target = m.quoted?.sender || "";
  if (!target && m.mentionedJid?.length) target = m.mentionedJid[0];
  if (!target && m.args?.[0]) {
    const n = normalizePhone(m.args[0]);
    if (n) target = n + "@s.whatsapp.net";
  }
  if (!target) target = m.sender;

  // Test logic from config.js directly
  const cleanNumber = target
    .split(":")[0]
    .split("@")[0]
    .replace(/[^0-9]/g, "");
  let bannedList = config.bannedUsers || [];
  const savedBanned = db.setting("bannedUsers") || [];

  const combined = [...new Set([...bannedList, ...savedBanned])];

  const isBannedDirect = combined.some((banned) => {
    const cleanBanned = banned
      .split(":")[0]
      .split("@")[0]
      .replace(/[^0-9]/g, "");
    return (
      cleanNumber === cleanBanned ||
      cleanNumber.endsWith(cleanBanned) ||
      cleanBanned.endsWith(cleanNumber)
    );
  });

  // Evaluate fully:
  const finalResult = config.isBanned(target);

  let dbStatus = db.setting("bannedUsers");

  await m.reply(`DEBUG BAN (${target})
cleanNumber: ${cleanNumber}
bannedList (config): ${JSON.stringify(bannedList)}
savedBanned (db): ${JSON.stringify(savedBanned)}
isBannedDirect: ${isBannedDirect}
config.isBanned(): ${finalResult}
isOwner(): ${config.isOwner(target)}`);
}

export { pluginConfig as config, handler };
