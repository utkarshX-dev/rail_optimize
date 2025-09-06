import React, { useState, useEffect, useRef } from 'react';
import { Train, AlertTriangle, Clock, MapPin, Zap, Users, Activity } from 'lucide-react';
import io from 'socket.io-client';

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

        const map = L.map(mapRef.current).setView([25.0, 77.5], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
              width: 20px; 
              height: 20px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              font-size: 10px; 
              font-weight: bold;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            ">🚂</div>`,
            className: 'custom-train-icon',
            iconSize: [20, 20]
          });

          const marker = L.marker([position.lat, position.lng], { icon: trainIcon })
            .bindPopup(`
              <strong>${train.name || train.id}</strong><br/>
              Type: ${train.type}<br/>
              Status: ${train.status}<br/>
              Speed: ${train.speed} km/h<br/>
              ${train.delay > 0 ? `Delay: +${train.delay} min` : ''}
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
      className="leaflet-container"
    />
  );
};

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
      <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Network Stats */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Trains</p>
                  <p className="text-2xl font-bold text-blue-600">{networkStats.activeTrains}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delayed Trains</p>
                  <p className="text-2xl font-bold text-orange-600">{networkStats.delayedTrains}</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Delay (min)</p>
                  <p className="text-2xl font-bold text-red-600">{networkStats.averageDelay}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Network Efficiency</p>
                  <p className="text-2xl font-bold text-green-600">{networkStats.efficiency}%</p>
                </div>
                <Zap className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Live Train Network</h2>
                <p className="text-sm text-gray-600">
                  Showing {trains.length} trains, {conflicts.length} conflicts
                </p>
                <button
                  onClick={addNewTrain}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add Random Train
                </button>
              </div>
              <SimpleMapComponent 
                trains={trains}
                stations={stations}
                selectedTrain={selectedTrain}
                setSelectedTrain={setSelectedTrain}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Conflicts */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  Active Conflicts ({conflicts.length})
                </h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                {conflicts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No conflicts detected</p>
                ) : (
                  <div className="space-y-3">
                    {conflicts.map(conflict => (
                      <div key={conflict.id || `${conflict.station}-${Date.now()}`} className="border rounded-lg p-3 bg-red-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-red-800">
                            {stations[conflict.station]?.name || conflict.station}
                          </span>
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                            {conflict.severity}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600">Trains involved:</p>
                          {conflict.trains.map(train => (
                            <div key={train.id} className="flex justify-between">
                              <span>{train.name || train.id} ({train.type})</span>
                              <span className="text-gray-600">P{train.priority}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent AI Decisions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center">
                  <Zap className="w-5 h-5 text-blue-500 mr-2" />
                  AI Decisions
                </h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="space-y-3">
                  {alerts.length === 0 ? (
                    <p className="text-gray-500 text-sm">No recent decisions</p>
                  ) : (
                    alerts.slice(0, 5).map(alert => (
                      <div key={alert.id} className="border rounded-lg p-3 bg-blue-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-800">{alert.message}</p>
                            {alert.aiDecision && (
                              <div className="mt-2 text-xs space-y-1">
                                {alert.aiDecision.decisions?.map(decision => (
                                  <div key={decision.trainId} className="flex justify-between">
                                    <span className="truncate">{decision.trainId}:</span>
                                    <span className={decision.action === 'PROCEED' ? 'text-green-600' : 'text-orange-600'}>
                                      {decision.action}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {alert.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Train List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center">
                  <Train className="w-5 h-5 text-gray-700 mr-2" />
                  Active Trains ({trains.length})
                </h3>
              </div>
              <div className="p-4 max-h-64 overflow-y-auto">
                <div className="space-y-2">
                  {trains.length === 0 ? (
                    <p className="text-gray-500 text-sm">No trains active</p>
                  ) : (
                    trains.map(train => (
                      <div
                        key={train.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedTrain?.id === train.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedTrain(train)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{train.name || train.id}</p>
                            <p className="text-xs text-gray-600">{train.type} | P{train.priority}</p>
                            <p className="text-xs text-gray-500">
                              {stations[train.currentStation]?.name || train.currentStation} → {
                                train.nextStation ? (stations[train.nextStation]?.name || train.nextStation) : 'End'
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs px-2 py-1 rounded ${
                              train.status === 'running' ? 'bg-green-100 text-green-800' :
                              train.status === 'delayed' ? 'bg-orange-100 text-orange-800' :
                              train.status === 'held' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {train.status}
                            </p>
                            {train.delay > 0 && (
                              <p className="text-xs text-red-600 mt-1">+{train.delay}min</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainCoordinationDashboard;  