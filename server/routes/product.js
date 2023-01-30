import express from 'express';
const router = express.Router();
// controllers
import { createProduct } from "../controllers/product.js";

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

router.post('/product', authCheck, adminCheck, createProduct);

export default router;