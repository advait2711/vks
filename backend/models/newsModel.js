import supabase from '../config/supabase.js';

/**
 * Get all news articles
 * @returns {Array} Array of news articles
 */
async function getAllNews() {
    try {
        const { data, error } = await supabase
            .from('news_articles')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching news:', error.message);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error in getAllNews:', error.message);
        return [];
    }
}

/**
 * Get single news article by ID
 * @param {number} id - News article ID
 * @returns {Object|null} News article or null
 */
async function getNewsById(id) {
    try {
        const { data, error } = await supabase
            .from('news_articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in getNewsById:', error.message);
        return null;
    }
}

/**
 * Create new news article
 * @param {Object} newsData - News article data
 * @returns {Object|null} Created news article or null
 */
async function createNews(newsData) {
    try {
        const { title, date, excerpt, content, image_url } = newsData;

        const { data, error } = await supabase
            .from('news_articles')
            .insert([{
                title,
                date,
                excerpt,
                content,
                image_url,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error || !data) {
            console.error('Error creating news:', error?.message);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in createNews:', error.message);
        return null;
    }
}

/**
 * Update news article
 * @param {number} id - News article ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated news article or null
 */
async function updateNews(id, updates) {
    try {
        const { title, date, excerpt, content, image_url } = updates;

        const updateData = {
            updated_at: new Date().toISOString()
        };

        if (title !== undefined) updateData.title = title;
        if (date !== undefined) updateData.date = date;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (content !== undefined) updateData.content = content;
        if (image_url !== undefined) updateData.image_url = image_url;

        const { data, error } = await supabase
            .from('news_articles')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error || !data) {
            console.error('Error updating news:', error?.message);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error in updateNews:', error.message);
        return null;
    }
}

/**
 * Delete news article
 * @param {number} id - News article ID
 * @returns {boolean} True if deleted, false otherwise
 */
async function deleteNews(id) {
    try {
        const { error } = await supabase
            .from('news_articles')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting news:', error.message);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error in deleteNews:', error.message);
        return false;
    }
}

export {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
