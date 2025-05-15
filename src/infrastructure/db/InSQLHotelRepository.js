const IHotelRepository = require("../../application/repository_interfaces/IHotelRepository");
const Hotell = require("../../domain/entities/Hotel");
const pool = require("./HotelDb");

class InSQLHotelRepository extends IHotelRepository {
    constructor() {
        super(); // calls the constructor of the parent class (IUserRepository)
        
    }

    async create(hotel) {
        const connection = await pool.getConnection();
        try {
            const [insertRequest] = await connection.query('INSERT INTO hotels (HotelName, HotelAddress, Stjerner) VALUES (?, ?, ?)', [hotel.hotelName, hotel.hotelLocation, hotel.hotelStjerner]);

            const hotelId = insertRequest.insertId;
            const [rows] = await connection.query('SELECT * FROM hotels WHERE HotelID = ?', [hotelId]);

            const newHotel = new Hotell(rows[0].HotelName, rows[0].HotelAddress, rows[0].Stjerner, rows[0].HotelID);

            return newHotel.info;
        } catch (error) {
            console.error("Error creating hotel:", error);
            throw error;
        }
    }

    async getById(hotelId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM hotels WHERE HotelID = ?', [hotelId]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching hotel by ID:", error);
            throw error;
        }
    }

    async getAll() {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('SELECT * FROM hotels');
            return rows;
        } catch (error) {
            console.error("Error fetching all hotels:", error);
            throw error;
        }
    }

    async update(hotel) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('UPDATE hotels SET HotelName = ?, HotelAddress = ?, Stjerner = ? WHERE HotelID = ?', [hotel.hotelName, hotel.hotelLocation, hotel.hotelStjerner, hotel.hotelId]);
            return rows;
        } catch (error) {
            console.error("Error updating hotel:", error);
            throw error;
        }
    }

    async delete(hotelId) {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query('DELETE FROM hotels WHERE HotelID = ?', [hotelId]);
            return rows.affectedRows == 1;
        } catch (error) {
            console.error("Error deleting hotel:", error);
            throw error;
        }
    }
    
}

module.exports = InSQLHotelRepository;