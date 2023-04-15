import express from "express";
import { authCheck } from "./../middlewares/auth.js";
import { saveUserCart, getUserCart } from "../controllers/user.js";

const router = express.Router();

router.post("/user/cart", authCheck, saveUserCart);
router.get("/user/cart", authCheck, getUserCart)
// router.get("/user", (req, res) => {
//     res.json({
//         data: "hey you hit user api endpoint",
//     });
// });

export default router;
