const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
//const client = global.client;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('yardım')
		.setDescription('Bot hakkında detaylı yardım sağlar'),
	async execute(client, interaction) {
        const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle('Yardım')
    
        .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true, size: 1024 })}` })
        
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`Bot hakkında yardım ve diğer şeyler

\`/log\` yazıp boşluk bıraktığınızda oradan ilk önce ayarları bir kanala atın ondan sonra diğer ayarları yapınız.
        `)
		return interaction.reply({embeds:[embed]});
	},
};