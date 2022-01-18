require('dotenv').config()
const mineflayer = require('mineflayer')

//Create Bot related imports
const { host, version } = require('./config.json')

//non creating related imports
const { block } = require

global.bot = mineflayer.createBot({
  host: host,
  version: version,
  username: process.env.email
  password: process.env.password
})

//event handler
const minecraftEventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of minecraftEventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		bot.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.on(event.name, (...args) => event.execute(...args));
	}
}