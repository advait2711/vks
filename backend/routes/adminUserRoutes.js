import express from 'express';
import multer from 'multer';
import {
    getAllMembersController,
    getMemberController,
    createMemberController,
    updateMemberController,
    deleteMemberController
} from '../controllers/adminUserController.js';
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

// All routes are protected (admin only)
router.get('/', verifyToken, getAllMembersController);
router.get('/:id', verifyToken, getMemberController);
router.post('/', verifyToken, upload.single('profile_photo'), createMemberController);
router.put('/:id', verifyToken, upload.single('profile_photo'), updateMemberController);
router.delete('/:id', verifyToken, deleteMemberController);

export default router;
