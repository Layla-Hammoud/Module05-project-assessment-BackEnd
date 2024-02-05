import express from "express";
const orderRouter = express.Router();
import {
    addOrder,
} from "../contorllers/orderController.js";
import {authenticate} from '../middleware/authMiddleware.js'

orderRouter.post("/add",authenticate, addOrder);

export default orderRouter