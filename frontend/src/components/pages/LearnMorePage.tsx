import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Brain, 
  Cpu, 
  Zap, 
  Shield, 
  BarChart3, 
  Clock, 
  Target, 
  Users,
  CheckCircle,
  ArrowRight,
  Train,
  Layers,
  Database,
  Settings
} from "lucide-react";
import { useRouter } from "../Router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function LearnMorePage() {
  const { navigate } = useRouter();

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Algorithms",
      description: "Machine learning models that continuously improve optimization based on historical data and real-time patterns."
    },
    {
      icon: Cpu,
      title: "Mathematical Optimization",
      description: "Operations research techniques including linear programming, constraint satisfaction, and heuristic algorithms."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Sub-second response times for critical decisions with parallel processing architecture."
    },
    {
      icon: Shield,
      title: "Safety-First Design",
      description: "Built-in safety constraints that cannot be overridden, ensuring all recommendations meet safety standards."
    }
  ];

  const benefits = [
    { metric: "40%", label: "Reduction in delays", icon: Clock },
    { metric: "60%", label: "Faster decisions", icon: Zap },
    { metric: "25%", label: "Higher throughput", icon: Target },
    { metric: "30%", label: "Better resource utilization", icon: BarChart3 }
  ];

  const implementation = [
    {
      phase: "Assessment & Planning",
      duration: "2-4 weeks",
      description: "Comprehensive analysis of current operations and custom solution design"
    },
    {
      phase: "System Integration",
      duration: "6-8 weeks", 
      description: "Integration with existing infrastructure and initial system configuration"
    },
    {
      phase: "Testing & Validation",
      duration: "4-6 weeks",
      description: "Extensive testing in controlled environments and validation of results"
    },
    {
      phase: "Deployment & Training",
      duration: "2-3 weeks",
      description: "Full deployment with comprehensive staff training and support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-background dark:via-background dark:to-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="mb-6 bg-white dark:bg-background">
              Comprehensive Solution Guide
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              Transform Railway Operations with
              <span className="text-blue-600"> Intelligent AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover how RailOptimize revolutionizes railway traffic management through 
              advanced algorithms, real-time optimization, and human-centered design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={() => navigate('signup')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" onClick={() => navigate('contact')}>
                  Schedule Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Built on cutting-edge AI and operations research, our system combines 
              multiple technologies to deliver unprecedented optimization capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl mb-6 text-center">System Architecture</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <Database className="h-12 w-12 mx-auto mb-3 text-blue-200" />
                <div className="font-medium mb-2">Data Layer</div>
                <div className="text-sm text-blue-100">Live feeds from signals, trains, and infrastructure</div>
              </div>
              <div className="text-center">
                <Cpu className="h-12 w-12 mx-auto mb-3 text-blue-200" />
                <div className="font-medium mb-2">AI Engine</div>
                <div className="text-sm text-blue-100">Machine learning and optimization algorithms</div>
              </div>
              <div className="text-center">
                <Layers className="h-12 w-12 mx-auto mb-3 text-blue-200" />
                <div className="font-medium mb-2">Decision Layer</div>
                <div className="text-sm text-blue-100">Real-time recommendations and scenario analysis</div>
              </div>
              <div className="text-center">
                <Settings className="h-12 w-12 mx-auto mb-3 text-blue-200" />
                <div className="font-medium mb-2">Interface</div>
                <div className="text-sm text-blue-100">Intuitive dashboard for controllers</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Measurable Impact */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-background dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real-world deployments show consistent improvements across all key metrics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center bg-white dark:bg-card hover:shadow-lg transition-all hover:scale-105">
                    <CardContent className="p-6">
                      <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {benefit.metric}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {benefit.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6">
              Implementation Process
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our proven methodology ensures smooth deployment with minimal disruption to operations.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {implementation.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 mb-8"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{phase.phase}</h4>
                    <Badge variant="secondary">{phase.duration}</Badge>
                  </div>
                  <p className="text-muted-foreground">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl mb-6">
              Ready to Transform Your Railway Operations?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Join leading railway organizations worldwide who are already benefiting 
              from intelligent decision-support systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate('contact')}
                >
                  Contact Sales Team
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => navigate('case-studies')}
                >
                  View Case Studies
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}