import supabase from '../config/supabase.js';
import bcrypt from 'bcrypt';

/**
 * Get all members (admin view with all fields)
 * @returns {Array} Array of members
 */
async function getAllMembers() {
    try {
        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .select('*')
            .order('sl_no', { ascending: true });

        if (error) {
            console.error('Error fetching members:', error.message);
            return [];
        }

        
        return data || [];
    } catch (error) {
        console.error('Error in getAllMembers:', error.message);
        return [];
    }
}

/**
 * Get single member by sl_no (admin view)
 * @param {number} sl_no - Member serial number
 * @returns {Object|null} Member data or null
 */
async function getMemberBySlNo(sl_no) {
    try {
        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .select('*')
            .eq('sl_no', sl_no)
            .single();

        if (error || !data) {
            return null;
        }

        
        const { otp_password, ...memberData } = data;
        return memberData;
    } catch (error) {
        console.error('Error in getMemberBySlNo:', error.message);
        return null;
    }
}

/**
 * Create new member (admin only)
 * @param {Object} memberData - Member data
 * @returns {Object|null} Created member or null
 */
async function createMember(memberData) {
    try {
        const {
            sl_no,
            name,
            address,
            family_members,
            mobile_no,
            occupation,
            blood_group,
            native_place,
            email,
            current_status,
            profile_photo,
            otp_password
        } = memberData;

        
        const hashedPassword = await bcrypt.hash(otp_password, 10);

        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .insert([{
                sl_no,
                name,
                address,
                family_members,
                mobile_no,
                occupation,
                blood_group,
                native_place,
                email,
                current_status: current_status || 'Active',
                profile_photo: profile_photo || null,
                otp_password: hashedPassword,
                otp_plain: otp_password  
            }])
            .select()
            .single();

        if (error || !data) {
            console.error('Error creating member:', error?.message);
            return null;
        }

        
        const { otp_password: _, ...memberWithoutHashedPassword } = data;
        return memberWithoutHashedPassword;
    } catch (error) {
        console.error('Error in createMember:', error.message);
        return null;
    }
}

/**
 * Update member (admin only)
 * @param {number} sl_no - Member serial number
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated member or null
 */
async function updateMemberAdmin(sl_no, updates) {
    try {
        const updateData = {};

        
        const allowedFields = [
            'name',
            'address',
            'family_members',
            'mobile_no',
            'occupation',
            'blood_group',
            'native_place',
            'email',
            'current_status',
            'profile_photo'
        ];

        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                updateData[field] = updates[field];
            }
        });

        
        if (updates.otp_password) {
            updateData.otp_password = await bcrypt.hash(updates.otp_password, 10);
            updateData.otp_plain = updates.otp_password;  
        }

        const { data, error } = await supabase
            .from('kerala_samaj_data')
            .update(updateData)
            .eq('sl_no', sl_no)
            .select()
            .single();

        if (error || !data) {
            console.error('Error updating member:', error?.message);
            return null;
        }

        
        const { otp_password, ...updatedMemberData } = data;
        return updatedMemberData;
    } catch (error) {
        console.error('Error in updateMemberAdmin:', error.message);
        return null;
    }
}

/**
 * Delete member (admin only)
 * @param {number} sl_no - Member serial number
 * @returns {boolean} True if deleted, false otherwise
 */
async function deleteMember(sl_no) {
    try {
        const { error } = await supabase
            .from('kerala_samaj_data')
            .delete()
            .eq('sl_no', sl_no);

        if (error) {
            console.error('Error deleting member:', error.message);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error in deleteMember:', error.message);
        return false;
    }
}

export {
    getAllMembers,
    getMemberBySlNo,
    createMember,
    updateMemberAdmin,
    deleteMember
};
