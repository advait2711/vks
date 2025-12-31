import express from 'express';
import * as photoController from '../controllers/photoController.js';

const router = express.Router();

// Get available years
router.get('/years', photoController.getAvailableYears);

// Get events by year
router.get('/events/:year', photoController.getEventsByYear);

// Get photos by year
router.get('/year/:year', photoController.getPhotosByYear);

// Get photos by event
router.get('/event/:eventName', photoController.getPhotosByEvent);

// Get random photos for slideshow
router.get('/random/:year/:limit', photoController.getRandomPhotos);

// Get social work photos
router.get('/social-work', photoController.getSocialWorkPhotos);

export default router;
