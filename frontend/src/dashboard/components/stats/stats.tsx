import React from "react";
import { motion } from "framer-motion";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Train,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition"
  >
    <div className="mb-2">{icon}</div>
    <p className="text-xs text-gray-600">{label}</p>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </motion.div>
);

// Mock data for now, can be passed in via props later
const mockStats = {
  activeTrains: 5,
  delayedTrains: 2,
  completedJourneys: 12,
  averageDelay: 3,
  networkEfficiency: 95,
};

const completedJourneys = [
  { id: "J001", train: "Express 1", from: "DEL", to: "AGR", timeSaved: 8 },
  { id: "J002", train: "Local 2", from: "BPL", to: "JHS", timeSaved: 5 },
  { id: "J003", train: "Freight 3", from: "NGP", to: "BPL", timeSaved: 12 },
];

const currentJourneys = [
  { id: "C001", train: "Express 5", from: "DEL", to: "BPL", status: "Active" },
  { id: "C002", train: "Local 3", from: "JHS", to: "AGR", status: "Delayed" },
  { id: "C003", train: "Freight 4", from: "NGP", to: "DEL", status: "Stopped" },
];

const barData = {
  labels: ["Active", "Delayed", "Completed"],
  datasets: [
    {
      label: "Trains",
      data: [
        mockStats.activeTrains,
        mockStats.delayedTrains,
        mockStats.completedJourneys,
      ],
      backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
    },
  ],
};

const pieData = {
  labels: ["Active", "Delayed", "Completed"],
  datasets: [
    {
      data: [
        mockStats.activeTrains,
        mockStats.delayedTrains,
        mockStats.completedJourneys,
      ],
      backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
      borderWidth: 1,
    },
  ],
};

const Stats: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 rounded-2xl shadow p-8 border"
    >
      <h2 className="text-2xl text-center font-bold mb-10 text-gray-800">
        🚆 Rail Network Dashboard
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<Train className="w-6 h-6 text-blue-600" />}
          label="Active Trains"
          value={mockStats.activeTrains}
          color="text-blue-600"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          label="Delayed"
          value={mockStats.delayedTrains}
          color="text-orange-600"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Completed"
          value={mockStats.completedJourneys}
          color="text-green-600"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
          label="Efficiency"
          value={`${mockStats.networkEfficiency}%`}
          color="text-purple-600"
        />
      </div>

      {/* Charts */}
      <h3 className="text-lg font-semibold mb-6 text-gray-700">
        📊 Performance Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-4 shadow-sm border"
        >
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl p-4 shadow-sm border"
        >
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </motion.div>
      </div>

      {/* Journeys */}
      <h3 className="text-lg font-semibold mb-6 text-gray-700">🚉 Journeys</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Journeys */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-lg shadow-sm border p-4"
        >
          <h4 className="font-semibold mb-3">Current</h4>
          <div className="overflow-y-auto max-h-64">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 font-medium sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">Train</th>
                  <th className="px-3 py-2 text-left">From</th>
                  <th className="px-3 py-2 text-left">To</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentJourneys.map((j) => (
                  <tr key={j.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{j.train}</td>
                    <td className="px-3 py-2">{j.from}</td>
                    <td className="px-3 py-2">{j.to}</td>
                    <td
                      className={`px-3 py-2 font-semibold ${
                        j.status === "Active"
                          ? "text-blue-600"
                          : j.status === "Delayed"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {j.status}
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
          className="bg-white rounded-lg shadow-sm border p-4"
        >
          <h4 className="font-semibold mb-3">Completed</h4>
          <div className="overflow-y-auto max-h-64">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 font-medium sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">Train</th>
                  <th className="px-3 py-2 text-left">From</th>
                  <th className="px-3 py-2 text-left">To</th>
                  <th className="px-3 py-2 text-left">Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {completedJourneys.map((j) => (
                  <tr key={j.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{j.train}</td>
                    <td className="px-3 py-2">{j.from}</td>
                    <td className="px-3 py-2">{j.to}</td>
                    <td className="px-3 py-2 font-semibold text-indigo-700">
                      {j.timeSaved}m
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Stats;
