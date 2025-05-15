const Booking = require("../../../domain/entities/Booking");

class CreateBooking {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(hotelId, userId, people, startDate, endDate) {
    if (!hotelId || !userId || !startDate || !endDate || !people) {
      throw new Error('All parameters are required');
    }

    console.log('hotelId', hotelId);
    console.log('userId', userId);
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    const bookingData = new Booking(userId, hotelId, startDate, endDate, people);

    const booking = await this.bookingRepository.create(bookingData);
    return booking;
  }


}

module.exports = CreateBooking;