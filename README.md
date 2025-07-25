# Smart_Financial_Advisor
Smart Financial Advisor is a fullstack application powered by Artifical Intelligence to provide you with investment advice based on your financial profile.
Demo video: https://drive.google.com/file/d/1vsXtQuNj5lcLPouzNSbFeekWbSHJJXrn/view?usp=sharing
---

# 💼 Smart Financial Advisor

> A personalized investment recommendation system powered by AI and LLMs.  
> Built using React, Node.js, Express, and DeepSeek API.

---
# Screenshots
<img width="990" height="687" alt="Screenshot 2025-07-25 043645" src="https://github.com/user-attachments/assets/6405995f-3e7c-4fae-9168-3c2b972b0781" />
<img width="788" height="760" alt="Screenshot 2025-07-25 043721" src="https://github.com/user-attachments/assets/b78d2935-1ccc-454a-894b-35421a854048" />
<img width="1882" height="937" alt="Screenshot 2025-07-25 043929" src="https://github.com/user-attachments/assets/5eb4625d-122e-4fec-b651-3310ff07edb4" />
<img width="1796" height="931" alt="Screenshot 2025-07-25 043804" src="https://github.com/user-attachments/assets/9a879963-d372-4dbb-bccf-1ca47af2ada9" />
<img width="1794" height="929" alt="Screenshot 2025-07-25 043814" src="https://github.com/user-attachments/assets/870033d8-3718-4d33-949c-4c90f03ab6f1" />
<img width="1822" height="945" alt="Screenshot 2025-07-25 044055" src="https://github.com/user-attachments/assets/417a0636-9a2d-4176-84e1-0fde52296feb" />
---
## 🧠 About the Project

**Smart Financial Advisor** is a full-stack web application that helps users:
- Generate personalized investment plans 💡
- Get interactive, dynamic suggestions based on their financial profile 📊
- Chat with an AI-powered financial assistant 🤖
- Visualize their investment distribution and returns 📈

It's ideal for individuals who are looking to plan their investments smarter, and for businesses wanting to integrate AI-powered financial advisory.

---

## 🚀 Features

- ✅ User Signup/Login with JWT Authentication
- ✅ Dynamic Investment Recommendation Form
- ✅ Personalized Portfolio Suggestions
- ✅ Interactive Charts for investment allocation
- ✅ Floating Chatbot for investment Q&A with context
- ✅ Backend powered by DeepSeek LLM API
- ✅ Built with React, TailwindCSS, Node.js, and Express

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (with hooks)
- Tailwind CSS
- Axios
- React Router
- React Icons

**Backend:**
- Node.js + Express.js
- DeepSeek API (for LLM responses)
- JWT for auth
- CORS, dotenv

---



## 🧩 Project Structure

```bash
smart-financial-advisor/
├── smart-financial-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── RecommendationForm.jsx
│   │   │   ├── InvestmentChart.jsx
│   │   │   ├── FloatingChatbot.jsx
│   │   │   └── ChatbotWidget.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   └── App.js
├── smart-financial-backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── recommendation.js
│   │   └── chatbot.js
│   ├── utils/
│   ├── server.js
````

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/smart-financial-advisor.git
cd smart-financial-advisor
```

### 2️⃣ Setup Backend

```bash
cd smart-financial-backend
npm install
```

> Create a `.env` file:

```env
PORT=5000
DEEPSEEK_API_KEY=your_deepseek_api_key
JWT_SECRET=your_jwt_secret
```

```bash
npm start
```

### 3️⃣ Setup Frontend

```bash
cd smart-financial-frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:5000`

---

## 💬 Example Questions for Chatbot

Once logged in, click on the bottom-right chatbot and try:

* “What’s the best investment plan for me?”
* “How much will I earn in 5 years?”
* “Is mutual fund better than gold for me?”

---

## 🙌 Contributing

Pull requests are welcome! Feel free to:

* Add more chart types
* Improve LLM prompt handling
* Enhance the chatbot UI
* Suggest improvements

---


## 📫 Contact

Made with ❤️ by [Prajwal](https://github.com/prajwal4102)
Got suggestions? DM me on LinkedIn or raise an issue on GitHub!

```

