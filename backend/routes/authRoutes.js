import express from 'express';
import { login, logout, verifyTokenController } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/verify', verifyToken, verifyTokenController);

export default router;
