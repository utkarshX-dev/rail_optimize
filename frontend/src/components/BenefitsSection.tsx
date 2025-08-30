import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  Clock, 
  Shield, 
  Users, 
  Zap, 
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "./Router";

export function BenefitsSection() {
  const { navigate } = useRouter();
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increased Efficiency",
      description: "25% higher throughput with optimized train scheduling and resource utilization",
      metric: "25%",
      metricLabel: "Higher Throughput",
      color: "text-emerald-600"
    },
    {
      icon: Clock,
      title: "Reduced Delays",
      description: "40% reduction in delays through predictive scheduling and proactive disruption management",
      metric: "40%",
      metricLabel: "Delay Reduction",
      color: "text-blue-600"
    },
    {
      icon: Zap,
      title: "Faster Decisions",
      description: "60% faster decision-making with AI-powered recommendations and scenario analysis",
      metric: "60%",
      metricLabel: "Faster Decisions",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Enhanced Safety",
      description: "Improved safety through comprehensive constraint modeling and validation",
      metric: "99.9%",
      metricLabel: "Safety Score",
      color: "text-indigo-600"
    }
  ];

  const operationalImprovements = [
    {
      title: "Punctuality",
      before: "72%",
      after: "89%",
      improvement: "+17%"
    },
    {
      title: "Resource Utilization",
      before: "65%",
      after: "83%",
      improvement: "+18%"
    },
    {
      title: "Average Delay",
      before: "12 min",
      after: "7 min",
      improvement: "-5 min"
    },
    {
      title: "Daily Throughput",
      before: "2,400",
      after: "3,000",
      improvement: "+600"
    }
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
    <section id="benefits" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-white">
            Measurable Impact
          </Badge>
          <h2 className="text-3xl sm:text-4xl mb-6">
            Transforming Railway Operations
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The intelligent decision-support system delivers measurable improvements 
            across all key performance indicators, modernizing Indian Railways for the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="bg-white border-2 hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <IconComponent className={`h-12 w-12 ${benefit.color} mx-auto mb-2`} />
                    <div className={`text-3xl font-bold ${benefit.color}`}>
                      {benefit.metric}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {benefit.metricLabel}
                    </div>
                  </div>
                  <h4 className="mb-3">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl mb-6">Operational Performance Improvements</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Real-world metrics showing the dramatic improvements in railway operations 
              after implementing the intelligent decision-support system.
            </p>
            
            <div className="space-y-6">
              {operationalImprovements.map((improvement, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                  <div>
                    <div className="font-medium">{improvement.title}</div>
                    <div className="text-sm text-muted-foreground">Current vs Optimized</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {improvement.before} → {improvement.after}
                    </div>
                    <div className="text-emerald-600 font-medium">
                      {improvement.improvement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1692830199340-fb627266189f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjB0cmFpbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTY1MzAwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern train dashboard"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl text-center mb-8">System Advantages</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {systemAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span className="leading-relaxed">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl mb-4">Ready to Transform Your Operations?</h3>
            <p className="text-blue-100 leading-relaxed mb-6 max-w-2xl mx-auto">
              Join the future of railway management with our intelligent decision-support system. 
              Experience the power of AI-driven optimization and see the difference it makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('signup')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Get Started
              </button>
              <button 
                onClick={() => navigate('demo')}
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Watch Demo
                <ArrowRight className="ml-2 h-4 w-4 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}