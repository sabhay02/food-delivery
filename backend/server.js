import express from "express";
import cors from "cors";
import { connectDB } from './config/db.js'
import 'dotenv/config';
import foodRouter from "./routes/Foodroutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// Server start
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});