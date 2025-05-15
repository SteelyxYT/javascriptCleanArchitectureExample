const IHotelRepository = require("../../application/repository_interfaces/IHotelRepository");
const Hotell = require("../../domain/entities/Hotel");
const pool = require("./db");

class InSQLHotelRepository extends IHotelRepository {
    constructor() {
        super(); // calls the constructor of the parent class (IUserRepository)
        
    }

    async create(hotel) {
        const connection = await pool.getConnection();
        try {
            const [insertRequest] = await connection.query('INSERT INTO hotel (HotelName, HotelAddress, Stjerner) VALUES (?, ?, ?)', [hotel.hotelName, hotel.hotelLocation, hotel.hotelStjerner]);

            const hotelId = insertRequest.insertId;
            const [rows] = await connection.query('SELECT * FROM hotel WHERE HotelID = ?', [hotelId]);

            const newHotel = new Hotell(rows[0].HotelName, rows[0].HotelAddress, rows[0].Stjerner, rows[0].HotelID);

            return newHotel.info;
        } catch (error) {
            console.error("Error creating hotel:", error);
            throw error;
        }
    }

    async createRoom(room) {
        const connection = await pool.getConnection();
        try {
            const [insertRequest] = await connection.query('INSERT INTO room (HotelID, RoomName, Type, Size) VALUES (?, ?, ?, ?)', [room.hotelId, room.roomName, room.roomType, room.capacity]);

            const roomId = insertRequest.insertId;
            const [rows] = await connection.query('SELECT * FROM room WHERE RoomID = ?', [roomId]);

            return rows[0];
        } catch (error) {
            console.error("Error creating room:", error);
            throw error;
        }
    }

    async getHotelRooms(hotelId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM room WHERE HotelID = ?', [hotelId]);
            return rows;
        } catch (error) {
            console.error("Error fetching hotel rooms:", error);
            throw error;
        }
    }

    async getRoomById(roomId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM room WHERE RoomID = ?', [roomId]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching room by ID:", error);
            throw error;
        }
    }

    async getById(hotelId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM hotel WHERE HotelID = ?', [hotelId]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching hotel by ID:", error);
            throw error;
        }
    }

    async getAll() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM hotel');
            return rows;
        } catch (error) {
            console.error("Error fetching all hotel:", error);
            throw error;
        }
    }

    async update(hotel) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('UPDATE hotel SET HotelName = ?, HotelAddress = ?, Stjerner = ? WHERE HotelID = ?', [hotel.hotelName, hotel.hotelLocation, hotel.hotelStjerner, hotel.hotelId]);
            return rows;
        } catch (error) {
            console.error("Error updating hotel:", error);
            throw error;
        }
    }

    async delete(hotelId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('DELETE FROM hotel WHERE HotelID = ?', [hotelId]);
            return rows.affectedRows == 1;
        } catch (error) {
            console.error("Error deleting hotel:", error);
            throw error;
        }
    }
    
}

module.exports = InSQLHotelRepository;