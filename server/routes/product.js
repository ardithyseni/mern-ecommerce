import express from 'express';
const router = express.Router();
// controllers
import { createProduct, listProducts } from "../controllers/product.js";

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/products/:count', listProducts);

export default router;