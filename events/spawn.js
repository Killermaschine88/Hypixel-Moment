const mineflayerViewer = require('prismarine-viewer').mineflayer
const { infoLog } = require('../constants/functions/log.js')
const { sleep } = require('../constants/functions/misc.js')
const { startMacro } = require('../constants/functions/macro.js')
let inDuel =  false
let firstStart = false

module.exports = {
  name: "spawn",
  async execute() {
    if(bot.webviewer && !firstStart) {
      mineflayerViewer(bot, { port: 3000, firstPerson: false, distance: 2 })
    }

    if(!firstStart) {
      console.log({ IGN: bot.username })
      firstStart = true
    }

    await sleep(2500)

    if(!inDuel) {
      //await bot.chat('/play duels_sumo_duel')
      await bot.chat('/duel baltrazyt sumo')
      infoLog('Joined Sumo', 'SPAWN')
      inDuel = true
      setTimeout(() => {
        inDuel = false
      }, 10000)
    }
  }
}