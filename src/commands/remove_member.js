const { Room, Contact } = require('wechaty')
const config = require(`${process.cwd()}/config.json`)

module.exports = async function RemoveMember(content, sender, room, bot) {
  try {
    const targetUser = await Contact.find({ name: content.join(' ') })
    if (sender.obj.uin === config.admin && room) {
      await room.del(targetUser)
    }
  } catch(e) {
    console.log(e)
  }
}
