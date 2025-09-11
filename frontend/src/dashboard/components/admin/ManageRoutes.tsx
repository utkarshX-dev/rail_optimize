import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Train, 
  MapPin, 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Edit3, 
  Trash2, 
  Route,
  AlertCircle,
  CheckCircle,
  Settings
} from 'lucide-react';

// Station coordinates data
const stationCoordinates = {
  DEL: { lat: 28.6139, lng: 77.209, name: "New Delhi" },
  AGR: { lat: 27.1767, lng: 78.0081, name: "Agra" },
  JHS: { lat: 25.4484, lng: 78.5685, name: "Jhansi" },
  BPL: { lat: 23.2599, lng: 77.4126, name: "Bhopal" },
  NGP: { lat: 21.1458, lng: 79.0882, name: "Nagpur" },
  MUM: { lat: 19.076, lng: 72.8777, name: "Mumbai" },
  PNE: { lat: 22.7196, lng: 75.8577, name: "Pune" },
  HYD: { lat: 17.385, lng: 78.4867, name: "Hyderabad" },
  BLR: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  CHN: { lat: 13.0827, lng: 80.2707, name: "Chennai" },
  KOL: { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
  AMD: { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
  LKO: { lat: 26.8467, lng: 80.9462, name: "Lucknow" },
};

// Sample trains data
const initialTrains = [
  {
    id: "T10001",
    name: "Express 1",
    type: "Express",
    priority: 1,
    route: ["DEL", "AGR", "JHS", "BPL", "NGP"],
    currentStation: "DEL",
    nextStation: "AGR",
    speed: 80,
    delay: 0,
    departureTime: "06:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T10002",
    name: "Express 2",
    type: "Express",
    priority: 1,
    route: ["MUM", "PNE", "BPL", "DEL"],
    currentStation: "MUM",
    nextStation: "PNE",
    speed: 90,
    delay: 0,
    departureTime: "07:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T20001",
    name: "Local 1",
    type: "Local",
    priority: 2,
    route: ["HYD", "BLR", "CHN"],
    currentStation: "HYD",
    nextStation: "BLR",
    speed: 70,
    delay: 1,
    departureTime: "08:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T20002",
    name: "Local 2",
    type: "Local",
    priority: 2,
    route: ["LKO", "DEL", "AGR", "JHS"],
    currentStation: "LKO",
    nextStation: "DEL",
    speed: 60,
    delay: 0,
    departureTime: "09:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T30001",
    name: "Freight 1",
    type: "Freight",
    priority: 3,
    route: ["NGP", "BPL", "JHS", "DEL"],
    currentStation: "NGP",
    nextStation: "BPL",
    speed: 45,
    delay: 2,
    departureTime: "05:00",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T30002",
    name: "Freight 2",
    type: "Freight",
    priority: 3,
    route: ["AMD", "MUM", "PNE", "BPL"],
    currentStation: "AMD",
    nextStation: "MUM",
    speed: 50,
    delay: 3,
    departureTime: "06:30",
    status: "running",
    lastMoveTime: Date.now(),
  },
  {
    id: "T10003",
    name: "Express 3",
    type: "Express",
    priority: 1,
    route: ["KOL", "CHN", "BLR", "HYD"],
    currentStation: "KOL",
    nextStation: "CHN",
    speed: 85,
    delay: 0,
    departureTime: "06:15",
    status: "running",
    lastMoveTime: Date.now(),
  },
];

interface Train {
  id: string;
  name: string;
  type: string;
  priority: number;
  route: string[];
  currentStation: string;
  nextStation: string;
  speed: number;
  delay: number;
  departureTime: string;
  status: string;
  lastMoveTime: number;
}

function ManageRoutes() {
  const [trains, setTrains] = useState<Train[]>(initialTrains);
  const [activeTab, setActiveTab] = useState<'trains' | 'routes' | 'stations'>('trains');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-600/20 text-green-300';
      case 'stopped': return 'bg-red-600/20 text-red-300';
      case 'delayed': return 'bg-yellow-600/20 text-yellow-300';
      default: return 'bg-gray-600/20 text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Express': return 'bg-blue-600/20 text-blue-300';
      case 'Local': return 'bg-green-600/20 text-green-300';
      case 'Freight': return 'bg-orange-600/20 text-orange-300';
      default: return 'bg-gray-600/20 text-gray-300';
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return 'Unknown';
    }
  };

  const handleTrainAction = (trainId: string, action: 'start' | 'pause' | 'stop') => {
    setTrains(prev => prev.map(train => {
      if (train.id === trainId) {
        let newStatus = train.status;
        switch (action) {
          case 'start': newStatus = 'running'; break;
          case 'pause': newStatus = 'delayed'; break;
          case 'stop': newStatus = 'stopped'; break;
        }
        return { ...train, status: newStatus };
      }
      return train;
    }));
  };

  const handleDeleteTrain = (trainId: string) => {
    setTrains(prev => prev.filter(train => train.id !== trainId));
  };

  const TabButton = ({ id, label, icon, isActive, onClick }: any) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-white/10 text-slate-300 hover:bg-white/20'
      }`}
    >
      {icon}
      {label}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Route & Train Management</h3>
          <p className="text-slate-400">Control railway operations and manage train schedules</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Train
        </button>
      </div>

      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-3">
        <TabButton
          id="trains"
          label={`Active Trains (${trains.length})`}
          icon={<Train className="w-4 h-4" />}
          isActive={activeTab === 'trains'}
          onClick={setActiveTab}
        />
        <TabButton
          id="routes"
          label="Route Management"
          icon={<Route className="w-4 h-4" />}
          isActive={activeTab === 'routes'}
          onClick={setActiveTab}
        />
        <TabButton
          id="stations"
          label={`Stations (${Object.keys(stationCoordinates).length})`}
          icon={<MapPin className="w-4 h-4" />}
          isActive={activeTab === 'stations'}
          onClick={setActiveTab}
        />
      </div>

      {/* Active Trains Tab */}
      {activeTab === 'trains' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-white font-medium">Running</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {trains.filter(t => t.status === 'running').length}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-white font-medium">Delayed</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {trains.filter(t => t.status === 'delayed').length}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Square className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-white font-medium">Stopped</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {trains.filter(t => t.status === 'stopped').length}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Train className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-white font-medium">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">{trains.length}</p>
            </div>
          </div>

          {/* Trains Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {trains.map((train) => (
              <motion.div
                key={train.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{train.name}</h4>
                    <p className="text-slate-400 text-xs">ID: {train.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(train.type)}`}>
                      {train.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(train.status)}`}>
                      {train.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Route className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-300 text-xs">
                      {train.route.map(code => stationCoordinates[code as keyof typeof stationCoordinates]?.name || code).join(' → ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-300 text-xs">
                        {stationCoordinates[train.currentStation as keyof typeof stationCoordinates]?.name || train.currentStation}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-300 text-xs">
                        {train.speed} km/h
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-slate-300">
                      Priority: <span className="font-medium">{getPriorityText(train.priority)}</span>
                    </span>
                    <span className="text-slate-300">
                      Departure: <span className="font-medium">{train.departureTime}</span>
                    </span>
                    {train.delay > 0 && (
                      <span className="text-orange-400 font-medium">
                        +{train.delay} min delay
                      </span>
                    )}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTrainAction(train.id, 'start')}
                      className="p-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded transition-colors"
                      disabled={train.status === 'running'}
                    >
                      <Play className="w-3 h-3" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTrainAction(train.id, 'pause')}
                      className="p-1.5 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded transition-colors"
                      disabled={train.status === 'delayed'}
                    >
                      <Pause className="w-3 h-3" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTrainAction(train.id, 'stop')}
                      className="p-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                      disabled={train.status === 'stopped'}
                    >
                      <Square className="w-3 h-3" />
                    </motion.button>
                  </div>

                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingTrain(train)}
                      className="p-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteTrain(train.id)}
                      className="p-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Routes Tab */}
      {activeTab === 'routes' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h4 className="text-xl font-bold text-white mb-4">Active Routes</h4>
          <div className="space-y-3">
            {trains.map((train) => (
              <div key={train.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-white font-medium">{train.name}</h5>
                    <p className="text-slate-400 text-sm">
                      {train.route.map(code => stationCoordinates[code as keyof typeof stationCoordinates]?.name || code).join(' → ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(train.status)}`}>
                      {train.status}
                    </span>
                    <p className="text-slate-400 text-xs mt-1">{train.route.length} stations</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stations Tab */}
      {activeTab === 'stations' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h4 className="text-xl font-bold text-white mb-4">Railway Stations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(stationCoordinates).map(([code, station]) => (
              <div key={code} className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <h5 className="text-white font-medium">{station.name}</h5>
                </div>
                <p className="text-slate-400 text-sm mb-1">Code: {code}</p>
                <p className="text-slate-400 text-xs mb-2">
                  {station.lat.toFixed(4)}, {station.lng.toFixed(4)}
                </p>
                <p className="text-green-400 text-xs">
                  {trains.filter(t => t.currentStation === code).length} trains currently here
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ManageRoutes;