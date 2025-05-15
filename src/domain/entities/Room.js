class Room {
    #id;
    #hotelId;
    #roomName;
    #roomType;
    #capacity;

    constructor(hotelId, roomName, roomType, capacity, id = null) {
        this.#id = id;
        this.#hotelId = hotelId;
        this.#roomName = roomName;
        this.#roomType = roomType;
        this.#capacity = capacity;
    }

    get roomId() {
        return this.#id;
    }
    get hotelId() {
        return this.#hotelId;
    }
    get roomName() {
        return this.#roomName;
    }
    get roomType() {
        return this.#roomType;
    }
    get capacity() {
        return this.#capacity;
    }
    get roomDetails() {
        return {
            id: this.#id,
            hotelId: this.#hotelId,
            roomName: this.#roomName,
            roomType: this.#roomType,
            capacity: this.#capacity
        };
    }
}

module.exports = Room;