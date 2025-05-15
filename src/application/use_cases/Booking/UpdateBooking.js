class UpdateBooking {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(bookingId, updatedData) {
    // Validate input
    if (!bookingId || !updatedData) {
      throw new Error('Invalid input');
    }

    // Update booking in the repository
    const updatedBooking = await this.bookingRepository.update(bookingId, updatedData);

    // Return the updated booking
    return updatedBooking;
  }
}

module.exports = UpdateBooking;