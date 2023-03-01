const fs = require("fs");
const { EmbedBuilder } = require('discord.js');
const Db = require('../Databasem/app.js')
const config = require('../config.json')
module.exports = async (client) => {
  console.log(`${client.user.tag} hazır!`)
  
  
  var moment = require('moment-timezone');
  client.user.setPresence({ activities: [{ name: 'Swanex ❤️' }], status: 'idle' });
  const db = new Db({
    path: `./genel-ayar.json`,
    seperator: ".",
    spaces: 10
});
if(db.get('guild') != "on"){
  const guild = await client.guilds.cache.get(config.guildId)
  const channel = client.channels.cache.get(guild.systemChannelId)
  channel.send("botu kullandığınız için teşekkür ederiz")
  db.set("guild","on")
}

}
