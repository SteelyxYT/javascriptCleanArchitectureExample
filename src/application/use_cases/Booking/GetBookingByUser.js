class GetBookingByUser {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const bookings = await this.bookingRepository.getBookingsByUserId(userId);
    return bookings;
  }
}

module.exports = GetBookingByUser;