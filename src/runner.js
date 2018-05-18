const { Wechaty, Room } = require('wechaty')
const QrcodeTerminal = require('qrcode-terminal')
const commands = require('./commands')
const instructionList = require('./commands/index')
const config = require(`${process.cwd()}/config.json`)

module.exports = (cmds, list, callback) => {
  const bot = Wechaty.instance({
    profile: config.profile
  })
  
  bot.on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
      const loginUrl = url.replace(/\/qrcode\//, '/l/')
      QrcodeTerminal.generate(loginUrl)
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
  })
  .on('login', user => console.log('uin:', user.obj.uin))
  .on('message', async (message) => {
    const room = message.room()
    const sender = message.from()
    const content = message.content()
    const [ cmd, ...rest ] = content.split(' ')
    const _cmds = Object.assign(commands, cmds)
    const _list = Object.assign(instructionList, list)
    if (!_cmds[cmd] || _cmds[cmd].paramsNum > rest.length) {
      return
    }
  
    _list[_cmds[cmd].method](rest, sender, room, bot)
    callback()
  })
  .start()  
}
