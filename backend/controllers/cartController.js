import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData ;
        
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData }
        );

        res.status(200).json({ 
            success: true, 
            message: "Added to cart" 
        });

    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add item to cart" 
        });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData || {};
        
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            
            // Remove item if quantity reaches 0
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        } else {
            return res.status(400).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData }
        );

        res.status(200).json({
            success: true,
            message: "Removed from cart"
        });

    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove item from cart"
        });
    }
};
// fetch(user cart data
const getCart = async (req,res) => {
    try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
    } catch (error) {
    console.log(error);
    res.json({success:false,messages:"Error"})
    }
}
export {addToCart,removeFromCart,getCart}