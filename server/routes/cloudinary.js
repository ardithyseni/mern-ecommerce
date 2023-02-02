import express from 'express';
const router = express.Router();

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

// controller methods
import { uploadImages, removeImage } from '../controllers/cloudinary.js';

router.post('/uploadimages', authCheck, adminCheck, uploadImages);
router.post('/removeimage', authCheck, adminCheck, removeImage);

export default router; 