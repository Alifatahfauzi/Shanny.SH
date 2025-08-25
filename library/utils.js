
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

const {
  downloadMediaMessage,
  extractMessageContent: a,
  jidNormalizedUser: b,
  proto: c,
  delay: d,
  getContentType: e,
  areJidsSameUser: f,
  generateWAMessage: g
} = require("@whiskeysockets/baileys");

const chalk = require("chalk");
const fs = require("fs");

module.exports = (sock, msg) => {
  if (!msg) return msg;
  let l = c.WebMessageInfo;
  if (msg.key) {
    msg.id = msg.key.id;
    msg.chat = msg.key.remoteJid;
    msg.from = msg.chat.startsWith('status') ? b(msg.key.participant || msg.participant) : b(msg.chat);
    msg.isBaileys = msg.id ? (msg.id.startsWith('3EB0') || msg.id.startsWith('B1E') || msg.id.startsWith('BAE') || msg.id.startsWith('3F8') || msg.id.length < 32) : false
    msg.fromMe = msg.key.fromMe;
    msg.isGroup = msg.chat.endsWith('@g.us');
    msg.sender = sock.decodeJid(msg.fromMe ? sock.user.id : (msg.participant || msg.key.participant || msg.chat));
    if (msg.isGroup) msg.participant = sock.decodeJid(msg.key.participant) || '';
  }

  if (msg.message) {
    msg.mtype = e(msg.message);
    msg.prefix = ".";
    const m = msg.message[msg.mtype];
    msg.msg = (msg.mtype === 'viewOnceMessage') ? msg.message[msg.mtype].message[e(msg.message[msg.mtype].message)] : m;

    msg.body = msg.message.conversation || msg.msg?.caption || msg.msg?.text ||
  (msg.mtype === 'extendedTextMessage' && msg.msg?.text) ||
  (msg.mtype === 'buttonsResponseMessage' && msg.msg?.selectedButtonId) ||
  (msg.mtype === 'interactiveResponseMessage' && JSON.parse(msg.msg?.nativeFlowResponseMessage?.paramsJson || '{}')?.id) ||
  (msg.mtype === 'templateButtonReplyMessage' && msg.msg?.selectedId) ||
  (msg.mtype === 'listResponseMessage' && msg.msg?.singleSelectReply?.selectedRowId) || "";

    let n = msg.quoted = msg.msg?.contextInfo?.quotedMessage || null;
    msg.mentionedJid = msg.msg?.contextInfo?.mentionedJid || [];

    if (n) {
      let o = e(n);
      msg.quoted = n[o];
      if (o === 'productMessage') {
        o = e(msg.quoted);
        msg.quoted = msg.quoted[o];
      }
      if (typeof msg.quoted === 'string') msg.quoted = { text: msg.quoted };
      if (msg.quoted) {
      msg.quoted.key = {
        remoteJid: msg.msg.contextInfo.remoteJid || msg.from,
        participant: b(msg.msg.contextInfo.participant),
        fromMe: f(b(msg.msg.contextInfo.participant), b(sock.user.id)),
        id: msg.msg.contextInfo.stanzaId
      };

      msg.quoted.mtype = o;
      msg.quoted.chat = msg.quoted.key.remoteJid;
      msg.quoted.id = msg.quoted.key.id;
      msg.quoted.from = /g\.us|status/.test(msg.quoted.chat) ? msg.quoted.key.participant : msg.quoted.chat;
      msg.quoted.isBaileys = msg.quoted.id ? (msg.quoted.id.startsWith('3EB0') || msg.quoted.id.startsWith('B1E') || msg.quoted.id.startsWith('3F8') || msg.quoted.id.startsWith('BAE') || msg.quoted.id.length < 32) : false
      msg.quoted.sender = sock.decodeJid(msg.quoted.key.participant);
      msg.quoted.fromMe = msg.quoted.sender === sock.user.id;
      msg.quoted.text = msg.quoted.text || msg.quoted?.caption || msg.quoted?.conversation || msg.quoted.contentText || msg.quoted.selectedDisplayText || msg.quoted.title || '';
      msg.quoted.mentionedJid = msg.msg.contextInfo?.mentionedJid || [];

      const p = msg.quoted.fakeObj = l.fromObject({
        key: msg.quoted.key,
        message: n,
        ...(msg.isGroup ? { participant: msg.quoted.sender } : {})
      });
        msg.quoted.download = () => downloadMediaMessage(p, 'buffer', {}, { logger: sock.logger });
    }
    }
  }

  if (msg.msg?.url) msg.download = () => downloadMediaMessage(msg, 'buffer', {}, { logger: sock.logger });
  
    msg.text = msg.body || "";

  msg.reply = async (q, r = {}) => {
    const s = r.chat || msg.chat;
    const t = r.quoted || msg;
    const u = [...(q.matchAll(/@(\d{0,16})/g))].map(v => v[1] + '@s.whatsapp.net');
    return sock.sendMessage(s, { text: q, mentions: u, ...r }, { quoted: t });
  };

  return msg;
};

let z = require.resolve(__filename);
fs.watchFile(z, () => {
  fs.unwatchFile(z);
  console.log(chalk.blue(">> Update File:"), chalk.black.bgWhite(__filename));
  delete require.cache[z];
  require(z);
});
