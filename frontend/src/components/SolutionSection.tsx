import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, Cpu, BarChart3, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function SolutionSection() {
  const solutionFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Optimization",
      description: "Advanced algorithms that process countless scheduling possibilities in real-time",
      badge: "Core Technology"
    },
    {
      icon: Cpu,
      title: "Operations Research",
      description: "Mathematical optimization models that consider all constraints and priorities",
      badge: "Mathematical Engine"
    },
    {
      icon: BarChart3,
      title: "Dynamic Re-optimization",
      description: "Instant recalculation of optimal schedules when disruptions occur",
      badge: "Real-time"
    },
    {
      icon: Shield,
      title: "Human Override",
      description: "Controllers retain full authority to override system recommendations when needed",
      badge: "Human-Centered"
    }
  ];

  return (
    <section id="solution" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-white">
            Intelligent Realtime Decision Support System
          </Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-emerald-800 font-extrabold">
            AI-Powered Railway Management
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            An intelligent decision-support system that combines operations research with 
            artificial intelligence to help controllers make faster, more accurate decisions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1593225602101-a6220830c8d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbiUyMGNvbnRyb2wlMjBjZW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjUzMDAxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Train control center technology"
              className="w-full h-[350px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3">
              <div className="text-sm">
                <div className="font-semibold text-emerald-600">Get Real-Time Insights</div>
                <div className="text-muted-foreground">Automating the if scenarios</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-4xl mb-6 text-blue-500 font-extrabold">From Manual to Intelligent</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The system transforms railway operations by moving from a manual, experience-driven 
              approach to a data-driven, intelligent, and adaptive system.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Controllers get relief from overwhelming complexity while ensuring trains run more 
              punctually, safely, and efficiently. The system provides clear recommendations with 
              explanations, while maintaining human control.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
                <span>Real-time constraint modeling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span>Dynamic schedule optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span>Disruption impact minimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
                <span>What-if scenario analysis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white border-2 hover:shadow-lg transition-all hover:scale-105 h-full min-h-[260px] flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8 text-black" />
                      <Badge variant="secondary" className="text-xs text-blue-600">
                        {feature.badge}
                      </Badge>
                    </div>
                    <h4 className="mb-3 text-emerald-400 font-bold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}