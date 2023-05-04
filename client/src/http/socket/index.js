import io from 'socket.io-client'

export default class SocketClient {
    static socket;
    static init() {
        this.socket = io.connect('http://localhost:8080');
    }

    static emitEvent(name, args) {
        this.socket.emit(name, args);
    }

    static onEvent(name, callback) {
        this.socket.on(name, (args) => callback(args));
    }
}
