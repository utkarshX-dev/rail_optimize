import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Play, Pause, Volume2, Maximize2, ArrowLeft, Clock, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      title: "Real-time Train Tracking",
      description: "Monitor all trains across the network with live updates",
      timestamp: "0:30"
    },
    {
      title: "AI-Powered Route Optimization",
      description: "Intelligent algorithms suggest optimal routing decisions",
      timestamp: "1:45"
    },
    {
      title: "Delay Prediction & Prevention",
      description: "Proactive alerts help prevent delays before they occur",
      timestamp: "2:20"
    },
    {
      title: "Emergency Response Management",
      description: "Quick rerouting during disruptions and emergencies",
      timestamp: "3:10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            See RailOptimize in Action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI-powered system transforms railway traffic management 
            with intelligent optimization and real-time decision making.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative bg-gray-900 aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="bg-white/20 rounded-full p-8 mb-4 mx-auto w-fit">
                        <Play className="h-16 w-16" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">RailOptimize Demo</h3>
                      <p className="text-blue-100">Complete system walkthrough • 4:30 minutes</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white text-black rounded-full p-3"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </motion.button>
                      <div className="flex-1 bg-white/20 rounded-full h-2 relative">
                        <div className="bg-white h-2 rounded-full w-1/3"></div>
                      </div>
                      <span className="text-white text-sm">1:30 / 4:30</span>
                      <Volume2 className="h-5 w-5 text-white" />
                      <Maximize2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white rounded-lg p-4 shadow-sm border"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{feature.title}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {feature.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Join thousands of railway professionals using RailOptimize to optimize operations.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={() => navigate('/signup')}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  >
                    Start Free Trial
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">System Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Average Response Time</span>
                    </div>
                    <span className="font-medium">&lt; 2 seconds</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Active Users</span>
                    </div>
                    <span className="font-medium">2,500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">Efficiency Improvement</span>
                    </div>
                    <span className="font-medium">47%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Need a Custom Demo?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Schedule a personalized demonstration with our railway optimization experts.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/contact')}
                  >
                    Schedule Demo
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
