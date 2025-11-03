import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/admin/login", {
        username,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful!");
      navigate("/admindashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "❌ Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900/95 flex items-center justify-center px-4">
      <div className="bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6 text-sweet-white drop-shadow-sweet-white">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-soft-neon-blue placeholder-gray-400 text-white transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-soft-neon-blue placeholder-gray-400 text-white transition-all duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-soft-neon-blue/40 hover:bg-soft-neon-blue/60 transition-all duration-200 text-white font-semibold py-2 rounded-lg shadow-md drop-shadow-neon"
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
