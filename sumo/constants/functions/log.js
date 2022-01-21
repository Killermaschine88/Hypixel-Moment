const { green, red, yellow, white, gray } = require('colorette')
const { fixMinecraftMessage } = require('./misc.js')

function infoLog(text, tag = 'INFO') {
  console.log(green(`[${tag}] `) + fixMinecraftMessage(text))
}

function errorLog(text, tag = 'ERROR') {
  console.log(red(`[${tag}] `) + text)
}

function warnLog(text, tag = 'WARN') {
  console.log(yellow(`[${tag}] `) + fixMinecraftMessage(text))
}

function messageLog(text) {
  console.log(gray('[MESSAGE] ') + fixMinecraftMessage(text))
}

module.exports = { infoLog, errorLog, warnLog, messageLog }