import express from "express";
import { authCheck } from "../middlewares/auth.js";
import { createPaymentIntent } from "../controllers/stripe.js";


const router = express.Router();

router.post('/create-payment-intent', authCheck, createPaymentIntent);

export default router;