const mongoose = require('mongoose');

const FinancialProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  monthlyIncome: Number,
  monthlyExpenses: Number,
  riskAppetite: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
  },
  financialGoal: String,
  investmentHorizon: Number // in years
});

module.exports = mongoose.model('FinancialProfile', FinancialProfileSchema);
