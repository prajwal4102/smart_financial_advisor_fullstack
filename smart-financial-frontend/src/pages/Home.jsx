import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-800">Smart Financial Advisor</h1>
      <p className="text-gray-600">Start your personalized financial journey now</p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
