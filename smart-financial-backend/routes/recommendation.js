const express = require("express");
const router = express.Router();
const axios = require("axios");

// DeepSeek API Key (replace with your key or use .env)
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-your-key-here";

router.post("/", async (req, res) => {
  const { profile, investment } = req.body;

  if (!profile || !investment) {
    return res.status(400).json({ error: "Missing profile or investment data" });
  }

  const prompt = `
You are an expert investment banker , you are good at suggesting investment Based on the an invididuals profile, recommend an optimal investment portfolio for the given profile

Profile:
- Age: ${profile.age}
- Annual Income: ₹${profile.annualIncome}
- Risk Tolerance: ${profile.riskAppetite || profile.riskTolerance}
- Investment Horizon: ${profile.investmentHorizon} years
- Financial Goals: ${profile.financialGoal || profile.financialGoals}
- Custom Investment Amount: ₹${investment}

Respond in simple understandable english and include percentages, but dont include any symbols , dont use bold letters or underlines give me everything in plain .In the output there should be no "-" or "**" symbols which are easy find out that the response is ai generated.
Remember you are just an smart recommendation giver and you wont answer anything else apart from investment.And put caution at the end of the each respose syaing that please consult the professional's before investing and tell them the risks involed . 
`;

  try {
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ recommendation: reply });
  } catch (err) {
    console.error("LLM Error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
});

module.exports = router;
