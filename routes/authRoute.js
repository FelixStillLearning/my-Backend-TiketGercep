import express from 'express';
import {
    register,
    login,
    getMe,
    logout
} from '../controllers/authControllers.js';

const router = express.Router();

// Authentication routes
router.post("/users/register", register);
router.post("/users/login", login);
router.get("/users/me", getMe);
router.post("/users/logout", logout);

export default router;
