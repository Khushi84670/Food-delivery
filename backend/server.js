import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js"
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js"





// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// DB config
connectDB();

// API Endpoints
app.use ("/api/food",foodRouter)
app.use ("/images",express.static('uploads'))
app.use("/api/user",userRouter )
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get('/', (req, res) => res.send('Hello World!'));

// Listen
app.listen(port, () => {console.log(`Server is running on http://localhost:${port}`)});

// mongodb+srv://khushijaiswal2289:84670@cluster0.tshmw5s.mongodb.net/?