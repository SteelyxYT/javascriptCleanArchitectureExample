class GetHotelRooms {
  constructor(hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute(hotelId) {
    if (!hotelId) {
      throw new Error('Hotel ID is required');
    }

    const hotel = await this.hotelRepository.getHotelRooms(hotelId);
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    return hotel;
  }
}

module.exports = GetHotelRooms;