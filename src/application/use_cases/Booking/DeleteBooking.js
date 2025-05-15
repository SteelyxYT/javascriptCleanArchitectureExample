class DeleteBooking {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(bookingId) {
    if (!bookingId) {
      throw new Error('Booking ID is required');
    }

    const booking = await this.bookingRepository.getById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }

    await this.bookingRepository.delete(bookingId);
  }
}

module.exports = DeleteBooking;