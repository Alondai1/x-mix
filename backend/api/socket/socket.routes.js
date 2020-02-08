
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('userConnected', user => {
            socket.broadcast.emit('addUser', user)
            console.log('user');

            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('newGame', players => {
            console.log(players);
            
            // if (socket.currGame) {
            //     socket.leave(socket.currGame)
            // }
            // socket.join(name)
            // socket.currGame = name;
          io.emit('startGame', players)
        })
        socket.on('onCellClicked', state => {
            
          io.emit('cellClicked', state)
        })

        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
    })
}