class GetHotelById {
  constructor(hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute(id) {
    // Validate hotel ID
    if (!id) {
      throw new Error('Invalid hotel ID');
    }

    // Get hotel by ID
    const hotel = await this.hotelRepository.getById(id);
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    return new Hotell(
      hotel.HotelID,
      hotel.HotelName,
      hotel.HotelAddress,
      hotel.Stjerner
    );
  }
}

module.exports = GetHotelById;