import * as photoModel from '../models/photoModel.js';

/**
 * Get photos by year
 */
export const getPhotosByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const photos = await photoModel.getPhotosByYear(year);
        res.json(photos);
    } catch (error) {
        console.error('Error fetching photos by year:', error);
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
};

/**
 * Get photos by event
 */
export const getPhotosByEvent = async (req, res) => {
    try {
        const { eventName } = req.params;
        const photos = await photoModel.getPhotosByEvent(eventName);
        res.json(photos);
    } catch (error) {
        console.error('Error fetching photos by event:', error);
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
};

/**
 * Get random photos for slideshow
 */
export const getRandomPhotos = async (req, res) => {
    try {
        const { year, limit } = req.params;
        const photoLimit = parseInt(limit) || 10;
        const photos = await photoModel.getRandomPhotos(year, photoLimit);
        res.json(photos);
    } catch (error) {
        console.error('Error fetching random photos:', error);
        res.status(500).json({ error: 'Failed to fetch random photos' });
    }
};

/**
 * Get social work photos
 */
export const getSocialWorkPhotos = async (req, res) => {
    try {
        const photos = await photoModel.getSocialWorkPhotos();
        res.json(photos);
    } catch (error) {
        console.error('Error fetching social work photos:', error);
        res.status(500).json({ error: 'Failed to fetch social work photos' });
    }
};

/**
 * Get available years
 */
export const getAvailableYears = async (req, res) => {
    try {
        const years = await photoModel.getAvailableYears();
        res.json(years);
    } catch (error) {
        console.error('Error fetching available years:', error);
        res.status(500).json({ error: 'Failed to fetch available years' });
    }
};

/**
 * Get events by year
 */
export const getEventsByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const events = await photoModel.getEventsByYear(year);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events by year:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};
