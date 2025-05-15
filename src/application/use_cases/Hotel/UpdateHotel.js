const Hotell = require("../../../domain/entities/Hotel");

class UpdateHotel {
  constructor(hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  async execute(hotelId, hotelName, hotelLocation, hotelStjerner) {

    const UpdateHotelData = new Hotell(
        hotelName,
        hotelLocation,
        hotelStjerner,
        hotelId
    );

    const updatedHotel = await this.hotelRepository.update(UpdateHotelData);
    if (!updatedHotel) {
      throw new Error("Error updating hotel");
    }
    return updatedHotel;
  }
}

module.exports = UpdateHotel;