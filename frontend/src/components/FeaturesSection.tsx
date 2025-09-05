import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
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
import { motion } from "motion/react";

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

  const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
    const IconComponent = feature.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            System Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-3xl font-extrabold mb-6">
            Comprehensive Railway Management Features
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A complete solution that addresses every aspect of railway traffic management, 
            from real-time optimization to performance analytics.
          </p>
        </motion.div>

        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
            <TabsTrigger value="core">Core Features</TabsTrigger>
            <TabsTrigger value="interface">Interface</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="core" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {coreFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interface" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interfaceFeatures.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsFeatures.slice(0, 3).map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {analyticsFeatures.slice(3).map((feature, index) => (
                <FeatureCard key={index + 3} feature={feature} index={index + 3} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl mb-4">Complete Integration</h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                The system seamlessly integrates with existing railway control systems, working with 
                live data from signals, train management systems, timetables, and rolling stock information 
                through secure APIs.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl mb-2">🚂</div>
                  <div className="text-sm font-medium">Train Management</div>
                  <div className="text-xs text-blue-200 mt-1">Real-time coordination</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl mb-2">🚦</div>
                  <div className="text-sm font-medium">Signal Systems</div>
                  <div className="text-xs text-blue-200 mt-1">Live safety monitoring</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-sm font-medium">Live Analytics</div>
                  <div className="text-xs text-blue-200 mt-1">Performance insights</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}