import express from "express";
const router = express.Router();
// controllers
import {
    createProduct,
    updateProduct,
    listProducts,
    getBySlug,
    listProductsByCount,
    removeProduct,
    listProductsByFilter,
    countProducts,
} from "../controllers/product.js";

// middlewares
import { authCheck, adminCheck } from "../middlewares/auth.js";

router.post("/product", authCheck, adminCheck, createProduct);
router.get("/products", listProducts);
router.get("/products/total", countProducts);

router.get("/products/:count", listProductsByCount);
router.delete("/product/:slug", authCheck, adminCheck, removeProduct);
router.get("/product/:slug", getBySlug);
router.put("/product/:slug", authCheck, adminCheck, updateProduct);

router.post("/products", listProductsByFilter)

export default router;
