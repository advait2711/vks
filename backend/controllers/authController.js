import { authenticateAdmin, getAdminInfo } from '../models/adminModel.js';
import { generateToken } from '../middleware/authMiddleware.js';

/**
 * Admin login controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Authenticate admin
        const isAuthenticated = await authenticateAdmin(username, password);

        if (!isAuthenticated) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Get admin info
        const adminInfo = getAdminInfo(username);

        // Generate JWT token (no expiration)
        const token = generateToken({
            username: adminInfo.username,
            role: adminInfo.role
        });

        res.json({
            success: true,
            message: 'Login successful',
            token,
            admin: adminInfo
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
}

/**
 * Admin logout controller
 * Note: With JWT, logout is handled client-side by removing the token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function logout(req, res) {
    res.json({
        success: true,
        message: 'Logout successful'
    });
}

/**
 * Verify token controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function verifyTokenController(req, res) {
    
    res.json({
        success: true,
        message: 'Token is valid',
        admin: req.admin
    });
}

export {
    login,
    logout,
    verifyTokenController
};
