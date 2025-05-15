class AuthMiddleware {
    constructor(roleIdNeeded, exactRoleId = false) {
        this.roleIdNeeded = roleIdNeeded;
        this.exactRoleId = exactRoleId;
    }

    async handle(req, res, next) {
        try {
            const token = req.header('x-auth-token');
            if (!token) return res.status(401).send('Access denied. No token provided.');

            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.roleId < this.roleIdNeeded && !this.exactRoleId) {
                return res.status(403).send('Access denied. Insufficient permissions.');
            }
            if (decoded.roleId !== this.roleIdNeeded && this.exactRoleId) {
                return res.status(403).send('Access denied. Invalid role.');
            }

            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).send('Invalid token.');
        }
    }
}

module.exports = AuthMiddleware;

