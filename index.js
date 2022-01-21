require('dotenv').config()
const mineflayer = require('mineflayer')
const fs = require('fs')

//Create Bot related imports
const { host, version, viewer } = require('./config.json')

//plugins
const { pathfinder } = require('mineflayer-pathfinder')

global.bot = mineflayer.createBot({
  host: host,
  version: version,
  username: process.env.email,
  password: process.env.password,
  viewDistance: "tiny",
  skinParts: {
    showJacket: false,
    showHat: false,
    showRightPants: false,
    showLeftPants: false,
    showLeftSleeve: false,
    showRightSleeve: false
  },
})

//load plugins
bot.loadPlugin(pathfinder)

bot.webviewer = viewer === 'yes' ? true : false

//some global values
global.inSkyblock = false
global.enemy = null

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