import express from "express";
import { authCheck, adminCheck } from "./../middlewares/auth.js";
import { getAllOrders, updateOrderStatus } from "../controllers/admin.js";

const router = express.Router();

router.get("/admin/orders", authCheck, adminCheck, getAllOrders);
router.put("/admin/order-status", authCheck, adminCheck, updateOrderStatus);

export default router;
