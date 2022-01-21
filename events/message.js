const { messageLog } = require('../constants/functions/log.js')
const blacklisted_word = ['Mana']

module.exports = {
  name: "message",
  async execute(message) {

    for(const word of blacklisted_word) {
      if(message.toString().includes(word)) return
    }

    const args = message.toString().trim().split(' ')
    if(args[0] === 'Opponent:') {
      bot.enemy = args[2]
    }

    console.log(args)
    
    //messageLog(message.toString())
  }
}