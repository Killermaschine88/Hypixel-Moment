const { sleep } = require('../constants/functions/misc.js')

module.exports = {
  name: "entityHurt",
  async execute(entity) {
    if(entity.username === bot.username) return
    await bot.clearControlStates()
    //await sleep(100)
    bot.moving = false
  }
}