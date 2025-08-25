
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
  
 Terimakasih:
 - Fauzialifatah ( Owner )
 - Kyuurzy ( bailyes & support )
 - Han Alpokat ( support )
 - Baldog ( support )
 - Marshal Shel ( support )
 
 - Penyedia Panel
 - Penyedia Apikey
 - Creator lain-nya
──────────────────────────────────────*/

require("./settings.js")
require("./library/webp.js")
require("./library/database.js")

const util = require("util");
const chalk = require("chalk");
const fs = require("fs");
const axios = require("axios");
const fetch = require("node-fetch");
const { exec, spawn, execSync } = require('child_process');
const os = require('os');
const nou = require('node-os-utils');
const speed = require('performance-now');
const sharp = require('sharp');
const path = require("path");

const { 
    imageToWebp, 
    videoToWebp,
    writeExifImg,
    writeExifVid,
    addExif
} = require('./library/exif')
const Case = require("./library/system");

module.exports = async (sock, m, store) => {
loadDataBase(sock, m);
try {
const isCmd = m?.body?.startsWith(m.prefix)
const quoted = m.quoted ? m.quoted : m
const mime = quoted?.msg?.mimetype || quoted?.mimetype || null
const args = m.body.trim().split(/ +/).slice(1)
const qmsg = (m.quoted || m)
const text = q = args.join(" ")

const owners = JSON.parse(fs.readFileSync("./library/database/owner.json"))
const command = isCmd ? m.body.slice(m.prefix.length).trim().split(' ').shift().toLowerCase() : ''
const cmd = m.prefix + command
const pushname = m.pushName || `${m.sender.split("@")[0]}`
const botNumber = await sock.decodeJid(sock.user.id)
const isOwner = [botNumber, owner+"@s.whatsapp.net", ...owners].includes(m.sender) ? true : m.isDeveloper ? true : false

global.public = false // defaultnya public

try {
  m.isGroup = m.chat.endsWith('g.us');
  if (m.isGroup) {
    let meta = await store.get(m.chat)
    if (!meta) meta = await sock.groupMetadata(m.chat)
    m.metadata = meta;
    const p = meta.participants || [];
    m.isAdmin = p.some(i => i.id === m.sender && i.admin);
    m.isBotAdmin = p.some(i => i.id === botNumber && i.admin);
  } else {
    m.metadata = {};
    m.isAdmin = false;
    m.isBotAdmin = false;
  }
} catch {
  m.metadata = {};
  m.isAdmin = false;
  m.isBotAdmin = false;
}

//Conosole.log codes
if (isCmd) {
const from = m.key.remoteJid
const chatType = from.endsWith("@g.us") ? "Group" : "Private"
console.log(
chalk.blue.bold("Messages Detected 🚀"), 
chalk.white.bold("\n▢ Command :"), chalk.white.bold(`${m.prefix+command}`), 
chalk.white.bold("\n▢ Pengirim :"), chalk.white.bold(`${m.sender}`), 
chalk.white.bold("\n▢ Name :"), chalk.white.bold(`${pushname}`), 
chalk.white.bold("\n▢ Chat Type :"), chalk.white.bold(`${chatType}\n\n`)
   )
}

//# # # # # # # # # # # # # # # # 

const qtext = {
  key: {
    remoteJid: 'status@broadcast',
    fromMe: false,
    participant: '0@s.whatsapp.net'
  },
  message: {
    newsletterAdminInviteMessage: {
      newsletterJid: '123@newsletter',
      caption: `# ${namaOwner}.`,
      inviteExpiration: 0
    }
  }
}

const qlock = {
  key: {
    participant: '0@s.whatsapp.net',
    ...(m.chat ? { remoteJid: 'status@broadcast' } : {})
  },
  message: {
    locationMessage: {
      name: `# ${namaOwner}.`,
      jpegThumbnail: ''
    }
  }
}

async function makeStickerFromUrl(imageUrl, sock, m) {
try {
let buffer;
if (imageUrl.startsWith("data:")) {
const base64Data = imageUrl.split(",")[1];
buffer = Buffer.from(base64Data, 'base64');
} else {
const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
buffer = Buffer.from(response.data, "binary");
}

const webpBuffer = await sharp(buffer)
.resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
.webp({ quality: 70 })
.toBuffer();

const penis = await addExif(webpBuffer, global.packname, global.author)

const fileName = global.getRandom(".webp");
fs.writeFileSync(fileName, webpBuffer);

await sock.sendMessage(m.chat, {
sticker: penis,
contextInfo: {
externalAdReply: {
showAdAttribution: true,
title: global.namaBot,
body: global.namaSaluran,
mediaType: 3,
renderLargerThumbnail: false,
thumbnailUrl: `https://files.catbox.moe/4vynlz.jpg`,
sourceUrl: `https://github.com/AlifatahFauzi`
}
}
}, { quoted: m });

fs.unlinkSync(fileName);
} catch (error) {
console.error("Error creating sticker:", error);
reply('Terjadi kesalahan saat membuat stiker. Coba lagi nanti.');
}
} 


//# # # # # # # # # # # # # # # # 

const reply = m.reply = (teks) => {
    return sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}

const example = (teks) => {
return `*Contoh Penggunaan:*\n*${m.prefix+command}* ${teks}`
}

//# # # # # # # # # # # # # # # #

        const pluginsLoader = async (directory) => {
            let plugins = [];
            const folders = fs.readdirSync(directory);
            folders.forEach(file => {
                const filePath = path.join(directory, file);
                if (filePath.endsWith(".js")) {
                    try {
                        const resolvedPath = require.resolve(filePath);
                        if (require.cache[resolvedPath]) {
                            delete require.cache[resolvedPath];
                        }
                        const plugin = require(filePath);
                        plugins.push(plugin);
                    } catch (error) {
                        console.log(`${filePath}:`, error);
                    }
                }
            });
            return plugins;
        };

        const pluginsDisable = true;
        const plugins = await pluginsLoader(path.resolve(__dirname, "./command"));
        const plug = {
            sock,
            command, 
            reply, 
            text,
            pushname, 
            mime,
            quoted, 
        };

        for (let plugin of plugins) {
            if (plugin.command.find(e => e == command.toLowerCase())) {

                if (typeof plugin !== "function") return;
                await plugin(m, plug);
            }
        }
        
        if (!pluginsDisable) return;  
//# # # # # # # # # # # # # # # # 

switch (command) {

// # # # # # Owner Menu # # # # #

case "idgc": {
if (!m.isGroup) return m.reply(mess.group)
return m.reply(m.chat)
}
break

case "self": case "public": {
   if (!isOwner) return m.reply(mess.owner)
   let status = true
   if (command == "self") status = false
   sock.public = status
   fs.writeFileSync("./library/database/mode.json", JSON.stringify({ public: status }, null, 2))
   return m.reply(`Berhasil mengganti ke mode *${command}*`)
}
break

case "mode": {
   m.reply(`🤖 Bot Mode: ${sock.public ? "Public" : "Self"}`)
}
break

case "rst": case "restart": {
if (!isOwner) return m.reply(mess.owner)
function restartServer() {
const newProcess = spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  });
  process.exit(0);
}
await m.reply("*Otw Bang . . . .*")
await setTimeout(() => {
restartServer();
}, 4500)
}
break

case "getcase": { 
    if (!isOwner) return reply(mess.owner);
    if (!text) return reply(example("namaCase"));
    try {
        let hasil = Case.get(text);
        reply(`✅ Case ditemukan:\n\n${hasil}`);
    } catch (e) {
        reply(e.message);
    }
}
break;

case "addcase": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return reply(example(`case "namacase": { ... }`));
    try {
        Case.add(text);
        reply("✅ Case berhasil ditambahkan.");
    } catch (e) {
        reply(e.message);
    }
}
break;

case "delcase": {
    if (!isOwner) return reply(mess.owner);
    if (!text) return reply(example("namaCase"));
    try {
        Case.delete(text);
        reply(`✅ Case "${text}" berhasil dihapus.`);
    } catch (e) {
        reply(e.message);
    }
}
break;

case "listcase": {
    if (!isOwner) return reply(mess.owner);
    try {
        reply("📜 List Case:\n\n" + Case.list());
    } catch (e) {
        reply(e.message);
    }
}
break;


case "backupsc":
case "bck":
case "backup": { 
    if (m.sender.split("@")[0] !== global.owner && m.sender !== botNumber)
        return m.reply(mess.owner);
    try {
        const tmpDir = "./library/database/Sampah";
        if (fs.existsSync(tmpDir)) {
            const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"));
            for (let file of files) {
                fs.unlinkSync(`${tmpDir}/${file}`);
            }
        }

        await m.reply("Processing Backup Script . .");

        const name = `${namaBot.replace(/\s+/g, "_")}_Version${versiBot.replace(/\s+/g, "_")}`;
        const exclude = ["node_modules", "Session", "package-lock.json", "yarn.lock", ".npm", ".cache"];
        const filesToZip = fs.readdirSync(".").filter(f => !exclude.includes(f) && f !== "");

        if (!filesToZip.length) return m.reply("Tidak ada file yang dapat di-backup.");

        console.log("Files to zip:", filesToZip);
        execSync(`zip -r ${name}.zip ${filesToZip.join(" ")}`);

        if (!fs.existsSync(`./${name}.zip`)) return m.reply("Gagal membuat file ZIP.");

        await sock.sendMessage(m.sender, {
            document: fs.readFileSync(`./${name}.zip`),
            fileName: `${name}.zip`,
            mimetype: "application/zip"
        }, { quoted: m });

        fs.unlinkSync(`./${name}.zip`);

        if (m.chat !== m.sender) m.reply("Script bot berhasil dikirim ke private chat.");
    } catch (err) {
        console.error("Backup Error:", err);
        m.reply("Terjadi kesalahan saat melakukan backup.");
    }
}
break;

// ===== CASE addakses =====
case 'addakses': {
   if (!isOwner) {
      return sock.sendMessage(m.chat, { text: " Hanya owner yang bisa menggunakan perintah ini." }, { quoted: m });
   }

   if (args.length < 2) {
      return sock.sendMessage(m.chat, { text: " Format salah.\nGunakan: .addakses nomor ip\n\nContoh: .addakses 6281234567890 192.168.1.10" }, { quoted: m });
   }

   const addUser = require("./library/github/adduser");
   const [nomor, ip] = args;

   try {
      await addUser(nomor, ip);
      sock.sendMessage(m.chat, { text: ` Akses berhasil ditambahkan!\nNomor: ${nomor}\nIP: ${ip}` }, { quoted: m });
   } catch (e) {
      sock.sendMessage(m.chat, { text: ` Gagal menambahkan akses: ${e.message}` }, { quoted: m });
   }
}
break;

// # # # # # Info Menu # # # # #
case "ping": case "uptime": {
let timestamp = speed();
let latensi = speed() - timestamp;
let tio = await nou.os.oos();
var tot = await nou.drive.info();
let respon = `*—Informasi Server Vps 🖥️*
- *Platform :* ${nou.os.type()}
- *Total Ram :* ${formatp(os.totalmem())}
- *Total Disk :* ${tot.totalGb} GB
- *Total Cpu :* ${os.cpus().length} Core
- *Runtime Vps :* ${runtime(os.uptime())}

*—Informasi Server Panel 🌐*
- *Respon Speed :* ${latensi.toFixed(4)} detik
- *Runtime Bot :* ${runtime(process.uptime())}`
await m.reply(respon)
}
break

case "developerbot": case "owner": case "own": case "dev": {
await sock.sendContact(m.chat, [global.owner], null)
await reply(`Haii @${m.sender.split("@")[0]} ini adalah developer script ini!`)
}
break

// # # # # # Main Menu # # # # #
case "tourl": { 
    if (!/image/.test(mime)) return m.reply("kirim/reply fotonya!");
    const { ImageUploadService } = require('node-upload-images');
    try {
        let mediaPath = await sock.downloadAndSaveMediaMessage(qmsg);
        const service = new ImageUploadService('pixhost.to');
  let buffer = fs.readFileSync(mediaPath);
  let { directLink } = await service.uploadFromBinary(buffer, 'jarroffc.png');
  await sock.sendMessage(m.chat, { text: directLink }, { quoted: m });
        await fs.unlinkSync(mediaPath);
    } catch (err) {
        console.error("Tourl Error:", err);
        m.reply("Terjadi kesalahan saat mengubah media menjadi URL.");
    }
}
break;

case 'oi': {
    if (!quoted) return reply(`reply image/video dengan caption ${prefix + command}`);
    try {
        if (/image/.test(mime)) {
            const media = await quoted.download();
            
            const imageUrl = `data:${mime};base64,${media.toString('base64')}`;
            await makeStickerFromUrl(imageUrl, sock, m);
        } else if (/video/.test(mime)) {
            if ((quoted?.msg || quoted)?.seconds > 10) return reply('Durasi video maksimal 10 detik!')
                const media = await quoted.download();
                const videoUrl = `data:${mime};base64,${media.toString('base64')}`;
                await makeStickerFromUrl(videoUrl, sock, m);
            } else {
                return reply('Kirim gambar/video dengan caption .s (video durasi 1-10 detik)');
            }
        } catch (error) {
            console.error(error);
            return reply('Terjadi kesalahan saat memproses media. Coba lagi.');
        }
    }
    break

case "sticker": case "stiker": case "sgif": case "s": {
if (!/image|video/.test(mime)) return m.reply("Kirim foto nya!")
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return m.reply("Durasi vidio maksimal 15 detik!")
}
var media = await sock.downloadAndSaveMediaMessage(qmsg)
await sock.sendImageAsSticker(m.chat, media, m, {packname: `Whatsapp Bot ${namaOwner}`})
await fs.unlinkSync(media)
}
break

// Tambahkan kode ini ke dalam switch/case bot Anda
case "salurkan": {
  try {
    // Memeriksa apakah argumen ID saluran diberikan
    if (args.length < 1) {
      return m.reply("❌ Contoh: .salurkan 120xxx@newsletter (balas audio)");
    }
    
    const channelId = args[0];
    const quoted = m.quoted;
    const mime = quoted ? quoted.mimetype : null;

    // Memeriksa apakah ada pesan yang dibalas dan apakah itu audio
    if (!quoted || !/audio/.test(mime)) {
      return m.reply("❌ Balas sebuah audio dengan perintah ini.");
    }
    
    // Mengunduh audio dari pesan yang dibalas
    const audioBuffer = await quoted.download();
    
    // Mengirim pesan audio ke saluran yang diberikan
    await sock.sendMessage(
      channelId,
      {
        audio: audioBuffer,
        mimetype: "audio/mpeg",
        ptt: true,
      },
      { quoted: m }
    );

    m.reply("✅ Audio berhasil dikirim ke saluran.");
  } catch (err) {
    console.error("Gagal mengirim audio:", err);
    m.reply("❌ Gagal mengirim audio ke saluran.");
  }
}
break;


default:
if (m.text.toLowerCase().startsWith("xx")) {
    if (!isOwner) return;

    try {
        const result = await eval(`(async () => { ${text} })()`);
        const output = typeof result !== "string" ? util.inspect(result) : result;
        return sock.sendMessage(m.chat, { text: util.format(output) }, { quoted: m });
    } catch (err) {
        return sock.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
    }
}

if (m.text.toLowerCase().startsWith("x")) {
    if (!isOwner) return;

    try {
        let result = await eval(text);
        if (typeof result !== "string") result = util.inspect(result);
        return sock.sendMessage(m.chat, { text: util.format(result) }, { quoted: m });
    } catch (err) {
        return sock.sendMessage(m.chat, { text: util.format(err) }, { quoted: m });
    }
}

if (m.text.startsWith('$')) {
    if (!isOwner) return;
    
    exec(m.text.slice(2), (err, stdout) => {
        if (err) {
            return sock.sendMessage(m.chat, { text: err.toString() }, { quoted: m });
        }
        if (stdout) {
            return sock.sendMessage(m.chat, { text: util.format(stdout) }, { quoted: m });
        }
    });
}

}

} catch (err) {
console.log(err)
await sock.sendMessage(global.owner+"@s.whatsapp.net", {text: err.toString()}, {quoted: m ? m : null })
}}

//# # # # # # # # # # # # # # # # 

process.on("uncaughtException", (err) => {
console.error("Caught exception:", err);
});

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.blue(">> Update File:"), chalk.black.bgWhite(__filename));
    delete require.cache[file];
    require(file);
});
