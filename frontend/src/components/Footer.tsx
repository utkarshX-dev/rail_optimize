import { Train, Mail, Phone, MapPin } from "lucide-react";
import { useRouter } from "./Router";
import { motion } from "motion/react";

export function Footer() {
  const { navigate } = useRouter();

  const solutionLinks = [
    { label: "Problem Statement", page: "problem-statement" as const },
    { label: "AI Optimization", page: "ai-optimization" as const },
    { label: "System Features", page: "system-features" as const },
    { label: "Benefits", page: "benefits" as const },
  ];

  const technologyLinks = [
    { label: "Operations Research", page: "operations-research" as const },
    { label: "Artificial Intelligence", page: "artificial-intelligence" as const },
    { label: "Real-time Analytics", page: "real-time-analytics" as const },
    { label: "System Integration", page: "system-integration" as const },
  ];

  const companyLinks = [
    { label: "About Us", page: "about-us" as const },
    { label: "Case Studies", page: "case-studies" as const },
    { label: "Contact", page: "contact" as const },
    { label: "Support", page: "support" as const },
  ];

  const legalLinks = [
    { label: "Privacy Policy", page: "privacy-policy" as const },
    { label: "Terms of Service", page: "terms-of-service" as const },
    { label: "Cookie Policy", page: "cookie-policy" as const },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <motion.div 
              className="flex items-center space-x-2 mb-6 cursor-pointer"
              onClick={() => navigate('home')}
              whileHover={{ scale: 1.05 }}
            >
              <Train className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-semibold">RailOptimize</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Transforming Indian Railways with intelligent decision-support systems 
              powered by AI and operations research.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@railoptimize.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 11 2345 6789</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-6">Solution</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {solutionLinks.map((link) => (
                <li key={link.page}>
                  <motion.button
                    onClick={() => navigate(link.page)}
                    className="hover:text-white transition-colors text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6">Technology</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {technologyLinks.map((link) => (
                <li key={link.page}>
                  <motion.button
                    onClick={() => navigate(link.page)}
                    className="hover:text-white transition-colors text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {companyLinks.map((link) => (
                <li key={link.page}>
                  <motion.button
                    onClick={() => navigate(link.page)}
                    className="hover:text-white transition-colors text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 RailOptimize. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((link) => (
                <motion.button
                  key={link.page}
                  onClick={() => navigate(link.page)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}