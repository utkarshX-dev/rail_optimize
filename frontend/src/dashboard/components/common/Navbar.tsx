import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Languages, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.tsx";
import { useState, useContext } from "react";
import UserContext from "../../../context/userContext";

function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { setToken, setUser, user } = useContext(UserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setShowLogoutModal(false);
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Fixed Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-white tracking-tight select-none">त्रिवेणी</span>
              <span className="text-2xl font-extrabold text-indigo-400 tracking-tight select-none">Path</span>
            </div>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="text-base font-semibold text-white hover:bg-slate-800 hover:text-indigo-300 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-600"
              >
                {t('home')}
              </Link>
              <Link
                to="/dashboard/stats"
                className="text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-300 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-600"
              >
                {t('analytics')}
              </Link>
              <Link
                to="/dashboard/add-train"
                className="text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-300 px-4 py-2 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-600"
              >
                {t('addTrain')}
              </Link>
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            {user && (
              <div className="text-sm text-slate-300 hidden md:block">
                {language === 'HI' ? 'नमस्ते' : 'Welcome'}, {user.name}
              </div>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-indigo-300 px-3 py-2 rounded-xl transition-all duration-200 font-medium border border-slate-700 hover:border-slate-600"
              aria-label="Toggle Language"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-semibold">{language}</span>
            </button>
            
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-150"
              aria-label="Profile"
            >
              <Link to="/dashboard/profile">
                <User className="w-6 h-6 text-blue-700" />
              </Link>
            </button>
            
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 px-4 py-2 rounded-xl transition-all duration-200 font-medium border border-slate-700"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
              {t('logout')}
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal with higher z-index */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all duration-200 scale-100 relative z-[10000]">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {language === 'HI' ? 'लॉगआउट की पुष्टि करें' : 'Confirm Logout'}
              </h3>
              <button
                onClick={cancelLogout}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mb-6">
              <p className="text-gray-600 text-center">
                {language === 'HI' 
                  ? 'क्या आप वाकई लॉगआउट करना चाहते हैं? आपको दोबारा लॉगिन करना होगा।'
                  : 'Are you sure you want to logout?'
                }
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
              >
                {language === 'HI' ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {language === 'HI' ? 'लॉगआउट' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;