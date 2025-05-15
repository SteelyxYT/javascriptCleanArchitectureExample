const Hotell = require('../../../domain/entities/Hotel');

class createHotel {
  constructor(hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

    async execute(hotelname, hotelLocation, hotelStjerner) {
        // Validate hotel data
        console.log(hotelname, hotelLocation, hotelStjerner);

        if (!hotelname || !hotelLocation) {
            throw new Error('Invalid hotel data');
        }
        
        const DatabaseInputData = new Hotell(hotelname, hotelLocation, hotelStjerner);

        // Create hotel
        const hotel = await this.hotelRepository.create(DatabaseInputData);

        return hotel;
    }
}

module.exports = createHotel;