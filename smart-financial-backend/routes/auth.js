const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();

    // ✅ Generate token after signup
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'User created successfully', token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up', error: err.message });
  }
});


// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });


    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});


// @route    GET api/profile
// @desc     Get user profile
// @access   Private
router.get('/profile', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Received token:', token); // 🧪 Log the token

        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded); // 🧪 Log decoded info

        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error in /profile route:', err.message);
        res.status(500).send('Server Error');
    }
});

// Add this above module.exports
router.post('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update profile fields
    const {
      name,
      monthlyIncome,
      monthlyExpenses,
      riskAppetite,
      financialGoal,
      investmentHorizon
    } = req.body;

    user.name = name;
    user.monthlyIncome = monthlyIncome;
    user.monthlyExpenses = monthlyExpenses;
    user.riskAppetite = riskAppetite;
    user.financialGoal = financialGoal;
    user.investmentHorizon = investmentHorizon;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Error in POST /profile:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
