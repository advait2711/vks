import express from 'express';
import * as officeBearerController from '../controllers/officeBearerController.js';

const router = express.Router();

// Get current office bearers (2025-2028)
router.get('/current', officeBearerController.getCurrentOfficeBearers);

// Get office bearers by term
router.get('/term/:termStart/:termEnd', officeBearerController.getOfficeBearersByTerm);

// Get all office bearers
router.get('/all', officeBearerController.getAllOfficeBearers);

export default router;
