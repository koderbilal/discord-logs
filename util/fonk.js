const Db = require("../Databasem/app");
const getStatus = (setting) => {
    const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
      });
    const value = db.get(setting);
    return value === "on" ? "🟢" : "🔴";
  };
  const change = (setting) => {
    const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
      });
    const value = db.get(setting);
    return value === "on" ? "🔴" : "🟢";
  };

module.exports = {
    getStatus: getStatus,
    change: change,
}