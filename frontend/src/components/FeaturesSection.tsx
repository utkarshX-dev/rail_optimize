// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import { Badge } from "./ui/badge";
// import { 
//   Settings, 
//   Zap, 
//   RefreshCw, 
//   TestTube, 
//   Monitor, 
//   Database,
//   BarChart3,
//   Shield,
//   Clock,
//   Target,
//   Gauge,
//   FileText
// } from "lucide-react";
// import { motion } from "motion/react";

// export function FeaturesSection() {
//   const coreFeatures = [
//     {
//       icon: Settings,
//       title: "Constraint Modeling",
//       description: "Model all safety rules, signal systems, available tracks, train types, and priorities in real-time"
//     },
//     {
//       icon: Zap,
//       title: "Dynamic Optimization",
//       description: "Generate optimized schedules dynamically so trains move efficiently, reducing waiting times and delays"
//     },
//     {
//       icon: RefreshCw,
//       title: "Disruption Recovery",
//       description: "Quickly re-optimize when disruptions occur, ensuring minimal impact across the entire network"
//     },
//     {
//       icon: TestTube,
//       title: "Scenario Analysis",
//       description: "Test 'what-if' scenarios like rerouting, holding trains, or changing platform assignments before implementation"
//     }
//   ];

//   const interfaceFeatures = [
//     {
//       icon: Monitor,
//       title: "User-Friendly Interface",
//       description: "Clear recommendations with explanations for why certain decisions are optimal"
//     },
//     {
//       icon: Shield,
//       title: "Human Override",
//       description: "Controllers retain full ability to override system suggestions whenever necessary"
//     },
//     {
//       icon: Database,
//       title: "System Integration",
//       description: "Works with live data from signals, train management systems, and timetables through secure APIs"
//     }
//   ];

//   const analyticsFeatures = [
//     {
//       icon: BarChart3,
//       title: "Performance Tracking",
//       description: "Monitor key performance indicators like punctuality, delays, throughput, and utilization"
//     },
//     {
//       icon: Clock,
//       title: "Real-time Monitoring",
//       description: "Continuous tracking of system performance with live updates and alerts"
//     },
//     {
//       icon: FileText,
//       title: "Audit Trails",
//       description: "Complete audit trails and detailed reports for compliance and analysis"
//     },
//     {
//       icon: Target,
//       title: "KPI Dashboard",
//       description: "Comprehensive dashboard showing critical metrics and performance trends"
//     },
//     {
//       icon: Gauge,
//       title: "Efficiency Metrics",
//       description: "Track improvements in operational efficiency and resource utilization"
//     }
//   ];

//   const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
//     const IconComponent = feature.icon;
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: index * 0.1 }}
//       >
//         <Card className="hover:shadow-lg transition-shadow border-2">
//           <CardContent className="p-6">
//             <div className="flex items-start space-x-4">
//               <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg">
//                 <IconComponent className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h4 className="mb-2">{feature.title}</h4>
//                 <p className="text-sm text-muted-foreground leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     );
//   };

//   return (
//     <section id="features" className="py-20 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="max-w-3xl mx-auto text-center mb-16"
//         >
//           <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
//             System Capabilities
//           </Badge>
//           <h2 className="text-3xl sm:text-3xl font-extrabold mb-6">
//             Comprehensive Railway Management Features
//           </h2>
//           <p className="text-xl text-muted-foreground leading-relaxed">
//             A complete solution that addresses every aspect of railway traffic management, 
//             from real-time optimization to performance analytics.
//           </p>
//         </motion.div>

//         <Tabs defaultValue="core" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
//             <TabsTrigger value="core">Core Features</TabsTrigger>
//             <TabsTrigger value="interface">Interface</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//           </TabsList>

//           <TabsContent value="core" className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {coreFeatures.map((feature, index) => (
//                 <FeatureCard key={index} feature={feature} index={index} />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="interface" className="space-y-6">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {interfaceFeatures.map((feature, index) => (
//                 <FeatureCard key={index} feature={feature} index={index} />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="analytics" className="space-y-6">
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {analyticsFeatures.slice(0, 3).map((feature, index) => (
//                 <FeatureCard key={index} feature={feature} index={index} />
//               ))}
//             </div>
//             <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
//               {analyticsFeatures.slice(3).map((feature, index) => (
//                 <FeatureCard key={index + 3} feature={feature} index={index + 3} />
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mt-16"
//         >
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
//             <div className="max-w-3xl mx-auto text-center">
//               <h3 className="text-2xl mb-4">Complete Integration</h3>
//               <p className="text-blue-100 leading-relaxed mb-6">
//                 The system seamlessly integrates with existing railway control systems, working with 
//                 live data from signals, train management systems, timetables, and rolling stock information 
//                 through secure APIs.
//               </p>
//               <div className="grid md:grid-cols-3 gap-6 text-center">
//                 <div className="bg-white/10 rounded-lg p-4">
//                   <div className="text-3xl mb-2">🚂</div>
//                   <div className="text-sm font-medium">Train Management</div>
//                   <div className="text-xs text-blue-200 mt-1">Real-time coordination</div>
//                 </div>
//                 <div className="bg-white/10 rounded-lg p-4">
//                   <div className="text-3xl mb-2">🚦</div>
//                   <div className="text-sm font-medium">Signal Systems</div>
//                   <div className="text-xs text-blue-200 mt-1">Live safety monitoring</div>
//                 </div>
//                 <div className="bg-white/10 rounded-lg p-4">
//                   <div className="text-3xl mb-2">📊</div>
//                   <div className="text-sm font-medium">Live Analytics</div>
//                   <div className="text-xs text-blue-200 mt-1">Performance insights</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div> */}


//         <motion.div
//   initial={{ opacity: 0, y: 50 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   className="mt-20 px-4 md:px-0"
// >
//   <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
//     <div className="max-w-4xl mx-auto text-center">
//       <div className="flex items-center justify-center mb-4">
//         <span className="bg-indigo-500/20 text-indigo-300 rounded-full px-4 py-1 text-sm font-semibold tracking-wide">
//           Seamless Integration
//         </span>
//       </div>
//       <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
//         Built to Integrate, Not to Replace
//       </h3>
//       <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
//         त्रिवेणीPath is designed to work in harmony with your existing
//         infrastructure. Our system integrates directly with live data streams
//         from signals, TMS, timetables, and rolling stock information via secure
//         APIs.
//       </p>
//       <div className="grid md:grid-cols-3 gap-6 md:gap-8">
//         <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-indigo-500/50">
//           <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-3 inline-flex mb-3">
//             {/* Replace with an icon from a library like Heroicons */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h4 className="text-xl font-semibold mb-1">Real-time Data</h4>
//           <p className="text-slate-400 text-sm">
//             Live feeds from signals and train management systems for instant
//             decision-making.
//           </p>
//         </div>
//         <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-indigo-500/50">
//           <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-3 inline-flex mb-3">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//             </svg>
//           </div>
//           <h4 className="text-xl font-semibold mb-1">Secure APIs</h4>
//           <p className="text-slate-400 text-sm">
//             Seamless and secure integration with existing railway IT systems.
//           </p>
//         </div>
//         <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-indigo-500/50">
//           <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-3 inline-flex mb-3">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0h6" />
//             </svg>
//           </div>
//           <h4 className="text-xl font-semibold mb-1">Performance Dashboards</h4>
//           <p className="text-slate-400 text-sm">
//             Visualize punctuality, throughput, and other key metrics in one
//             centralized view.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </motion.div>
        






//       </div>
//     </section>
//   );
// }

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Settings, 
  Zap, 
  RefreshCw, 
  TestTube, 
  Monitor, 
  Database,
  BarChart3,
  Shield,
  Clock,
  Target,
  Gauge,
  FileText
} from "lucide-react";
import { motion } from "framer-motion"; // Changed from 'motion/react'

export function FeaturesSection() {
  const coreFeatures = [
    {
      icon: Settings,
      title: "Constraint Modeling",
      description: "Model all safety rules, signal systems, available tracks, train types, and priorities in real-time"
    },
    {
      icon: Zap,
      title: "Dynamic Optimization",
      description: "Generate optimized schedules dynamically so trains move efficiently, reducing waiting times and delays"
    },
    {
      icon: RefreshCw,
      title: "Disruption Recovery",
      description: "Quickly re-optimize when disruptions occur, ensuring minimal impact across the entire network"
    },
    {
      icon: TestTube,
      title: "Scenario Analysis",
      description: "Test 'what-if' scenarios like rerouting, holding trains, or changing platform assignments before implementation"
    }
  ];

  const interfaceFeatures = [
    {
      icon: Monitor,
      title: "User-Friendly Interface",
      description: "Clear recommendations with explanations for why certain decisions are optimal"
    },
    {
      icon: Shield,
      title: "Human Override",
      description: "Controllers retain full ability to override system suggestions whenever necessary"
    },
    {
      icon: Database,
      title: "System Integration",
      description: "Works with live data from signals, train management systems, and timetables through secure APIs"
    }
  ];

  const analyticsFeatures = [
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Monitor key performance indicators like punctuality, delays, throughput, and utilization"
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Continuous tracking of system performance with live updates and alerts"
    },
    {
      icon: FileText,
      title: "Audit Trails",
      description: "Complete audit trails and detailed reports for compliance and analysis"
    },
    {
      icon: Target,
      title: "KPI Dashboard",
      description: "Comprehensive dashboard showing critical metrics and performance trends"
    },
    {
      icon: Gauge,
      title: "Efficiency Metrics",
      description: "Track improvements in operational efficiency and resource utilization"
    }
  ];

  const FeatureCard = ({ feature, index }) => {
    const IconComponent = feature.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:border-indigo-500/50"
      >
        <div className="bg-indigo-500/10 text-indigo-400 rounded-xl p-3 inline-flex mb-3">
          <IconComponent className="h-6 w-6" />
        </div>
        <h4 className="text-xl font-semibold mb-1 text-white">{feature.title}</h4>
        <p className="text-slate-400 text-sm">{feature.description}</p>
      </motion.div>
    );
  };

  return (
    <section id="features" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="bg-indigo-500/20 text-indigo-300 rounded-full px-4 py-1 text-sm font-semibold tracking-wide mb-4 inline-block">
            System Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Comprehensive Railway Management Features
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
            A complete solution that addresses every aspect of railway traffic management, 
            from real-time optimization to performance analytics.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="core" className="w-full">
            {/* <TabsList className="bg-slate-800 border border-slate-700 text-white rounded-xl grid w-full grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger
                value="core"
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 rounded-xl transition-colors"
              >
                Core Features
              </TabsTrigger>
             
              <TabsTrigger
                value="interface"
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 rounded-xl transition-colors"
              >
                Interface
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 rounded-xl transition-colors"
              >
                Analytics
              </TabsTrigger> */}


              <TabsList className="bg-slate-700 border border-slate-700 rounded-xl grid w-full grid-cols-3 max-w-md mx-auto mb-12">
    <TabsTrigger
        value="core"
        className="text-white data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 rounded-xl transition-colors"
    >
        Core Features
    </TabsTrigger>
    <TabsTrigger
        value="interface"
        className="text-white data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 rounded-xl transition-colors"
    >
        Interface
    </TabsTrigger>
    <TabsTrigger
        value="analytics"
        className="text-white data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 rounded-xl transition-colors"
    >
        Analytics
    </TabsTrigger>
</TabsList>

            <TabsContent value="core" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreFeatures.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interface" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interfaceFeatures.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analyticsFeatures.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}