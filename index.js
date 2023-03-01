const discord = require("discord.js")
const fs = require('fs-extra')

const { Client, Intents, Collection, GatewayIntentBits, Events } = require('discord.js');
const client = global.client = new Client({ intents: 3276799 });

const config = require("./config.json")
// TODO: require(`./komut.js`)
client.login(config.token);

// event dosyalarını yürütüyor
try {

  fs.readdir("./events/", (err, events) => {
    events.forEach(eventFile => {
      const event = require(`./events/${eventFile}`);
      client.on(eventFile.split(".")[0], event.bind(null, client))
      delete require.cache[require.resolve(`./events/${eventFile}`)]
      console.log(`[ Etkinlik Yüklendi: ${eventFile} ]`)
    });
  })
} catch (err) {
  console.error(err);
}

const path = require('node:path');
// komutlar 

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'komutlar');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return interaction.reply({ content: "Bu komut bakımdadır", ephemeral: true });

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Bu komut yürütülürken bir hata oluştu!', ephemeral: true });
  }
});


// eval için
const { ChannelType } = require('discord.js');
const prefix = config.prefix
const owner = config.owner
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
  let args = message.content.split(' ').slice(1);
  let command = message.content.split(' ')[0].slice(prefix.length);
  if (command === "safe") { // komutlar bu şekilde eklenecektir. if(command === "komut")
    message.channel.send("güvenli")
  }
  if (command === "eval") {
    if (message.author.id !== owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${owner}>` });;
    if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi` });
    let code = args.join(' ');
    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    let res;
    try {
      res = eval(clean(code));
      if (typeof res !== 'string') res = require('node:util').inspect(res);
    } catch (err) {
      console.error(err.stack);
      res = err.message;
    }
    message.channel.send(res, { code: "js", split: true });
  } // buraya if eklenip komut eklenebilir
  // aeval
  if (command === "aeval") {
    //if (message.author.id !== config.owner) return message.channel.send({ content: `Sahibim sen değilsin <@${message.author.id}>, benim sahibim <@${config.owner}>`});
    if (!args[0]) return message.channel.send({ content: `Kod belirtilmedi` });
    let code = args.join(' ');
    function clean(text) {
      if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }

    try {

      let evaled = eval("(async () => {" + code + "})()");

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });

    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
  return;
});

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Db = require("./Databasem/app");
client.on(Events.InteractionCreate, async interaction => {

  // buton isimleri
  const buton_isimler = {
    koruma: "koruma",
    mesaj_sil: "mesaj silme log",
    mesaj_değ: "mesaj değiştirme log",
    ses_gir: "ses girme log",
    ses_cik: "ses çıkma log",
    ses_değ: "ses değişme log",
    avatar: "avatar log",
    use_na: "kullanıcı adı log"
  }

  if (!interaction.isButton()) return;
  const customId = interaction.customId

  const db = new Db({
    path: `./log-ayarlar.json`,
    seperator: ".",
    spaces: 10
  });
  const dbl = new Db({
    path: `./log-kanallar.json`,
    seperator: ".",
    spaces: 10
  });

  const loglar = ["koruma", "mesaj_sil", "mesaj_değ", "ses_gir", "ses_cik", "ses_değ", "avatar", "use_na"]   
  if (loglar.includes(customId) == false) return;


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

  const kanal = require("./functions/kanal.js")

const {dec1,dec2,dec3,dec4,dec5,dec6,dec7,dec8} = require("./util/veriler.js")


  embed.setDescription(`
  \`🟢\` : açık  \`🔴\`: kapalı

\`•\` ${dec8(customId)} Koruma 
\` Koruma özelliği geçici olarak bakımdadır \`

\`•\` ${dec1(customId)} Mesaj silme log 
Kanal: ${kanal("mesaj_sil")}

\`•\` ${dec2(customId)} Mesaj değiştirme log 
kanal: ${kanal("mesaj_değ")}

\`•\` ${dec3(customId)} Ses kanalına girme log 
kanal: ${kanal("ses_gir")}

\`•\` ${dec4(customId)} Ses kanalından çıkma log 
kanal: ${kanal("ses_cik")}

\`•\` ${dec5(customId)} Ses kanalından başka ses kanalına geçme log 
kanal: ${kanal("ses_değ")}

\`•\` ${dec6(customId)} Avatar log 
kanal: ${kanal("avatar")}

\`•\` ${dec7(customId)} Kullanıcı adı log 
kanal: ${kanal("use_na")}

🔹 Özellikleri açmak için aşağıdaki kırmızı gözüken düğmelere basınız.
🔹 Özellikleri kapatmak için aşağıdaki yeşil gözüken düğmelere basınız.
`)


  function toggleButtonStyle(customId, buttonId) {
    if (db.get(buttonId) === "on") {
      return ButtonStyle.Success;
    } else if (db.get(buttonId) === "off") {
      return ButtonStyle.Danger;
    }
  }

  function updateButtonState(customId, buttonId) {
    if (db.get(buttonId) === "on") {
      db.set(buttonId, "off");
      return ButtonStyle.Danger;
    } else if (db.get(buttonId) === "off") {
      db.set(buttonId, "on");
      return ButtonStyle.Success;
    }
  }

  const buttonIds = [
    "koruma",
    "mesaj_sil",
    "mesaj_değ",
    "ses_gir",
    "ses_cik",
    "ses_değ",
    "avatar",
    "use_na"
  ];

  const buttons = buttonIds.map(buttonId => {
    const button = new ButtonBuilder()
      .setCustomId(buttonId)
      .setLabel(buton_isimler[buttonId]);

    if (customId === buttonId) {
      if (buttonId == "koruma") return button.setStyle(ButtonStyle.Secondary).setDisabled(true);
      button.setStyle(updateButtonState(customId, buttonId));
    } else {
      if (buttonId == "koruma") return button.setStyle(ButtonStyle.Secondary).setDisabled(true);
      button.setStyle(toggleButtonStyle(customId, buttonId));
    }
    return button;
  });

  const row1 = new ActionRowBuilder().addComponents(buttons.slice(0, 3));
  const row2 = new ActionRowBuilder().addComponents(buttons.slice(3, 6));
  const row3 = new ActionRowBuilder().addComponents(buttons.slice(6, 8));

  let channel = client.channels.cache.get(interaction.channel.id)
  let message = await channel.messages.fetch(interaction.message.id)

  message.edit({ embeds: [embed], components: [row1, row2, row3] })

  interaction.deferUpdate();

});