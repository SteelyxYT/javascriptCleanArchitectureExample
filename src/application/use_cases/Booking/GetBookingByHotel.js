class GetBookingByHotel {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }

  async execute(hotelId) {
    if (!hotelId) {
      throw new Error('Hotel ID is required');
    }

    const bookings = await this.bookingRepository.getBookingsByHotel(hotelId);
    return bookings;
  }
}

module.exports = GetBookingByHotel;