//Hypixel Limbo Fix
module.exports = {
  name: "transaction",
  async execute(packet) {
    packet.accepted = true
    bot._client.write('transaction', packet)
  }
}