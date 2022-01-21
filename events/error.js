const { errorLog } = require('../constants/functions/log.js')

module.exports = {
  name: "error",
  async execute(err) {
    errorLog(err)
  }
}