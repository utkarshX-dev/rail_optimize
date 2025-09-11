import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { UserProvider } from "./context/userContext";
import UserContext from "./context/userContext";
import ScrollToTop from "./ScrollToTop.tsx";

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-slate-600">Loading...</p>
    </div>
  </div>
);

const DashboardLoading = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-white">Loading Dashboard...</p>
    </div>
  </div>
);

const PageLoading = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-sm text-slate-500">Loading page...</p>
    </div>
  </div>
);

const AuthLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"></div>
      <p className="text-sm text-white">Checking authentication...</p>
    </div>
  </div>
);

// Lazy imported components - Frontend
const HeroSection = lazy(() => import("./components/HeroSection").then(module => ({ default: module.HeroSection })));
const ProblemSection = lazy(() => import("./components/ProblemSection").then(module => ({ default: module.ProblemSection })));
const SolutionSection = lazy(() => import("./components/SolutionSection").then(module => ({ default: module.SolutionSection })));
const FeaturesSection = lazy(() => import("./components/FeaturesSection").then(module => ({ default: module.FeaturesSection })));
const BenefitsSection = lazy(() => import("./components/BenefitsSection").then(module => ({ default: module.BenefitsSection })));
const NotFound = lazy(() => import("./components/NotFound"));
const LoginPage = lazy(() => import("./components/pages/LoginPage"));
const SignupPage = lazy(() => import("./components/pages/SignupPage"));
const AdminLoginPage = lazy(() => import("./components/pages/AdminLoginPage"));
const DemoPage = lazy(() => import("./components/pages/DemoPage").then(module => ({ default: module.DemoPage })));
const LearnMorePage = lazy(() => import("./components/pages/LearnMorePage").then(module => ({ default: module.LearnMorePage })));
const ProblemStatementPage = lazy(() => import("./components/pages/ProblemStatementPage").then(module => ({ default: module.ProblemStatementPage })));
const PrivacyPolicyPage = lazy(() => import("./components/pages/PrivacyPolicyPage").then(module => ({ default: module.PrivacyPolicyPage })));
const ContactPage = lazy(() => import("./components/pages/ContactPage").then(module => ({ default: module.ContactPage })));
const PlaceholderPage = lazy(() => import("./components/pages/PlaceholderPage").then(module => ({ default: module.PlaceholderPage })));

// Lazy imported components - Dashboard
const DashboardLayout = lazy(() => import("./dashboard/Dashboardlayout"));
const DashboardApp = lazy(() => import("./dashboard/components/Dashboard/DashboardApp"));
const Profile = lazy(() => import("./dashboard/components/user/Profile"));
const AddTrain = lazy(() => import("./dashboard/components/ticket/AddTrain"));
const Stats = lazy(() => import("./dashboard/components/Stats/Stats"));
const AdminPage = lazy(() => import("./dashboard/components/admin/admin"));

// Protected Route Component
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: "admin" | "user" }) {
  const { token, user } = useContext(UserContext);
  const location = useLocation();

  // Check if user is authenticated
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h2>
          <p className="text-slate-300 mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Auth Guard for Login/Signup pages (redirect if already logged in)
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useContext(UserContext);

  // If user is already logged in, redirect to dashboard
  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Admin Auth Guard (separate for admin login - redirects admin to admin dashboard)
function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { token, user } = useContext(UserContext);

  // If admin is already logged in, redirect to admin dashboard
  if (token && user && user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // If regular user is logged in, redirect to regular dashboard
  if (token && user && user.role === 'user') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function Layout() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname === "/admin/login";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideHeaderFooter && <Header />}
      <div className="flex-1">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
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
            {/* Auth routes with auth guard */}
            <Route 
              path="/login" 
              element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <LoginPage />
                  </Suspense>
                </AuthGuard>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <AuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <SignupPage />
                  </Suspense>
                </AuthGuard>
              } 
            />
            
            {/* Admin Login Route */}
            <Route 
              path="/admin/login" 
              element={
                <AdminAuthGuard>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AdminLoginPage />
                  </Suspense>
                </AdminAuthGuard>
              } 
            />

            {/* Frontend routes with Layout */}
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <main>
                    <Suspense fallback={<PageLoading />}>
                      <HeroSection />
                    </Suspense>
                    <Suspense fallback={<PageLoading />}>
                      <ProblemSection />
                    </Suspense>
                    <Suspense fallback={<PageLoading />}>
                      <SolutionSection />
                    </Suspense>
                    <Suspense fallback={<PageLoading />}>
                      <FeaturesSection />
                    </Suspense>
                    <Suspense fallback={<PageLoading />}>
                      <BenefitsSection />
                    </Suspense>
                  </main>
                }
              />
              <Route 
                path="/demo" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <DemoPage />
                  </Suspense>
                } 
              />
              <Route 
                path="/learn-more" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <LearnMorePage />
                  </Suspense>
                } 
              />
              <Route
                path="/problem-statement"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <ProblemStatementPage />
                  </Suspense>
                }
              />
              <Route 
                path="/privacy-policy" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PrivacyPolicyPage />
                  </Suspense>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <ContactPage />
                  </Suspense>
                } 
              />
              <Route 
                path="/features" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <FeaturesSection />
                  </Suspense>
                } 
              />
              <Route 
                path="/solution" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <SolutionSection />
                  </Suspense>
                } 
              />
              <Route 
                path="/benefits" 
                element={
                  <Suspense fallback={<PageLoading />}>
                    <BenefitsSection />
                  </Suspense>
                } 
              />
              <Route
                path="/terms-of-service"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Terms of Service"
                      description="Our terms of service outline the conditions for using RailOptimize services and the rights and responsibilities of all parties."
                      badgeText="Legal Document"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Cookie Policy"
                      description="Learn about how we use cookies and similar technologies to improve your experience on our platform."
                      badgeText="Privacy Information"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/operations-research"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Operations Research"
                      description="Dive deep into the mathematical optimization techniques and operations research methodologies that power our system."
                      badgeText="Technology Deep Dive"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/artificial-intelligence"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Artificial Intelligence"
                      description="Explore how machine learning and AI technologies enable intelligent decision-making in railway traffic management."
                      badgeText="AI Technology"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/real-time-analytics"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Real-time Analytics"
                      description="Understand how our real-time analytics platform provides instant insights and recommendations for railway operations."
                      badgeText="Analytics Platform"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/system-integration"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="System Integration"
                      description="Learn how our solution seamlessly integrates with existing railway infrastructure and management systems."
                      badgeText="Integration Guide"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/about-us"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="About RailOptimize"
                      description="Learn about our mission to transform railway operations through innovative AI and operations research solutions."
                      badgeText="Company Information"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/case-studies"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Case Studies"
                      description="Explore real-world implementations and success stories from railway organizations using our optimization platform."
                      badgeText="Success Stories"
                    />
                  </Suspense>
                }
              />
              <Route
                path="/support"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <PlaceholderPage
                      title="Support Center"
                      description="Get help with our platform, access documentation, and find answers to frequently asked questions."
                      badgeText="Help & Support"
                    />
                  </Suspense>
                }
              />
            </Route>

            {/* Protected Dashboard routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<DashboardLoading />}>
                    <DashboardLayout />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route 
                index 
                element={
                  <Suspense fallback={<DashboardLoading />}>
                    <DashboardApp />
                  </Suspense>
                } 
              />
              <Route 
                path="stats" 
                element={
                  <Suspense fallback={<DashboardLoading />}>
                    <Stats />
                  </Suspense>
                } 
              />
              <Route 
                path="add-train" 
                element={
                  <Suspense fallback={<DashboardLoading />}>
                    <AddTrain />
                  </Suspense>
                } 
              />
              <Route 
                path="profile" 
                element={
                  <Suspense fallback={<DashboardLoading />}>
                    <Profile />
                  </Suspense>
                } 
              />
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Suspense fallback={<DashboardLoading />}>
                      <AdminPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 404 route */}
            <Route 
              path="*" 
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <NotFound />
                </Suspense>
              } 
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}