const { Room } = require('wechaty')
const rules = require(`${process.cwd()}/rules/add_room`)

module.exports = async function RoomAdd(content, sender, room, bot) {
  try {
    if (!rules[content.join(' ')]) return sender.say('查无此群')
    const targetRoom = await Room.find({ topic: rules[content.join(' ')] })
    if (sender !== bot.user) {
      if (!targetRoom) return sender.say('查无此群')
      await targetRoom.add(sender)
    }
  } catch(e) {
    console.log(e)
  }
}
