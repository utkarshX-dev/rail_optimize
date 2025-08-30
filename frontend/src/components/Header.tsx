import { Button } from "./ui/button";
import { Train, Menu, X } from "lucide-react";
import { useRouter } from "./Router";
import { motion } from "motion/react";
import { useState } from "react";

export function Header() {
  const { currentPage, navigate } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Problem", page: "problem-statement" as const },
    { label: "Solution", page: "ai-optimization" as const },
    { label: "Features", page: "system-features" as const },
    { label: "Benefits", page: "benefits" as const },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Train className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">RailOptimize</span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`text-sm transition-colors ${
                  currentPage === item.page 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('demo')}
              >
                Watch Demo
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="sm"
                onClick={() => navigate('signup')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            </motion.div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t py-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    navigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-sm transition-colors ${
                    currentPage === item.page 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}