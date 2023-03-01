const { EmbedBuilder } = require('discord.js');
var moment = require('moment-timezone');
const config = require("../config.json")
//const kanal = "940961432483291176"
const fs = require('fs')
const Db = require('../Databasem/app.js')
module.exports = (client, message) => {

    if (!message || message.partial) return
      if (typeof message.author === "undefined" ) return
      if (message.author && message.author.bot === true) return
      if (message.channel && message.channel.type !== 0) return
      //console.log("ben")
      // validate if it's from a guild
      //const kanale = client.channels.cache.get(kanal)
      //if(!kanale) return message.channel.send(`log kanalı Geçerli değil Lütfen tekrar ayarlayınız`)
const db = new Db({
    path: `./log-ayarlar.json`,
    seperator: ".",
    spaces: 10
});
if(db.get('mesaj_sil') == "off") return; 
const dbl = new Db({
  path: `./log-kanallar.json`,
  seperator: ".",
  spaces: 10
});

//TODO: const kanal = dbl.get('mesaj_sil')
//console.log(kanal)
// const kanale = client.channels.cache.get(kanal)
//console.log(kanale)
     //  if(!kanale) return message.channel.send(`mesaj silme log kanalı Geçerli değil Lütfen tekrar ayarlayınız`)
    // const channel2 = client.channels.cache.get(db.get("loglar.mesajsilme"))
const channel = message.guild.channels.cache.get(dbl.get('mesaj_sil'))
if(!channel){
let channel2 = client.channels.cache.get(db.get("ayarlar"))
if(!channel2) {
  let channel3 = message.guild.channels.cache.get(message.guild.systemChannelId)
  let ben = message.guild.channels.cache.filter(channel => channel.type == 0).first()
if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
channel3.send("@everyone sizin hem mesaj silme log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
} 
channel2.send("@everyone Mesaj silme log kanalı ayarlayınız.")
}

      const messageDeletedEmbed = new EmbedBuilder()
          .setColor("Random")
          .setAuthor({ name : `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}`})
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

      var messageHadAttachment = message.attachments.map(x => x.proxyURL)[0]
      if (messageHadAttachment) { // if there is an attachement
        var mesajcik = message.attachments.map(x => x.proxyURL)
      } else {
        var mesajcik = "Silinen resim yoktur."
      }
      if(message.content){
        var devamke = message.content.replace(/`/g, "'")
      } else {
        var devamke = "silinen mesaj yoktur."
      }
      messageDeletedEmbed.setDescription(` <@${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi. 
          
      **__silinen mesaj:__**
      ${devamke}

      **__silinen resim:__**
      ${mesajcik}
      
\`\`\`
Kanal: ${message.channel.name}  (${message.channel.id})
Kullanıcı: ${message.author.tag}  (${message.author.id})
Mesaj ID: ${message.id}
Atılma Tarihi: ${moment(message.createdAt).tz("Europe/Istanbul").locale("tr").format('LLL')}\`\`\``)
      
       return channel.send({ 
         embeds: [messageDeletedEmbed]
         }) // ({embeds: [embed]}) (messageDeletedEmbed)
}