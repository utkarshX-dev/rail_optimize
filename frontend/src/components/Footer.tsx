import { Train, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const solutionLinks = [
    { label: "Problem Statement", path: "/problem-statement" },
    { label: "AI Optimization", path: "/ai-optimization" },
    { label: "System Features", path: "/system-features" },
    { label: "Benefits", path: "/benefits" },
  ];

  const technologyLinks = [
    { label: "Operations Research", path: "/operations-research" },
    { label: "Artificial Intelligence", path: "/artificial-intelligence" },
    { label: "Real-time Analytics", path: "/real-time-analytics" },
    { label: "System Integration", path: "/system-integration" },
  ];

  const companyLinks = [
    { label: "About Us", path: "/about-us" },
    { label: "Case Studies", path: "/case-studies" },
    { label: "Contact", path: "/contact" },
    { label: "Support", path: "/support" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms of Service", path: "/terms-of-service" },
    { label: "Cookie Policy", path: "/cookie-policy" },
  ];

  const LinkButton = ({ label, path }: { label: string; path: string }) => (
    <motion.button
      onClick={() => navigate(path)}
      className="hover:text-white transition-colors text-left w-full text-sm text-gray-400"
      whileHover={{ x: 5 }}
    >
      {label}
    </motion.button>
  );

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + description */}
          <div>
            <motion.div
              className="flex items-center space-x-2 mb-6 cursor-pointer"
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
            >
              <Train className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-semibold">RailOptimize</span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Transforming Indian Railways with intelligent decision-support
              systems powered by AI and operations research.
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

          {/* Links Sections */}
          <div>
            <h4 className="mb-6 font-medium">Solution</h4>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.path}>
                  <LinkButton {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-medium">Technology</h4>
            <ul className="space-y-3">
              {technologyLinks.map((link) => (
                <li key={link.path}>
                  <LinkButton {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-medium">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <LinkButton {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2025 RailOptimize. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map((link) => (
              <motion.button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
