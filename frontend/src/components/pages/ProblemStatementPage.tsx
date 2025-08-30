import { Card, CardContent } from "../ui/card";
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
} from "lucide-react";
import { useRouter } from "../Router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ProblemStatementPage() {
  const { navigate } = useRouter();

  const challenges = [
    {
      icon: Clock,
      title: "Manual Decision Making",
      description:
        "Controllers rely on experience and intuition, struggling to keep up with growing traffic demands.",
      impact: "Leads to suboptimal decisions and increased delays",
      color: "text-red-600",
    },
    {
      icon: TrendingUp,
      title: "Exponential Complexity",
      description:
        "A large-scale combinatorial optimization problem where solution space grows exponentially.",
      impact: "Human capacity overwhelmed by countless variables",
      color: "text-orange-600",
    },
    {
      icon: AlertTriangle,
      title: "Disruption Management",
      description:
        "When breakdowns or delays occur, controllers must quickly reshuffle priorities without optimization tools.",
      impact: "Cascading delays across the entire network",
      color: "text-yellow-600",
    },
    {
      icon: Users,
      title: "Resource Constraints",
      description:
        "Limited tracks, signals, and platforms must handle thousands of trains with different priorities daily.",
      impact: "Inefficient resource utilization and bottlenecks",
      color: "text-blue-600",
    },
  ];

  const statistics = [
    { label: "Daily Train Operations", value: "20,000+", icon: Train },
    { label: "Average Delay Time", value: "12 min", icon: Clock },
    { label: "Controllers Managing", value: "500+", icon: Users },
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-background dark:via-background dark:to-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge
              variant="outline"
              className="mb-6 bg-white dark:bg-background border-red-200"
            >
              Critical Challenge Analysis
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
              The Growing Challenge of
              <span className="text-red-600"> Railway Traffic Management</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Indian Railways operates one of the world's largest train
              networks. Every day, thousands of passenger and freight trains
              share the same infrastructure, creating an incredibly complex
              coordination challenge that manual processes can no longer handle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current State */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border-4 border-blue-200 bg-black">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/qDO8qDflCeE"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-3 py-1 rounded shadow">
            Demo Video
          </div>
        </div>
      </div>
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl mb-6">
                Current Manual Approach
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Train traffic controllers decide which train should move first,
                which should wait, and how to reroute trains when problems
                arise. This system has worked because controllers rely on years
                of experience and intuition.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
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
                      className="text-center p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900 text-lg">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1711000101278-ec788398aefb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByYWlsd2F5JTIwdHJhaW4lMjBzdGF0aW9ufGVufDF8fHx8MTc1NjUzMDAxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Busy Indian Railway Station"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3">
                <div className="text-sm">
                  <div className="font-medium text-red-600">
                    Current Challenge
                  </div>
                  <div className="text-muted-foreground">
                    20,000+ daily train movements
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl text-white sm:text-4xl mb-6">
              Core Challenges
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The complexity of modern railway operations has outgrown manual
              management capabilities, creating multiple interconnected
              challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {challenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white dark:bg-card hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg flex-shrink-0">
                          <IconComponent
                            className={`h-6 w-6 ${challenge.color}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl mb-3">{challenge.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {challenge.description}
                          </p>
                          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3">
                            <div className="text-sm text-red-700 dark:text-red-300">
                              <strong>Impact:</strong> {challenge.impact}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-6">
              Operational Pain Points
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Daily operational challenges that highlight the need for
              intelligent automation.
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
                  className="flex items-start space-x-3"
                >
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Real Challenge */}
      <div className="mt-16 mb-16 bg-red-50 border border-red-200 rounded-lg p-8">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl mb-4 text-red-800">The Real Challenge</h3>
          <p className="text-red-700 leading-relaxed max-w-3xl mx-auto">
            This is not a simple puzzle it's a large-scale combinatorial
            optimization problem. One wrong decision can cause delays across the
            entire system. While human expertise is invaluable, it's no longer
            sufficient for today's scale of operations.
          </p>
        </div>
      </div>
    </div>
  );
}
