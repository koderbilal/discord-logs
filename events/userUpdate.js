const { EmbedBuilder } = require('discord.js');
var moment = require('moment-timezone');
const config = require("../config.json")
const ppdeğiiş = "1051141654054174720"
const usernamede = "1051141652640694352"
const Db = require('../Databasem/app.js')
module.exports = async(client, oldUser, newUser) => {
  let guild = client.guilds.cache.get(config.sunucuid)
  if(!guild) return;
    if (oldUser.username !== newUser.username && oldUser.discriminator == newUser.discriminator) {
      // ayar
      const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
    });
    if(db.get('use_na') == "off") return; 
    const dbl = new Db({
      path: `./log-kanallar.json`,
      seperator: ".",
      spaces: 10
    });

      const channel = guild.channels.cache.get(dbl.get('use_na'))
      if(!channel){
      let channel2 = client.channels.cache.get(db.get("ayarlar"))
      if(!channel2) {
        let channel3 = guild.channels.cache.get(message.guild.systemChannelId)
        let ben = guild.channels.cache.filter(channel => channel.type == 0).first()
      if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
      channel3.send("@everyone sizin hem kullanıcı adı log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
      } 
      channel2.send("@everyone kullanıcı adı log kanalı ayarlayınız.")
      }
        let nicknames = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name : `${newUser.username}`, iconURL: `${newUser.displayAvatarURL({ dynamic: true, size: 1024 })}`})
        .setThumbnail(newUser.displayAvatarURL({ dynamic: true, size: 1024}))
        .setDescription(`
        <@${newUser.id}> Üyesi kendi kullanıcı adını değişti
      
        **__Önceki Kullanıcı Adı:__**
      \`\`\`${oldUser.username}\`\`\`
        **__Sonraki Kullanıcı Adı:__**
      \`\`\`${newUser.username}\`\`\`
      Kullanıcı id: ${newUser.id}
      Değişim Tarihi: ${moment().locale("tr").format('LLL')}
        `)   
        return channel.send({ 
          embeds: [nicknames]
          })
       }
       if (oldUser.username !== newUser.username && oldUser.discriminator !== newUser.discriminator) {
        // ayar
      const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
    });
    if(db.get('use_na') == "off") return; 
    const dbl = new Db({
      path: `./log-kanallar.json`,
      seperator: ".",
      spaces: 10
    });

      const channel = guild.channels.cache.get(dbl.get('use_na'))
      if(!channel){
      let channel2 = client.channels.cache.get(db.get("ayarlar"))
      if(!channel2) {
        let channel3 = guild.channels.cache.get(message.guild.systemChannelId)
        let ben = guild.channels.cache.filter(channel => channel.type == 0).first()
      if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
      channel3.send("@everyone sizin hem mesaj silme log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
      } 
      channel2.send("@everyone Mesaj silme log kanalı ayarlayınız.")
      }
        let nicknamese = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name : `${newUser.username}`, iconURL: `${newUser.displayAvatarURL({ dynamic: true, size: 1024 })}`})
        .setThumbnail(newUser.displayAvatarURL({ dynamic: true, size: 1024}))
        .setDescription(`
        <@${newUser.id}> Üyesi kendi kullanıcı adını ve etiketini değişti
      
        **__Önceki Kullanıcı Adı:__**
      \`\`\`${oldUser.username}\`\`\`
        **__Sonraki Kullanıcı Adı:__**
      \`\`\`${newUser.username}\`\`\`
      **__Önceki Etiketi:__**
      \`\`\`${oldUser.discriminator}\`\`\`
        **__Sonraki Etiketi:__**
      \`\`\`${newUser.discriminator}\`\`\`
      Kullanıcı id: ${newUser.id}
      Değişim Tarihi: ${moment().tz("Europe/Istanbul").locale("tr").format('LLL')}
        `)   
        return channel.send({ 
          embeds: [nicknamese]
          })
       }
       if (oldUser.username == newUser.username && oldUser.discriminator !== newUser.discriminator) {
        // ayar
      const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
    });
    if(db.get('use_na') == "off") return; 
    const dbl = new Db({
      path: `./log-kanallar.json`,
      seperator: ".",
      spaces: 10
    });

      const channel = guild.channels.cache.get(dbl.get('use_na'))
      if(!channel){
      let channel2 = client.channels.cache.get(db.get("ayarlar"))
      if(!channel2) {
        let channel3 = guild.channels.cache.get(message.guild.systemChannelId)
        let ben = guild.channels.cache.filter(channel => channel.type == 0).first()
      if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
      channel3.send("@everyone sizin hem kullanıcı adı kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
      } 
      channel2.send("@everyone kullanıcı adı kanalı ayarlayınız.")
      }
        let nicknameses = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name : `${newUser.username}`, iconURL: `${newUser.displayAvatarURL({ dynamic: true, size: 1024 })}`})
        .setThumbnail(newUser.displayAvatarURL({ dynamic: true, size: 1024}))
        .setDescription(`
        <@${newUser.id}> Üyesi kendi etiketini değişti
      
      **__Önceki Etiketi:__**
      \`\`\`${oldUser.discriminator}\`\`\`
        **__Sonraki Etiketi:__**
      \`\`\`${newUser.discriminator}\`\`\`
      Kullanıcı id: ${newUser.id}
      Değişim Tarihi: ${moment().tz("Europe/Istanbul").locale("tr").format('LLL')}
        `)   
        return channel.send({ 
          embeds: [nicknameses]
          })   
       }
       if (oldUser.avatar !== newUser.avatar) {
        // ayar
      const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
    });
    if(db.get('avatar') == "off") return; 
    const dbl = new Db({
      path: `./log-kanallar.json`,
      seperator: ".",
      spaces: 10
    });

      const channel = guild.channels.cache.get(dbl.get('avatar'))
      if(!channel){
      let channel2 = client.channels.cache.get(db.get("ayarlar"))
      if(!channel2) {
        let channel3 = guild.channels.cache.get(message.guild.systemChannelId)
        let ben = guild.channels.cache.filter(channel => channel.type == 0).first()
      if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
      channel3.send("@everyone sizin hem avatar log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
      } 
      channel2.send("@everyone avatar log kanalı ayarlayınız.")
      }
        let avatars = new EmbedBuilder()
        .setColor("Random")
      .setAuthor({ name : `${newUser.username}`, iconURL: `${newUser.displayAvatarURL({ dynamic: true, size: 1024 })}`})
      .setThumbnail(newUser.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`
      <@${newUser.id}> Üyesi kendi avatarını değişti
    
      **__Önceki Avatarı:__**
    [Önceki Hali](${oldUser.displayAvatarURL({ dynamic: true})})
      **__Sonraki Avatarı:__**
    [Sonraki Hali](${newUser.displayAvatarURL({ dynamic: true})})

    Kullanıcı id: ${newUser.id}
    Değişim Tarihi: ${moment().tz("Europe/Istanbul").locale("tr").format('LLL')}
      `)   
      return channel.send({ 
        embeds: [avatars]
        })
      }
}