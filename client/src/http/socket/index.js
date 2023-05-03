import io from 'socket.io-client'

export default class SocketClient {
    init() {
        this.socket = io.connect('http://localhost:8080');
        this.socket.emit('connected', 'user');
    }
}
