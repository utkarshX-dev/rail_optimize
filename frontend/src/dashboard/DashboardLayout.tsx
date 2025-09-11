import Footer from "./components/common/Footer.tsx";
import Navbar from "./components/common/Navbar.tsx";
import ChatBot from "./components/chatbot/ChatBot.tsx";

import { Outlet } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.tsx";
export default function DashboardLayout() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
    </LanguageProvider>
  );
}
