import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Recommendation from '../components/RecommendationForm';
import ChatbotWidget from '../components/ChatbotWidget';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [investment, setInvestment] = useState(50000);

  const investmentData = [
    { name: 'Stocks', value: investment * 0.4 },
    { name: 'Mutual Funds', value: investment * 0.3 },
    { name: 'Real Estate', value: investment * 0.2 },
    { name: 'Gold', value: investment * 0.1 },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-700 font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Welcome, {profile.name}!
        </h2>

        {/* Profile Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded shadow">
            <p className="text-gray-600">Monthly Income</p>
            <p className="text-lg font-semibold text-blue-800">₹{profile.monthlyIncome}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow">
            <p className="text-gray-600">Monthly Expenses</p>
            <p className="text-lg font-semibold text-blue-800">₹{profile.monthlyExpenses}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow">
            <p className="text-gray-600">Risk Appetite</p>
            <p className="text-lg font-semibold text-blue-800">{profile.riskAppetite}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow">
            <p className="text-gray-600">Financial Goal</p>
            <p className="text-lg font-semibold text-blue-800">{profile.financialGoal}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded shadow col-span-2">
            <p className="text-gray-600">Investment Horizon</p>
            <p className="text-lg font-semibold text-blue-800">{profile.investmentHorizon} years</p>
          </div>
        </div>

        {/* Investment Slider */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-green-700">Adjust Investment Amount</h3>
          <Slider
            value={investment}
            onChange={(e, newVal) => setInvestment(newVal)}
            aria-labelledby="investment-slider"
            valueLabelDisplay="auto"
            min={10000}
            max={200000}
            sx={{
              color: '#22c55e', // Tailwind green-500
              '& .MuiSlider-thumb': { borderRadius: '4px' },
            }}
          />
          <p className="text-sm mt-1">Custom Investment: <span className="font-semibold">₹{investment}</span></p>
        </div>

        {/* Investment Distribution Pie Chart */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Your Suggested Distribution</h3>
          <div className="flex justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={investmentData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {investmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8">
          <Recommendation profile={profile} investment={investment} />
        </div>
          {profile && <ChatbotWidget profile={profile} />}
          
      </div>
    </div>
  );

};

export default Dashboard;
