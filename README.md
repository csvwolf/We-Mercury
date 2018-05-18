# We-Mercury
Another WeChat Bot.

### QuickStart

安装：`npm install we-mercury`

配置 `./config.json`，目前支持管理员配置和 `profile`，uin 会在登录后输出在 console，填写就能生效，profile 用于保存配置信息，在一段时间内不用重新扫码：

```json
{
  "admin": 0,
  "profile": "user"
}
```

启用：

```javascript
const mercury = require('we-mercury')
/**
 * commands: 内置的命令前缀和函数名
 * list: 函数列表
 * message callback: 用于监听 message 后的回调
 */
mercury({
  // commands
}, {
  // function list
}, () => {
  // message callback
})
```

一个标准的 `commands`: 

```javascript
{
  '/room': {
    tip: '申请加入房间',
    method: 'AddRoom',
    paramsNum: 1
  },
  '/remove': {
    tip: '移除用户',
    method: 'RemoveMember', // 方法名，与 function list 对应
    paramsNum: 1  // 参数数量
  }
}
```

一个标准的 `function list`：

```javascript
const AddRoom = require('./add_room')
const RemoveMember = require('./remove_member')
module.exports = {
  AddRoom,
  RemoveMember
}
```

内置了 `add_room` 和 `remove_member`。需要对每个命令配置规则，在根目录新建文件夹 `rules`，并创造 `add_rooms.js`（推荐与命令同名）：

```javascript
module.exports = {
  'live': /^知乎 Live/, // 参数 和 匹配条件，支持正则
  'eleme-fe2017': '饿了么大前端交流群',
  'boom-flower': '不锈钢姐妹花'
}
```

然后走起。

具体的例子可见 `/example`

### 梗

> 墨丘利（拉丁语：Mercurius）是罗马神话中为众神传递信息的使者
