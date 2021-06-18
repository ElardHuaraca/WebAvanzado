`use strict`

const express = require('express')
const serverHttp = require('http').Server(express)
const io = require('socket.io')(serverHttp, {
    cors: {
        origin: '*',
    }
})
const cors = require('cors')

var app = express()

app.use(cors)

const myMessage = []
io.on('connection', function (socket) {
    socket.on('send message', function (data) {
        myMessage.push(data)
        socket.emit('text event', myMessage)
        socket.broadcast.emit('text event', myMessage)
    })
})

serverHttp.listen(9000, () => {
    console.log(`server running on port ${9000}`)
})

module.exports = app