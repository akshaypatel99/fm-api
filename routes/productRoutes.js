import express from 'express';
import {
	getProducts,
	getProduct,
	createProductReview,
	getTopProducts,
	getProductsByCategory,
	addFavouritedBy,
	removeFavouritedBy,
} from '../controllers/productController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/products/product
router.get('/', getProducts);

// GET /api/products/product/:id
router.get('/product/:id', getProduct);

// POST /api/products/product/:id/reviews - Create new product view
router.post('/product/:id/reviews', authMid, createProductReview);

// POST /api/products/product/:id/favourite - Add user to product's favourites
router.post('/product/:id/favourite', authMid, addFavouritedBy);

// POST /api/products/product/:id/unfavourite - Create new product view
router.put('/product/:id/unfavourite', authMid, removeFavouritedBy);

// GET /api/products/top - Get top rated products
router.get('/top', getTopProducts);

// GET /api/products/category - Get products by category
router.get('/category', getProductsByCategory);

export default router;
