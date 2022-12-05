import express from 'express';
import {
	authUser,
	registerUser,
	getProfile,
	updateProfile,
} from '../controllers/authController.js';
import { authMid } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/users/login - Authenticate user and get token
router.post('/login', authUser);

// POST /api/users - Register a new user
router.post('/', registerUser);

// GET /api/users/profile - Get user's profile
router.get('/profile', authMid, getProfile);

// PUT /api/users/profile - Update user's profile
router.put('/profile', authMid, updateProfile);

export default router;
