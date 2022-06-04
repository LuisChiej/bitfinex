const { PeerRPCServer } = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)

setInterval(function () {
  link.announce('rpc_test', service.port, {}, (err, data) => {
    console.log(err, data, service.port)
  })
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  console.log(payload) //  { msg: 'hello' }
  handler.reply(null, { msg: 'world' })
})
