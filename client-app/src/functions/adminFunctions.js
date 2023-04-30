import axios from "axios";

export const getUserOrders = async (idtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      idtoken,
    },
  });
};

export const changeOrderStatus = async (orderId, orderStatus, idtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        idtoken,
      },
    }
  );
};
