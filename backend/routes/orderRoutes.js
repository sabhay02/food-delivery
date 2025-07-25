// orderRoute.js
import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { placeOrder, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",authMiddleware,verifyOrder);


export default orderRouter;