import React, { useState, useEffect, useRef } from 'react';
import { Train, AlertTriangle, Clock, MapPin, Zap, Users, Activity, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import { useLanguage } from '../../context/LanguageContext';

const API_BASE = 'http://localhost:5000/api';

const SimpleMapComponent = ({ trains = [], stations = {}, selectedTrain, setSelectedTrain }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (stations && Object.keys(stations).length > 0 && !leafletMapRef.current) {
      import('leaflet').then((L) => {
        // Fix marker icons
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        const map = L.map(mapRef.current, {
          attributionControl: false
        }).setView([25.0, 77.5], 6);
        
        // Dark theme tiles
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        }).addTo(map);

        leafletMapRef.current = map;
        markersRef.current = {};

        // Add station markers
        Object.entries(stations).forEach(([code, station]) => {
          const marker = L.marker([station.lat, station.lng])
            .bindPopup(`<strong>${station.name}</strong><br/>${code}`)
            .addTo(map);
          markersRef.current[`station-${code}`] = marker;
        });
      });
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        markersRef.current = {};
      }
    };
  }, [stations]);

  // Update train markers when trains change
  useEffect(() => {
    if (!leafletMapRef.current || !stations) return;

    import('leaflet').then((L) => {
      // Remove existing train markers
      Object.keys(markersRef.current).forEach(key => {
        if (key.startsWith('train-')) {
          leafletMapRef.current.removeLayer(markersRef.current[key]);
          delete markersRef.current[key];
        }
      });

      // Add new train markers
      trains.forEach(train => {
        const position = getTrainPosition(train, stations);
        if (position) {
          const color = train.type === 'Express' ? '#ef4444' : 
                       train.type === 'Local' ? '#3b82f6' : '#059669';
          
          const trainIcon = L.divIcon({
            html: `<div style="
              background: ${color}; 
              color: white; 
              border-radius: 50%; 
              width: 24px; 
              height: 24px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 12px; 
              font-weight: bold;
              border: 3px solid white;
              box-shadow: 0 4px 8px rgba(0,0,0,0.4);
            ">🚂</div>`,
            className: 'custom-train-icon',
            iconSize: [24, 24]
          });

          const marker = L.marker([position.lat, position.lng], { icon: trainIcon })
            .bindPopup(`
              <div style="background: #1e293b; color: white; padding: 8px; border-radius: 8px;">
                <strong style="color: #60a5fa;">${train.name || train.id}</strong><br/>
                <span style="color: #94a3b8;">Type:</span> ${train.type}<br/>
                <span style="color: #94a3b8;">Status:</span> ${train.status}<br/>
                <span style="color: #94a3b8;">Speed:</span> ${train.speed} km/h<br/>
                ${train.delay > 0 ? `<span style="color: #f87171;">Delay: +${train.delay} min</span>` : ''}
              </div>
            `)
            .addTo(leafletMapRef.current);

          marker.on('click', () => setSelectedTrain(train));
          markersRef.current[`train-${train.id}`] = marker;
        }
      });
    });
  }, [trains, stations, setSelectedTrain]);

  const getTrainPosition = (train, stations) => {
    if (!train.currentStation || !stations[train.currentStation]) {
      return null;
    }

    const currentStation = stations[train.currentStation];
    
    if (!train.nextStation || !stations[train.nextStation] || train.status === 'completed') {
      return { lat: currentStation.lat, lng: currentStation.lng };
    }

    const nextStation = stations[train.nextStation];
    const progress = 0.3;
    
    return {
      lat: currentStation.lat + (nextStation.lat - currentStation.lat) * progress,
      lng: currentStation.lng + (nextStation.lng - currentStation.lng) * progress
    };
  };

  return (
    <div 
      ref={mapRef} 
      style={{ height: '500px', width: '100%' }}
      className="leaflet-container rounded-xl border border-white/20"
    />
  );
};

const StatCard = ({ icon, label, value, color, bgColor, trend }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden bg-gradient-to-br ${bgColor} rounded-2xl p-6 shadow-lg border border-white/10 backdrop-blur-sm`}
  >
    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
        {trend && (
          <div className="text-sm font-medium text-white/90">
            {trend > 0 ? '↗️' : '↘️'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-white/80 text-sm mb-2">{label}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const TrainCoordinationDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState({});
  const [conflicts, setConflicts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [networkStats, setNetworkStats] = useState({
    activeTrains: 0,
    delayedTrains: 0,
    averageDelay: 0,
    efficiency: 95
  });
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const { t, language } = useLanguage();

  // Load Leaflet CSS dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Initialize Socket.IO connection and API data
  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    socketRef.current.on('connect', () => {
      console.log('Connected to train coordination server');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketRef.current.on('initial-state', (data) => {
      console.log('Received initial state:', data);
      if (data.trains) setTrains(data.trains);
      if (data.stations) setStations(data.stations);
      if (data.conflicts) setConflicts(data.conflicts);
    });

    socketRef.current.on('network-update', (data) => {
      console.log('Network update received:', data);
      if (data.trains) {
        setTrains(data.trains);
        updateNetworkStats(data.trains);
      }
      if (data.conflicts) {
        setConflicts(data.conflicts);
      }
    });

    socketRef.current.on('conflict-detected', (data) => {
      console.log('Conflict detected:', data);
      
      const alert = {
        id: `alert-${Date.now()}`,
        type: 'conflict',
        message: `AI resolved conflict at ${stations[data.conflict.station]?.name || data.conflict.station}`,
        aiDecision: data.decision,
        timestamp: new Date(),
        severity: data.conflict.severity.toLowerCase()
      };
      
      setAlerts(prev => [alert, ...prev.slice(0, 4)]);
    });

    loadInitialData();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const loadInitialData = async () => {
    try {
      const stationsResponse = await fetch(`${API_BASE}/stations`);
      if (stationsResponse.ok) {
        const stationsData = await stationsResponse.json();
        setStations(stationsData || {});
      }

      const trainsResponse = await fetch(`${API_BASE}/trains`);
      if (trainsResponse.ok) {
        const trainsData = await trainsResponse.json();
        setTrains(trainsData || []);
        updateNetworkStats(trainsData || []);
      }

      const conflictsResponse = await fetch(`${API_BASE}/conflicts`);
      if (conflictsResponse.ok) {
        const conflictsData = await conflictsResponse.json();
        setConflicts(conflictsData || []);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const updateNetworkStats = (trainsData) => {
    const currentTrains = trainsData || trains;
    const activeCount = currentTrains.filter(t => t.status === 'running').length;
    const delayedCount = currentTrains.filter(t => t.delay > 0).length;
    const avgDelay = currentTrains.length > 0 
      ? currentTrains.reduce((sum, t) => sum + (t.delay || 0), 0) / currentTrains.length 
      : 0;
    const efficiency = Math.max(70, 100 - (avgDelay * 2) - (conflicts.length * 5));
    
    setNetworkStats({
      activeTrains: activeCount,
      delayedTrains: delayedCount,
      averageDelay: Math.round(avgDelay),
      efficiency: Math.round(efficiency)
    });
  };

  const addNewTrain = async () => {
    const trainTypes = ['Express', 'Local', 'Freight'];
    const stationCodes = Object.keys(stations || {});
    
    if (stationCodes.length === 0) return;
    
    const randomType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    const shuffledStations = [...stationCodes].sort(() => Math.random() - 0.5);
    
    const newTrain = {
      name: `${randomType} ${Date.now()}`,
      type: randomType,
      priority: randomType === 'Express' ? 1 : randomType === 'Local' ? 3 : 4,
      route: shuffledStations.slice(0, 3 + Math.floor(Math.random() * 2)),
      speed: randomType === 'Express' ? 85 : randomType === 'Local' ? 65 : 45,
      departureTime: new Date().toLocaleTimeString().slice(0, 5)
    };

    try {
      const response = await fetch(`${API_BASE}/trains`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTrain)
      });

      if (response.ok) {
        const addedTrain = await response.json();
        console.log('Train added:', addedTrain);
      }
    } catch (error) {
      console.error('Error adding train:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            🚆 {language === 'HI' ? 'ट्रेन समन्वय डैशबोर्ड' : 'Train Coordination Dashboard'}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'HI' ? 'रियल-टाइम नेटवर्क निगरानी और AI संघर्ष समाधान' : 'Real-time network monitoring and AI conflict resolution'}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-slate-300">
              {isConnected ? (language === 'HI' ? 'कनेक्टेड' : 'Connected') : (language === 'HI' ? 'डिस्कनेक्टेड' : 'Disconnected')}
            </span>
          </div>
        </motion.div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Activity className="w-6 h-6 text-white" />}
            label={language === 'HI' ? 'सक्रिय ट्रेनें' : 'Active Trains'}
            value={networkStats.activeTrains}
            bgColor="from-blue-600 to-blue-700"
            trend={5.2}
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-white" />}
            label={language === 'HI' ? 'विलंबित ट्रेनें' : 'Delayed Trains'}
            value={networkStats.delayedTrains}
            bgColor="from-orange-500 to-red-500"
            trend={-12.1}
          />
          <StatCard
            icon={<AlertTriangle className="w-6 h-6 text-white" />}
            label={language === 'HI' ? 'औसत देरी (मिनट)' : 'Avg Delay (min)'}
            value={networkStats.averageDelay}
            bgColor="from-red-600 to-red-700"
            trend={-8.3}
          />
          <StatCard
            icon={<Zap className="w-6 h-6 text-white" />}
            label={language === 'HI' ? 'नेटवर्क दक्षता' : 'Network Efficiency'}
            value={`${networkStats.efficiency}%`}
            bgColor="from-green-500 to-emerald-600"
            trend={3.1}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {language === 'HI' ? 'लाइव ट्रेन नेटवर्क' : 'Live Train Network'}
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-slate-300">
                    {trains.length} {language === 'HI' ? 'ट्रेनें' : 'trains'}, {conflicts.length} {language === 'HI' ? 'संघर्ष' : 'conflicts'}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addNewTrain}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {language === 'HI' ? 'ट्रेन जोड़ें' : 'Add Train'}
                  </motion.button>
                </div>
              </div>
              <SimpleMapComponent 
                trains={trains}
                stations={stations}
                selectedTrain={selectedTrain}
                setSelectedTrain={setSelectedTrain}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Conflicts */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                  {language === 'HI' ? 'सक्रिय संघर्ष' : 'Active Conflicts'} ({conflicts.length})
                </h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                {conflicts.length === 0 ? (
                  <p className="text-slate-400 text-sm">
                    {language === 'HI' ? 'कोई संघर्ष नहीं मिला' : 'No conflicts detected'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {conflicts.map(conflict => (
                      <div key={conflict.id || `${conflict.station}-${Date.now()}`} className="border border-red-500/30 rounded-lg p-3 bg-red-500/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-red-300">
                            {stations[conflict.station]?.name || conflict.station}
                          </span>
                          <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                            {conflict.severity}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-slate-300">{language === 'HI' ? 'संबंधित ट्रेनें:' : 'Trains involved:'}</p>
                          {conflict.trains.map(train => (
                            <div key={train.id} className="flex justify-between">
                              <span className="text-slate-300">{train.name || train.id} ({train.type})</span>
                              <span className="text-slate-400">P{train.priority}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent AI Decisions */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-white flex items-center">
                  <Zap className="w-5 h-5 text-blue-400 mr-2" />
                  {language === 'HI' ? 'AI निर्णय' : 'AI Decisions'}
                </h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {alerts.length === 0 ? (
                    <p className="text-slate-400 text-sm">
                      {language === 'HI' ? 'कोई हाल का निर्णय नहीं' : 'No recent decisions'}
                    </p>
                  ) : (
                    alerts.slice(0, 5).map(alert => (
                      <div key={alert.id} className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/10">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-300">{alert.message}</p>
                            {alert.aiDecision && (
                              <div className="mt-2 text-xs space-y-1">
                                {alert.aiDecision.decisions?.map(decision => (
                                  <div key={decision.trainId} className="flex justify-between">
                                    <span className="truncate text-slate-300">{decision.trainId}:</span>
                                    <span className={decision.action === 'PROCEED' ? 'text-green-400' : 'text-orange-400'}>
                                      {decision.action}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 ml-2">
                            {alert.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            {/* Train List */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-white flex items-center">
                  <Train className="w-5 h-5 text-indigo-400 mr-2" />
                  {language === 'HI' ? 'सक्रिय ट्रेनें' : 'Active Trains'} ({trains.length})
                </h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {trains.length === 0 ? (
                    <p className="text-slate-400 text-sm">
                      {language === 'HI' ? 'कोई ट्रेन सक्रिय नहीं' : 'No trains active'}
                    </p>
                  ) : (
                    trains.map(train => (
                      <motion.div
                        key={train.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedTrain?.id === train.id 
                            ? 'bg-indigo-500/20 border-indigo-400' 
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedTrain(train)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm text-white">{train.name || train.id}</p>
                            <p className="text-xs text-slate-300">{train.type} | P{train.priority}</p>
                            <p className="text-xs text-slate-400">
                              {stations[train.currentStation]?.name || train.currentStation} → {
                                train.nextStation ? (stations[train.nextStation]?.name || train.nextStation) : 'End'
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs px-2 py-1 rounded ${
                              train.status === 'running' ? 'bg-green-500/20 text-green-300' :
                              train.status === 'delayed' ? 'bg-orange-500/20 text-orange-300' :
                              train.status === 'held' ? 'bg-red-500/20 text-red-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {train.status}
                            </p>
                            {train.delay > 0 && (
                              <p className="text-xs text-red-400 mt-1">+{train.delay}min</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainCoordinationDashboard;