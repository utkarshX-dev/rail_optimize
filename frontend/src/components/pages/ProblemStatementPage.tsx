// import { Card, CardContent } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import {
//   AlertTriangle,
//   Clock,
//   Users,
//   TrendingUp,
//   Train,
//   BarChart3,
//   Zap,
//   Shield,
// } from "lucide-react";
// import { motion } from "motion/react";
// import { ImageWithFallback } from "../figma/ImageWithFallback";
// import { useNavigate } from "react-router-dom"; // <-- updated

// export function ProblemStatementPage() {
//   const navigate = useNavigate(); // <-- updated

//   const challenges = [
//     {
//       icon: Clock,
//       title: "Manual Decision Making",
//       description:
//         "Controllers rely on experience and intuition, struggling to keep up with growing traffic demands.",
//       impact: "Leads to suboptimal decisions and increased delays",
//       color: "text-red-600",
//     },
//     {
//       icon: TrendingUp,
//       title: "Exponential Complexity",
//       description:
//         "A large-scale combinatorial optimization problem where solution space grows exponentially.",
//       impact: "Human capacity overwhelmed by countless variables",
//       color: "text-orange-600",
//     },
//     {
//       icon: AlertTriangle,
//       title: "Disruption Management",
//       description:
//         "When breakdowns or delays occur, controllers must quickly reshuffle priorities without optimization tools.",
//       impact: "Cascading delays across the entire network",
//       color: "text-yellow-600",
//     },
//     {
//       icon: Users,
//       title: "Resource Constraints",
//       description:
//         "Limited tracks, signals, and platforms must handle thousands of trains with different priorities daily.",
//       impact: "Inefficient resource utilization and bottlenecks",
//       color: "text-blue-600",
//     },
//   ];

//   const statistics = [
//     { label: "Daily Train Operations", value: "20,000+", icon: Train },
//     { label: "Average Delay Time", value: "18 min", icon: Clock },
//     { label: "Controllers Managing", value: "3000+", icon: Users },
//     { label: "Network Complexity", value: "Exponential", icon: BarChart3 },
//   ];

//   const painPoints = [
//     "Limited visibility into network-wide optimization opportunities",
//     "Reactive rather than proactive management approach",
//     "Difficulty in predicting and preventing cascading delays",
//     "Manual coordination between multiple control centers",
//     "Inability to simulate 'what-if' scenarios before decisions",
//     "Resource allocation based on rules rather than optimization",
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//   {/* Hero Section */}
//   <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-background dark:via-background dark:to-background py-20">
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-4xl mx-auto text-center"
//       >
//         <Badge
//           variant="outline"
//           className="mb-6 bg-white dark:bg-background border-red-200"
//         >
//           The Challenge: Optimizing Railway Traffic
//         </Badge>
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-10 leading-tight tracking-tight">
//           The Growing Challenge of{" "}
//           <span className="text-red-600">Railway Traffic Management</span>
//         </h1>
//         <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
//           Indian Railways operates one of the world's largest train
//           networks. Every day, thousands of passenger and freight trains
//           share the same infrastructure, creating an incredibly complex
//           coordination challenge that manual processes can no longer handle.
//         </p>
//       </motion.div>
//     </div>
//   </section>

//       {/* Current State Video */}
//       <div className="flex justify-center mb-12">
//         <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border-4 border-blue-200 bg-black">
//           <iframe
//             className="w-full aspect-video"
//             src="https://www.youtube.com/embed/qDO8qDflCeE"
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//           <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded shadow">
//             Demo Video
//           </div>
//         </div>
//       </div>

//       {/* Current Manual Approach */}
//       <section className="py-20 bg-white dark:bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl sm:text-4xl mb-6">Current Manual Approach</h2>
//               <p className="text-muted-foreground mb-6 leading-relaxed">
//                 Train traffic controllers decide which train should move first,
//                 which should wait, and how to reroute trains when problems
//                 arise. This system has worked because controllers rely on years
//                 of experience and intuition.
//               </p>
//               <p className="text-muted-foreground mb-8 leading-relaxed">
//                 However, as traffic continues to grow, this manual approach is
//                 struggling to keep up. The network has limited resources and
//                 countless types of trains with different priorities that must be
//                 coordinated across time and space while ensuring safety.
//               </p>

//               <div className="grid grid-cols-2 gap-4">
//                 {statistics.map((stat, index) => {
//                   const IconComponent = stat.icon;
//                   return (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       className="text-center p-4 bg-white border border-gray-200 rounded-lg"
//                     >
//                       <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-2" />
//                       <div className="font-semibold text-gray-900 text-lg">{stat.value}</div>
//                       <div className="text-sm text-muted-foreground">{stat.label}</div>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="relative"
//             >
//               <ImageWithFallback
//                 src="https://imgs.search.brave.com/VbAPMXnhhlEf6WD7i1S83Xczr8yNfOMF8ep-ZtEchkQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZWlo/NDN5bTUzd2lmLmNs/b3VkZnJvbnQubmV0/L3JhaWx3YXktc3Rh/dGlvbi1tdW1iYWkt/cm9vZnMtdHJhaW5z/LWluZGlhLWJvbWJh/eS1zaHV0dGVyc3Rv/Y2tfNjQ3NjA5OTM4/LmpwZ18xZTg0Zjgz/MDNiLmpwZw"
//                 alt="Busy Indian Railway Station"
//                 className="w-full h-[400px] object-cover rounded-lg shadow-lg"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
//               <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3">
//                 <div className="text-sm">
//                   <div className="font-medium text-red-600">Current Challenge</div>
//                   <div className="text-muted-foreground">20,000+ daily train movements</div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Core Challenges */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-900">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center mb-16"
//           >
//             <h2 className="text-3xl text-white sm:text-4xl mb-6">Core Challenges</h2>
//             <p className="text-xl text-muted-foreground leading-relaxed">
//               The complexity of modern railway operations has outgrown manual
//               management capabilities, creating multiple interconnected
//               challenges.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-8 mb-16">
//             {challenges.map((challenge, index) => {
//               const IconComponent = challenge.icon;
//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className="h-full bg-white dark:bg-card hover:shadow-lg transition-all">
//                     <CardContent className="p-6">
//                       <div className="flex items-start space-x-4">
//                         <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg flex-shrink-0">
//                           <IconComponent className={`h-6 w-6 ${challenge.color}`} />
//                         </div>
//                         <div>
//                           <h3 className="text-xl mb-3">{challenge.title}</h3>
//                           <p className="text-muted-foreground mb-4 leading-relaxed">
//                             {challenge.description}
//                           </p>
//                           <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
//                             <div className="text-sm text-red-700 dark:text-red-300">
//                               <strong>Impact:</strong> {challenge.impact}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Pain Points */}
//       <section className="py-20 bg-white dark:bg-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="max-w-3xl mx-auto text-center mb-16"
//           >
//             <h2 className="text-3xl sm:text-4xl mb-6">Operational Pain Points</h2>
//             <p className="text-xl text-muted-foreground leading-relaxed">
//               Daily operational challenges that highlight the need for intelligent automation.
//             </p>
//           </motion.div>

//           <div className="max-w-4xl mx-auto">
//             <div className="grid md:grid-cols-2 gap-6">
//               {painPoints.map((point, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-start space-x-3"
//                 >
//                   <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
//                   <span className="leading-relaxed">{point}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* The Real Challenge */}
// <div className="mt-16 mb-16 relative overflow-hidden">
//   {/* Background gradient */}
//   <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"></div>
//   <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
  
//   <div className="relative bg-white/80 backdrop-blur-sm border border-orange-200/50 rounded-2xl p-8 md:p-12 shadow-lg shadow-orange-100/50">
//     <div className="text-center max-w-4xl mx-auto">
//       {/* Icon with animated background */}
//       <div className="relative inline-flex items-center justify-center mb-6">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur-lg opacity-20 animate-pulse"></div>
//         <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-full shadow-lg">
//           <AlertTriangle className="h-8 w-8 text-white" />
//         </div>
//       </div>

//       {/* Enhanced heading */}
//       <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">
//         The Scale Challenge
//       </h3>

//       {/* Improved content with statistics */}
//       <div className="space-y-6">
//         <p className="text-lg text-gray-700 leading-relaxed">
//           Modern logistics networks process <span className="font-semibold text-orange-600">millions of decisions per hour</span>. 
//           What started as simple route planning has evolved into a massive combinatorial optimization challenge 
//           with <span className="font-semibold text-orange-600">exponential complexity</span>.
//         </p>
        
//         <div className="grid md:grid-cols-3 gap-6 my-8">
//           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
//             <div className="text-2xl font-bold text-orange-600 mb-1">10^23</div>
//             <div className="text-sm text-gray-600">Possible route combinations</div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
//             <div className="text-2xl font-bold text-orange-600 mb-1">Real-time</div>
//             <div className="text-sm text-gray-600">Decision requirements</div>
//           </div>
//           <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
//             <div className="text-2xl font-bold text-orange-600 mb-1">System-wide</div>
//             <div className="text-sm text-gray-600">Impact of each choice</div>
//           </div>
//         </div>

//         <p className="text-gray-700 leading-relaxed">
//           Traditional approaches that worked for hundreds of packages now break down when facing&nbsp;
//           <span className="font-semibold text-orange-600">thousands of variables</span>, 
//           <span className="font-semibold text-orange-600">&nbsp;dynamic constraints</span>, and 
//           <span className="font-semibold text-orange-600">&nbsp;real-time disruptions</span>. 
//           One suboptimal decision cascades through the entire network, creating delays that compound exponentially.
//         </p>

//         {/* Call to action */}
//         <div className="pt-4">
//           <Button 
//             onClick={() => navigate('/signup')} 
//             className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//           >
//             <span>Get Started</span>
//             <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </Button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// }

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  Train,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";

export function ProblemStatementPage() {
  const navigate = useNavigate();

  const challenges = [
    {
      icon: Clock,
      title: "Manual Decision Making",
      description:
        "Controllers rely on experience and intuition, struggling to keep up with growing traffic demands.",
      impact: "Leads to suboptimal decisions and increased delays",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/50",
    },
    {
      icon: TrendingUp,
      title: "Exponential Complexity",
      description:
        "A large-scale combinatorial optimization problem where solution space grows exponentially.",
      impact: "Human capacity overwhelmed by countless variables",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/50",
    },
    {
      icon: AlertTriangle,
      title: "Disruption Management",
      description:
        "When breakdowns or delays occur, controllers must quickly reshuffle priorities without optimization tools.",
      impact: "Cascading delays across the entire network",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/50",
    },
    {
      icon: Users,
      title: "Resource Constraints",
      description:
        "Limited tracks, signals, and platforms must handle thousands of trains with different priorities daily.",
      impact: "Inefficient resource utilization and bottlenecks",
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/50",
    },
  ];

  const statistics = [
    { label: "Daily Train Operations", value: "20,000+", icon: Train },
    { label: "Average Delay Time", value: "18 min", icon: Clock },
    { label: "Controllers Managing", value: "3000+", icon: Users },
    { label: "Network Complexity", value: "Exponential", icon: BarChart3 },
  ];

  const painPoints = [
    "Limited visibility into network-wide optimization opportunities",
    "Reactive rather than proactive management approach",
    "Difficulty in predicting and preventing cascading delays",
    "Manual coordination between multiple control centers",
    "Inability to simulate 'what-if' scenarios before decisions",
    "Resource allocation based on rules rather than optimization",
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            
            <span className="bg-indigo-500/20 text-indigo-300 rounded-full px-4 py-1 text-sm font-semibold tracking-wide mb-4 inline-block">
              The Challenge: Optimizing Railway Traffic
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-normal tracking-tight mb-4">
    The Growing Challenge of{" "}
    <span className="text-indigo-400">Railway Traffic Management</span>
</h1>
            {/* <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The Growing Challenge of{" "}
              <span className="text-indigo-400">Railway Traffic Management</span>
            </h1> */}
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
              Indian Railways operates one of the world's largest train
              networks. Every day, thousands of passenger and freight trains
              share the same infrastructure, creating an incredibly complex
              coordination challenge that manual processes can no longer handle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current State Video */}
      <div className="flex justify-center my-12 -mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-black"
        >
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/qDO8qDflCeE"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="absolute top-4 left-4 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-semibold">
            Demo Video
          </div>
        </motion.div>
      </div>

      {/* Current Manual Approach */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 md:px-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Current Manual Approach</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Train traffic controllers decide which train should move first,
                which should wait, and how to reroute trains when problems
                arise. This system has worked because controllers rely on years
                of experience and intuition.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed">
                However, as traffic continues to grow, this manual approach is
                struggling to keep up. The network has limited resources and
                countless types of trains with different priorities that must be
                coordinated across time and space while ensuring safety.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {statistics.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 bg-slate-800 border border-slate-700 rounded-2xl"
                    >
                      <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-3 inline-flex mb-3">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="font-semibold text-white text-lg">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src="https://imgs.search.brave.com/VbAPMXnhhlEf6WD7i1S83Xczr8yNfOMF8ep-ZtEchkQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kZWlo/NDN5bTUzd2lmLmNs/b3VkZnJvbnQubmV0/L3JhaWx3YXktc3Rh/dGlvbi1tdW1iYWkt/cm9vZnMtdHJhaW5z/LWluZGlhLWJvbWJh/eS1zaHV0dGVyc3Rv/Y2tfNjQ3NjA5OTM4/LmpwZ18xZTg0Zjgz/MDNiLmpwZw"
                alt="Busy Indian Railway Station"
                className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-slate-700">
                <div className="text-sm">
                  <div className="font-semibold text-indigo-400">Current Challenge</div>
                  <div className="text-slate-400">20,000+ daily train movements</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Challenges */}
      <section className="py-20 bg-slate-900 -mt-8">
        <div className="container mx-auto px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Core Challenges</h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              The complexity of modern railway operations has outgrown manual
              management capabilities, creating multiple interconnected
              challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 ">
            {challenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800 border border-slate-700 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/50"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${challenge.bg} p-3 rounded-xl flex-shrink-0`}>
                      <IconComponent className={`h-6 w-6 ${challenge.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{challenge.title}</h3>
                      <p className="text-slate-400 mb-4 leading-relaxed">
                        {challenge.description}
                      </p>
                      <div className={`${challenge.bg} ${challenge.border} rounded-lg p-3`}>
                        <div className="text-sm text-indigo-300">
                          <strong>Impact:</strong> {challenge.impact}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Operational Pain Points</h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              Daily operational challenges that highlight the need for intelligent automation.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 bg-slate-800 border border-slate-700 rounded-2xl p-6"
                >
                  <AlertTriangle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed text-slate-400">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Real Challenge */}
      <div className="mt-16 relative px-4 md:px-0">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="relative bg-indigo-500/10 p-4 rounded-full">
                <Zap className="h-8 w-8 text-indigo-400" />
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              The Scale Challenge
            </h3>

            <div className="space-y-6">
              <p className="text-lg text-slate-400 leading-relaxed">
                Modern logistics networks process <span className="font-semibold text-indigo-400">millions of decisions per hour</span>. 
                What started as simple route planning has evolved into a massive combinatorial optimization challenge 
                with <span className="font-semibold text-indigo-400">exponential complexity</span>.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">10^23</div>
                  <div className="text-sm text-slate-400">Possible route combinations</div>
                </div>
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">Real-time</div>
                  <div className="text-sm text-slate-400">Decision requirements</div>
                </div>
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
                  <div className="text-2xl font-bold text-indigo-400 mb-1">System-wide</div>
                  <div className="text-sm text-slate-400">Impact of each choice</div>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed">
                Traditional approaches that worked for hundreds of packages now break down when facing&nbsp;
                <span className="font-semibold text-indigo-400">thousands of variables</span>, 
                <span className="font-semibold text-indigo-400">&nbsp;dynamic constraints</span>, and 
                <span className="font-semibold text-indigo-400">&nbsp;real-time disruptions</span>. 
                One suboptimal decision cascades through the entire network, creating delays that compound exponentially.
              </p>

              {/* Call to action */}
              <div className="pt-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
