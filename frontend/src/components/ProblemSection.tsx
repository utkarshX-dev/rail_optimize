import { Card, CardContent } from "./ui/card";
import { AlertTriangle, Clock, Users, TrendingUp, Video } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function ProblemSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;
      const rect = video.getBoundingClientRect();
      const completelyOutOfView =
        rect.bottom < 0 || rect.top > window.innerHeight;
      if (completelyOutOfView && !video.paused) {
        video.pause();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const challenges = [
    {
      icon: Clock,
      title: "Manual Decision Making",
      description:
        "Controllers rely on experience and intuition, struggling to keep up with growing traffic demands.",
      color: "text-red-600",
    },
    {
      icon: TrendingUp,
      title: "Exponential Complexity",
      description:
        "A large-scale combinatorial optimization problem where solution space grows exponentially.",
      color: "text-orange-600",
    },
    {
      icon: AlertTriangle,
      title: "Disruption Management",
      description:
        "When breakdowns or delays occur, controllers must quickly reshuffle priorities without optimization tools.",
      color: "text-yellow-600",
    },
    {
      icon: Users,
      title: "Resource Constraints",
      description:
        "Limited tracks, signals, and platforms must handle thousands of trains with different priorities daily.",
      color: "text-blue-600",
    },
  ];

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl mb-6">
            The Challenge Facing Indian Railways
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Indian Railways operates one of the world's largest train networks.
            Every day, thousands of passenger and freight trains share the same
            infrastructure, creating an incredibly complex coordination
            challenge.
          </p>
        </motion.div>

        {/* Styled Video Section */}
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

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl mb-6">Current Manual Approach</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Train traffic controllers decide which train should move first,
              which should wait, and how to reroute trains when problems arise.
              This system has worked because controllers rely on years of
              experience and intuition.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              However, as traffic continues to grow, this manual approach is
              struggling to keep up. The network has limited resources and
              countless types of trains with different priorities that must be
              coordinated across time and space while ensuring safety.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1681034894086-ff28221092a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWlsd2F5JTIwdHJhY2tzJTIwanVuY3Rpb258ZW58MXx8fHwxNzU2NTMwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Railway tracks junction"
              className="w-full h-[300px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, index) => {
            const IconComponent = challenge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <IconComponent className={`h-8 w-8 ${challenge.color}`} />
                    </div>
                    <h4 className="mb-3">{challenge.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {challenge.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-xl mb-4 text-red-800">The Real Challenge</h3>
            <p className="text-red-700 leading-relaxed max-w-3xl mx-auto">
              This is not a simple puzzle it's a large-scale combinatorial
              optimization problem. One wrong decision can cause delays across
              the entire system. While human expertise is invaluable, it's no
              longer sufficient for today's scale of operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
