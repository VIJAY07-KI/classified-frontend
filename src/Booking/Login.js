import { useState } from "react";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./UserSlice";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import bgImage from "../assets/bg.jpeg"; // Replace with your actual image path

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientErrors, setClientErrors] = useState({});
  const [serverErrors, setServerErrors] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!email.trim()) errors.email = "Email is required";
    else if (!isEmail(email)) errors.email = "Email is invalid";

    if (!password.trim()) errors.password = "Password is required";
    else if (password.length < 8 || password.length > 128)
      errors.password = "Password should be between 8 to 128 characters";

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
    } else {
      try {
        const response = await axios.post("http://localhost:3777/login", { email, password });
        localStorage.setItem("token", response.data.token);

        const userRes = await axios.get("http://localhost:3777/account", {
          headers: { Authorization: localStorage.getItem("token") },
        });

        dispatch(login(userRes.data));
        navigate("/account");
      } catch (err) {
        setServerErrors(err.response?.data?.error || "Something went wrong");
        setClientErrors({});
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {serverErrors && (
          <div className="mb-4 text-red-600 text-center">
            <p>{serverErrors}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {clientErrors.email && (
              <p className="text-sm text-red-500 mt-1">{clientErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>
            {clientErrors.password && (
              <p className="text-sm text-red-500 mt-1">{clientErrors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <p
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </p>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
