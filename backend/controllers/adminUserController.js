import {
    getAllMembers,
    getMemberBySlNo,
    createMember,
    updateMemberAdmin,
    deleteMember
} from '../models/adminUserModel.js';
import supabase from '../config/supabase.js';

/**
 * Get all members (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllMembersController(req, res) {
    try {
        const members = await getAllMembers();
        res.json({
            success: true,
            data: members
        });
    } catch (error) {
        console.error('Error in getAllMembersController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch members'
        });
    }
}

/**
 * Get single member (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getMemberController(req, res) {
    try {
        const { id } = req.params;
        const member = await getMemberBySlNo(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        res.json({
            success: true,
            data: member
        });
    } catch (error) {
        console.error('Error in getMemberController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch member'
        });
    }
}

/**
 * Create new member (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createMemberController(req, res) {
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
            otp_password
        } = req.body;

        // Validate required fields
        if (!name || !otp_password || !sl_no) {
            return res.status(400).json({
                success: false,
                message: 'Name, SL number, and password are required'
            });
        }

        // Check if SL number already exists
        const existingMember = await getMemberBySlNo(sl_no);
        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: `SL number ${sl_no} already exists. Please use a different SL number.`
            });
        }

        let profile_photo_url = null;

        // Handle file upload if present
        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('member_photos')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload profile photo'
                });
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('member_photos')
                .getPublicUrl(fileName);

            profile_photo_url = publicUrl;
            console.log('Photo uploaded successfully:', profile_photo_url);
        }

        const memberData = {
            sl_no: parseInt(sl_no),
            name,
            address: address || '',
            family_members: family_members || '',
            mobile_no: mobile_no || '',
            occupation: occupation || '',
            blood_group: blood_group || '',
            native_place: native_place || '',
            email: email || '',
            current_status: current_status || 'Active',
            profile_photo: profile_photo_url,
            otp_password
        };

        console.log('Creating member with data:', { ...memberData, otp_password: '[HIDDEN]' });

        const newMember = await createMember(memberData);

        if (!newMember) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create member'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Member created successfully',
            data: newMember
        });
    } catch (error) {
        console.error('Error in createMemberController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create member'
        });
    }
}

/**
 * Update member (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateMemberController(req, res) {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Handle file upload if present
        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('member_photos')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload profile photo'
                });
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('member_photos')
                .getPublicUrl(fileName);

            updates.profile_photo = publicUrl;
        }

        const updatedMember = await updateMemberAdmin(id, updates);

        if (!updatedMember) {
            return res.status(404).json({
                success: false,
                message: 'Member not found or update failed'
            });
        }

        res.json({
            success: true,
            message: 'Member updated successfully',
            data: updatedMember
        });
    } catch (error) {
        console.error('Error in updateMemberController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update member'
        });
    }
}

/**
 * Delete member (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteMemberController(req, res) {
    try {
        const { id } = req.params;
        const deleted = await deleteMember(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Member not found or delete failed'
            });
        }

        res.json({
            success: true,
            message: 'Member deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteMemberController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete member'
        });
    }
}

export {
    getAllMembersController,
    getMemberController,
    createMemberController,
    updateMemberController,
    deleteMemberController
};
