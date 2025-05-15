class IHotelRepository {

    create(hotel) {
        throw new Error("Method 'createHotel' must be implemented.");
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