import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

// User Registration
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ 'profile.email': email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            profile: {
                name,
                email,
            }
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user['password'] = hashedPassword;

        await user.save();

        // Create JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, 'your-secret-key', { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
        });
    } catch (err: any) {
        res.status(500).json({ msg: err.message });
    }
});

// User Login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ 'profile.email': email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user['password']);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Create JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, 'your-secret-key', { expiresIn: '7d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user });
        });
    } catch (err: any) {
        res.status(500).json({ msg: err.message });
    }
});

export default router;