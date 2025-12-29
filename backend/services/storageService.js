import supabase from '../config/supabase.js';

/**
 * Upload a profile photo to Supabase Storage
 * @param {number} sl_no - Member serial number
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} fileName - Original filename
 * @param {string} mimeType - File MIME type
 * @returns {Object} Upload result with public URL
 */
async function uploadProfilePhoto(sl_no, fileBuffer, fileName, mimeType) {
    try {
        
        const fileExt = fileName.split('.').pop();
        const uniqueFileName = `${sl_no}_${Date.now()}.${fileExt}`;
        const filePath = `${uniqueFileName}`;

        
        const { data, error } = await supabase.storage
            .from('member_photos')
            .upload(filePath, fileBuffer, {
                contentType: mimeType,
                upsert: true 
            });

        if (error) {
            console.error('Storage upload error:', error);
            return { success: false, error: error.message };
        }

        
        const { data: urlData } = supabase.storage
            .from('member_photos')
            .getPublicUrl(filePath);

        return {
            success: true,
            url: urlData.publicUrl,
            path: filePath
        };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Delete a profile photo from Supabase Storage
 * @param {string} photoUrl - Full photo URL
 * @returns {Object} Delete result
 */
async function deleteProfilePhoto(photoUrl) {
    try {
        if (!photoUrl) return { success: true };

        
        const urlParts = photoUrl.split('/member_photos/');
        if (urlParts.length < 2) {
            return { success: false, error: 'Invalid photo URL' };
        }

        const filePath = urlParts[1];

        
        const { error } = await supabase.storage
            .from('member_photos')
            .remove([filePath]);

        if (error) {
            console.error('Storage delete error:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
    }
}

export {
    uploadProfilePhoto,
    deleteProfilePhoto
};
