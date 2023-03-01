const { SlashCommandBuilder, ChannelType, Client } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const Db = require("../Databasem/app.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('log')
    .setDescription('log kanalı ayarlama')
    .addStringOption(option =>
      option.setName('ayarlanacak-log')
        .setDescription('ayarlanmasını istediğiniz logu seçin')
        .setRequired(true)
        // Kullanıcının çıktı için yalnızca bir TextChannel seçebildiğinden emin olun
        .addChoices(
          { name: `Ayarlar`, value: `ayar` },
          { name: 'Mesaj silme log', value: 'mesaj_sil' },
          { name: 'Mesaj değiştirme log', value: 'mesaj_değ' },
          { name: 'Bir ses kanalına giriş log', value: 'ses_gir' },
          { name: 'Bir ses kanalından çıkış log', value: "ses_cik" },
          { name: 'Bir ses kanalından diğer ses kanalına geçiş log', value: "ses_deg" },
          { name: 'Avatar değişince log', value: 'avat' },
          { name: 'Kullanıcı adı değişince log', value: "use_na" },
        ))
    .addChannelOption(option =>
      option.setName('kanal')
        .setDescription('seçili olan logun atılmasını istediğiniz kanalı seçiniz')
        .setRequired(true)
        // Kullanıcının çıktı için yalnızca bir TextChannel seçebildiğinden emin olun
        .addChannelTypes(ChannelType.GuildText))


  , async execute(client, interaction) {
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

    const category = interaction.options.getString('ayarlanacak-log');
    const channel = interaction.options.getChannel('kanal')
    if (!category) return interaction.reply("Lütfen Seçeneklerden birini seçin")
    if (!channel) return interaction.reply("Lütfen bir kanal seçin")


    function sasha(ask) {
      if (db.get(`${ask}`) == "on") {
        return ask = ButtonStyle.Success
      } else if (db.get(`${ask}`) == "off") {
        return ask = ButtonStyle.Danger
      }
    }


    const geticon = require(`../functions/geticon.js`)
    const kanal = require("../functions/kanal.js")

    // mesaj çekip değiştirmek için
 
    // isim değişikliği vb şeyler
    const dec1 = category === "mesaj_sil" ? `${channel}` : `${kanal("mesaj_sil")}`
    const dec2 = category === "mesaj_değ" ? `${channel}` : `${kanal("mesaj_değ")}`
    const dec3 = category === "ses_gir" ? `${channel}` : `${kanal("ses_gir")}`
    const dec4 = category === "ses_cik" ? `${channel}` : `${kanal("ses_cik")}`
    const dec5 = category === "ses_değ" ? `${channel}` : `${kanal("ses_değ")}`
    const dec6 = category === "avatar" ? `${channel}` : `${kanal("avatar")}`
    const dec7 = category === "use_na" ? `${channel}` : `${kanal("use_na")}`
    const dec8 = category === "koruma" ? `${channel}` : `${kanal("koruma")}`

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
      Kanal: ${dec1}
    
      \`•\` ${geticon("mesaj_değ")} Mesaj değiştirme log 
      kanal: ${dec2}
    
      \`•\` ${geticon("ses_gir")} Ses kanalına girme log 
      kanal: ${dec3}
    
      \`•\` ${geticon("ses_cik")} Ses kanalından çıkma log 
      kanal: ${dec4}
    
      \`•\` ${geticon("ses_değ")} Ses kanalından başka ses kanalına geçme log 
      kanal: ${dec5}
    
      \`•\` ${geticon("avatar")} Avatar log 
      kanal: ${dec6}
    
      \`•\` ${geticon("use_na")} Kullanıcı adı log 
      kanal: ${dec7}
     
      🔹 Özellikleri açmak için aşağıdaki kırmızı gözüken düğmelere basınız.
      🔹 Özellikleri kapatmak için aşağıdaki yeşil gözüken düğmelere basınız.
      `);
      let guild = await client.guilds.cache.get(`${config.sunucuid}`)
      
    if (category === "mesaj_sil") {
      // mesaj silme
      dbl.set("mesaj_sil", `${channel.id}`)
      interaction.reply(`Mesaj silme logu ${channel} kanalına ayarlandı`)
      channel.send(`Mesaj silme log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      
      message.edit({ embeds: [embed] })
    } else if (category === "mesaj_değ") {
      // mesaj değiştirme
      dbl.set("mesaj_değ", `${channel.id}`)
      interaction.reply(`Mesaj değiştirme logu ${channel} kanalına ayarlandı`)
      channel.send(`Mesaj değiştirme log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      message.edit({ embeds: [embed] })
    } else if (category === "ses_gir") {
      // ses kanalına girme
      dbl.set("ses_gir", `${channel.id}`)
      interaction.reply(`Ses kanalına girme logu ${channel} kanalına ayarlandı`)
      channel.send(`Ses kanalına girme log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      if(!message) return ;
      message.edit({ embeds: [embed] })
    } else if (category === "ses_cik") {
      // ses kanalından çıkma
      dbl.set("ses_cik", `${channel.id}`)
      interaction.reply(`Ses kanalından çıkma logu ${channel} kanalına ayarlandı`)
      channel.send(`Ses kanalından çıkma log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      if(!message) return ;
      message.edit({ embeds: [embed] })
    } else if (category === "ses_deg") {
      // başka ses kanalına geçme
      dbl.set("ses_değ", `${channel.id}`)
      interaction.reply(`Ses kanalı değişme logu ${channel} kanalına ayarlandı`)
      channel.send(`Ses kanalı değişme log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      if(!message) return ;
      message.edit({ embeds: [embed] })
    } else if (category === "avat") {
      //avatar değiştirme
      dbl.set("avatar", `${channel.id}`)
      interaction.reply(`Avatar değiştirme logu ${channel} kanalına ayarlandı`)
      channel.send(`avatar değiştirme log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      if(!message) return ;
      message.edit({ embeds: [embed] })
    } else if (category === "use_na") {
      // kullanıcı adı değiştirme
      dbl.set("use_na", `${channel.id}`)
      interaction.reply(`Kullanıcı adı değiştirme logu ${channel} kanalına ayarlandı`)
      channel.send(`Kullanıcı adı değiştirme log buraya ayarlandı`)
      let channele = await guild.channels.cache.get(`${db.get(`ayarlar`)}`)
      if(!channele) return ;
      let message = await channele.messages.fetch(`${db.get(`mesaj`)}`)
      if(!message) return ;
      message.edit({ embeds: [embed] })
    } else if (category === "ayar") {
      // ayarlar
      dbl.set("ayarlar", `${channel.id}`)
      db.set("ayarlar", `${channel.id}`)
      interaction.reply(`Ayarlar ${channel} kanalına mesaj olarak atıldı.`)
      // butonlar
      const row1 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('koruma')
            .setLabel('koruma')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId('mesaj_sil')
            .setLabel('mesaj silme log')
            .setStyle(sasha("mesaj_sil")),
          new ButtonBuilder()
            .setCustomId('mesaj_değ')
            .setLabel('mesaj değiştirme log')
            .setStyle(sasha("mesaj_değ")),
        );
      const row2 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('ses_gir')
            .setLabel('ses girme log')
            .setStyle(sasha("ses_gir")),
          new ButtonBuilder()
            .setCustomId('ses_cik')
            .setLabel('ses çıkma log')
            .setStyle(sasha("ses_cik")),
          new ButtonBuilder()
            .setCustomId('ses_değ')
            .setLabel('ses değişme log')
            .setStyle(sasha("ses_değ")),
        )
      const row3 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('avatar')
            .setLabel('avatar log')
            .setStyle(sasha("avatar")),
          new ButtonBuilder()
            .setCustomId('use_na')
            .setLabel('kullanıcı adı log')
            .setStyle(sasha("use_na")),
        );
      // mesaj gönderiyor
      const mesaj = await channel.send({ embeds: [embed], components: [row1, row2, row3] })
      db.set("mesaj", `${mesaj.id}`)
    }
  },
};


