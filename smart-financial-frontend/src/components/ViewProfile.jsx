import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Saved Profile</h2>
      <ul className="space-y-2">
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Income:</strong> ₹{profile.monthlyIncome}</li>
        <li><strong>Expenses:</strong> ₹{profile.monthlyExpenses}</li>
        <li><strong>Risk Appetite:</strong> {profile.riskAppetite}</li>
        <li><strong>Goal:</strong> {profile.financialGoal}</li>
        <li><strong>Horizon:</strong> {profile.investmentHorizon}</li>
      </ul>
    </div>
  );
};

export default ViewProfile;
