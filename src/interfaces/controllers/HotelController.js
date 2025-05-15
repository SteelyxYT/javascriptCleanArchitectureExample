function HotelController(CreateHotelUseCase, CreateRoomUseCase, GetHotelRoomsUseCase, GetRoomByIdUseCase, GetHotelUseCase, GetAllHotelsUseCase, UpdateHotelUseCase, DeleteHotelUseCase) {
    return {
        async createHotel(req, res) {
            const { hotelName, hotelLocation, hotelStjerner } = req.body;

            try {
                const hotel = await CreateHotelUseCase.execute(hotelName, hotelLocation, hotelStjerner);
                res.status(201).json(hotel);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async createRoom(req, res) {
            const { roomName, roomType, roomCapacity } = req.body;

            try {
                const room = await CreateRoomUseCase.execute(req.params.hotelId, roomName, roomType, roomCapacity);
                res.status(201).json(room);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async getHotelRooms(req, res) {
            try {
                const rooms = await GetHotelRoomsUseCase.execute(req.params.hotelId);
                res.status(200).json(rooms);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async getRoomById(req, res) {
            try {
                const room = await GetRoomByIdUseCase.execute(req.params.roomId);
                res.status(200).json(room);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async getHotel(req, res) {
            try {
                const hotel = await GetHotelUseCase.execute(req.params.hotelId);
                res.status(200).json(hotel);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async getAllHotels(req, res) {
            try {
                const hotels = await GetAllHotelsUseCase.execute();
                res.status(200).json(hotels);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async updateHotel(req, res) {
            const { hotelId, hotelName, hotelLocation, hotelStjerner } = req.body;

            try {
                const updatedHotel = await UpdateHotelUseCase.execute(hotelId, hotelName, hotelLocation, hotelStjerner);
                res.status(200).json(updatedHotel);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async deleteHotel(req, res) {
            try {
                const deletedHotel = await DeleteHotelUseCase.execute(req.params.hotelId);
                res.status(204).send(deletedHotel);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
}


module.exports = HotelController;