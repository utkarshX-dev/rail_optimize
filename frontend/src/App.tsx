import { ThemeProvider } from "./components/ThemeProvider";
import { Router, useRouter } from "./components/Router";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { SolutionSection } from "./components/SolutionSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { Footer } from "./components/Footer";

import { UserProvider } from "./context/userContext";
import { LoginPage } from "./components/pages/LoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import { DemoPage } from "./components/pages/DemoPage";
import { LearnMorePage } from "./components/pages/LearnMorePage";
import { ProblemStatementPage } from "./components/pages/ProblemStatementPage";

import { PrivacyPolicyPage } from "./components/pages/PrivacyPolicyPage";
import { ContactPage } from "./components/pages/ContactPage";
import { PlaceholderPage } from "./components/pages/PlaceholderPage";

function AppContent() {
  const { currentPage } = useRouter();

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'demo':
        return <DemoPage />;
      case 'learn-more':
        return <LearnMorePage />;
      case 'problem-statement':
        return <ProblemStatementPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'contact':
        return <ContactPage />;
      case 'ai-optimization':
        return <SolutionSection />;
      case 'system-features':
        return <FeaturesSection />;
      case 'benefits':
        return <BenefitsSection />;
      case 'terms-of-service':
        return (
          <PlaceholderPage
            title="Terms of Service"
            description="Our terms of service outline the conditions for using RailOptimize services and the rights and responsibilities of all parties."
            badgeText="Legal Document"
          />
        );
      case 'cookie-policy':
        return (
          <PlaceholderPage
            title="Cookie Policy"
            description="Learn about how we use cookies and similar technologies to improve your experience on our platform."
            badgeText="Privacy Information"
          />
        );
      case 'operations-research':
        return (
          <PlaceholderPage
            title="Operations Research"
            description="Dive deep into the mathematical optimization techniques and operations research methodologies that power our system."
            badgeText="Technology Deep Dive"
          />
        );
      case 'artificial-intelligence':
        return (
          <PlaceholderPage
            title="Artificial Intelligence"
            description="Explore how machine learning and AI technologies enable intelligent decision-making in railway traffic management."
            badgeText="AI Technology"
          />
        );
      case 'real-time-analytics':
        return (
          <PlaceholderPage
            title="Real-time Analytics"
            description="Understand how our real-time analytics platform provides instant insights and recommendations for railway operations."
            badgeText="Analytics Platform"
          />
        );
      case 'system-integration':
        return (
          <PlaceholderPage
            title="System Integration"
            description="Learn how our solution seamlessly integrates with existing railway infrastructure and management systems."
            badgeText="Integration Guide"
          />
        );
      case 'about-us':
        return (
          <PlaceholderPage
            title="About RailOptimize"
            description="Learn about our mission to transform railway operations through innovative AI and operations research solutions."
            badgeText="Company Information"
          />
        );
      case 'case-studies':
        return (
          <PlaceholderPage
            title="Case Studies"
            description="Explore real-world implementations and success stories from railway organizations using our optimization platform."
            badgeText="Success Stories"
          />
        );
      case 'support':
        return (
          <PlaceholderPage
            title="Support Center"
            description="Get help with our platform, access documentation, and find answers to frequently asked questions."
            badgeText="Help & Support"
          />
        );
      default:
        return (
          <div className="min-h-screen bg-background">
            <main>
              <HeroSection />
              <ProblemSection />
              <SolutionSection />
              <FeaturesSection />
              <BenefitsSection />
            </main>
          </div>
        );
    }
  };

  const showHeaderFooter = currentPage !== 'login' && currentPage !== 'signup';

  return (
    <div className="min-h-screen bg-background">
      {showHeaderFooter && <Header />}
      {renderPage()}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}