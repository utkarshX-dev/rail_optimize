// import { Button } from "./ui/button";
// import { ArrowRight, Brain, Zap, Play, Users, TrendingUp, Shield } from "lucide-react";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";

// export function HeroSection() {
//   const navigate = useNavigate();

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-background to-blue-50 py-20 sm:py-32">
//       {/* Background pattern */}
//       <div className="absolute inset-0 bg-grid-slate-100 bg-[size:20px_20px] opacity-50"></div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Hero Text */}
//         <div className="text-center max-w-4xl mx-auto mb-16">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm mb-6"
//           >
//             <Brain className="h-4 w-4" />
//             <span>AI-Powered Railway Optimization</span>
//             <Zap className="h-4 w-4" />
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-5xl sm:text-6xl lg:text-4xl tracking-tight mb-6"
//           >
//             Transform Indian Railways with{" "}
//             <span className="bg-gradient-to-r from-black to-zinc-600 bg-clip-text text-transparent font-extrabold">
//               AI Intelligence
//             </span>
//           </motion.h1>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
//           >
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 size="lg"
//                 className="text-lg px-8 py-6 bg-black text-white hover:bg-zinc-700"
//                 onClick={() => navigate("/signup")}
//               >
//                 Get Started
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="text-lg px-8 py-6 border-2"
//                 onClick={() => navigate("/demo")}
//               >
//                 <Play className="mr-2 h-5 w-5" />
//                 Watch Demo
//               </Button>
//             </motion.div>
//           </motion.div>

//           {/* Trust Indicators */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
//           >
//             <div className="text-center">
//               <div className="text-3xl font-bold text-blue-600 mb-1">40%</div>
//               <div className="text-sm text-muted-foreground">Delay Reduction</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-green-600 mb-1">60%</div>
//               <div className="text-sm text-muted-foreground">Faster Decisions</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-purple-600 mb-1">25%</div>
//               <div className="text-sm text-muted-foreground">Higher Throughput</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-indigo-600 mb-1">99.9%</div>
//               <div className="text-sm text-muted-foreground">System Uptime</div>
//             </div>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="relative max-w-6xl mx-auto"
//         >
//           <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
//             <ImageWithFallback
//               src="https://images.unsplash.com/photo-1733593202025-e8fac90148c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByYWlsd2F5JTIwY29udHJvbCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTY1MzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//               alt="Railway Control Dashboard"
//               className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
//             />

//             {/* Floating cards */}
//             <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-8 left-8 bg-white rounded-xl shadow-lg p-4 border">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium">Live Monitoring</span>
//               </div>
//               <div className="text-xs text-muted-foreground">247 trains tracked</div>
//             </motion.div>

//             <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} className="absolute bottom-8 right-8 bg-white rounded-xl shadow-lg p-4 border">
//               <div className="flex items-center space-x-2 mb-2">
//                 <TrendingUp className="h-4 w-4 text-green-500" />
//                 <span className="text-sm font-medium">Efficiency</span>
//               </div>
//               <div className="text-lg font-bold text-green-600">+47%</div>
//             </motion.div>

//             <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute top-8 right-8 bg-white rounded-xl shadow-lg p-4 border">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Shield className="h-4 w-4 text-blue-500" />
//                 <span className="text-sm font-medium">Safety Score</span>
//               </div>
//               <div className="text-lg font-bold text-blue-600">99.8%</div>
//             </motion.div>
//           </div>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="text-center mt-16">
//           <p className="text-muted-foreground mb-4">Join 500+ railway professionals already using RailOptimize</p>
//           <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
//             <Users className="h-4 w-4" />
//             <span>Trusted by Indian Railways divisions nationwide</span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { Button } from "./ui/button";
import { ArrowRight, Brain, Zap, Play, Users, TrendingUp, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-slate-800 bg-[size:20px_20px] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-6"
          >
            <Brain className="h-4 w-4" />
            <span>AI-Powered Railway Optimization</span>
            <Zap className="h-4 w-4" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Transform Indian Railways with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent font-extrabold">
              AI Intelligence
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 text-lg"
          >
            Harness the power of artificial intelligence to optimize train schedules, 
            reduce delays, and enhance passenger experience across India's railway network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 border-slate-600 text-white hover:bg-slate-800 hover:border-indigo-500/50 transition-all duration-300"
                onClick={() => navigate("/demo")}
              >
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
              <div className="text-3xl font-bold text-indigo-400 mb-1">40%</div>
              <div className="text-sm text-slate-400">Delay Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">60%</div>
              <div className="text-sm text-slate-400">Faster Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">25%</div>
              <div className="text-sm text-slate-400">Higher Throughput</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">99.9%</div>
              <div className="text-sm text-slate-400">System Uptime</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-700 p-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1733593202025-e8fac90148c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByYWlsd2F5JTIwY29udHJvbCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTY1MzE2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Railway Control Dashboard"
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
            />

            {/* Floating cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 3, repeat: Infinity }} 
              className="absolute top-8 left-8 bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4 transition-all duration-300 hover:border-indigo-500/50"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-3 w-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-white">Live Monitoring</span>
              </div>
              <div className="text-xs text-slate-400">247 trains tracked</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }} 
              className="absolute bottom-8 right-8 bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4 transition-all duration-300 hover:border-indigo-500/50"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-emerald-500/10 text-emerald-400 rounded-xl p-2 inline-flex">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-white">Efficiency</span>
              </div>
              <div className="text-lg font-bold text-emerald-400">+47%</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -5, 0] }} 
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} 
              className="absolute top-8 right-8 bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-4 transition-all duration-300 hover:border-indigo-500/50"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-2 inline-flex">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="text-sm font-semibold text-white">Safety Score</span>
              </div>
              <div className="text-lg font-bold text-indigo-400">99.8%</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7 }} 
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-4">Join 500+ railway professionals already using RailOptimize</p>
          <div className="flex items-center justify-center space-x-2 text-sm text-slate-400">
            <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-2 inline-flex">
              <Users className="h-4 w-4" />
            </div>
            <span>Trusted by Indian Railways divisions nationwide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}