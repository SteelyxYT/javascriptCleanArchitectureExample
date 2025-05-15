const IBookingRepository = require("../../application/repository_interfaces/IBookingRepository");
const Booking = require("../../domain/entities/Booking");
const pool = require("./db");

class InSQLBookingRepository extends IBookingRepository {
    constructor() {
        super(); // calls the constructor of the parent class (IUserRepository)
        
    }

    async create(booking) {
        const connection = await pool.getConnection();
        try {

            const [Rooms] = await connection.query('SELECT * FROM room WHERE HotelID = ?', [booking.hotelId]);

            console.log("Rooms:", Rooms);

            if (Rooms.length === 0) {
                throw new Error("No rooms available for this hotel.");
            }
            const room = Rooms[0];
            const roomId = room.RoomID;

            console.log("Booking:", booking.bookingDetails);

            const [insertRequest] = await connection.query('INSERT INTO booking (RoomID, UserID, StartDate, EndDate, People) VALUES (?, ?, ?, ?, ?)', [roomId, booking.userId, booking.checkInDate, booking.checkOutDate, booking.bookingAmount]);

            const bookingId = insertRequest.insertId;
            const [rows] = await connection.query('SELECT * FROM booking WHERE BookingID = ?', [bookingId]);

            const newBooking = new Booking(rows[0].roomID, rows[0].UserID, rows[0].StartDate, rows[0].EndDate, rows[0].People, rows[0].BookingID);
            console.log("New Booking:", newBooking.bookingDetails);

            return newBooking.bookingDetails;
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