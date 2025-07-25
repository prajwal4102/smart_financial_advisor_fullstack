const express = require('express');
const router = express.Router();
const FinancialProfile = require('../models/FinancialProfile');
const authMiddleware = require('../middleware/authMiddleware');

// Create or update profile
router.post('/', authMiddleware, async (req, res) => {
  const { name, monthlyIncome, monthlyExpenses, riskAppetite, financialGoal, investmentHorizon } = req.body;

  try {
    let profile = await FinancialProfile.findOne({ userId: req.user.id });

    if (profile) {
      // Update
      profile.name = name;
      profile.monthlyIncome = monthlyIncome;
      profile.monthlyExpenses = monthlyExpenses;
      profile.riskAppetite = riskAppetite;
      profile.financialGoal = financialGoal;
      profile.investmentHorizon = investmentHorizon;
    } else {
      // Create new
      profile = new FinancialProfile({
        userId: req.user.id,
        name,
        monthlyIncome,
        monthlyExpenses,
        riskAppetite,
        financialGoal,
        investmentHorizon
      });
    }

    await profile.save();
    res.json({ message: 'Profile saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await FinancialProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;// Get saved profile

