import express from 'express';
const router = express.Router();
// controllers
import { createCategory, readCategory, updateCategory, removeCategory, listCategories, getSubcategories } from "../controllers/category.js";

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

router.post('/category', authCheck, adminCheck, createCategory);
router.get('/categories', listCategories);
router.get('/category/:slug', readCategory);
router.put('/category/:slug', authCheck, adminCheck, updateCategory);
router.delete('/category/:slug', authCheck, adminCheck, removeCategory);
router.get('/category/subcategories/:_id', getSubcategories);
export default router;