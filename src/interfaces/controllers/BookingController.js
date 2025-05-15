function BookingController( CreateBookingUseCase, GetAllBookingsUseCase, GetBookingByIdUseCase, GetBookingsByUserIdUseCase, GetBookingsByHotelIdUseCase, GetBookingsByDateRangeUseCase, UpdateBookingUseCase, DeleteBookingUseCase) {
    return {
        async createBooking(req, res) {
            const { hotelId, userId, startDate, endDate } = req.body;

            try {
                const booking = await CreateBookingUseCase.execute(hotelId, userId, startDate, endDate);
                res.status(201).json(booking);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },

        async getAllBookings(req, res) {
            try {
                const bookings = await GetAllBookingsUseCase.execute();
                res.status(200).json(bookings);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async getBookingById(req, res) {
            try {
                const booking = await GetBookingByIdUseCase.execute(req.params.bookingId);
                res.status(200).json(booking);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async updateBooking(req, res) {
            const { bookingId, hotelId, userId, startDate, endDate } = req.body;

            try {
                const updatedBooking = await UpdateBookingUseCase.execute(bookingId, hotelId, userId, startDate, endDate);
                res.status(200).json(updatedBooking);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async deleteBooking(req, res) {
            try {
                const deletedBooking = await DeleteBookingUseCase.execute(req.params.bookingId);
                res.status(204).send(deletedBooking);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async getBookingsByUserId(req, res) {
            try {
                const bookings = await GetBookingsByUserIdUseCase.execute(req.params.userId);
                res.status(200).json(bookings);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async getBookingsByHotelId(req, res) {
            try {
                const bookings = await GetBookingsByHotelIdUseCase.execute(req.params.hotelId);
                res.status(200).json(bookings);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        },
        async getBookingsByDateRange(req, res) {
            const { startDate, endDate } = req.query;

            try {
                const bookings = await GetBookingsByDateRangeUseCase.execute(startDate, endDate);
                res.status(200).json(bookings);
            } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
    }
}


module.exports = BookingController;