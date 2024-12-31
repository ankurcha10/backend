const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistTokenSchema = require('../models/blacklistToken');

module.exports.authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token || // Check if cookies and token exist
            (req.headers.authorization && req.headers.authorization?.split(' ')[1]); // Check if headers and authorization exist

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token missing' });
        }
        const isBlacklisted = await blacklistTokenSchema.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
