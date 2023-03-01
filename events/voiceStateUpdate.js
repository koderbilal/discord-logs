const { EmbedBuilder } = require('discord.js');
var moment = require('moment-timezone');
const config = require("../config.json")
const giriş = "1051141648542879754"
const çıkış = "1051141650149277696"
const diğer = "1051141651453718559"
const Db = require('../Databasem/app.js')
module.exports = async(client, oldState, newState) => {
    // ses kanalına giriş log
    if (!oldState.channelId && newState.channelId) { 
      // özellik
      const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
    });
    if(db.get('ses_gir') == "off") return; 
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
    const channel = newState.guild.channels.cache.get(dbl.get('ses_gir'))
    if(!channel){
    let channel2 = client.channels.cache.get(db.get("ayarlar"))
    if(!channel2) {
      let channel3 = newState.guild.channels.cache.get(newState.guild.systemChannelId)
      let ben = newState.guild.channels.cache.filter(channel => channel.type == 0).first()
    if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
    channel3.send("@everyone sizin hem ses girme log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
    } 
    channel2.send("@everyone ses girme log kanalı ayarlayınız.")
    }
       
          let member = newState.guild.members.cache.get(newState.id)
          let microphone = member.voice.selfMute ? "kapalı" : "açık";
          let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
          //console.log()
          let SesMicEmbed1 = new EmbedBuilder()
          .setColor("Random")
        .setAuthor({ name : `${newState.member.user.username}`, iconURL: `${newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
        .setThumbnail(newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`
        <@${newState.member.user.id}> üyesi <#${newState.channel.id}> kanalına giriş yaptı.
        
**Kanala girdiği anda:**
\`•\` Mikrofon durumu: \`${microphone}\`. 
\`•\` Kulaklık durumu: \`${headphones}\`.
    
    \`\`\`
Giridiği kanal: ${newState.channel.name}
(${newState.channelId})
Kullanıcı: ${newState.member.user.tag}
(${newState.member.user.id})
Eylem Gerçekleşme: ${moment(newState.createdAt).tz("Europe/Istanbul").locale("tr").format('LLL')}\`\`\`   
    Girdiği kanalda bulunan üyeler:
    ${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
        `)   
        return channel.send({ 
          embeds: [SesMicEmbed1]
          })
      } 
      // ses kanalından çıkış log
    if(oldState.channelId && !newState.channelId){
      // özellik
      // özellik
      const db = new Db({
        path: `./log-ayarlar.json`,
        seperator: ".",
        spaces: 10
    });
    if(db.get('ses_cik') == "off") return; 
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
    const channel = oldState.guild.channels.cache.get(dbl.get('ses_cik'))
    if(!channel){
    let channel2 = client.channels.cache.get(db.get("ayarlar"))
    if(!channel2) {
      let channel3 = oldState.guild.channels.cache.get(oldState.guild.systemChannelId)
      let ben = oldState.guild.channels.cache.filter(channel => channel.type == 0).first()
    if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
    channel3.send("@everyone sizin hem ses çıkma log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
    } 
    channel2.send("@everyone ses çıkma log kanalı ayarlayınız.")
    }
    if(!channel) return;
      let member = newState.guild.members.cache.get(newState.id);
    let microphone = member.voice.selfMute ? "kapalı" : "açık";
    let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
    if(oldState.channel.members.map(x => x)[0]){
      var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
    } else {
      var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
    }
    let SesMicEmbed2 = new EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name : `${oldState.member.user.username}`, iconURL: `${oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
    .setThumbnail(oldState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
    .setDescription(`
<@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından ayrıldı.
 
**Kanaldan Çıktığı anda:**
    \`•\` Mikrofon durumu: \`${microphone}\`. 
    \`•\` Kulaklık durumu: \`${headphones}\`.

    \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).tz("Europe/Istanbul").locale("tr").format('LLL')}\`\`\`
    Çıktığı kanalda bulunan üyeler:
    ${makro}
    `)   
    return channel.send({ 
        embeds: [SesMicEmbed2]
        })
    }
    // bir ses kanalından diğer ses kanalına geçiş log
    if (oldState.channelId && newState.channelId && oldState.channel && newState.channel) {
        if (oldState.channelId !== newState.channelId) {
          // özellik
          const db = new Db({
            path: `./log-ayarlar.json`,
            seperator: ".",
            spaces: 10
        });
        if(db.get('ses_değ') == "off") return; 
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
        const channel = oldState.guild.channels.cache.get(dbl.get('ses_değ'))
        if(!channel){
        let channel2 = client.channels.cache.get(db.get("ayarlar"))
        if(!channel2) {
          let channel3 = oldState.guild.channels.cache.get(oldState.guild.systemChannelId)
          let ben = oldState.guild.channels.cache.filter(channel => channel.type == 0).first()
        if(!channel3) return client.channels.cache.get(ben.id).send("@everyone siz dalga mı geçiyorsunuz? Hem log kanalı yok, hem ayarların olduğu kanal yok, hem de sistem mesajlarının atılacağı kanal yok. Bu kadar da pes. Lütfen şu özellikleri ayarlayın.")
        channel3.send("@everyone sizin hem ses değiştirme log kanalı yok, hem de ayarların olduğu kanal yok, lütfen ayarların olduğu kanalı tekrardan ayarlarınız, detaylı bilgi için `/yardım` yazınız. ")
        } 
        channel2.send("@everyone ses değiştirme log kanalı ayarlayınız.")
        }
        //console.log("sam")
        let member = newState.guild.members.cache.get(newState.id);
              let microphone = member.voice.selfMute ? "kapalı" : "açık";
              let headphones = member.voice.selfDeaf ? "kapalı" : "açık";
              if(oldState.channel.members.map(x => x)[0]){
                var makro = oldState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
              } else {
                var makro = "Maalesef bu kanalda üye bulunmamaktadır.";
              }
              let SesMicEmbed3 = new EmbedBuilder()
              .setColor("Random")
              .setAuthor({ name : `${newState.member.user.username}`, iconURL: `${newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 })}`})
              .setThumbnail(newState.member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
              .setDescription(`
    <@${oldState.member.user.id}> üyesi <#${oldState.channel.id}> kanalından <#${newState.channel.id}> kanalına geçiş yaptı.
    
    **Kanal Değiştirdiği Anda:**
              \`•\` Mikrofon durumu: \`${microphone}\`. 
              \`•\` Kulaklık durumu: \`${headphones}\`.
    
              \`\`\`
Çıktığı kanal: ${oldState.channel.name}
(${oldState.channelId})
Kullanıcı: ${oldState.member.user.tag}
(${oldState.member.user.id})
Eylem Gerçekleşme: ${moment(oldState.createdAt).tz("Europe/Istanbul").locale("tr").format('LLL')}\`\`\`
    
Eski Kanalında Bulunan Üyeler:
${makro}
    
Yeni Kanalında Bulunan Üyeler:        
    ${newState.channel.members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")}
    `)   
              return channel.send({ 
                  embeds: [SesMicEmbed3]
                  })
      }}
    }