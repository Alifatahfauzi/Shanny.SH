
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

const {
  extractMessageContent: a,
  jidNormalizedUser: b,
  proto: c,
  delay: d,
  getContentType: e,
  areJidsSameUser: f,
  generateWAMessage: g
} = require("@whiskeysockets/baileys");
const h = require("chalk");
const i = require("fs");
const fetch = require('node-fetch')


global.db = JSON.parse(i.readFileSync('./library/database/database.json', 'utf-8'));
async function saveDb() {
    i.writeFileSync('./library/database/database.json', JSON.stringify(global.db, null, 2));
}

async function loadDataBase(sock, m) {
    await saveDb();
    try {
        global.db = global.db || {};
        global.db.settings = global.db.settings || {};
        global.db.users = global.db.users || {};
        global.db.groups = global.db.groups || {};

        const botNumber = await sock.decodeJid(sock.user.id);
        const isNumber = x => typeof x === 'number' && !isNaN(x);
        const isBoolean = x => typeof x === 'boolean';

        const setBot = global.db.settings;
        if (typeof global.db.users[m.sender] !== 'object') global.db.users[m.sender] = {};
        const user = global.db.users[m.sender];

        if (m.isGroup) {
            if (typeof global.db.groups[m.chat] !== 'object') global.db.groups[m.chat] = {};
            const group = global.db.groups[m.chat];
        }
    } catch (e) {
        throw e;
    }
}

global.loadDataBase = loadDataBase
global.saveDb = saveDb


let file = require.resolve(__filename);
i.watchFile(file, () => {
    i.unwatchFile(file);
    console.log(h.red(">> Update File:"), h.black.bgWhite(__filename));
    delete require.cache[file];
    require(file);
});