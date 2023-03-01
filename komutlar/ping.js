const { SlashCommandBuilder } = require('discord.js');
// örnek kod
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(client, interaction) {
		return interaction.reply('Pong!');
	},
};

