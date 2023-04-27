import express from "express";
import { authCheck } from "./../middlewares/auth.js";
import { saveUserCart, getUserCart, emptyUserCart, saveUserAddress, createOrder, applyUserCoupon } from "../controllers/user.js";

const router = express.Router();

router.post("/user/cart", authCheck, saveUserCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyUserCart);
router.post('/user/address', authCheck, saveUserAddress)

// coupon
router.post('/user/cart/coupon', authCheck, applyUserCoupon);

// order routes
router.post('/user/order', authCheck, createOrder);

export default router;
