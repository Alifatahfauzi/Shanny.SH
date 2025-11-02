const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const { imageToWebp, writeExifImg, writeExifVid, getBuffer } = require('./library/webp');
const ConfigBaileys = require('./library/utils.js');

module.exports = async (sock, m) => {
    if(!m.command) return;
    const cmd = m.command;
    const arg = m.text || '';

    // ================= OWNER =================
    switch(cmd) {
        case 'addprem':
            await sock.sendMessage(m.chat, { text: '✅ Nomor berhasil ditambahkan ke premium!' }, { quoted: m });
            break;
        case 'delprem':
            await sock.sendMessage(m.chat, { text: '✅ Nomor berhasil dihapus dari premium!' }, { quoted: m });
            break;
        case 'resetlimit':
            await sock.sendMessage(m.chat, { text: '✅ Limit user berhasil di-reset!' }, { quoted: m });
            break;
        case 'ban':
            await sock.sendMessage(m.chat, { text: '⛔ User berhasil dibanned!' }, { quoted: m });
            break;
        case 'undban':
            await sock.sendMessage(m.chat, { text: '✅ User berhasil di-unban!' }, { quoted: m });
            break;
        case 'self':
            global.mode.public = false;
            await sock.sendMessage(m.chat, { text: '🔒 Mode diubah ke Self!' }, { quoted: m });
            break;
        case 'public':
            global.mode.public = true;
            await sock.sendMessage(m.chat, { text: '🌐 Mode diubah ke Public!' }, { quoted: m });
            break;
        case 'joingc':
            await sock.sendMessage(m.chat, { text: '✅ Berhasil join group!' }, { quoted: m });
            break;
        case 'out':
            await sock.sendMessage(m.chat, { text: '🚪 Keluar dari group!' }, { quoted: m });
            break;
        case 'setthumbnail':
            await sock.sendMessage(m.chat, { text: '🖼 Thumbnail berhasil diubah!' }, { quoted: m });
            break;
    }

    // ================= FUN =================
    switch(cmd) {
        case 'brat':
            const imgBuffer = await getBuffer('https://i.ibb.co/album/brat.png');
            await sock.sendImageAsSticker(m.chat, imgBuffer, m, { packname: "Brat", author: "Bot" });
            break;
        case 'bratvid':
            const vidBuffer = await getBuffer('https://i.ibb.co/album/brat.mp4');
            await sock.sendVideoAsSticker(m.chat, vidBuffer, m, { packname: "BratVid", author: "Bot" });
            break;
        case 'tebakkata':
            await sock.sendMessage(m.chat, { text: '🎲 Tebak kata dimulai!' }, { quoted: m });
            break;
        case 'qc1':
            await sock.sendMessage(m.chat, { text: '📜 Quotes versi gelap' }, { quoted: m });
            break;
        case 'qc2':
            await sock.sendMessage(m.chat, { text: '📃 Quotes versi terang' }, { quoted: m });
            break;
        case 's':
            await sock.sendMessage(m.chat, { text: 'Fitur S dijalankan!' }, { quoted: m });
            break;
        case 'smeme':
            await sock.sendMessage(m.chat, { text: 'Membuat meme...' }, { quoted: m });
            break;
        case 'cekprofile':
            await sock.sendMessage(m.chat, { text: 'Profil user dicek!' }, { quoted: m });
            break;
    }

    // ================= RPG =================
    switch(cmd) {
        case 'rvo':
            await sock.sendMessage(m.chat, { text: '🎮 RVO dijalankan!' }, { quoted: m });
            break;
        case 'me':
            await sock.sendMessage(m.chat, { text: '🧑 Info user ditampilkan!' }, { quoted: m });
            break;
        case 'limit':
            await sock.sendMessage(m.chat, { text: '🔢 Limit user saat ini: 10' }, { quoted: m });
            break;
        case 'ceklimit':
            await sock.sendMessage(m.chat, { text: '🔍 Limit user dicek!' }, { quoted: m });
            break;
    }

    // ================= DOWNLOADER =================
    switch(cmd) {
        case 'yt':
            await sock.sendMessage(m.chat, { text: `⏬ Downloading YouTube video: ${arg}` }, { quoted: m });
            break;
        case 'tymp3':
            await sock.sendMessage(m.chat, { text: `⏬ Downloading TikTok MP3: ${arg}` }, { quoted: m });
            break;
        case 'tt':
            await sock.sendMessage(m.chat, { text: `⏬ Downloading TikTok video: ${arg}` }, { quoted: m });
            break;
        case 'ttmp3':
            await sock.sendMessage(m.chat, { text: `⏬ Downloading TikTok MP3: ${arg}` }, { quoted: m });
            break;
        case 'tovid':
            await sock.sendMessage(m.chat, { text: '📹 Convert media ke video...' }, { quoted: m });
            break;
        case 'tomp3':
            await sock.sendMessage(m.chat, { text: '🎵 Convert media ke MP3...' }, { quoted: m });
            break;
    }

    // ================= GROUP =================
    switch(cmd) {
        case 'tagall':
            await sock.sendMessage(m.chat, { text: '📢 Mention semua member!' }, { quoted: m });
            break;
        case 'hidetag':
            await sock.sendMessage(m.chat, { text: '🤫 Hidetag dijalankan!' }, { quoted: m });
            break;
        case 'kick':
            await sock.sendMessage(m.chat, { text: '👢 User dikick!' }, { quoted: m });
            break;
        case 'add':
            await sock.sendMessage(m.chat, { text: '➕ User ditambahkan ke group!' }, { quoted: m });
            break;
        case 'open':
            await sock.sendMessage(m.chat, { text: '🔓 Group dibuka!' }, { quoted: m });
            break;
        case 'close':
            await sock.sendMessage(m.chat, { text: '🔒 Group ditutup!' }, { quoted: m });
            break;
        case 'getpp':
            await sock.sendMessage(m.chat, { text: '🖼 Mengambil profile picture...' }, { quoted: m });
            break;
        case 'listonline':
            await sock.sendMessage(m.chat, { text: '👥 Menampilkan list online' }, { quoted: m });
            break;
        case 'totalchat':
            await sock.sendMessage(m.chat, { text: '💬 Menampilkan total chat' }, { quoted: m });
            break;
        case 'afk':
            await sock.sendMessage(m.chat, { text: '😴 Status AFK diaktifkan!' }, { quoted: m });
            break;
        case 'antilink':
            await sock.sendMessage(m.chat, { text: '🚫 Antilink diaktifkan!' }, { quoted: m });
            break;
        case 'linkgc':
            await sock.sendMessage(m.chat, { text: '🔗 Mengirim link group...' }, { quoted: m });
            break;
    }
};
