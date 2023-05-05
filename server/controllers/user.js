import User from "../models/user.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Coupon from "../models/coupon.js";
import Order from "../models/order.js";
import { v4 as uuidv4 } from 'uuid';

export const saveUserCart = async (req, res) => {
  console.log(req.body); // cart item

  const { cart } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user already exists
  let existingCart = await Cart.findOne({ orderedBy: user._id }).exec();
  if (existingCart) {
    existingCart.remove();
    console.log("removed old cart");
  }
  // because we have the count field in the cart state in frontend
  // we need to make changes to the product
  let products = [];

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    // get price for total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  console.log("products", products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products: products,
    cartTotal: cartTotal,
    orderedBy: user._id,
  }).save();

  console.log("new Cart", newCart);
  res.json({ ok: true });
};

export const getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

export const emptyUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

export const saveUserAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

export const applyUserCoupon = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON sent", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON: ", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  console.log("cartTotal:", cartTotal, "discount:", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  console.log("---totalafterdiscount---->", totalAfterDiscount);

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

export const createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  // decrement product quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updatedProduct = await Product.bulkWrite(bulkOption, {});

  console.log("product updated sold and quantity", updatedProduct);

  console.log("new order saved", newOrder);

  res.json({ ok: true });
};

export const createCashOrder = async (req, res) => {

  const { cashOnDelivery, couponApplied } = req.body;

  // if cashOnDelivery is true, create order with status of cash on Delivery

  if (!cashOnDelivery) {
    return res.status(400).send('create cash order failed')
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount * 100;
    } else {
        finalAmount = userCart.cartTotal * 100;
    }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uuidv4(),
      amount: finalAmount,
      currency: "eur",
      status: "Cash on Delivery",
      created: new Date().toLocaleString('en-DE', { timeZone: 'Europe/Vienna' }),
      payment_method_type: 'Cash'
    },
    orderedBy: user._id,
    orderStatus: "Cash on Delivery" 
  }).save();

  // decrement product quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updatedProduct = await Product.bulkWrite(bulkOption, {});

  console.log("product updated sold and quantity", updatedProduct);

  console.log("new order saved", newOrder);

  res.json({ ok: true });
};

export const listOrders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};

export const getWishlist = async (req, res) => {
  const wishlist = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(wishlist);
};

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
