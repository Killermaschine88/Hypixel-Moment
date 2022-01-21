const { messageLog } = require('../constants/functions/log.js')
const { infoLog } = require('../constants/functions/log.js')
const { sleep } = require('../constants/functions/misc.js')
const blacklisted_word = ['Mana']

module.exports = {
  name: "message",
  async execute(message) {

    for(const word of blacklisted_word) {
      if(message.toString().includes(word)) return
    }

    const args = message.toString().trim().split(' ')
    if(args[0] === 'Opponent:') {
      if(!args[2]) {
        bot.enemy = args[1]
      } else {
        bot.enemy = args[2]
      }
      infoLog(`Sumo against ${bot.enemy}`, 'SUMO')
    }
    if(args[0] === 'Sumo' && args[1] === 'Duel' && args[2] === '-') {
      bot.enemy = null
      bot.moving = false
      infoLog('Sumo ended.', 'SUMO')
      await sleep(1500)
      await bot.chat('/ac gg')
      await sleep(1000)
      await bot.chat('/l')
    }
    if(args[1] === 'WINNER!') {
      infoLog('Won the round', 'SUMO')
    }

    if(args[4] === 'WINNER!' || args[5] === 'WINNER!') {
      infoLog('Lost the round', 'SUMO')
    }
    
    messageLog(message.toString())
  }
}