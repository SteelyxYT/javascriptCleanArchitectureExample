class CreateBooking {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(hotelId, userId, startDate, endDate) {
    const booking = await this.bookingRepository.create(hotelId, userId, startDate, endDate);
    return booking;
  }


}

module.exports = CreateBooking;