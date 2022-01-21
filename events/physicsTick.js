const Block = require('prismarine-block')('1.8')
const {
  Vec3
} = require('vec3')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const mcData = require('minecraft-data')('1.8.8')
const defaultMove = new Movements(bot, mcData)

const stoneBlock = new Block(1, 1, 0)

const clientSided = {}

let i = 0

module.exports = {
  name: "physicsTick",
  async execute() {

    //ghost blocks
    if (bot.blockAt(bot.entity.position.offset(0, -1, 0))?.displayName == "Air" && bot.blockAt(bot.entity.position.offset(0, 0, 0))?.displayName == "Air") {
      createClientSide(bot.entity.position.offset(0, -1, 0), stoneBlock)
      createClientSide(bot.entity.position.offset(0, 0, 0), stoneBlock)
    } else if (Object.keys(clientSided).length > 0) {
      removeClientSided()
    }

    //atacking
    if(bot.enemy) {
      const target = bot.nearestEntity(entity => entity.username === bot.enemy)
      console.log(target)

      if(!target) return

      let { x: playerX, y: playerY, z: playerZ } = target.position
      console.log(target.position)
      bot.setControlState("forward", true)
      bot.setControlState("sprint", true)
      bot.lookAt(target.position, true)
      bot.attack(target)
    }
  }
}

function posToStr(pos) {
  return `${pos.x};${pos.y};${pos.z}`
}

function strToPos(str) {
  const splitted = str.split(";")
  return new Vec3(parseFloat(splitted[0]), parseFloat(splitted[1]), parseFloat(splitted[2]))
}

function ClientSidedBlock(oldBlock, newBlock) {
  this.o = oldBlock
  this.n = newBlock
}

function createClientSide(pos, newBlock) {
  const CBlock = new ClientSidedBlock(bot.blockAt(pos), newBlock)
  clientSided[posToStr(pos)] = CBlock
  bot.world.setBlock(pos, newBlock)
}

function removeClientSided() {
  const keys = Object.keys(clientSided)
  keys.forEach((pos) => {
    const CBlock = clientSided[pos]
    const vec3ified = strToPos(pos)
    bot.world.setBlock(vec3ified, CBlock.o)
    delete clientSided[pos]
  })
}