import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, provider } from "../../../utils/firebase.js";
import { signInWithPopup } from "firebase/auth";
import UserContext from "../../context/userContext.js";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Lock, User, Train, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", name: "", password: "" });
  const [msg, setMsg] = useState<string | null>(null);
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleLogin = async (user: { name: string; email: string; password?: string | null; googleId?: string }) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, user);
      const { token } = res.data;
      setToken?.(token);
      setMsg(null);
      navigate("/profile");
    } catch (error: any) {
      setMsg(error?.response?.data?.message || "Signup failed. Please try again.");
      console.error("Signup failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin({ name: formData.name, email: formData.username, password: formData.password });
  };

  const handleGoogleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = response.user;
      await handleLogin({ name: displayName || "", email: email || "", password: null, googleId: uid || "" });
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-blue-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex flex-col justify-center px-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-3 mb-8">
              <Train className="h-12 w-12" />
              <span className="text-3xl font-bold">RailOptimize</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Transform Railway Operations</h2>
            <p className="text-xl text-blue-100 mb-12">Join thousands using AI to optimize efficiency</p>
          </motion.div>
        </div>
        <div className="flex items-center justify-center px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            {msg && (
              <div className="mb-4">
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded text-center">
                  {msg}
                </div>
              </div>
            )}
            <Card className="shadow-xl border-0 bg-white rounded-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="username" type="email" placeholder="Enter your email" value={formData.username} onChange={(e) => updateFormData("username", e.target.value)} required className="pl-10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="name" type="text" placeholder="Enter your full name" value={formData.name} onChange={(e) => updateFormData("name", e.target.value)} required className="pl-10 h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={(e) => updateFormData("password", e.target.value)} required className="pl-10 pr-10 h-12" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">Create Account <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </form>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignup}
                  className="w-full h-12 flex items-center justify-center gap-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-600"
                >
                  <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block mr-2"><g><path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.3 5.5 29.4 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.4-4z"/><path fill="#34A853" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.8 13 24 13c2.7 0 5.2.9 7.2 2.4l6.1-6.1C34.3 5.5 29.4 3.5 24 3.5c-7.2 0-13.4 4.1-16.7 10.2z"/><path fill="#FBBC05" d="M24 44.5c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3c-2 1.4-4.5 2.2-7.6 2.2-5.6 0-10.3-3.7-12-8.7l-6.6 5.1C7.6 39.7 15.2 44.5 24 44.5z"/><path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-4.1 5.5-7.3 6.2l6.5 5.3c-2.9 2.1-6.6 3.5-10.5 3.5-8.8 0-16.4-4.8-19.7-11.8l6.6-5.1c1.7 5 6.4 8.7 12 8.7 3.1 0 5.6-.8 7.6-2.2l6.5 5.3C38.3 42.7 43.6 34.7 43.6 24c0-1.4-.1-2.7-.4-4z"/></g></svg>
                  Continue with Google
                </Button>

                <div className="mt-2 text-center">
                  <p className="text-sm text-gray-600">Already have an account? <button onClick={() => navigate('/login')} className="text-blue-600">Sign in</button></p>
                </div>
                <div className="mt-2 text-center">
                  <button onClick={() => navigate('/')} className="text-sm text-muted-foreground hover:text-foreground">← Back to Home</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
