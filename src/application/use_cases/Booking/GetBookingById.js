class GetBookingById {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(bookingId) {
    const booking = await this.bookingRepository.getById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }
}

module.exports = GetBookingById;