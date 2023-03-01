const { SlashCommandBuilder } = require('discord.js');
const { ChannelType, EmbedBuilder } = require('discord.js');
const Db = require("../Databasem/app.js");
const config = require('../config.json');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kur')
		.setDescription('Kanalları kurup otomatik bir şekilde ayarlamaya yarar'),
	async execute(client, interaction) {
		//return interaction.reply('Pong!');
        //return interaction.reply
        await interaction.reply({content: 'Kurulum Yapılıyor Lütfen bekleyiniz.'})
        const geticon = require(`../functions/geticon.js`)
        let guild = await client.guilds.cache.get(`${config.sunucuid}`)
        let channel = await guild.channels.create({ 
            name: 'Loglar',
            type: ChannelType.GuildCategory,
            reason: 'Log ayarlama' 
        })
        let channel1 = await channel.children.create({ 
            name: 'Mesaj-silme',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        let channel2 =await channel.children.create({ 
            name: 'Mesaj-değiştirme',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        let channel3 = await channel.children.create({ 
            name: 'ses-girme',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        let channel4 = await channel.children.create({ 
            name: 'ses-çıkma',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        let channel5 = await channel.children.create({ 
            name: 'ses-değiştirme',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        let channel6 = await channel.children.create({ 
            name: 'avatar-değiştirme',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        let channel7 = await channel.children.create({ 
            name: 'kullanıcı-adı-değiştirme',
            type: ChannelType.GuildText,
            reason: 'Log ayarlama' 
        })
        const dbOptions = {
            seperator: ".",
            spaces: 10
          };
      
          const db = new Db({
            path: "./log-ayarlar.json",
            ...dbOptions
          });
          const dbl = new Db({
            path: "./log-kanallar.json",
            ...dbOptions
          });
          dbl.set("mesaj_sil", `${channel1.id}`)
          dbl.set("mesaj_değ", `${channel2.id}`)
          dbl.set("ses_gir", `${channel3.id}`)
          dbl.set("ses_cik", `${channel4.id}`)
          dbl.set("ses_değ", `${channel5.id}`)
          dbl.set("avatar", `${channel6.id}`)
          dbl.set("use_na", `${channel7.id}`)
          channel1.send(`Mesaj silme log buraya ayarlandı`)
          channel2.send(`Mesaj değiştirme log buraya ayarlandı`)
          channel3.send(`Ses kanalına girme log buraya ayarlandı`)
          channel4.send(`Ses kanalından çıkma log buraya ayarlandı`)
          channel5.send(`Ses kanalı değişme log buraya ayarlandı`)
          channel6.send(`avatar değiştirme log buraya ayarlandı`)
          channel7.send(`Kullanıcı adı değiştirme log buraya ayarlandı`)


          const embed = new EmbedBuilder()
          .setColor(0x7D3C98)
          .setTitle('Ayarlar')
          .setAuthor({
            name: client.user.tag,
            iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }),
          })
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setTimestamp()
          .setFooter({
            text: `${client.user.tag} | Powered by Swanex`,
            iconURL: client.user.displayAvatarURL({ dynamic: true, size: 1024 }),
          })
          .setDescription(`
          \`🟢\` : açık  \`🔴\`: kapalı
        
          \`•\` ${geticon("koruma")} koruma 
          \` Koruma özelliği geçici olarak bakımdadır \`
        
          \`•\` ${geticon("mesaj_sil")} Mesaj silme log 
          Kanal: ${channel1}
        
          \`•\` ${geticon("mesaj_değ")} Mesaj değiştirme log 
          kanal: ${channel2}
        
          \`•\` ${geticon("ses_gir")} Ses kanalına girme log 
          kanal: ${channel3}
        
          \`•\` ${geticon("ses_cik")} Ses kanalından çıkma log 
          kanal: ${channel4}
        
          \`•\` ${geticon("ses_değ")} Ses kanalından başka ses kanalına geçme log 
          kanal: ${channel5}
        
          \`•\` ${geticon("avatar")} Avatar log 
          kanal: ${channel6}
        
          \`•\` ${geticon("use_na")} Kullanıcı adı log 
          kanal: ${channel7}
         
          🔹 Özellikleri açmak için aşağıdaki kırmızı gözüken düğmelere basınız.
          🔹 Özellikleri kapatmak için aşağıdaki yeşil gözüken düğmelere basınız.
          `);
          
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let messager = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      
      messager.edit({ embeds: [embed] })
        
        await wait(6000);
        
        await interaction.followUp({content:`Kurulum yapıldı beklediğiniz için teşekkür ederiz. Aşağıda detayları görebilirsiniz.
Mesaj silme logu ${channel1} kanalına ayarlandı
Mesaj değiştirme logu ${channel2} kanalına ayarlandı
Ses kanalına girme logu ${channel3} kanalına ayarlandı
Ses kanalından çıkma logu ${channel4} kanalına ayarlandı
Ses kanalı değişme logu ${channel5} kanalına ayarlandı
Avatar değiştirme logu ${channel6} kanalına ayarlandı
Kullanıcı adı değiştirme logu ${channel7} kanalına ayarlandı
        `})
        
	},
};
