import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Mail, Lock, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Add your login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login attempted");
    // Add Google login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-blue-50">
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left Hero Panel */}
        <div className="hidden lg:flex flex-col justify-center px-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center space-x-3 mb-8">
              <Train className="h-12 w-12" />
              <span className="text-3xl font-bold">RailOptimize</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Welcome Back to the Future of Railway Management</h2>
            <p className="text-xl text-blue-100 mb-12">
              Continue optimizing railway operations with AI-powered intelligence.
            </p>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">System Efficiency</span>
                  <span className="text-sm font-medium">96%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Delay Reduction</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Form Panel */}
        <div className="flex items-center justify-center px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <motion.div className="flex items-center justify-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
                <Train className="h-10 w-10 text-primary" />
                <span className="text-2xl font-semibold">RailOptimize</span>
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to access your railway management dashboard</p>
            </div>

            <Card className="shadow-xl border-0 bg-white rounded-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Remember me</span>
                    </label>
                    <button type="button" className="text-primary hover:underline">Forgot password?</button>
                  </div>

                  {/* Sign In Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Sign In
                    </Button>
                  </motion.div>
                </form>

                {/* Divider */}
                <div className="mt-6 mb-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Login */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full h-12 text-base border-2 border-gray-300 hover:border-gray-400"
                  >
                    Continue with Google
                  </Button>
                </motion.div>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <motion.button
                      onClick={() => navigate('/signup')}
                      className="text-primary hover:underline font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      Sign up
                    </motion.button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <motion.button
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                ← Back to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
