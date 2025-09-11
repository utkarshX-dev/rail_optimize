import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { Label } from "../ui/label";
import { Train, ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import UserContext from "../../context/userContext";
import { useContext } from "react";
export default function SignupPage() {
  const {setToken, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); // Clear both messages
    setErr("");
    
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setErr("Please fill in all fields.");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErr("Passwords do not match");
      return;
    }
    
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/users/register`;
      console.log("API URL:", apiUrl);  
      console.log("Form Data:", formData);
      
      const res = await axios.post(apiUrl, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      
      if(res.status === 201){
        setToken(res.data.token);
        localStorage.setItem('session-token', res.data.token); 
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
      }
      
      console.log("res: ", res);
      setMsg("Signup Successful. Redirecting to dashboard...");
      setErr("");       
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
    } catch (error: any) {
      setMsg(""); 
      if (error.response) {
        setErr(error.response.data.message || "Signup failed. Please try again.");
      } else if (error.request) {
        setErr("Network error. Please check your connection.");
      } else {
        setErr("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-800 bg-[size:20px_20px] opacity-30"></div>
      
      <div className="grid lg:grid-cols-2 min-h-screen relative">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center items-start px-16 py-12 bg-gradient-to-br from-slate-800 via-slate-700 to-indigo-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-lg"
          >
            {/* Logo Section */}
            <div className="flex items-center space-x-4 mb-12">
              <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl backdrop-blur-sm">
                <Train className="h-10 w-10 text-indigo-300" />
              </div>
              <div>
                <span className="text-4xl font-bold block text-white">
                  त्रिवेणी<span className="text-indigo-300">Path</span>
                </span>
                <span className="text-slate-400 text-sm">Railway Management System</span>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
                  Join Our<br />Platform
                </h1>
                <p className="text-xl text-slate-400 leading-relaxed">
                  Create your account to start optimizing railway operations with our AI-powered platform and join the future of transportation.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-indigo-400 rounded-full flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Advanced AI analytics</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Real-time collaboration</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full flex-shrink-0"></div>
                  <span className="text-slate-300 text-lg">Comprehensive reporting</span>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-600/30">
                <div>
                  <div className="text-3xl font-bold text-indigo-400">500+</div>
                  <div className="text-slate-400 text-sm">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400">50+</div>
                  <div className="text-slate-400 text-sm">Railway Divisions</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Signup Form */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12 bg-slate-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Train className="h-8 w-8 text-indigo-400" />
                <span className="text-2xl font-bold text-white">
                  त्रिवेणी<span className="text-indigo-400">Path</span>
                </span>
              </div>
            </div>

            {msg && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <div className="px-4 py-3 rounded-lg text-center font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {msg}
                </div>
              </motion.div>
            )}
            {err && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6"
              >
                <div className="px-4 py-3 rounded-lg text-center font-medium bg-red-500/10 border border-red-500/30 text-red-400">
                  {err}
                </div>
              </motion.div>
            )}

// ...existing code...

            <Card className="shadow-2xl border border-slate-700 bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-3xl font-bold text-white mb-2">
                  Create Account
                </CardTitle>
                <p className="text-slate-400">
                  Fill in your details to get started
                </p>
              </CardHeader>

              <CardContent className="px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <User className="h-4 w-4 text-slate-400" />
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="pl-12 h-12 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="pl-12 h-12 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-slate-400" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="pl-12 pr-12 h-12 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-slate-400" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="pl-12 pr-12 h-12 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-indigo-500/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 mt-1 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500 focus:ring-offset-slate-800"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed">
                      I agree to the{" "}
                      <Link to="/terms-of-service" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4 flex flex-col items-center justify-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                  
                  <button
                    onClick={() => navigate("/")}
                    className="text-sm text-slate-500 hover:text-slate-400 transition-colors flex items-center justify-center"
                  >
                    ← Back to Home
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}