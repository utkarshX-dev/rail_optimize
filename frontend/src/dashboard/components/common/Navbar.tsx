// import { Link } from "react-router-dom";
// import { User, LogOut } from "lucide-react";

// function Navbar() {
//   return (
//     <nav className="bg-white border-b sticky top-0 z-20 shadow-sm">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
//         <div className="flex items-center justify-between gap-8">
//           <span className="text-2xl font-extrabold text-blue-800 tracking-tight select-none">RailOptimize</span>
//           <div className="flex items-center gap-6">
//             <Link
//               to="/dashboard"
//               className="text-lg font-semibold text-blue-700 hover:bg-blue-50 hover:text-blue-900 px-3 py-1 rounded transition-colors duration-150"
//             >
//               Home
//             </Link>
//             <Link
//               to="/dashboard/stats"
//               className="text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-900 px-3 py-1 rounded transition-colors duration-150"
//             >
//               Analytics
//             </Link>
//             <Link
//               to="/dashboard/add-train"
//               className="text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-900 px-3 py-1 rounded transition-colors duration-150"
//             >
//               Add Train
//             </Link>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-150"
//             aria-label="Profile"
//           >
//             <Link to="/dashboard/profile">
//               <User className="w-6 h-6 text-blue-700" />
//             </Link>
//           </button>
//           <button
//             className="flex items-center gap-2 text-red-600 hover:bg-blue-50 hover:text-blue-900 px-3 py-2 rounded transition-colors duration-150 font-medium"
//             aria-label="Logout"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center justify-between gap-8">
          <span className="text-2xl font-extrabold text-white tracking-tight select-none">
            Rail<span className="text-indigo-400">Optimize</span>
          </span>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="text-base font-semibold text-white hover:bg-slate-800 hover:text-indigo-300 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-600"
            >
              Home
            </Link>
            <Link
              to="/dashboard/stats"
              className="text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-300 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-600"
            >
              Analytics
            </Link>
            <Link
              to="/dashboard/add-train"
              className="text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-300 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-600"
            >
              Add Train
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/dashboard/profile">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-400 text-slate-400 transition-all duration-200"
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </Link>
          
          <button
            className="flex items-center gap-2 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-200 font-medium border border-slate-700"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
