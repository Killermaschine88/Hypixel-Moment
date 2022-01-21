const { errorLog } = require('../constants/functions/log.js')

module.exports = {
  name: "kicked",
  async execute(reason, wasLoggedIn) {
    errorLog(reason, 'KICKED')
  }
}