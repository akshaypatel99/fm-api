import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// POST /api/orders
export const addOrder = asyncHandler(async (req, res, next) => {
	const {
		orderItems,
		deliveryAddress,
		deliveryDate,
		paymentMethod,
		trolleyTotal,
		deliveryPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items.');
		return;
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			deliveryAddress,
			deliveryDate,
			paymentMethod,
			trolleyTotal,
			deliveryPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found.');
	}
});

// PUT /api/orders/:id/pay
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = new Date().toISOString();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order not found.');
	}
});

// GET /api/orders/user/myorders
export const fetchMyOrders = asyncHandler(async (req, res) => {
	// const { userId } = req.body.user._id;
	const orders = await Order.find({ user: req.user._id });
	console.log(req.user._id);
	res.json(orders);
});
