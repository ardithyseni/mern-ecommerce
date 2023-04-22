import User from '../models/user.js';
import Cart from '../models/cart.js';
import Product from '../models/product.js';
import Coupon from '../models/coupon.js';
import User from '../models/user.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
    // apply coupon
    // calculate price

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
}