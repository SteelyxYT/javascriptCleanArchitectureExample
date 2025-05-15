class DeleteHotel {
  constructor(hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute(hotelId) {
    if (!hotelId) {
      throw new Error('Hotel ID is required');
    }

    const hotel = await this.hotelRepository.getById(hotelId);
    if (!hotel) {
      throw new Error('Hotel not found');
    }

    const deleted = await this.hotelRepository.delete(hotelId);

    if (!deleted) {
      throw new Error('Error deleting hotel');
    }

    return { message: 'Hotel deleted successfully' };
  }
}

module.exports = DeleteHotel;