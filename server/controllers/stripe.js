import User from '../models/user.js';
import Cart from '../models/cart.js';
import Product from '../models/product.js';
import Coupon from '../models/coupon.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (req, res) => {
    // apply coupon
    // calculate price

    // 1. find user
    const user = await User.findOne({ email: req.user.email }).exec();
    // 2. get user cart total
    const { cartTotal } = await Cart.findOne({ orderedBy: user._id }).exec();

    console.log('CART TOTAL CHARGED: ', cartTotal);
    // create payment intent with order amount and currency

    const paymentIntent = await stripe.paymentIntents.create({
        amount: cartTotal * 100,
        currency: 'eur'
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    });
}