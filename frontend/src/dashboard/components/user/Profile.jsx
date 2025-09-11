import { useRef, useEffect } from "react";
import { Train, Clock, Leaf, Map, User, Mail, Shield, Edit } from "lucide-react";
import Chart from "chart.js/auto";
import { useContext } from "react";
import UserContext from "../../../context/userContext";
import { useLanguage } from "../../context/LanguageContext";

const mockUser = {
  name: "Amit Sharma",
  email: "amit.sharma@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "Network Admin",
  phone: "+91 98765 43210",
  memberSince: "2022-01-15",
  lastLogin: "2025-09-07 09:32",
  trains: 7,
  hoursSaved: 18,
  carbonSaved: 12.5,
  journeys: 24,
  journeysOverTime: [3, 4, 2, 5, 6, 4, 7],
  journeyLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  hoursSavedOverTime: [2, 3, 1, 4, 2, 3, 3],
  carbonSavedOverTime: [1.2, 1.5, 1.1, 2.0, 1.8, 2.3, 2.6],
  trainsOverTime: [1, 2, 2, 3, 4, 5, 7],
};

function Profile() {
  const journeysChartRef = useRef(null);
  const hoursChartRef = useRef(null);
  const carbonChartRef = useRef(null);
  const trainsChartRef = useRef(null);
  const { user } = useContext(UserContext);
  const { t, language } = useLanguage();

  console.log("User from context:", user);

  useEffect(() => {
    const charts = [];
    const config = (type, data, color, bg) => ({
      type,
      data,
      options: {
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#475569',
            borderWidth: 1,
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: "rgba(148, 163, 184, 0.3)" },
            ticks: { color: '#64748b' }
          },
          x: { 
            grid: { display: false },
            ticks: { color: '#64748b' }
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    if (journeysChartRef.current) {
      charts.push(
        new Chart(
          journeysChartRef.current.getContext("2d"),
          config("line", {
            labels: mockUser.journeyLabels,
            datasets: [
              {
                label: t('journeys'),
                data: mockUser.journeysOverTime,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.1)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "#3b82f6",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
              },
            ],
          })
        )
      );
    }
    if (hoursChartRef.current) {
      charts.push(
        new Chart(
          hoursChartRef.current.getContext("2d"),
          config("bar", {
            labels: mockUser.journeyLabels,
            datasets: [
              {
                label: t('hoursSaved'),
                data: mockUser.hoursSavedOverTime,
                backgroundColor: "rgba(16,185,129,0.7)",
                borderColor: "#10b981",
                borderWidth: 2,
                borderRadius: 6,
              },
            ],
          })
        )
      );
    }
    if (carbonChartRef.current) {
      charts.push(
        new Chart(
          carbonChartRef.current.getContext("2d"),
          config("bar", {
            labels: mockUser.journeyLabels,
            datasets: [
              {
                label: t('carbonSaved'),
                data: mockUser.carbonSavedOverTime,
                backgroundColor: "rgba(99,102,241,0.7)",
                borderColor: "#6366f1",
                borderWidth: 2,
                borderRadius: 6,
              },
            ],
          })
        )
      );
    }
    if (trainsChartRef.current) {
      charts.push(
        new Chart(
          trainsChartRef.current.getContext("2d"),
          config("line", {
            labels: mockUser.journeyLabels,
            datasets: [
              {
                label: t('trains'),
                data: mockUser.trainsOverTime,
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245,158,11,0.1)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointBackgroundColor: "#f59e0b",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
              },
            ],
          })
        )
      );
    }
    return () => charts.forEach((chart) => chart.destroy());
  }, [t]);

  const displayUser = user || mockUser;

  // Generate avatar based on user name
  const getAvatarUrl = (name) => {
    if (!name) return "https://randomuser.me/api/portraits/men/32.jpg";
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=6366f1&textColor=ffffff`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* User Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative">
                <img
                  src={getAvatarUrl(displayUser.name)}
                  alt={displayUser.name}
                  className="w-24 h-24 rounded-full border-4 border-indigo-400 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white">{displayUser.name}</h1>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{displayUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm capitalize">
                      {displayUser.role === 'user' 
                        ? (language === 'HI' ? 'उपयोगकर्ता' : 'Railway Operator')
                        : (language === 'HI' ? 'व्यवस्थापक' : 'Administrator')
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-4 h-4" />
                    <span className="text-xs text-slate-400">ID: {displayUser.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 lg:mt-0">
              <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Edit className="w-4 h-4" />
                {t('editProfile')}
              </button>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Train className="w-6 h-6 text-white" />}
            label={t('trains')}
            value={mockUser.trains}
            bgColor="from-blue-600 to-blue-700"
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-white" />}
            label={t('hoursSaved')}
            value={mockUser.hoursSaved}
            bgColor="from-green-600 to-emerald-600"
          />
          <StatCard
            icon={<Leaf className="w-6 h-6 text-white" />}
            label={t('carbonSaved')}
            value={`${mockUser.carbonSaved} kg`}
            bgColor="from-emerald-600 to-teal-600"
          />
          <StatCard
            icon={<Map className="w-6 h-6 text-white" />}
            label={t('journeys')}
            value={mockUser.journeys}
            bgColor="from-indigo-600 to-purple-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title={t('journeysOverTime')}>
            <canvas ref={journeysChartRef}></canvas>
          </ChartCard>
          <ChartCard title={t('hoursSavedOverTime')}>
            <canvas ref={hoursChartRef}></canvas>
          </ChartCard>
          <ChartCard title={t('carbonSavedOverTime')}>
            <canvas ref={carbonChartRef}></canvas>
          </ChartCard>
          <ChartCard title={t('trainsOverTime')}>
            <canvas ref={trainsChartRef}></canvas>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bgColor }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${bgColor} rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-200`}>
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            {icon}
          </div>
        </div>
        <p className="text-white/80 text-sm mb-2">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        {title}
      </h2>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}

export default Profile;