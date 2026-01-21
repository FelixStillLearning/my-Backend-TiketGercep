import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    register,
    login,
    getMe,
} from '../controllers/userControllers.js';

const router = express.Router();

// Authentication routes
router.post("/users/register", register);
router.post("/users/login", login);
router.get("/users/me", getMe);

// CRUD routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;