import express from "express";
import { authCheck } from "./../middlewares/auth.js";
import {
  saveUserCart,
  getUserCart,
  listOrders,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  emptyUserCart,
  saveUserAddress,
  createOrder,
  createCashOrder,
  applyUserCoupon,
} from "../controllers/user.js";

const router = express.Router();

router.post("/user/cart", authCheck, saveUserCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyUserCart);
router.post("/user/address", authCheck, saveUserAddress);

// coupon
router.post("/user/cart/coupon", authCheck, applyUserCoupon);

// order routes
router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder); // c.o.d
router.get("/user/orders", authCheck, listOrders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, getWishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

export default router;
