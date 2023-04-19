import express from 'express';
const router = express.Router();
// controllers
import { createCoupon, removeCoupon, listCoupons } from "../controllers/coupon.js";

// middlewares
import { authCheck, adminCheck } from '../middlewares/auth.js';

router.post('/coupon', authCheck, adminCheck, createCoupon);
router.get('/coupons', listCoupons);
router.delete('/coupon/:couponId', authCheck, adminCheck, removeCoupon);

export default router;