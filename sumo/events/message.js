const { messageLog } = require('../constants/functions/log.js')
const { infoLog } = require('../constants/functions/log.js')
const { sleep } = require('../constants/functions/misc.js')
const blacklisted_word = ['Mana', 'unclaimed', 'view it', 'Reward', 'Coins', 'Experience', 'YOU WON!', 'You cannot say', '▬', 'Eliminate your', 'Click here to view them!', 'coins', 'connect you to that server', 'Melee', 'Karma', 'was killed by', '-', 'Sending you', 'This game has been', 'Opponent:', 'Sumo', 'has joined', 'The game', 'Mystery Box', 'WINNER!', 'slid']
let wins = 0
let losses = 0

module.exports = {
  name: "message",
  async execute(message) {

    if(message.toString().trim() === '' || message.toString().trim() === ' ') return

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
      await sleep(1500)
      await bot.chat('gg')
      await sleep(1000)
      await bot.chat('/play duels_sumo_duel')
      infoLog(`Wins: ${wins}, Losses: ${losses}`, 'CURRENT STATS')
    }
    if(args[1] === 'WINNER!') {
      wins++
      infoLog('Won the round', 'SUMO')
    }

    if(args[4] === 'WINNER!' || args[5] === 'WINNER!') {
      losses++
      infoLog('Lost the round', 'SUMO')
    }

    for(const word of blacklisted_word) {
      if(message.toString().includes(word)) return
    }

    messageLog(message.toString().trim())
  }
}