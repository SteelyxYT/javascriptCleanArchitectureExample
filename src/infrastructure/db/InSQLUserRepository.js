const bcrypt = require("bcrypt");
const User = require("../../domain/entities/User");

const IUserRepository = require("../../application/repository_interfaces/IUserRepository");
const pool = require("./db");

class InMemoryUserRepository extends IUserRepository {
    constructor() {
        super(); // calls the constructor of the parent class (IUserRepository)
        
    }

    async save(user) {

        // Add bcrypt hashing
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create a new User object
        const userObj = new User(user.username, hashedPassword, user.email, user.role);
        console.log("User created:", userObj.profile);

        try {
        const connection = await pool.getConnection();

        const [result] = await connection.query(
            "INSERT INTO user (username, password, email, role) VALUES (?, ?, ?, ?)",
            [userObj.username, userObj.password, userObj.email, userObj.role]
        );

        const userId = result.insertId;
        const [rows] = await connection.query(
            "SELECT * FROM user WHERE UserID = ?",
            [userId]
        );

        const newUser = new User(rows[0].username, rows[0].password, rows[0].email, rows[0].role, rows[0].UserID);
        console.log("User saved:", newUser.profile);

        await connection.release();

        return newUser.profile;

        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }

    async findByUsername(username) {
        try {
            const connection = await pool.getConnection();

            const [user] = await connection.query("SELECT * FROM user WHERE username=?", [username])

            await connection.release();

            return user[0];

        } catch(e) {
            console.error("Error connecting to the database:", error);
        }
    }



}

module.exports = InMemoryUserRepository;