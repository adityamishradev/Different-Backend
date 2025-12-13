const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
// Authentication Middleware
async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        req.user = user; // Attach user to request object
        next();
    }   
    catch (error) {
        console.error('Authentication error', error);
        return res.status(500).json({ success: false, message: 'Authentication error', error });
    }
}
module.exports = authMiddleware;