import supabase from '../config/supabase.js';
import bcrypt from 'bcrypt';

/**
 * Authenticate a member using sl_no and OTP password
 * @param {number} sl_no - Member serial number
 * @param {string} otp_password - Plain text OTP password
 * @returns {Object|null} Member data if authenticated, null otherwise
 */
async function authenticateMember(sl_no, otp_password) {
    try {
        // Fetch member by sl_no
        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .select('*')
            .eq('sl_no', sl_no)
            .single();

        if (error || !data) {
            return null;
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(otp_password, data.otp_password);

        if (!isMatch) {
            return null;
        }

        // Return member data without the password
        const { otp_password: _, ...memberWithoutPassword } = data;
        return memberWithoutPassword;
    } catch (error) {
        console.error('Authentication error:', error.message);
        return null;
    }
}

/**
 * Get member by sl_no
 * @param {number} sl_no - Member serial number
 * @returns {Object|null} Member data without password
 */
async function getMemberById(sl_no) {
    try {
        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .select('sl_no, name, address, family_members, mobile_no, occupation, blood_group, native_place, email, current_status, profile_photo')
            .eq('sl_no', sl_no)
            .single();

        if (error || !data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching member:', error.message);
        return null;
    }
}

/**
 * Update member information
 * @param {number} sl_no - Member serial number
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated member data
 */
async function updateMember(sl_no, updates) {
    try {
        // Prevent updating restricted fields
        const { sl_no: _, name: __, otp_password: ___, ...allowedUpdates } = updates;

        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .update(allowedUpdates)
            .eq('sl_no', sl_no)
            .select('sl_no, name, address, family_members, mobile_no, occupation, blood_group, native_place, email, current_status, profile_photo')
            .single();

        if (error || !data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error updating member:', error.message);
        return null;
    }
}

export {
    authenticateMember,
    getMemberById,
    updateMember
};
