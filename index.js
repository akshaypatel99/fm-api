import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/error.js';

import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const corsOptions = {
	origin: 'https://farmers-market-abvn.onrender.com',
	credentials: true,
	optionSuccessStatus: 200,
};

dotenv.config();

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(cors(corsOptions));

app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/images', express.static(path.join(__dirname, '/images')));

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, '/client/build')));

// 	app.get('*', (req, res, next) =>
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// 	);
// } else {
// 	app.get('/', (req, res, next) => {
// 		res.send('API is running...');
// 	});
// }

app.get('/', (req, res, next) => {
	res.send('API is running...');
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
