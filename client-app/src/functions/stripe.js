import axios from "axios";

export const createPaymentIntent = (idtoken) =>
    axios.post(
        `${process.env.REACT_APP_API}/create-payment-intent`,
        {},
        {
            headers: {
                idtoken,
            },
        }
    );