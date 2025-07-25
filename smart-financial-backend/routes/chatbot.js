// routes/chatbot.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Use your actual DeepSeek API key
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

router.post('/', async (req, res) => {
  const { profile, message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const prompt = `
You are a smart financial advisor. Here's the user's profile:
- Name: ${profile?.name || "Unknown"}
- Age: ${profile?.age || "N/A"}
- Income: ₹${profile?.monthlyIncome || "N/A"}
- Expenses: ₹${profile?.monthlyExpenses || "N/A"}
- Risk Appetite: ${profile?.riskAppetite || "N/A"}
- Investment Horizon: ${profile?.investmentHorizon || "N/A"} years
- Financial Goal: ${profile?.financialGoal || "N/A"}

User's Question: ${message}

Respond in simple understandable english and keep the responses very short and precise and readable dont exceed 3 lines ,but dont include any symbols , dont use bold letters or underlines give me everything in plain .In the output there should be no "-" or "**" symbols which are easy find out that the response is ai generated.
Remember you are just an smart recommendation giver and you wont answer anything else apart from investment.And put caution at the end of the each respose syaing that please consult the professional's before investing and tell them the risks involed . 
`;

    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat', // or your model
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content;
    res.json({ reply });
  } catch (err) {
    console.error('DeepSeek API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch chatbot response' });
  }
});

module.exports = router;
