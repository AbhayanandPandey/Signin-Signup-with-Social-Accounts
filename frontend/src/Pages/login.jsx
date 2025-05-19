import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // added useNavigate
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", 
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Login successful!");

        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Login to Your Account</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your credentials below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} className="cursor-pointer" /> : <Eye size={18} className="cursor-pointer" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mb-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
        <p className="text-sm text-center text-gray-600 py-0 px-0">
          Forgot Password?{" "}
          <Link to="/forgot" className="text-blue-600 font-medium hover:underline">
            Forgot
          </Link>
        </p>

        <div className="flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="text-sm text-gray-500 px-2">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="flex flex-col space-y-3">
          <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
            <FaGoogle className="text-red-500" /> Sign in with Google
          </button>
          <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
            <FaFacebookF className="text-blue-600" /> Sign in with Facebook
          </button>
          <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
            <FaGithub className="text-black" /> Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
