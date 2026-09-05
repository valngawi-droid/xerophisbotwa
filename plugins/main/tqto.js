import config from '../../config.js'
import path from 'path'
import fs from 'fs'
import { AIRich } from '../../src/lib/ourin-builder.js'
const pluginConfig = {
    name: 'tqto',
    alias: ['thanksto', 'credits', 'kredit'],
    category: 'main',
    description: 'Menampilkan daftar kontributor bot',
    usage: '.tqto',
    example: '.tqto',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    energi: 0,
    isEnabled: true
}

async function handler(m, { sock }) {
    const botName = config.bot?.name || 'Xerophis Bot'
    const version = config.bot?.version || '1.0.0'
    const developer = config.bot?.developer || 'Pall'

    const ownerName = config.owner?.name || 'Pall'
    const credits = [
        { name: 'Pall', role: 'Developer & Creator Xerophis Bot', icon: '👑' },
        { name: ownerName, role: 'Owner Bot Ini', icon: '👨‍💻' },
        { name: 'Tim Xerophis', role: 'Staff & Moderator', icon: '🛡️' },
        { name: 'Para Donatur', role: 'Supporter', icon: '💝' },
        { name: 'Kalian Semua', role: 'Pengguna Terbaik', icon: '🌟' },
        { name: 'Open Source Community', role: 'Libraries & Tools', icon: '🌐' },

    ]

    const headers = ['No', 'Nama', 'Role / Tier']
    const rows = credits.map((c, i) => [i + 1, c.name, c.role])

    await m.reply(`🍟 *Berikut ini adalah orang orang yang sudah berkontribusi di bot ${config.bot.name}*
        
${credits.map((c, i) => `*${i + 1}*. *${c.name}* [ ${c.icon} ${c.role} ]`).join('\n')}}`)
}

export { pluginConfig as config, handler }