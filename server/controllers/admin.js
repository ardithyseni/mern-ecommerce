import Order from "../models/order.js";

export const getAllOrders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("products.product")
    .exec();

  res.status(200).json(allOrders);
};

export const updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  
  res.json(updatedOrder);
};
