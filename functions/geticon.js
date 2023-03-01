const client = global.client;
const Db = require("../Databasem/app.js");
const config = require('../config.json');
module.exports = function (param) {
    const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
      });
      if (db.get(`${param}`) == "on") {
        return param = "🟢"
      } else if (db.get(`${param}`) == "off") {
        return param = "🔴"
      }
}