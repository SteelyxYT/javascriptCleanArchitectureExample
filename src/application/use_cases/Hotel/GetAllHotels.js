class GetAllHotels {
  constructor(hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute() {
    try {
      const hotels = await this.hotelRepository.getAll();
      return hotels;
    } catch (error) {
      throw new Error('Error fetching hotels: ' + error.message);
    }
  }
}

module.exports = GetAllHotels;