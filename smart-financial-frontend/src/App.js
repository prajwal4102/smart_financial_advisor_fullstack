import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProfileForm from './components/ProfileForm';
import ViewProfile from './components/ViewProfile';
import RecommendationForm from "./components/RecommendationForm"; // ✅ test UI

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/test-recommendation" element={<RecommendationForm />} /> {/* ✅ Test Route */}
      </Routes>
    </Router>
  );
};

export default App;
