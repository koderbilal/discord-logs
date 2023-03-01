const client = global.client;
const Db = require("../Databasem/app.js");
const config = require('../config.json');
module.exports = function (kanale) {
    const dbl = new Db({
        path: `./log-kanallar.json`,
        seperator: ".",
        spaces: 10
      });
    let kema = dbl.get(kanale)
let guild = client.guilds.cache.get(`${config.sunucuid}`)
const kanaler = guild.channels.cache.get(kema)
if(!kanaler) return kanale = "Kanal geçersiz, lütfen kanal ayarlayınız";
return kanale = `<#${dbl.get(kanale)}>`
}