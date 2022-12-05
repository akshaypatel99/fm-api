import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../util/gT.js';

// POST /api/users/login - Authenticate user and get token
export const authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (user && (await user.passwordMatch(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			favouriteProducts: user.favouriteProducts,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// POST /api/users - Register a new user
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			favouriteProducts: user.favouriteProducts,
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// GET /api/users/profile - Get user's profile
export const getProfile = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			favouriteProducts: user.favouriteProducts,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// PUT /api/users/profile - Update user's profile
export const updateProfile = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
			favouriteProducts: user.favouriteProducts,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
