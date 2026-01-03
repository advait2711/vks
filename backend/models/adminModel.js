import bcrypt from 'bcrypt';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
    console.error('ADMIN_USERNAME or ADMIN_PASSWORD_HASH missing in .env');
    process.exit(1);
}

/**
 * Authenticate admin user
 */
async function authenticateAdmin(username, password) {
    try {
        if (username !== ADMIN_USERNAME) {
            return false;
        }

        return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    } catch (error) {
        console.error('Admin authentication error:', error.message);
        return false;
    }
}

/**
 * Get admin info (without password)
 */
function getAdminInfo(username) {
    if (username === ADMIN_USERNAME) {
        return {
            username,
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
