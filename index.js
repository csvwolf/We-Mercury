const { Wechaty, Room } = require('wechaty')
const terminalImage = require('terminal-image')
const axios = require('axios')
const commands = require('./commands')
const instructionList = require('./commands/index')
const config = require('./config.json')

const bot = Wechaty.instance({
  profile: config.profile
})

bot.on('scan', async (url, code) => {
  axios.get(url, {
    responseType: 'arraybuffer'
  }).then(async ({ data }) => {
    console.log(await terminalImage.buffer(data))
  })
})
.on('login', user => console.log(user.obj.uin))
.on('message', async (message) => {
  const room = message.room()
  const sender = message.from()
  const content = message.content()
  const [ cmd, ...rest ] = content.split(' ')
  if (!commands[cmd] || commands[cmd].paramsNum > rest.length) {
    return
  }

  instructionList[commands[cmd].method](rest, sender, room, bot)
})
.start()
