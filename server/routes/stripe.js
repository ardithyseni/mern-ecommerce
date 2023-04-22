import express from "express";
import { authCheck } from "../middlewares/auth";
import router from './user';
const router = express.Router();



router.post('/create-payment-intent', authCheck, createPaymentIntent);