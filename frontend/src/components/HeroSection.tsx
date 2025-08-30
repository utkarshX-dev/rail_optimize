import { Button } from "./ui/button";
import { ArrowRight, Brain, Zap, Play, Users, TrendingUp, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";
import { motion } from "motion/react";

export function HeroSection() {
  const { navigate } = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-background to-blue-50 py-20 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm mb-6"
          >
            <Brain className="h-4 w-4" />
            <span>AI-Powered Railway Optimization</span>
            <Zap className="h-4 w-4" />
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6"
          >
            Transform Indian Railways with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI Intelligence</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
          >
            Move from manual, experience-driven train control to intelligent, data-driven operations. 
            Our AI optimization system reduces delays by 40% and increases efficiency by 60%.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" onClick={() => navigate('signup')}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2" onClick={() => navigate('demo')}>
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">40%</div>
              <div className="text-sm text-muted-foreground">Delay Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">60%</div>
              <div className="text-sm text-muted-foreground">Faster Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">25%</div>
              <div className="text-sm text-muted-foreground">Higher Throughput</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
          </motion.div>
        </div>
        
        {/* Hero Image/Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1733593202025-e8fac90148c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByYWlsd2F5JTIwY29udHJvbCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTY1MzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Railway Control Dashboard"
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
            />
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 left-8 bg-white rounded-xl shadow-lg p-4 border"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Monitoring</span>
              </div>
              <div className="text-xs text-muted-foreground">247 trains tracked</div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-8 right-8 bg-white rounded-xl shadow-lg p-4 border"
            >
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Efficiency</span>
              </div>
              <div className="text-lg font-bold text-green-600">+47%</div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-4 border"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Safety Score</span>
              </div>
              <div className="text-lg font-bold text-blue-600">99.8%</div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Join 500+ railway professionals already using RailOptimize
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Trusted by Indian Railways divisions nationwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}