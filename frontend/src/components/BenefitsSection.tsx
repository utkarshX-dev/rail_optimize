// import { Card, CardContent } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { 
//   TrendingUp, 
//   Clock, 
//   Shield, 
//   Zap, 
//   CheckCircle,
//   ArrowRight
// } from "lucide-react";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { useNavigate } from "react-router-dom";

// export function BenefitsSection() {
//   const navigate = useNavigate();

//   const benefits = [
//     {
//       icon: TrendingUp,
//       title: "Increased Efficiency",
//       description: "25% higher throughput with optimized train scheduling and resource utilization",
//       metric: "25%",
//       metricLabel: "Higher Throughput",
//       color: "text-emerald-600"
//     },
//     {
//       icon: Clock,
//       title: "Reduced Delays",
//       description: "40% reduction in delays through predictive scheduling and proactive disruption management",
//       metric: "40%",
//       metricLabel: "Delay Reduction",
//       color: "text-blue-600"
//     },
//     {
//       icon: Zap,
//       title: "Faster Decisions",
//       description: "60% faster decision-making with AI-powered recommendations and scenario analysis",
//       metric: "60%",
//       metricLabel: "Faster Decisions",
//       color: "text-purple-600"
//     },
//     {
//       icon: Shield,
//       title: "Enhanced Safety",
//       description: "Improved safety through comprehensive constraint modeling and validation",
//       metric: "99.9%",
//       metricLabel: "Safety Score",
//       color: "text-indigo-600"
//     }
//   ];

//   const operationalImprovements = [
//     { title: "Punctuality", before: "72%", after: "89%", improvement: "+17%" },
//     { title: "Resource Utilization", before: "65%", after: "83%", improvement: "+18%" },
//     { title: "Average Delay", before: "12 min", after: "7 min", improvement: "-5 min" },
//     { title: "Daily Throughput", before: "2,400", after: "3,000", improvement: "+600" }
//   ];

//   const systemAdvantages = [
//     "Real-time optimization across the entire network",
//     "Predictive analytics for proactive problem solving",
//     "Seamless integration with existing infrastructure",
//     "Scalable architecture for future expansion",
//     "Comprehensive audit trails for compliance",
//     "User-friendly interface with minimal training required"
//   ];

//   return (
//     <section id="benefits" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Heading */}
//         <div className="max-w-3xl mx-auto text-center mb-16">
//           <Badge variant="outline" className="mb-4 bg-white">Measurable Impact</Badge>
//           <h2 className="text-3xl sm:text-4xl mb-6">Transforming Railway Operations</h2>
//           <p className="text-xl text-muted-foreground leading-relaxed">
//             The intelligent decision-support system delivers measurable improvements 
//             across all key performance indicators, modernizing Indian Railways for the future.
//           </p>
//         </div>

//         {/* Benefit cards */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {benefits.map((benefit, index) => {
//             const IconComponent = benefit.icon;
//             return (
//               <Card key={index} className="bg-white border-2 hover:shadow-lg transition-all hover:scale-105">
//                 <CardContent className="p-6 text-center">
//                   <div className="mb-4">
//                     <IconComponent className={`h-12 w-12 ${benefit.color} mx-auto mb-2`} />
//                     <div className={`text-3xl font-bold ${benefit.color}`}>{benefit.metric}</div>
//                     <div className="text-sm text-muted-foreground">{benefit.metricLabel}</div>
//                   </div>
//                   <h4 className="mb-3">{benefit.title}</h4>
//                   <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>

//         {/* Performance improvements */}
//         <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
//           <div>
//             <h3 className="text-2xl mb-6">Operational Performance Improvements</h3>
//             <p className="text-muted-foreground mb-8 leading-relaxed">
//               Real-world metrics showing the dramatic improvements in railway operations 
//               after implementing the intelligent decision-support system.
//             </p>
//             <div className="space-y-6">
//               {operationalImprovements.map((improvement, index) => (
//                 <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
//                   <div>
//                     <div className="font-medium">{improvement.title}</div>
//                     <div className="text-sm text-muted-foreground">Current vs Optimized</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm text-muted-foreground">{improvement.before} → {improvement.after}</div>
//                     <div className="text-emerald-600 font-medium">{improvement.improvement}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative">
//             <ImageWithFallback
//               src="https://images.unsplash.com/photo-1692830199340-fb627266189f?crop=entropy&cs=tinysrgb&fit=max&w=1080"
//               alt="Modern train dashboard"
//               className="w-full h-[400px] object-cover rounded-lg shadow-lg"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
//           </div>
//         </div>

//         {/* System advantages */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg">
//           <div className="max-w-3xl mx-auto">
//             <h3 className="text-2xl text-center mb-8">System Advantages</h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               {systemAdvantages.map((advantage, index) => (
//                 <div key={index} className="flex items-center space-x-3">
//                   <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
//                   <span className="leading-relaxed">{advantage}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="mt-16 text-center">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
//             <h3 className="text-2xl mb-4">Ready to Transform Your Operations?</h3>
//             <p className="text-blue-100 leading-relaxed mb-6 max-w-2xl mx-auto">
//               Join the future of railway management with our intelligent decision-support system. 
//               Experience the power of AI-driven optimization and see the difference it makes.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button 
//                 onClick={() => navigate("/signup")}
//                 className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
//               >
//                 Get Started
//               </button>
//               <button 
//                 onClick={() => navigate("/demo")}
//                 className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
//               >
//                 Watch Demo <ArrowRight className="ml-2 h-4 w-4 inline" />
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion"; // Assuming framer-motion is used for animations
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

export function BenefitsSection() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "25% higher throughput with optimized train scheduling and resource utilization",
      metric: "25%",
      metricLabel: "Higher Throughput",
      color: "text-emerald-400" // Adjusted for dark background
    },
    {
      icon: Clock,
      title: "Reduced Delays",
      description: "40% reduction in delays through predictive scheduling and proactive disruption management",
      metric: "40%",
      metricLabel: "Delay Reduction",
      color: "text-blue-400" // Adjusted for dark background
    },
    {
      icon: Zap,
      title: "Faster Decisions",
      description: "60% faster decision-making with AI-powered recommendations and scenario analysis",
      metric: "60%",
      metricLabel: "Faster Decisions",
      color: "text-purple-400" // Adjusted for dark background
    },
    {
      icon: Shield,
      title: "Enhanced Safety",
      description: "Improved safety through comprehensive constraint modeling and validation",
      metric: "99.9%",
      metricLabel: "Safety Score",
      color: "text-indigo-400" // Adjusted for dark background
    }
  ];

  const operationalImprovements = [
    { title: "Punctuality", before: "72%", after: "89%", improvement: "+17%" },
    { title: "Resource Utilization", before: "65%", after: "83%", improvement: "+18%" },
    { title: "Average Delay", before: "12 min", after: "7 min", improvement: "-5 min" },
    { title: "Daily Throughput", before: "2,400", after: "3,000", improvement: "+600" }
  ];

  const systemAdvantages = [
    "Real-time optimization across the entire network",
    "Predictive analytics for proactive problem solving",
    "Seamless integration with existing infrastructure",
    "Scalable architecture for future expansion",
    "Comprehensive audit trails for compliance",
    "User-friendly interface with minimal training required"
  ];

  return (
    <section id="benefits" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-0">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="bg-indigo-500/20 text-indigo-300 rounded-full px-4 py-1 text-sm font-semibold tracking-wide mb-4 inline-block">
            Measurable Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Transforming Railway Operations
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
            The intelligent decision-support system delivers measurable improvements 
            across all key performance indicators, modernizing Indian Railways for the future.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-indigo-500/50 text-center"
              >
                <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-3 inline-flex mb-3">
                    <IconComponent className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-1">{benefit.title}</h4>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Performance improvements */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Operational Performance Improvements</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Real-world metrics showing the dramatic improvements in railway operations 
              after implementing the intelligent decision-support system.
            </p>
            <div className="space-y-6">
              {operationalImprovements.map((improvement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-2xl p-6"
                >
                  <div>
                    <div className="font-medium text-white">{improvement.title}</div>
                    <div className="text-sm text-slate-400">Current vs Optimized</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">{improvement.before} → {improvement.after}</div>
                    <div className="text-emerald-400 font-semibold">{improvement.improvement}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1692830199340-fb627266189f?crop=entropy&cs=tinysrgb&fit=max&w=1080"
              alt="Modern train dashboard"
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>

        {/* System advantages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-8">System Advantages</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {systemAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                  <span className="leading-relaxed text-slate-400">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Operations?</h3>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl mx-auto">
              Join the future of railway management with our intelligent decision-support system. 
              Experience the power of AI-driven optimization and see the difference it makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/signup")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate("/demo")}
                className="border border-indigo-500 text-indigo-300 px-6 py-3 rounded-lg font-medium hover:bg-indigo-500/10 transition-colors flex items-center justify-center"
              >
                Watch Demo <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
