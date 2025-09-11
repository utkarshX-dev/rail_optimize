// import { useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent } from "../ui/card";
// import { Play, Pause, Volume2, Maximize2, ArrowLeft, Clock, Users, TrendingUp } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "motion/react";

// export function DemoPage() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "Real-time Train Tracking",
//       description: "Monitor all trains across the network with live updates",
//       timestamp: "0:30"
//     },
//     {
//       title: "AI-Powered Route Optimization",
//       description: "Intelligent algorithms suggest optimal routing decisions",
//       timestamp: "1:45"
//     },
//     {
//       title: "Delay Prediction & Prevention",
//       description: "Proactive alerts help prevent delays before they occur",
//       timestamp: "2:20"
//     },
//     {
//       title: "Emergency Response Management",
//       description: "Quick rerouting during disruptions and emergencies",
//       timestamp: "3:10"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50 py-12">
//   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="text-center mb-12"
//     >
//       <button
//         onClick={() => navigate('/')}
//         className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
//       >
//         <ArrowLeft className="h-4 w-4 mr-2" />
//         Back to Home
//       </button>
      
//       <h1 className="text-4xl sm:text-5xl font-bold mb-4">
//         See त्रिवेणीPath in Action
//       </h1>
//       <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//         Watch how our AI-powered system transforms railway traffic management 
//         with intelligent optimization and real-time decision making.
//       </p>
//     </motion.div>

//     {/* Centered Video Section */}
//     <div className="max-w-5xl mx-auto">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-12"
//       >
//         <Card className="overflow-hidden shadow-2xl">
//           <CardContent className="p-0">
//             <div className="relative bg-gray-900 aspect-video">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <div className="bg-white/20 rounded-full p-8 mb-4 mx-auto w-fit">
//                     <Play className="h-16 w-16" />
//                   </div>
//                   <h3 className="text-2xl font-semibold mb-2">त्रिवेणीPath Demo</h3>
//                   <p className="text-blue-100">Complete system walkthrough • 4:30 minutes</p>
//                 </div>
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
//                 <div className="flex items-center space-x-4">
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={() => setIsPlaying(!isPlaying)}
//                     className="bg-white text-black rounded-full p-3"
//                   >
//                     {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
//                   </motion.button>
//                   <div className="flex-1 bg-white/20 rounded-full h-2 relative">
//                     <div className="bg-white h-2 rounded-full w-1/3"></div>
//                   </div>
//                   <span className="text-white text-sm">1:30 / 4:30</span>
//                   <Volume2 className="h-5 w-5 text-white" />
//                   <Maximize2 className="h-5 w-5 text-white" />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Features Section - Centered */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="text-center"
//       >
//         <h2 className="text-2xl font-semibold mb-8">What You'll Learn</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 + index * 0.1 }}
//               className="bg-white rounded-lg p-6 shadow-sm border text-left"
//             >
//               <div className="flex items-start justify-between mb-3">
//                 <h3 className="font-medium text-lg">{feature.title}</h3>
//                 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
//                   {feature.timestamp}
//                 </span>
//               </div>
//               <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   </div>
// </div>
//   );
// }

import { useState } from "react";
import { Button } from "../ui/button";
import { Play, Pause, Volume2, Maximize2, ArrowLeft, Clock, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-slate-900 text-white py-20">
      <div className="container mx-auto px-4 md:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          {/* <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            See <span className="text-2xl font-extrabold text-slate-100 transition-colors">
              त्रिवेणी<span className="text-indigo-400">Path</span>
            </span> in Action
          </h1> */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
    See <span className="font-bold text-slate-100 transition-colors">
      त्रिवेणी<span className="text-indigo-400">Path</span>
    </span> in Action
</h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
            Watch how our AI-powered system transforms railway traffic management 
            with intelligent optimization and real-time decision making.
          </p>
        </motion.div>

        {/* Centered Video Section */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-0 overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-indigo-500/20 rounded-full p-8 mb-4 mx-auto w-fit">
                      <Play className="h-16 w-16 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">त्रिवेणीPath Demo</h3>
                    <p className="text-slate-400">Complete system walkthrough • 4:30 minutes</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white/10 text-white rounded-full p-3 hover:bg-white/20 transition-colors"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </motion.button>
                    <div className="flex-1 bg-slate-700 rounded-full h-2 relative">
                      <div className="bg-indigo-400 h-2 rounded-full w-1/3"></div>
                    </div>
                    <span className="text-white text-sm">1:30 / 4:30</span>
                    <Volume2 className="h-5 w-5 text-white" />
                    <Maximize2 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Section - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">What You'll Learn</h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="w-full sm:w-1/2 lg:w-1/3 bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/50 text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full font-semibold">
                      {feature.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}