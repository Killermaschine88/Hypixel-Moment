function fixMinecraftMessage(text) {
  return text.replace(/\u00A7[0-9A-FK-OR]/gi, '')
}

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


module.exports = { fixMinecraftMessage, sleep }