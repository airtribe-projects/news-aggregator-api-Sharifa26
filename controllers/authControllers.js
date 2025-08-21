const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePasswords } = require('../utils/hash');
const sendResponse = require('../middlewares/responseMiddleware');

// Registration
const register = async (req, res) => {
    try {
        const { name, email, password, preferences } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });
        if (!password) return res.status(400).json({ message: 'Password is required' });
        if (!name) return res.status(400).json({ message: 'Name is required' });
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const hashed = await hashPassword(password);
        const user = new User({ name, email, password: hashed, preferences });
        await user.save();
        sendResponse(res, 201, 'User registered', user);
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email' });

        const valid = await comparePasswords(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Invalid password' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        sendResponse(res, 200, 'Login successful', { token });
    } catch (err) {
        sendResponse(res, 500, err.message, null);
    }
};

module.exports = { register, login };
