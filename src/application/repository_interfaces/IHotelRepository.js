class IHotelRepository {

    create(hotel) {
        throw new Error("Method 'createHotel' must be implemented.");
    }
    createRoom(hotelId, room) {
        throw new Error("Method 'createRoom' must be implemented.");
    }
    UpdateRoom(roomId, room) {
        throw new Error("Method 'UpdateRoom' must be implemented.");
    }
    getHotelRooms(hotelId) {
        throw new Error("Method 'getHotelRooms' must be implemented.");
    }
    getRoomById(roomId) {
        throw new Error("Method 'getRoomById' must be implemented.");
    }
    getById(hotelId) {
        throw new Error("Method 'getHotelById' must be implemented.");
    }
    getAll() {
        throw new Error("Method 'getAllHotels' must be implemented.");
    }
    update(hotelId, hotel) {
        throw new Error("Method 'updateHotel' must be implemented.");
    }
    delete(hotelId) {
        throw new Error("Method 'deleteHotel' must be implemented.");
    }
    
}

module.exports = IHotelRepository;