import express from 'express';
import multer from 'multer';
import * as memberController from '../controllers/memberController.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

// Member authentication
router.post('/login', memberController.login);

// Get member information
router.get('/:sl_no', memberController.getMemberInfo);

// Update member information
router.put('/:sl_no', memberController.updateMemberInfo);

// Upload profile photo
router.post('/:sl_no/photo', upload.single('photo'), memberController.uploadPhoto);

// Delete profile photo
router.delete('/:sl_no/photo', memberController.deletePhoto);

export default router;
