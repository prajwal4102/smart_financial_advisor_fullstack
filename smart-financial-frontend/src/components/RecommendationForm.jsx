import React, { useState } from "react";
import axios from "axios";

const RecommendationForm = () => {
  const [profile, setProfile] = useState({
    age: "",
    annualIncome: "",
    riskAppetite: "Moderate",
    investmentHorizon: "",
    financialGoal: "",
  });
  const [investment, setInvestment] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation("");

    try {
      const res = await axios.post("http://localhost:5000/api/recommendation", {
        profile,
        investment,
      });
      setRecommendation(res.data.recommendation);
    } catch (err) {
      setRecommendation("❌ Failed to fetch recommendation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Smart Investment Recommendation
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Annual Income (₹)</label>
          <input
            type="number"
            name="annualIncome"
            placeholder="Your yearly income"
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Risk Appetite</label>
          <select
            name="riskAppetite"
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue="Moderate"
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Investment Horizon (Years)</label>
          <input
            type="number"
            name="investmentHorizon"
            placeholder="Years to invest"
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Financial Goal</label>
          <input
            type="text"
            name="financialGoal"
            placeholder="E.g. Retirement, House, Education"
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Investment Amount (₹)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            placeholder="How much do you want to invest?"
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded transition-all duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? "Generating Recommendation..." : "Get Recommendation"}
          </button>
        </div>
      </form>

      {recommendation && (
        <div className="mt-8 p-4 bg-gray-100 border rounded-lg shadow-sm text-sm text-gray-800 whitespace-pre-wrap">
          <strong className="block text-blue-700 mb-2 text-lg">Recommendation:</strong>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationForm;
