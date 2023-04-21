import User from "../models/user.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Coupon from "../models/coupon.js";

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

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json(totalAfterDiscount);
};
