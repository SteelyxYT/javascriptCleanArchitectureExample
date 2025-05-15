const jwt = require('jsonwebtoken');
const IJWTService = require('../../application/Service_interfaces/IJWTservice');
require('dotenv').config();

class JWTService extends IJWTService {

    constructor() {
        super();
    }

    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error("Invalid token.");
        }
    }
    async generateToken(user) {
        try {
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        } catch (error) {
            console.error("Error generating token:", error);
            throw new Error("Error generating token.");
        }
    }
}

module.exports = JWTService;