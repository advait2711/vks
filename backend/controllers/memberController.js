import * as memberModel from '../models/memberModel.js';
import * as storageService from '../services/storageService.js';

/**
 * Login controller - Authenticate member
 */
async function login(req, res) {
    try {
        const { sl_no, otp_password } = req.body;

        
        if (!sl_no || !otp_password) {
            return res.status(400).json({
                success: false,
                message: 'Serial number and OTP password are required'
            });
        }

        
        const member = await memberModel.authenticateMember(Number(sl_no), otp_password);

        if (!member) {
            return res.status(401).json({
                success: false,
                message: 'Invalid serial number or OTP password'
            });
        }

        res.json({
            success: true,
            message: 'Authentication successful',
            data: member
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

/**
 * Get member information
 */
async function getMemberInfo(req, res) {
    try {
        const { sl_no } = req.params;

        if (!sl_no) {
            return res.status(400).json({
                success: false,
                message: 'Serial number is required'
            });
        }

        const member = await memberModel.getMemberById(Number(sl_no));

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
        console.error('Get member error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

/**
 * Update member information
 */
async function updateMemberInfo(req, res) {
    try {
        const { sl_no } = req.params;
        const updates = req.body;

        if (!sl_no) {
            return res.status(400).json({
                success: false,
                message: 'Serial number is required'
            });
        }

        
        const allowedFields = ['address', 'family_members', 'mobile_no', 'occupation', 'blood_group', 'native_place', 'email', 'current_status', 'profile_photo'];
        const hasValidUpdates = Object.keys(updates).some(key => allowedFields.includes(key));

        if (!hasValidUpdates) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }

        const updatedMember = await memberModel.updateMember(Number(sl_no), updates);

        if (!updatedMember) {
            return res.status(404).json({
                success: false,
                message: 'Member not found or update failed'
            });
        }

        res.json({
            success: true,
            message: 'Member information updated successfully',
            data: updatedMember
        });
    } catch (error) {
        console.error('Update member error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

/**
 * Upload profile photo
 */
async function uploadPhoto(req, res) {
    try {
        const { sl_no } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

       
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed'
            });
        }

       
        if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum 5MB allowed'
            });
        }

        
        const member = await memberModel.getMemberById(Number(sl_no));
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        
        if (member.profile_photo) {
            await storageService.deleteProfilePhoto(member.profile_photo);
        }

        
        const uploadResult = await storageService.uploadProfilePhoto(
            Number(sl_no),
            req.file.buffer,
            req.file.originalname,
            req.file.mimetype
        );

        if (!uploadResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to upload photo',
                error: uploadResult.error
            });
        }

        
        const updatedMember = await memberModel.updateMember(Number(sl_no), {
            profile_photo: uploadResult.url
        });

        res.json({
            success: true,
            message: 'Photo uploaded successfully',
            data: {
                profile_photo: uploadResult.url,
                member: updatedMember
            }
        });
    } catch (error) {
        console.error('Upload photo error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

/**
 * Delete profile photo
 */
async function deletePhoto(req, res) {
    try {
        const { sl_no } = req.params;

        const member = await memberModel.getMemberById(Number(sl_no));
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Member not found'
            });
        }

        if (!member.profile_photo) {
            return res.status(400).json({
                success: false,
                message: 'No photo to delete'
            });
        }

        
        const deleteResult = await storageService.deleteProfilePhoto(member.profile_photo);

        if (!deleteResult.success) {
            return res.status(500).json({
                success: false,
                message: 'Failed to delete photo',
                error: deleteResult.error
            });
        }

        
        const updatedMember = await memberModel.updateMember(Number(sl_no), {
            profile_photo: null
        });

        res.json({
            success: true,
            message: 'Photo deleted successfully',
            data: updatedMember
        });
    } catch (error) {
        console.error('Delete photo error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export {
    login,
    getMemberInfo,
    updateMemberInfo,
    uploadPhoto,
    deletePhoto
};
