import React from 'react';
function Foooter() {
  return (
    <footer className="bg-white border-t shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-blue-700">RailOptimize</span>
          <span className="text-gray-400 text-xs ml-2">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex space-x-4 text-xs text-gray-400">
          <a href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-blue-600">Terms</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Foooter;
