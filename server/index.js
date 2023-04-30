import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
// import routes
// const authRoutes = require("./routes/auth");
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/category.js';
import subcategoryRoutes from './routes/subcategory.js';
import productRoutes from './routes/product.js';
import cloudinaryRoutes from './routes/cloudinary.js';
import userRoutes from './routes/user.js';
import couponRoutes from './routes/coupon.js';
import stripeRoutes from './routes/stripe.js';
import adminRoutes from './routes/admin.js';

// initialize app
const app = express();
dotenv.config();

// db

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
})
    .then(() => console.log(`DB Connected`))
    .catch(err => console.log(`Database connection error`, err));

// middlewares

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "3mb" }));
app.use(cors());

// routes in routes folder
app.use('/api', authRoutes) // api prefix
app.use('/api', categoryRoutes)
app.use('/api', subcategoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cloudinaryRoutes)
app.use('/api', userRoutes)
app.use('/api', couponRoutes)
app.use('/api', stripeRoutes);
app.use('/api', adminRoutes);


// readdirSync("./routes").map((r) => app.use("/api", import from "./routes/" + r);

// const routeFiles = fs.readdirSync('./routes');

// routeFiles.forEach(r => {
//   const route = import(path.join('./routes', r));
//   app.use('/api', route);
// });


// server port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
