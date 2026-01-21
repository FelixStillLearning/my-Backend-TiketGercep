import User from '../models/User.js';

// Register new user
export const register = async (req, res) => {
    try {
        const { name, email, password, username, full_name, phone } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Create user data
        const userData = {
            username: username || email, // Use email as username if not provided
            email,
            password, // In production, this should be hashed
            full_name: full_name || name || 'User',
            phone: phone || '',
            role: 'user' // Default role
        };

        const user = await User.create(userData);

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user.toJSON();
        
        res.status(201).json({
            message: "User registered successfully",
            user: userWithoutPassword,
            token: "fake-jwt-token" // For development purposes
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).json({ message: error.message });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password (in production, compare hashed passwords)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user.toJSON();
        
        res.status(200).json({
            message: "Login successful",
            user: userWithoutPassword,
            token: "fake-jwt-token" // For development purposes
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get current user (validate token)
export const getMe = async (req, res) => {
    try {
        // In a real app, you would verify JWT token here
        // For now, just return a mock response
        
        // You can implement token verification later
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Mock user data - in real app, decode token to get user ID
        const userId = 1; // This should come from decoded token
        const user = await User.findByPk(userId, { 
            attributes: { exclude: ["password"] } 
        });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Logout (optional for JWT-based auth)
export const logout = async (req, res) => {
    try {
        // For JWT-based auth, you might want to blacklist the token
        // For now, just return success message
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: error.message });
    }
};
