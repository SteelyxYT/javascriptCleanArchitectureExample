const JWTService = require("../../infrastructure/services/JWTService");

class AuthMiddleware {
    constructor(roleIdNeeded, exactRoleId = false) {
        this.roleIdNeeded = roleIdNeeded;
        this.exactRoleId = exactRoleId;
    }

    async handle(req, res, next) {
        try {
            const token = req.header('authorization')?.replace('Bearer ', '');
            if (!token) return res.status(401).send('Access denied. No token provided.');

            const JWTService = new JWTService();
            const decoded = await JWTService.verifyToken(token);
            req.user = decoded;

            if (this.exactRoleId && decoded.roleId !== this.roleIdNeeded) {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }
            if (!this.exactRoleId && !decoded.roleIds.includes(this.roleIdNeeded)) {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }

            next();
        } catch (error) {
            res.status(400).send('Invalid token.');
        }
    }
}

module.exports = AuthMiddleware;

