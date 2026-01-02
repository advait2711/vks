import { getAllNews, getNewsById, createNews, updateNews, deleteNews } from '../models/newsModel.js';
import supabase from '../config/supabase.js';

/**
 * Get all news articles (public)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllNewsController(req, res) {
    try {
        const news = await getAllNews();
        res.json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error in getAllNewsController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch news articles'
        });
    }
}

/**
 * Get single news article (public)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getNewsByIdController(req, res) {
    try {
        const { id } = req.params;
        const news = await getNewsById(id);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }

        res.json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error in getNewsByIdController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch news article'
        });
    }
}

/**
 * Create news article (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createNewsController(req, res) {
    try {
        const { title, date, excerpt, content } = req.body;

        // Validate required fields
        if (!title || !date || !excerpt || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title, date, excerpt, and content are required'
            });
        }

        let image_url = null;

        // Handle file upload if present
        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('news-images')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload news image'
                });
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('news-images')
                .getPublicUrl(fileName);

            image_url = publicUrl;
        }

        const newsData = {
            title,
            date,
            excerpt,
            content,
            image_url
        };

        const newNews = await createNews(newsData);

        if (!newNews) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create news article'
            });
        }

        res.status(201).json({
            success: true,
            message: 'News article created successfully',
            data: newNews
        });
    } catch (error) {
        console.error('Error in createNewsController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to create news article'
        });
    }
}

/**
 * Update news article (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateNewsController(req, res) {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        // Handle file upload if present
        if (req.file) {
            const file = req.file;
            const fileName = `${Date.now()}_${file.originalname}`;

            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('news-images')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error('File upload error:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to upload news image'
                });
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('news-images')
                .getPublicUrl(fileName);

            updates.image_url = publicUrl;
        }

        const updatedNews = await updateNews(id, updates);

        if (!updatedNews) {
            return res.status(404).json({
                success: false,
                message: 'News article not found or update failed'
            });
        }

        res.json({
            success: true,
            message: 'News article updated successfully',
            data: updatedNews
        });
    } catch (error) {
        console.error('Error in updateNewsController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to update news article'
        });
    }
}

/**
 * Delete news article (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteNewsController(req, res) {
    try {
        const { id } = req.params;
        const deleted = await deleteNews(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'News article not found or delete failed'
            });
        }

        res.json({
            success: true,
            message: 'News article deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteNewsController:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to delete news article'
        });
    }
}

export {
    getAllNewsController,
    getNewsByIdController,
    createNewsController,
    updateNewsController,
    deleteNewsController
};
