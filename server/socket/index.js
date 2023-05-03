const {Server} = require('socket.io')
const app = require('../index');

class Socket {
    static io;

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
            
            //socket.emit("hello", "world");
        });
    }
}

module.exports = Socket;