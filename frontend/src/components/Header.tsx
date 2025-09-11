// import { Button } from "./ui/button";
// import { Menu, X } from "lucide-react";
// import { motion } from "motion/react";
// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const currentPage = location.pathname;

//   const navItems = [
//     { label: "Problem", path: "/problem-statement" },
//     { label: "Solution", path: "/solution" },
//     { label: "Features", path: "/features" },
//     { label: "Benefits", path: "/benefits" },
//   ];

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <motion.div
//             className="flex items-center space-x-2 cursor-pointer"
//             onClick={() => navigate("/")}
//             whileHover={{ scale: 1.05 }}
//           >
//             <span className="text-2xl font-extrabold transition">त्रिवेणीPath</span>
//           </motion.div>

          
//           <nav className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <motion.button
//                 key={item.path}
//                 onClick={() => navigate(item.path)}
//                 className={`text-sm transition-colors ${
//                   currentPage === item.path
//                     ? "text-foreground font-medium"
//                     : "text-muted-foreground hover:text-foreground"
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {item.label}
//               </motion.button>
//             ))}
//           </nav>

//           <div className="flex items-center space-x-4">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button variant="outline" size="sm" onClick={() => navigate("/demo")}>
//                 Watch Demo
//               </Button>
//             </motion.div>

//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 size="sm"
//                 onClick={() => navigate("/signup")}
//                 className="bg-black text-white hover:bg-zinc-700"
//               >
//                 Get Started
//               </Button>
//             </motion.div>

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden border-t py-4"
//           >
//             <div className="flex flex-col space-y-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => {
//                     navigate(item.path);
//                     setIsMenuOpen(false);
//                   }}
//                   className={`text-left text-sm transition-colors ${
//                     currentPage === item.path
//                       ? "text-foreground font-medium"
//                       : "text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </motion.header>
//   );
// }

import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPage = location.pathname;

  const navItems = [
    { label: "Problem", path: "/problem-statement" },
    { label: "Solution", path: "/solution" },
    { label: "Features", path: "/features" },
    { label: "Benefits", path: "/benefits" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-2xl font-extrabold text-slate-100 transition-colors">
              त्रिवेणी<span className="text-indigo-400">Path</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 border border-transparent ${
                  currentPage === item.path
                    ? "text-indigo-300 bg-indigo-500/10 border-indigo-500/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/demo")}
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-slate-100 hover:border-slate-500 transition-all duration-200"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="sm"
                onClick={() => navigate("/signup")}
                className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Get Started
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-all duration-200"
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-700/50 py-4 bg-slate-800/50 rounded-b-lg"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    currentPage === item.path
                      ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-700"
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