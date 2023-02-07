import express from 'express';
const router = express.Router();
// controllers
import { createProduct, listProducts, listProductsByCount } from "../controllers/product.js";

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/products', listProducts);
router.get('/products/:count', listProductsByCount);

export default router;