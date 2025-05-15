const IBookingRepository = require("../../application/repository_interfaces/IBookingRepository");
const Booking = require("../../domain/entities/Booking");
const pool = require("./HotelDb");

class InSQLBookingRepository extends IBookingRepository {
    constructor() {
        super(); // calls the constructor of the parent class (IUserRepository)
        
    }

    async create(booking) {
        const connection = await pool.getConnection();
        try {
            const [insertRequest] = await connection.query('INSERT INTO booking (HotelID, UserID, StartDate, EndDate) VALUES (?, ?, ?, ?)', [booking.hotelId, booking.userId, booking.startDate, booking.endDate]);

            const bookingId = insertRequest.insertId;
            const [rows] = await connection.query('SELECT * FROM booking WHERE BookingID = ?', [bookingId]);

            const newBooking = new Booking(rows[0].HotelID, rows[0].UserID, rows[0].StartDate, rows[0].EndDate, rows[0].BookingID);

            return newBooking.info;
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error;
        }
    }

    async getById(bookingId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM booking WHERE BookingID = ?', [bookingId]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching booking by ID:", error);
            throw error;
        }
    }

    async getByUserId(userId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM booking WHERE UserID = ?', [userId]);
            return rows;
        } catch (error) {
            console.error("Error fetching booking by User ID:", error);
            throw error;
        }
    }

    async getAll() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM booking');
            return rows;
        } catch (error) {
            console.error("Error fetching all bookings:", error);
            throw error;
        }
    }

    async update(booking) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('UPDATE booking SET HotelID = ?, UserID = ?, StartDate = ?, EndDate = ? WHERE BookingID = ?', [booking.hotelId, booking.userId, booking.startDate, booking.endDate, booking.bookingId]);
            return rows;
        } catch (error) {
            console.error("Error updating booking:", error);
            throw error;
        }
    }

    async delete(bookingId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('DELETE FROM booking WHERE BookingID = ?', [bookingId]);
            return rows.affectedRows == 1;
        } catch (error) {
            console.error("Error deleting booking:", error);
            throw error;
        }
    }

    async getBookingsByHotelId(hotelId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM booking WHERE HotelID = ?', [hotelId]);
            return rows;
        } catch (error) {
            console.error("Error fetching booking by Hotel ID:", error);
            throw error;
        }
    }

    async getBookingsByDateRange(startDate, endDate) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM booking WHERE StartDate >= ? AND EndDate <= ?', [startDate, endDate]);
            return rows;
        } catch (error) {
            console.error("Error fetching booking by date range:", error);
            throw error;
        }
    }
   
}

module.exports = InSQLBookingRepository;