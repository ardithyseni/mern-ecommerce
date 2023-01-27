import express from 'express';
const router = express.Router();
// controllers
import {
    createSubcategory,
    readSubcategory,
    updateSubcategory,
    removeSubcategory,
    listSubcategories
} from "../controllers/subcategory.js";

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

router.post('/subcategory', authCheck, adminCheck, createSubcategory);
router.get('/subcategories', listSubcategories);
router.get('/subcategory/:slug', readSubcategory);
router.put('/subcategory/:slug', authCheck, adminCheck, updateSubcategory);
router.delete('/subcategory/:slug', authCheck, adminCheck, removeSubcategory);

export default router;