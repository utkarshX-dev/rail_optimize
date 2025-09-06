import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center justify-between gap-8">
          <span className="text-2xl font-extrabold text-blue-800 tracking-tight select-none">RailOptimize</span>
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-lg font-semibold text-blue-700 hover:bg-blue-50 hover:text-blue-900 px-3 py-1 rounded transition-colors duration-150"
            >
              Home
            </Link>
            <Link
              to="/dashboard/stats"
              className="text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-900 px-3 py-1 rounded transition-colors duration-150"
            >
              Analytics
            </Link>
            <Link
              to="/dashboard/add-train"
              className="text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-900 px-3 py-1 rounded transition-colors duration-150"
            >
              Add Train
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-150"
            aria-label="Profile"
          >
            <Link to="/dashboard/profile">
              <User className="w-6 h-6 text-blue-700" />
            </Link>
          </button>
          <button
            className="flex items-center gap-2 text-red-600 hover:bg-blue-50 hover:text-blue-900 px-3 py-2 rounded transition-colors duration-150 font-medium"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
