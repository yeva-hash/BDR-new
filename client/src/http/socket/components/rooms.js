class SocketMessage {
    constructor(message) {
        this.message = message;
        this.createdAt = new Date();
    }
    static sortMessages(a, b) {
        return a < b;
    }
}

class SocketRoom {
    static selectedRoom = {};
    constructor(id) {
        this.id = id;
        this.messageData = [];
    }

    static setSelectedRoom(room) {
        this.selectedRoom = room;
    }
}

export { SocketMessage, SocketRoom }


