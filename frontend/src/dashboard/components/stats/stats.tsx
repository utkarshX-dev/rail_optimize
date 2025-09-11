import React from "react";
import { motion } from "framer-motion";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Train,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  MapPin,
  Gauge,
  AlertTriangle,
  Activity,
  Target,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  bgColor: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, bgColor, trend }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden bg-gradient-to-br ${bgColor} rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur-sm`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend > 0 ? 'text-green-100' : 'text-red-100'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-white/80 text-sm mb-2">{label}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const Stats: React.FC = () => {
  const { t } = useLanguage();

  // Railway-specific mock data
  const mockStats = {
    activeTrains: 127,
    delayedTrains: 8,
    completedJourneys: 342,
    onTimePerformance: 94.2,
    totalPassengers: 15420,
    averageSpeed: 68,
    networkEfficiency: 96.5,
    fuelSavings: 12.8,
  };

  const completedJourneys = [
    { id: "12001", train: "Shatabdi Express", from: "NDLS", to: "AGC", timeSaved: 12, passengers: 420 },
    { id: "12002", train: "Rajdhani Express", from: "NDLS", to: "BPL", timeSaved: 8, passengers: 850 },
    { id: "12003", train: "Duronto Express", from: "CSMT", to: "PUNE", timeSaved: 15, passengers: 650 },
    { id: "12004", train: "Garib Rath", from: "HWH", to: "NDLS", timeSaved: 6, passengers: 780 },
  ];

  const currentJourneys = [
    { id: "22001", train: "Vande Bharat", from: "NDLS", to: "BRC", status: "On Time", progress: 75 },
    { id: "22002", train: "Tejas Express", from: "CSMT", to: "GOA", status: "Delayed", progress: 45 },
    { id: "22003", train: "Double Decker", from: "BRC", to: "ADI", status: "On Time", progress: 90 },
    { id: "22004", train: "Jan Shatabdi", from: "AGC", to: "JHS", status: "Stopped", progress: 60 },
  ];

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: t('onTimePerformance'),
        data: [91.2, 93.5, 94.8, 92.1, 95.2, 94.2],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
      },
    ],
  };

  const routeDistribution = {
    labels: [t('express'), t('passenger'), t('freight'), t('suburban')],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          "#6366f1", // Express - Indigo
          "#10b981", // Passenger - Emerald  
          "#f59e0b", // Freight - Amber
          "#ec4899", // Suburban - Pink
        ],
        borderWidth: 3,
        borderColor: "#ffffff",
      },
    ],
  };

  const efficiencyTrend = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: t('efficiency'),
        data: [94.5, 95.2, 96.1, 96.5],
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderColor: "rgb(16, 185, 129)",
        tension: 0.4,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            🚆 {t('railwayAnalytics')}
          </motion.h1>
          <p className="text-slate-300 text-lg">{t('realTimeInsights')}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Train className="w-6 h-6 text-white" />}
            label={t('activeTrains')}
            value={mockStats.activeTrains}
            color="text-white"
            bgColor="from-blue-600 to-blue-700"
            trend={5.2}
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-white" />}
            label={t('delayedTrains')}
            value={mockStats.delayedTrains}
            color="text-white"
            bgColor="from-orange-500 to-red-500"
            trend={-12.1}
          />
          <StatCard
            icon={<CheckCircle className="w-6 h-6 text-white" />}
            label={t('onTimePerformance')}
            value={`${mockStats.onTimePerformance}%`}
            color="text-white"
            bgColor="from-green-500 to-emerald-600"
            trend={2.8}
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-white" />}
            label={t('totalPassengers')}
            value={`${(mockStats.totalPassengers / 1000).toFixed(1)}K`}
            color="text-white"
            bgColor="from-purple-600 to-indigo-600"
            trend={8.4}
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Gauge className="w-6 h-6 text-white" />}
            label={t('averageSpeed')}
            value={`${mockStats.averageSpeed} km/h`}
            color="text-white"
            bgColor="from-cyan-500 to-blue-500"
            trend={3.1}
          />
          <StatCard
            icon={<Activity className="w-6 h-6 text-white" />}
            label={t('networkEfficiency')}
            value={`${mockStats.networkEfficiency}%`}
            color="text-white"
            bgColor="from-teal-500 to-green-500"
            trend={1.9}
          />
          <StatCard
            icon={<Target className="w-6 h-6 text-white" />}
            label={t('completedJourneys')}
            value={mockStats.completedJourneys}
            color="text-white"
            bgColor="from-indigo-500 to-purple-500"
            trend={7.3}
          />
          <StatCard
            icon={<MapPin className="w-6 h-6 text-white" />}
            label={t('fuelSavings')}
            value={`${mockStats.fuelSavings}%`}
            color="text-white"
            bgColor="from-emerald-500 to-teal-500"
            trend={4.6}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Performance Trend */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              {t('performanceTrend')}
            </h3>
            <Bar
              data={performanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: { 
                    display: false 
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                  }
                },
                scales: {
                  y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#cbd5e1' }
                  },
                  x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#cbd5e1' }
                  }
                }
              }}
            />
          </motion.div>

          {/* Route Distribution */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Train className="w-5 h-5 mr-2" />
              {t('routeDistribution')}
            </h3>
            <Pie
              data={routeDistribution}
              options={{
                responsive: true,
                plugins: {
                  legend: { 
                    position: "bottom",
                    labels: { color: '#cbd5e1' }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                  }
                },
              }}
            />
          </motion.div>
        </div>

        {/* Efficiency Chart */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-12"
        >
          <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            {t('efficiencyTrend')}
          </h3>
          <Line
            data={efficiencyTrend}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                }
              },
              scales: {
                y: {
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  ticks: { color: '#cbd5e1' }
                },
                x: {
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  ticks: { color: '#cbd5e1' }
                }
              }
            }}
          />
        </motion.div>

        {/* Journey Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Journeys */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h4 className="text-xl font-semibold mb-4 text-white flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              {t('currentJourneys')}
            </h4>
            <div className="overflow-y-auto max-h-80">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 text-slate-300 font-medium sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left">{t('train')}</th>
                    <th className="px-3 py-3 text-left">{t('route')}</th>
                    <th className="px-3 py-3 text-left">{t('status')}</th>
                    <th className="px-3 py-3 text-left">{t('progress')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentJourneys.map((j) => (
                    <tr key={j.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 py-3 text-white font-medium">{j.train}</td>
                      <td className="px-3 py-3 text-slate-300">{j.from} → {j.to}</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          j.status === "On Time"
                            ? "bg-green-500/20 text-green-300"
                            : j.status === "Delayed"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-red-500/20 text-red-300"
                        }`}>
                          {j.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${j.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-400 mt-1">{j.progress}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Completed Journeys */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h4 className="text-xl font-semibold mb-4 text-white flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              {t('completedJourneys')}
            </h4>
            <div className="overflow-y-auto max-h-80">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 text-slate-300 font-medium sticky top-0">
                  <tr>
                    <th className="px-3 py-3 text-left">{t('train')}</th>
                    <th className="px-3 py-3 text-left">{t('route')}</th>
                    <th className="px-3 py-3 text-left">{t('passengers')}</th>
                    <th className="px-3 py-3 text-left">{t('timeSaved')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {completedJourneys.map((j) => (
                    <tr key={j.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 py-3 text-white font-medium">{j.train}</td>
                      <td className="px-3 py-3 text-slate-300">{j.from} → {j.to}</td>
                      <td className="px-3 py-3 text-slate-300">{j.passengers}</td>
                      <td className="px-3 py-3">
                        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
                          +{j.timeSaved}m
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;