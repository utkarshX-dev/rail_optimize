import { useRef, useEffect } from "react";
import { Train, Clock, Leaf, Map } from "lucide-react";
import Chart from "chart.js/auto";

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

  useEffect(() => {
    const charts = [];
    const config = (type, data, color, bg) => ({
      type,
      data,
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "#e5e7eb" } },
          x: { grid: { display: false } },
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
                label: "Journeys",
                data: mockUser.journeysOverTime,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.1)",
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#2563eb",
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
                label: "Hours Saved",
                data: mockUser.hoursSavedOverTime,
                backgroundColor: "rgba(16,185,129,0.3)",
                borderColor: "#10b981",
                borderWidth: 2,
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
                label: "CO₂ Saved (kg)",
                data: mockUser.carbonSavedOverTime,
                backgroundColor: "rgba(99,102,241,0.2)",
                borderColor: "#6366f1",
                borderWidth: 2,
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
                label: "Trains",
                data: mockUser.trainsOverTime,
                borderColor: "#f59e42",
                backgroundColor: "rgba(245,158,66,0.1)",
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#f59e42",
              },
            ],
          })
        )
      );
    }
    return () => charts.forEach((chart) => chart.destroy());
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-12 bg-white rounded-2xl shadow-lg p-8 border">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div className="flex items-center gap-4">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="w-20 h-20 rounded-full border-4 border-blue-200 shadow"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-800">{mockUser.name}</h1>
            <p className="text-sm text-gray-500">{mockUser.email}</p>
            <p className="text-xs text-gray-400">{mockUser.role}</p>
            <p className="text-xs text-gray-400">{mockUser.phone}</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 text-sm text-gray-500">
          <p>Joined since: {mockUser.memberSince}</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<Train className="w-6 h-6 text-blue-600" />}
          label="Trains"
          value={mockUser.trains}
          color="text-blue-600"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-green-600" />}
          label="Hours Saved"
          value={mockUser.hoursSaved}
          color="text-green-600"
        />
        <StatCard
          icon={<Leaf className="w-6 h-6 text-emerald-600" />}
          label="CO₂ Saved"
          value={`${mockUser.carbonSaved} kg`}
          color="text-emerald-600"
        />
        <StatCard
          icon={<Map className="w-6 h-6 text-indigo-600" />}
          label="Journeys"
          value={mockUser.journeys}
          color="text-indigo-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="Journeys Over Time" color="text-blue-800">
          <canvas ref={journeysChartRef}></canvas>
        </ChartCard>
        <ChartCard title="Hours Saved Over Time" color="text-green-800">
          <canvas ref={hoursChartRef}></canvas>
        </ChartCard>
        <ChartCard title="CO₂ Saved Over Time" color="text-emerald-800">
          <canvas ref={carbonChartRef}></canvas>
        </ChartCard>
        <ChartCard title="Trains Over Time" color="text-orange-800">
          <canvas ref={trainsChartRef}></canvas>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="mb-2">{icon}</div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children, color }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h2 className={`text-base font-semibold mb-3 ${color}`}>{title}</h2>
      <div className="h-52 w-full">{children}</div>
    </div>
  );
}

export default Profile;
