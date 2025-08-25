const chalk = require("chalk");
const fs = require("fs");

global.pairingCode = "SHANNYSH" 
global.owner = "6285211997125"
global.versiBot = "2.3"
global.namaBot = "Shanny.SH"
global.namaOwner = "Fauzialifatah"
global.footer = 'github.com/AlifatahFauzi'

global.idSaluran = '120363367787013309@newsletter'
global.namaSaluran = '#-Shanny.SH'
global.thumnail = './library/image/shanny.jpg'

global.mess = {
 owner: "Maaf hanya untuk owners bot",
 admin: "Maaf hanya untuk admin groups",
 botAdmin: "Maaf bot harus dijadikan admin",
 group: "Maaf hanya dapat digunakan di dalam group",
 private: "Silahkan gunakan fitur di private chat",
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.blue(">> Update File :"), chalk.black.bgWhite(`${__filename}`))
delete require.cache[file]
require(file)
})