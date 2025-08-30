import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Lock, User, Train, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "../Router";
import { motion } from "motion/react";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: ""
  });
  const { navigate } = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration here
    console.log("Signup attempted with:", formData);
  };

  const handleGoogleSignup = () => {
    // Handle Google signup here
    console.log("Google signup attempted");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-blue-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col justify-center px-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <Train className="h-12 w-12" />
              <span className="text-3xl font-bold">RailOptimize</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Transform Railway Operations with AI
            </h2>
            
            <p className="text-xl text-blue-100 mb-12">
              Join thousands of railway professionals using intelligent optimization 
              to reduce delays and maximize efficiency.
            </p>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span>40% reduction in train delays</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span>60% faster decision making</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span>25% increase in throughput</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Right side - Form */}
        <div className="flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <motion.div 
                className="flex items-center justify-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Train className="h-10 w-10 text-primary" />
                <span className="text-2xl font-semibold">RailOptimize</span>
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
              <p className="text-muted-foreground">
                Get started with intelligent railway optimization
              </p>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => updateFormData('username', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <input type="checkbox" className="mt-1 rounded" required />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <motion.button
                        type="button"
                        onClick={() => navigate('terms-of-service')}
                        className="text-primary hover:underline"
                        whileHover={{ scale: 1.05 }}
                      >
                        Terms of Service
                      </motion.button>{" "}
                      and{" "}
                      <motion.button
                        type="button"
                        onClick={() => navigate('privacy-policy')}
                        className="text-primary hover:underline"
                        whileHover={{ scale: 1.05 }}
                      >
                        Privacy Policy
                      </motion.button>
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <Button type="submit" className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </form>

                {/* Divider */}
                <div className="mt-6 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                </div>

                {/* Google Signup Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignup}
                    className="w-full h-12 text-base border-2 border-gray-300 hover:border-gray-400"
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </motion.div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <motion.button
                      onClick={() => navigate('login')}
                      className="text-primary hover:underline font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      Sign in
                    </motion.button>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <motion.button
                onClick={() => navigate('home')}
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