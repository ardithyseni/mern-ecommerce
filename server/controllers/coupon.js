import Coupon from "../models/coupon.js";

export const createCoupon = async (req, res) => {
    try {
        const { name, expiryDate, discount } = req.body.coupon;
        res.json(await new Coupon({ name, expiryDate, discount }).save());
    } catch (error) {
        console.log(error);
    }
};

export const removeCoupon = async (req, res) => {
    try {
        res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
    } catch (error) {
        console.log(error);
    }
};

export const listCoupons = async (req, res) => {
    try {
        res.json(await Coupon.find({}).sort({createdAt: -1}).exec());
    } catch (error) {
        console.log(error);
    }  
};
