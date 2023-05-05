import axios from "axios";

export const saveUserCart = async (cart, idtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        idtoken,
      },
    }
  );
};

export const getUserCart = async (idtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      idtoken,
    },
  });
};

export const emptyUserCart = async (idtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      idtoken,
    },
  });
};

export const saveUserAddress = async (idtoken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        idtoken,
      },
    }
  );
};

export const createOrder = async (stripeResponse, idtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        idtoken,
      },
    }
  );
};

export const createPayWithCashOrder = async (idtoken, cashOnDelivery, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { cashOnDelivery, couponApplied: coupon },
    {
      headers: {
        idtoken,
      },
    }
  );
};

export const getUserOrders = async (idtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      idtoken,
    },
  });
};

export const getUserWishlist = async (idtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      idtoken,
    },
  });
};

export const removeFromUserWishlist = async (productId, idtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        idtoken,
      },
    }
  );
};

export const addToWishlist = async (productId, idtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    {
      productId,
    },
    {
      headers: {
        idtoken,
      },
    }
  );
};


