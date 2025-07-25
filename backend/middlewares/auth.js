import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Not authorized. Please login again." 
        });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ 
            success: false, 
            message: error.message || "Authentication failed" 
        });
    }
};

export default authMiddleware;