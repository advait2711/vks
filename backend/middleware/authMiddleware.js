import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Verify JWT token middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function verifyToken(req, res, next) {
    try {
       
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded; 
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired.'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Token verification failed.'
        });
    }
}

/**
 * Generate JWT token
 * @param {Object} payload - Data to encode in token
 * @returns {string} JWT token
 */
function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET);
}

export {
    verifyToken,
    generateToken,
    JWT_SECRET
};
