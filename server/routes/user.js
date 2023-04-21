import express from "express";
import { authCheck } from "./../middlewares/auth.js";
import { saveUserCart, getUserCart, emptyUserCart, saveUserAddress, applyUserCoupon } from "../controllers/user.js";

const router = express.Router();

router.post("/user/cart", authCheck, saveUserCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyUserCart);
router.post('/user/address', authCheck, saveUserAddress)

// coupon
router.post('/user/cart/coupon', authCheck, applyUserCoupon);

// router.get("/user", (req, res) => {
//     res.json({
//         data: "hey you hit user api endpoint",
//     });
// });

export default router;
