class SocketMessage {
    constructor(message, isAdmin) {
        this.message = message;
        this.isAdmin = isAdmin;
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
        this.isBadge = true;
    }

    static setSelectedRoom(room) {
        this.selectedRoom = room;
    }
}

export { SocketMessage, SocketRoom }


