const Room = require("../../../domain/entities/Room");

class CreateRoom {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }

  async execute(HotelId, roomName, roomType, roomCapacity) {
    // Validate room data
    if (!HotelId || !roomType || !roomCapacity) {
      throw new Error('Invalid room data');
    }

    const roomData = new Room(HotelId, roomName, roomType, roomCapacity);

    // Create room
    const room = await this.roomRepository.createRoom(roomData);
    return room;
  }
}

module.exports = CreateRoom;