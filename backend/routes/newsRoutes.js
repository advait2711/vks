import express from 'express';
import multer from 'multer';
import {
    getAllNewsController,
    getNewsByIdController,
    createNewsController,
    updateNewsController,
    deleteNewsController
} from '../controllers/newsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Public routes
router.get('/', getAllNewsController);
router.get('/:id', getNewsByIdController);

// Protected admin routes
router.post('/', verifyToken, upload.single('image'), createNewsController);
router.put('/:id', verifyToken, upload.single('image'), updateNewsController);
router.delete('/:id', verifyToken, deleteNewsController);

export default router;
