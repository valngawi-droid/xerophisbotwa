import { getAssetBuffer } from "../../src/lib/ourin-asset-manager.js";
import config from "../../config.js"

const pluginConfig = {
    name: "sc",
    alias: ["script"],
    category: "main",
    description: "Info script & channel Xerophis Bot",
    usage: ".sc",
    example: ".sc",
    isPremium: false,
    isOwner: false,
    isBanned: false,
    isAdmin: false,
    cooldown: 10,
    energi: 0,
    isBotAdmin: false,
    isEnabled: true
}

async function handler(m, { sock }) {
    const botName = config.bot?.name || "Xerophis Bot"
    const developer = config.bot?.developer || "Pall"
    const channel = config.saluran?.link || "https://whatsapp.com/channel/0029VbB37bgBfxoAmAlsgE0t"
    return await sock.sendMessage(m.chat, {
        image: getAssetBuffer("xerophis") || getAssetBuffer("ourin"),
        caption: `🤖 Halo kak *${m.pushName}*\n\nAku *${botName}* — bot WhatsApp multi-negara (🇲🇱 Mali • 🇷🇺 Rusia • 🌍 Global), dikembangkan oleh *${developer}*.\n\n📢 Info & update bot ada di channel resmi di bawah ya!`,
        footer: `© ${botName} • by ${developer}`,
        interactiveButtons: [
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "📢 Channel Xerophis",
                    url: channel,
                    merchant_url: channel
                })
            }
        ]

    }, { quoted: m })
}

export { pluginConfig as config, handler }
