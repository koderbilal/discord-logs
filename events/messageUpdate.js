const { EmbedBuilder } = require('discord.js');
var moment = require('moment-timezone');
const config = require("../config.json")
//const kanal = "1051141646949044244"
const Db = require('../Databasem/app.js')
module.exports = (client, oldMessage, newMessage) => {
    if (oldMessage.author.bot === true) return
    if (oldMessage.channel.type !== 0) return
    if (newMessage.channel.type !== 0) return
    if (oldMessage.content === newMessage.content) return
    const db = new Db({
      path: `./log-ayarlar.json`,
      seperator: ".",
      spaces: 10
  });
  if(db.get('mesaj_değ') == "off") return; 
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
  const channel = oldMessage.guild.channels.cache.get(dbl.get('mesaj_değ'))
  if(!channel){
  let channel2 = client.channels.cache.get(db.get("ayarlar"))
  if(!channel2) {
    let channel3 = oldMessage.guild.channels.cache.get(oldMessage.guild.systemChannelId)
    let ben = oldMessage.guild.channels.cache.filter(channel => channel.type == 0).first()
  if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
  channel3.send("@everyone sizin hem mesaj silme log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
  } 
  channel2.send("@everyone Mesaj silme log kanalı ayarlayınız.")
  }
  const messageEditedEmbed = new EmbedBuilder()
  .setColor("Random")
  
  .setAuthor({ name : `${newMessage.author.username}`, iconURL: `${newMessage.author.displayAvatarURL({ dynamic: true, size: 1024 })}`})
  .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true, size: 1024 }))
  .setDescription(` <@${newMessage.author.id}> üyesi <#${newMessage.channel.id}> kanalında mesajını düzenledi. 
  
  **__Düzenlenmeden Önce:__**
  ${oldMessage.content.replace(/`/g, "'")}
  
  **__Düzenlenlendikten Sonra:__**
  ${newMessage.content.replace(/`/g, "'")}
  
  \`\`\`
Kanal: ${newMessage.channel.name}  (${newMessage.channel.id})
Kullanıcı: ${newMessage.author.tag}  (${newMessage.author.id})
Mesaj ID: ${newMessage.id}
Atılma Tarihi: ${moment(oldMessage.createdAt).tz("Europe/Istanbul").locale("tr").format('LLL')}\`\`\``)
  return channel.send({ 
    embeds: [messageEditedEmbed]
    })
  }