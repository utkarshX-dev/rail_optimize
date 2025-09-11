import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Profile from "./dashboard/components/user/Profile.jsx";
import DashboardLayout from "./dashboard/Dashboardlayout";
import AddTrain from "./dashboard/components/ticket/AddTrain";
import Stats from "./dashboard/components/Stats/Stats";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import AdminPage from "./dashboard/components/admin/admin.tsx";
import { HeroSection } from "./components/HeroSection";
import NotFound from "./components/NotFound.tsx";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { Footer } from "./components/Footer";
import { UserProvider } from "./context/userContext";
import  LoginPage  from "./components/pages/LoginPage";
import SignupPage  from "./components/pages/SignupPage";
import { DemoPage } from "./components/pages/DemoPage";
import { LearnMorePage } from "./components/pages/LearnMorePage";
import { ProblemStatementPage } from "./components/pages/ProblemStatementPage";
import { PrivacyPolicyPage } from "./components/pages/PrivacyPolicyPage";
import { ContactPage } from "./components/pages/ContactPage";
import { PlaceholderPage } from "./components/pages/PlaceholderPage";
import DashboardApp from "./dashboard/components/Dashboard/DashboardApp.tsx";
import ScrollToTop from "./ScrollToTop.tsx";
import ChatBot from "./dashboard/components/chatbot/ChatBot.tsx";


function Layout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideHeaderFooter && <Header />}
      <div className="flex-1">
        <Outlet />
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <main>
                    <HeroSection />
                    <ProblemSection />
                    <SolutionSection />
                    <FeaturesSection />
                    <BenefitsSection />
                  </main>
                }
              />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/learn-more" element={<LearnMorePage />} />
              <Route
                path="/problem-statement"
                element={<ProblemStatementPage />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/features" element={<FeaturesSection />} />
              <Route path="/solution" element={<SolutionSection />} />
              <Route path="/benefits" element={<BenefitsSection />} />
              <Route
                path="/terms-of-service"
                element={
                  <PlaceholderPage
                    title="Terms of Service"
                    description="Our terms of service outline the conditions for using त्रिवेणीPath services and the rights and responsibilities of all parties."
                    badgeText="Legal Document"
                  />
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <PlaceholderPage
                    title="Cookie Policy"
                    description="Learn about how we use cookies and similar technologies to improve your experience on our platform."
                    badgeText="Privacy Information"
                  />
                }
              />
              <Route
                path="/operations-research"
                element={
                  <PlaceholderPage
                    title="Operations Research"
                    description="Dive deep into the mathematical optimization techniques and operations research methodologies that power our system."
                    badgeText="Technology Deep Dive"
                  />
                }
              />
              <Route
                path="/artificial-intelligence"
                element={
                  <PlaceholderPage
                    title="Artificial Intelligence"
                    description="Explore how machine learning and AI technologies enable intelligent decision-making in railway traffic management."
                    badgeText="AI Technology"
                  />
                }
              />
              <Route
                path="/real-time-analytics"
                element={
                  <PlaceholderPage
                    title="Real-time Analytics"
                    description="Understand how our real-time analytics platform provides instant insights and recommendations for railway operations."
                    badgeText="Analytics Platform"
                  />
                }
              />
              <Route
                path="/system-integration"
                element={
                  <PlaceholderPage
                    title="System Integration"
                    description="Learn how our solution seamlessly integrates with existing railway infrastructure and management systems."
                    badgeText="Integration Guide"
                  />
                }
              />
              <Route
                path="/about-us"
                element={
                  <PlaceholderPage
                    title="About त्रिवेणीPath"
                    description="Learn about our mission to transform railway operations through innovative AI and operations research solutions."
                    badgeText="Company Information"
                  />
                }
              />
              <Route
                path="/case-studies"
                element={
                  <PlaceholderPage
                    title="Case Studies"
                    description="Explore real-world implementations and success stories from railway organizations using our optimization platform."
                    badgeText="Success Stories"
                  />
                }
              />
              <Route
                path="/support"
                element={
                  <PlaceholderPage
                    title="Support Center"
                    description="Get help with our platform, access documentation, and find answers to frequently asked questions."
                    badgeText="Help & Support"
                  />
                }
              />
            </Route>

            {/* Dashboard without Layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardApp />} />
              <Route path="stats" element={<Stats />} />
              <Route path="add-train" element={<AddTrain />} />
              <Route path="profile" element={<Profile />} />
              <Route path="chatbot" element={<ChatBot/>}></Route>
              <Route path="admin" element={<AdminPage/>}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}
