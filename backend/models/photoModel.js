import supabase from '../config/supabase.js';

/**
 * Get photos by year
 */
export const getPhotosByYear = async (year) => {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('year', year)
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

/**
 * Get photos by event name
 */
export const getPhotosByEvent = async (eventName) => {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('event_name', eventName)
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

/**
 * Get random photos for slideshow
 */
export const getRandomPhotos = async (year, limit = 10) => {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('year', year);

    if (error) {
        throw error;
    }

   
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
};

/**
 * Get social work photos
 */
export const getSocialWorkPhotos = async () => {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('category', 'social_work')
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

/**
 * Get all available years
 */
export const getAvailableYears = async () => {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('year')
        .neq('category', 'social_work');

    if (error) {
        throw error;
    }

    
    const uniqueYears = [...new Set(data.map(item => item.year))];
    return uniqueYears;
};

/**
 * Get events by year
 */
export const getEventsByYear = async (year) => {
    const { data, error } = await supabase
        .from('gallery_photos')
        .select('event_name, description')
        .eq('year', year);

    if (error) {
        throw error;
    }

    
    const uniqueEvents = data.reduce((acc, item) => {
        if (!acc.find(e => e.event_name === item.event_name)) {
            acc.push({
                event_name: item.event_name,
                description: item.description
            });
        }
        return acc;
    }, []);

    return uniqueEvents;
};
