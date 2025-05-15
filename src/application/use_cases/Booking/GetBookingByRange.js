class GetBookingByRange {
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    async execute(startDate, endDate) {

        if (!startDate || !endDate) {
            throw new Error('Start date and end date are required');
        }

        const bookings = await this.bookingRepository.getByDateRange(startDate, endDate);
        return bookings;
    }
}

module.exports = GetBookingByRange;