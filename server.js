import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000


app.use(cors({origin:"*"}))

app.use(express.json());

app.use("/api", productRoutes)


connectDB()

app.listen(PORT, () => {
    console.log("Server started at http://localhost:" + PORT);
})