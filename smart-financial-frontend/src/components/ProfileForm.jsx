import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    riskAppetite: '',
    financialGoal: '',
    investmentHorizon: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log("Submitting profile:", form);
    console.log("Token:", token);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/profile',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message);

      // ✅ Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save profile');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="monthlyIncome"
            placeholder="Monthly Income (₹)"
            value={form.monthlyIncome}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="monthlyExpenses"
            placeholder="Monthly Expenses (₹)"
            value={form.monthlyExpenses}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="riskAppetite"
            value={form.riskAppetite}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Risk Appetite</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <input
            type="text"
            name="financialGoal"
            placeholder="Financial Goal (e.g., Buy a house)"
            value={form.financialGoal}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="investmentHorizon"
            placeholder="Investment Horizon (in years)"
            min="1"
            max="20"
            value={form.investmentHorizon}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Save Profile
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
