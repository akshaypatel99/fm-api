import express from 'express';
import {
	addOrder,
	getOrderById,
	updateOrderToPaid,
	fetchMyOrders,
} from '../controllers/orderController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/orders - Register a new user
router.post('/', authMid, addOrder);

// GET /api/orders/:id
router.get('/:id', authMid, getOrderById);

// PUT /api/orders/:id
router.put('/:id/pay', authMid, updateOrderToPaid);

// GET /api/orders/user/myorders
router.get('/user/myorders', authMid, fetchMyOrders);

export default router;
