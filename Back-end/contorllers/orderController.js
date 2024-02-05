import Order from "../models/orderModel.js";

export const addOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const { products, totalPrice } = req.body;
    const order = await Order.create({
      user,
      products,
      totalPrice,
    });
    res.status(201).json({ message: "order added", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

