import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, EyeOff, Lock, User, Train, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempted with:", formData);
    
  };

  const handleGoogleSignup = () => {
    console.log("Google signup attempted");
   
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-background to-blue-50">
      <div className="grid lg:grid-cols-2 min-h-screen">

      
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
              <motion.div className="flex items-center space-x-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span>40% reduction in train delays</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span>60% faster decision making</span>
              </motion.div>
              <motion.div className="flex items-center space-x-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                <span>25% increase in throughput</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

       
        <div className="flex items-center justify-center px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <motion.div className="flex items-center justify-center space-x-2 mb-4" whileHover={{ scale: 1.05 }}>
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

            <Card className="shadow-xl border-0 bg-white rounded-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Get Started</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => updateFormData('username', e.target.value)}
                        className="pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="pl-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className="pl-10 pr-10 h-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

                  <div className="flex items-start space-x-2 pt-2">
                    <input type="checkbox" className="mt-1 rounded" required />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <motion.button type="button" onClick={() => navigate('terms-of-service')} className="text-blue-600 hover:underline" whileHover={{ scale: 1.05 }}>Terms of Service</motion.button>{" "}
                      and{" "}
                      <motion.button type="button" onClick={() => navigate('privacy-policy')} className="text-blue-600 hover:underline" whileHover={{ scale: 1.05 }}>Privacy Policy</motion.button>
                    </span>
                  </div>

                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </form>

                
                <div className="my-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="button" variant="outline" onClick={handleGoogleSignup} className="w-full h-12 text-base border-2 border-gray-300 hover:border-gray-400">
                    Continue with Google
                  </Button>
                </motion.div>

               
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <motion.button onClick={() => navigate('/login')} className="text-blue-600 hover:underline font-medium" whileHover={{ scale: 1.05 }}>
                      Sign in
                    </motion.button>
                  </p>
                </div>
              </CardContent>
            </Card>

            
            <div className="mt-6 text-center">
              <motion.button onClick={() => navigate('/')} className="text-sm text-gray-600 hover:text-gray-800" whileHover={{ scale: 1.05 }}>
                ← Back to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
