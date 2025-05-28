import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Facebook } from "lucide-react";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Registered user:", res.data);
      alert("Registration successful! Redirecting to dashboard...");
      window.location.href = "http://localhost:5173/dashboard";
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Registration error:", err);
    }
  };
  // facebook login
  const FacebookLogin = async () => {
    window.location.href = "http://localhost:5001/auth/facebook";
  }
  //Github login
  const GithubLogin = async () => {
    window.location.href = "http://localhost:5001/auth/github";
  }
  //Google login
  const GoogleLogin = async () => {
    window.location.href = "http://localhost:5001/auth/google";
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">Join us today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="cursor-pointer" />
                ) : (
                  <Eye size={18} className="cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

        <div className="flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="text-sm text-gray-500 px-2">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <div className="flex flex-col space-y-3">
          <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer" onClick={GoogleLogin}>
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>
          <button
            onClick={FacebookLogin}
            className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <FaFacebookF className="text-blue-600" /> Sign up with Facebook
          </button>
          
          <button className="flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer" onClick={GithubLogin}>
            <FaGithub className="text-black" /> Sign up with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
