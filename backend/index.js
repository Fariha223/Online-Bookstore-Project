import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './Routes/AuthRoutes.js';
import categoryRoute from './Routes/categoryRoutes.js';
import productRoute from './Routes/productRoutes.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Dear-Mu'minun, an online Islamic Book Store which sells only authentic materials.</h1>");
});

app.use("/auth", authRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

app.listen(process.env.PORT, () => {
    console.log('Server started on port 8080');
});
