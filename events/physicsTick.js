const Block = require('prismarine-block')('1.8')
const {
  Vec3
} = require('vec3')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const mcData = require('minecraft-data')('1.8.8')
const defaultMove = new Movements(bot, mcData)
const { sleep } = require('../constants/functions/misc.js')

const stoneBlock = new Block(1, 1, 0)

const clientSided = {}

module.exports = {
  name: "physicsTick",
  async execute() {

    //ghost blocks
    if (bot.blockAt(bot.entity.position.offset(0, -1, 0))?.displayName == "Air" && bot.blockAt(bot.entity.position.offset(0, 0, 0))?.displayName == "Air" && bot.ghostblock) {
      bot.ghostblock = false
      setTimeout(() => {
        bot.ghostblock = true
      }, 1000)
      createClientSide(bot.entity.position.offset(0, -1, 0), stoneBlock)
      createClientSide(bot.entity.position.offset(0, 0, 0), stoneBlock)
    } else if (Object.keys(clientSided).length > 0) {
      removeClientSided()
    }

    //atacking
    if(bot.enemy) {
      const target = bot.nearestEntity(entity => entity.username === bot.enemy)

      if(!target) return

      if(!bot.moving) {
        bot.moving = true
        bot.setControlState("forward", true)
        bot.setControlState("sprint", true)
      }
      bot.lookAt(target.position.offset(0, 1.65, 0), true)
      setTimeout(() => {
        strafe(bot)
      })
      bot.attack(target)
    } else {
      bot.setControlState("forward", false)
      bot.setControlState("sprint", false)
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

async function strafe(bot) {
  bot.setControlState("left", true)
  await sleep(250)
  bot.setControlState("left", false)
  bot.setControlState("right", true)
  await sleep(250)
  bot.setControlState("right", false)
}