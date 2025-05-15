class IBookingRepository {
    async create(booking) {
        throw new Error('Method not implemented');
    }
    
    async getById(id) {
        throw new Error('Method not implemented');
    }
    
    async update(id, booking) {
        throw new Error('Method not implemented');
    }
    
    async delete(id) {
        throw new Error('Method not implemented');
    }
    
    async getAlls() {
        throw new Error('Method not implemented');
    }
    async getsByUserId(userId) {
        throw new Error('Method not implemented');
    }
    async getsByHotelId(hotelId) {
        throw new Error('Method not implemented');
    }
    async getsByDateRange(startDate, endDate) {
        throw new Error('Method not implemented');
    }
}

module.exports = IBookingRepository;