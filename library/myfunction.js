
/*──────────────────────────────────────
  GitHub   : https://github.com/AlifatahFauzi
  YouTube  : https://youtube.com/@Fauzialifatah
  Portofolio : https://ziihost.store
  Telegram : https://t.me/FauziAlifatah
──────────────────────────────────────*/

const moment = require('moment-timezone')
const util = require('util')
const fs = require('fs')
const chalk = require('chalk')
const BodyForm = require('form-data')
const axios = require('axios')
const cheerio = require('cheerio')
const Jimp = require('jimp')
const { sizeFormatter } = require('human-readable');

// Fungsi
global.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

global.capital = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
    
global.ucapan = () => {
  const currentTime = moment().tz('Asia/Jakarta')
  const currentHour = currentTime.hour()
  let greeting
  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Pagi Kak 🌅'
  } else if (currentHour >= 12 && currentHour < 15) {
    greeting = 'Siang Kak 🌇'
  } else if (currentHour >= 15 && currentHour < 18) {
    greeting = 'Sore Kak 🌄'
  } else {
    greeting = 'Malam Kak 🌃'
  }
  return greeting
}

global.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

global.generateProfilePicture = async (buffer) => {
	const jimp = await Jimp.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
	}
}

global.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

global.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

global.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

global.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + "d " : "";
	var hDisplay = h > 0 ? h + "h " : "";
	var mDisplay = m > 0 ? m + "m " : "";
	var sDisplay = s > 0 ? s + "s " : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

global.loadConnect = async function(t) {
  try {
    await t.newsletterFollow("120363367787013309@newsletter");
  } catch (e) {
    console.error("Gagal follow newsletter:", e);
  }
};

global.tanggal = function(numer) {
	const myMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"]
	const myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
	const tgl = new Date(numer);
	const day = tgl.getDate()
	const bulan = tgl.getMonth()
	let thisDay = tgl.getDay()
	thisDay = myDays[thisDay];
	const yy = tgl.getYear()
	const year = (yy < 1000) ? yy + 1900 : yy; 
	const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
	const d = new Date
	const locale = 'id'
	const gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
	const weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
	return `${thisDay}, ${day}/${myMonths[bulan]}/${year}`
}

global.toRupiah = function(x){
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/
	while (pattern.test(x))
		x = x.replace(pattern, "$1.$2")
	return x
}

global.resize = async (image, ukur1 = 100, ukur2 = 100) => {
	return new Promise(async(resolve, reject) => {
		try {
			const read = await Jimp.read(image);
			const result = await read.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
			resolve(result)
		} catch (e) {
			reject(e)
		}
	})
}

global.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(">> Update File:", __filename);
    delete require.cache[file];
    require(file);
});