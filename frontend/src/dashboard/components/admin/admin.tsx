import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Users, Train, Clock, MapPin, Calendar, User, Mail, Shield, AlertCircle, Eye, BarChart3, TrendingUp, Settings } from 'lucide-react';
import axios from 'axios';
import UserContext from '../../../context/userContext';
import ManageRoutes from './ManageRoutes';

interface Journey {
  _id: string;
  trainId: string;
  trainName: string;
  type: string;
  route: string[];
  completedAt: string;
  totalDelay: number;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminStats {
  totalJourneys: number;
  totalUsers: number;
  averageDelay: number;
  activeRoutes: number;
}

function AdminPage() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalJourneys: 0,
    totalUsers: 0,
    averageDelay: 0,
    activeRoutes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'journeys' | 'users' | 'manage'>('overview');
  
  const { user } = useContext(UserContext);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError('');
     
      // Fetch journeys data - using POST with role in body
      const journeysResponse = await axios.get(`${API_URL}/journeys/${user?.id}`);
      // Fetch users data - using POST with role in body
      const usersResponse = await axios.get(`${API_URL}/users/admin/${user?.id}`);

      const journeysData = journeysResponse.data || [];
      const usersData = usersResponse.data || [];

      setJourneys(journeysData);
      setUsers(usersData);

      // Calculate stats
      const totalDelay = journeysData.reduce((acc: number, journey: Journey) => acc + journey.totalDelay, 0);
      const averageDelay = journeysData.length > 0 ? Math.round(totalDelay / journeysData.length * 100) / 100 : 0;

      setStats({
        totalJourneys: journeysData.length,
        totalUsers: usersData.length,
        averageDelay,
        activeRoutes: new Set(journeysData.map((j: Journey) => j.route.join(' - '))).size
      });

    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError(err.response?.data?.message || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDelayColor = (delay: number) => {
    if (delay === 0) return 'text-green-400';
    if (delay <= 10) return 'text-yellow-400';
    if (delay <= 30) return 'text-orange-400';
    return 'text-red-400';
  };

  const getDelayBgColor = (delay: number) => {
    if (delay === 0) return 'bg-green-600/20 text-green-300';
    if (delay <= 10) return 'bg-yellow-600/20 text-yellow-300';
    if (delay <= 30) return 'bg-orange-600/20 text-orange-300';
    return 'bg-red-600/20 text-red-300';
  };

  const StatCard = ({ icon, label, value, bgColor, description, trend }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${bgColor} rounded-2xl p-6 text-white shadow-xl border border-white/10`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl">
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-white/80">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">{trend}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-4xl font-bold mb-2">{value}</p>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </motion.div>
  );

  const TabButton = ({ id, label, icon, isActive, onClick }: any) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-white/10 text-slate-300 hover:bg-white/20'
      }`}
    >
      {icon}
      {label}
    </motion.button>
  );

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center max-w-md"
        >
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-300">Administrator privileges required to access this page.</p>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white text-xl">Loading admin dashboard...</p>
          <p className="text-slate-400 text-sm mt-2">Fetching journeys and user data</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-600 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400">Railway System Administration Panel</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={fetchAdminData}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
              >
                Refresh Data
              </button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">{error}</span>
            <button
              onClick={fetchAdminData}
              className="ml-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <TabButton
              id="overview"
              label="Overview"
              icon={<BarChart3 className="w-5 h-5" />}
              isActive={activeTab === 'overview'}
              onClick={setActiveTab}
            />
            <TabButton
              id="journeys"
              label={`Journeys (${stats.totalJourneys})`}
              icon={<Train className="w-5 h-5" />}
              isActive={activeTab === 'journeys'}
              onClick={setActiveTab}
            />
            <TabButton
              id="users"
              label={`Users (${stats.totalUsers})`}
              icon={<Users className="w-5 h-5" />}
              isActive={activeTab === 'users'}
              onClick={setActiveTab}
            />
            <TabButton
              id="manage"
              label="Manage Routes"
              icon={<Settings className="w-5 h-5" />}
              isActive={activeTab === 'manage'}
              onClick={setActiveTab}
            />
          </div>
        </div>

        {/* Manage Routes Tab */}
        {activeTab === 'manage' && <ManageRoutes />}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={<Train className="w-6 h-6" />}
                label="Total Journeys"
                value={stats.totalJourneys}
                description="Completed train journeys"
                bgColor="from-blue-500 to-blue-600"
                trend="+12%"
              />
              <StatCard
                icon={<Users className="w-6 h-6" />}
                label="System Users"
                value={stats.totalUsers}
                description="Registered users"
                bgColor="from-green-500 to-green-600"
                trend="+8%"
              />
              <StatCard
                icon={<Clock className="w-6 h-6" />}
                label="Average Delay"
                value={`${stats.averageDelay} min`}
                description="Per journey delay"
                bgColor="from-orange-500 to-orange-600"
                trend="-5%"
              />
              <StatCard
                icon={<MapPin className="w-6 h-6" />}
                label="Active Routes"
                value={stats.activeRoutes}
                description="Unique route paths"
                bgColor="from-purple-500 to-purple-600"
                trend="+3%"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Journeys */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Train className="w-5 h-5" />
                  Recent Journeys
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {journeys.slice(0, 8).map((journey) => (
                    <div key={journey._id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div>
                        <p className="text-white font-medium">{journey.trainName}</p>
                        <p className="text-slate-400 text-sm">{journey.route.join(' → ')}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${getDelayColor(journey.totalDelay)}`}>
                          {journey.totalDelay === 0 ? 'On Time' : `${journey.totalDelay} min delay`}
                        </p>
                        <p className="text-slate-500 text-xs">{formatDate(journey.completedAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Users */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Users
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {users.slice(0, 8).map((userData) => (
                    <div key={userData._id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{userData.name}</p>
                          <p className="text-slate-400 text-sm">{userData.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs font-medium">
                          {userData.role}
                        </span>
                        <p className="text-slate-500 text-xs mt-1">{formatDate(userData.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Journeys Tab */}
        {activeTab === 'journeys' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Train className="w-6 h-6" />
              All Completed Journeys ({journeys.length})
            </h3>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-800/80 backdrop-blur-sm">
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white font-semibold p-4">Train</th>
                    <th className="text-left text-white font-semibold p-4">Type</th>
                    <th className="text-left text-white font-semibold p-4">Route</th>
                    <th className="text-left text-white font-semibold p-4">Delay</th>
                    <th className="text-left text-white font-semibold p-4">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {journeys.map((journey) => (
                    <tr key={journey._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-medium">{journey.trainName}</p>
                          <p className="text-slate-400 text-sm">ID: {journey.trainId}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-lg text-sm font-medium">
                          {journey.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-300 text-sm">{journey.route.join(' → ')}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getDelayBgColor(journey.totalDelay)}`}>
                          {journey.totalDelay === 0 ? 'On Time' : `${journey.totalDelay} min`}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-300 text-sm">{formatDate(journey.completedAt)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              System Users ({users.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {users.map((userData) => (
                <motion.div
                  key={userData._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{userData.name}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        userData.role === 'admin' 
                          ? 'bg-red-600/20 text-red-300' 
                          : 'bg-blue-600/20 text-blue-300'
                      }`}>
                        {userData.role}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <p className="text-slate-300 text-sm truncate">{userData.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <p className="text-slate-300 text-sm">Joined {formatDate(userData.createdAt)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;