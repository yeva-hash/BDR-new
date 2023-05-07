const {Server} = require('socket.io')
const app = require('../index');

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

    static sendMessagesContent(messageData) {
        this.io.emit('receiveMessage', messageData);
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
            
            socket.on('createRoom', (room) => {
                socket.join(room.id);
                this.rooms.push(room);

                console.log(`new room created with id: ${room}`)
            });

            socket.on('sendMessage', (data) => {
                const {room, message} = data;

                const roomIndex = this.rooms.findIndex(r => r.id === room.id);
                this.rooms[roomIndex].messageData.push(message);

                this.sendMessagesContent(this.rooms[roomIndex].messageData);
            })

            socket.on('getMessages', (room) => {
                const currentRoom = this.rooms.find(r => {
                    return r.id === room.id;
                })
                this.sendMessagesContent(currentRoom.messageData);
            })

            socket.on('user-disconnected', (room) => {
                socket.leave(room.id);
                this.rooms = this.rooms.filter(r => r.id !== room.id);

                console.log(`user leave room with id: ${room.id}`)
            });
        });
    }
}

module.exports = Socket;