class GetAllBookings {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute() {
    try {
      const bookings = await this.bookingRepository.getAllBookings();
      return bookings;
    } catch (error) {
      throw new Error('Error fetching bookings: ' + error.message);
    }
  }
}

module.exports = GetAllBookings;