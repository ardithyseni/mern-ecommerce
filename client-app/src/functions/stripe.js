import axios from "axios";

export const createPaymentIntent = (idtoken, coupon) =>
    axios.post(
        `${process.env.REACT_APP_API}/create-payment-intent`,
        { couponApplied: coupon },
        {
            headers: {
                idtoken,
            },
        }
    );