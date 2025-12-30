import bcrypt from 'bcrypt';

/**
 * Admin credentials loaded from environment variables
 * Set ADMIN_USERNAME and ADMIN_PASSWORD in .env file
 */
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


// if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
//     console.error('ERROR: ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env file');
//     process.exit(1);
// }


const ADMIN_PASSWORD_HASH = await bcrypt.hash(ADMIN_PASSWORD, 10);

/**
 * Authenticate admin user
 * @param {string} username - Admin username
 * @param {string} password - Plain text password
 * @returns {boolean} True if authenticated, false otherwise
 */
async function authenticateAdmin(username, password) {
    try {
        
        if (username !== ADMIN_USERNAME) {
            return false;
        }

        
        const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
        return isMatch;
    } catch (error) {
        console.error('Admin authentication error:', error.message);
        return false;
    }
}

/**
 * Get admin info (without password)
 * @param {string} username - Admin username
 * @returns {Object|null} Admin info or null
 */
function getAdminInfo(username) {
    if (username === ADMIN_USERNAME) {
        return {
            username: ADMIN_USERNAME,
            role: 'admin'
        };
    }
    return null;
}

export {
    authenticateAdmin,
    getAdminInfo,
    ADMIN_USERNAME
};

