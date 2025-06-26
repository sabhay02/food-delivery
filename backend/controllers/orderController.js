// orderController.js
import orderModel from "../models/OrderModel.js"
import userModel from '../models/userModel.js';
import Stripe from "stripe"

// placing user order for frontend
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const placeOrder = async (req, res) => {

    const FRONTEND_URL='http://localhost:5173'
    try {
        // 1. Create new order in database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // 2. Clear user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // 3. Prepare line items for Stripe
        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100*80, // Convert to paise
            },
            quantity: item.quantity
        }));
        console.log(line_items)

        // 4. Add delivery charges
       // Change from 40*100 to 50*100 (₹50 instead of ₹40)
line_items.push({
    price_data: {
        currency: "inr",
        product_data: {
            name: "Delivery Charges"
        },
        unit_amount: 2*100*80, // ₹50 delivery charge
    },
    quantity: 1
});

        // 5. Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:line_items,
            mode: 'payment',
            success_url: `${FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
            metadata: {
                orderId: newOrder._id.toString()
            }
        });

        // 6. Return session URL to frontend
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error('Order Error:', error);
        res.status(500).json({ success: false, message: 'Order failed' });
    }
};
const verifyOrder = async (req, res) => {
    try {
        // 1. Properly destructure request parameters
        const { orderId, success } = req.query; // Changed from req.oooy to req.query

        // 2. Validate required parameters
        if (!orderId) {
            return res.status(400).json({ 
                success: false, 
                message: "Order ID is required" 
            });
        }

        // 3. Strict comparison and proper update
        if (success === "true") {
            await orderModel.findByIdAndUpdate(
                orderId, 
                { $set: { payment: true } }, // Fixed syntax
                { new: true }
            );
            return res.json({ 
                success: true, 
                message: "Payment confirmed",
                data: updatedOrder 
            });
        } else {
            // 4. Only delete if payment failed
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ 
                success: false, 
                message: "Order canceled due to failed payment" 
            });
        }
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Server error during verification",
            error: error.message 
        });
    }
};

export {placeOrder,verifyOrder}