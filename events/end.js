const { warnLog } = require('../constants/functions/log.js')

module.exports = {
  name: "end",
  async execute(reason) {
    warnLog(`Disconnected. Reason ${reason}`, 'DISCONNECTED')
  }
}