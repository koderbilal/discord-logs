// komutları discorda yükler
const { REST, Routes } = require('discord.js');
const { botid, sunucuid, token } = require('./config.json');
const fs = require('node:fs');



const commands = [];
// Daha önce oluşturduğunuz komutlar dizininden tüm komut dosyalarını alın
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));

// Dağıtım için her komutun verilerinin SlashCommandBuilder#toJSON() çıktısını alın
for (const file of commandFiles) {
	const command = require(`./komutlar/${file}`);
	commands.push(command.data.toJSON());
}

// REST modülünün bir örneğini oluşturun ve hazırlayın
const rest = new REST({ version: '10' }).setToken(token);

// ve komutlarınızı konuşlandırın!
(async () => {
	try {
		console.log(`${commands.length} uygulama (/) komutlarını yenilemeye başladı.`);

		// Put yöntemi, loncadaki tüm komutları geçerli kümeyle tamamen yenilemek için kullanılır.
		const data = await rest.put(
			Routes.applicationGuildCommands(botid, sunucuid), // sunucu için
            //Routes.applicationCommands(clientId) genel komutlar için
			{ body: commands },
		);

		console.log(`${data.length} uygulama (/) komutları başarıyla yeniden yüklendi.`);
	} catch (error) {
		// Ve elbette, hataları yakaladığınızdan ve günlüğe kaydettiğinizden emin olun!
		console.error(error);
	}
})();


