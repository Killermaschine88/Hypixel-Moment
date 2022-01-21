const mineflayerViewer = require('prismarine-viewer').mineflayer
const { infoLog } = require('../constants/functions/log.js')
const { sleep } = require('../constants/functions/misc.js')
const { startMacro } = require('../constants/functions/macro.js')
let inDuel =  false
let firstStart = false
const express = require('express')
const app = express()

module.exports = {
  name: "spawn",
  async execute() {
    if(bot.webviewer && !firstStart) {
      mineflayerViewer(bot, { port: 3000, firstPerson: false, distance: 1 })
    } else if(!bot.webviewer && !firstStart) {
      app.listen(3001)
      app.get('/', (req, res) => res.send('Sumo Bot online'))
    }

    if(!firstStart) {
      //console.log({ IGN: bot.username })
      await bot.chat('/play duels_sumo_duel')
      //await bot.chat('/duel softeys sumo') //dueling people
      firstStart = true
    }

    await sleep(2500)
    infoLog('Joined Sumo', 'SPAWN')

    /*if(!inDuel) {
      await sleep(5000)
      //await bot.chat('/play duels_sumo_duel')
      await bot.chat('/duel _itzunique sumo')
      infoLog('Joined Sumo', 'SPAWN')
      inDuel = true
      setTimeout(() => {
        inDuel = false
      }, 10000)
    }*/

    bot.ghostblock = true
    bot.moving = false
  }
}