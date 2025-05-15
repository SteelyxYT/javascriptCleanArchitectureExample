class GetRoom {
    constructor(hotelRepository) {
        this.hotelRepository = hotelRepository;
    }
    async execute(roomId) {
        if (!roomId) {
            throw new Error('Room ID is required');
        }

        const room = await this.hotelRepository.getRoomById(roomId);
        if (!room) {
            throw new Error('Room not found');
        }

        return room;
    }
}

module.exports = GetRoom;