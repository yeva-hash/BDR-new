const {Server} = require('socket.io')
const app = require('../index');
const { SocketRoom } = require('./components/rooms');

class Socket {
    static rooms = [];
    static init() {
        const server = require('http').Server(app); 
        this.io = new Server(server, {
            cors: { origin: "*" }
        })
        server.listen(8080);
        this.handleEvents();
    }

    static handleEvents() {
        this.io.on("connection", (socket) => {
            console.log('user connected')

            socket.on('initGetRooms', () => {
                socket.emit('getRooms', this.rooms);
            })

            socket.on('adminJoin', () => {
                this.rooms.forEach(room => {
                    socket.join(room.id);
                    
                    console.log(`admin connected to: ${room.id}`);
                });
            })
            
            socket.on('createRoom', (roomId) => {
                socket.join(roomId);
                this.rooms.push(new SocketRoom(roomId)); 

                console.log(`new room created with id: ${roomId}`)
            });
        });
    }
}

module.exports = Socket;