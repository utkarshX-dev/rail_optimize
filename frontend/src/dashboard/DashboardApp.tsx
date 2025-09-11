import React, { useState, useEffect, useRef } from 'react';
import { Train, AlertTriangle, Clock, MapPin, Zap, Users, Activity } from 'lucide-react';
import io from 'socket.io-client';

const API_BASE = 'http://localhost:5000/api';

// Station coordinates - matching your backend
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
  LKO: { lat: 26.8467, lng: 80.9462, name: "Lucknow" }
};

// Enhanced Map Component with smooth real-time train movement
const EnhancedTrainMap = ({ trains = [], selectedTrain, setSelectedTrain }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});
  const trainMarkersRef = useRef({});
  const animationFrameRef = useRef({});
  const trainPositionsRef = useRef({});
  const [mapInitialized, setMapInitialized] = useState(false);
  const leafletLoadedRef = useRef(false);

  // Initialize map only once when component mounts
  useEffect(() => {
    let mounted = true;

    const initializeMap = async () => {
      if (leafletLoadedRef.current || !mapRef.current || !mounted) {
        return;
      }

      try {
        console.log('Starting map initialization...');
        leafletLoadedRef.current = true;
        
        const L = await import('leaflet');
        
        // Fix Leaflet icon paths
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Check if map container already has a map
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
          leafletMapRef.current = null;
        }

        // Initialize map
        const map = L.map(mapRef.current, {
          center: [23.5, 77.5],
          zoom: 5,
          zoomControl: true,
          preferCanvas: true
        });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(map);

        leafletMapRef.current = map;

        // Add station markers
        Object.entries(stationCoordinates).forEach(([code, station]) => {
          const marker = L.marker([station.lat, station.lng], {
            title: station.name
          }).addTo(map);
          
          marker.bindPopup(`<strong>${station.name}</strong><br/>Code: ${code}`);
          markersRef.current[`station-${code}`] = marker;
        });

        if (mounted) {
          setMapInitialized(true);
          console.log('Map initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing map:', error);
        leafletLoadedRef.current = false;
      }
    };

    initializeMap();

    return () => {
      mounted = false;
      // Cancel all animation frames
      Object.values(animationFrameRef.current).forEach(frameId => {
        if (frameId) cancelAnimationFrame(frameId);
      });
      
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
        leafletMapRef.current = null;
      }
      leafletLoadedRef.current = false;
      setMapInitialized(false);
    };
  }, []);

  // Smooth train position calculation with continuous interpolation
  const calculateSmoothTrainPosition = (train, currentTime) => {
    if (!train.currentStation || !stationCoordinates[train.currentStation]) {
      return null;
    }

    const currentStation = stationCoordinates[train.currentStation];
    
    // If no next station or completed, stay at current station
    if (!train.nextStation || train.status === 'completed' || !stationCoordinates[train.nextStation]) {
      return { 
        lat: currentStation.lat, 
        lng: currentStation.lng,
        progress: 0,
        isStationary: true 
      };
    }

    const nextStation = stationCoordinates[train.nextStation];
    
    // Calculate travel parameters
    const baseTravelTime = 30 * 1000; // 30 seconds base travel time
    const delayTime = ((train.currentDelay || train.delay || 0) * 1000);
    const speedFactor = (train.speed || 60) / 60;
    const effectiveTravelTime = (baseTravelTime / speedFactor) + delayTime;
    
    // Use last move time from the train data
    const timeSinceLastMove = currentTime - (train.lastMoveTime || currentTime);
    
    // Calculate smooth progress (0 to 1)
    let progress = Math.min(timeSinceLastMove / effectiveTravelTime, 1);
    
    // Apply easing function for smoother movement (ease-in-out)
    progress = progress < 0.5 
      ? 2 * progress * progress 
      : -1 + (4 - 2 * progress) * progress;

    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // Smooth interpolation between stations
    const lat = currentStation.lat + (nextStation.lat - currentStation.lat) * progress;
    const lng = currentStation.lng + (nextStation.lng - currentStation.lng) * progress;
    
    return { 
      lat, 
      lng, 
      progress,
      isStationary: false,
      nextStation: nextStation,
      currentStation: currentStation
    };
  };

  // Animation loop for smooth train movement
  const animateTrains = async () => {
    if (!mapInitialized || !leafletMapRef.current || !trains.length) return;

    try {
      const L = await import('leaflet');
      const currentTime = Date.now();
      
      const validTrains = trains.filter(train => train.status !== 'completed');
      
      for (const train of validTrains) {
        const position = calculateSmoothTrainPosition(train, currentTime);
        if (!position) continue;

        const trainKey = `train-${train.id}`;
        const existingMarker = trainMarkersRef.current[trainKey];
        
        if (existingMarker) {
          // Smooth marker movement using setLatLng with animation
          const newLatLng = L.latLng(position.lat, position.lng);
          const currentLatLng = existingMarker.getLatLng();
          
          // Only animate if position actually changed significantly
          const distance = currentLatLng.distanceTo(newLatLng);
          if (distance > 1) { // Only move if more than 1 meter difference
            // Animate to new position
            existingMarker.setLatLng(newLatLng);
            
            // Update popup content with current info
            const popupContent = createTrainPopupContent(train, position);
            existingMarker.setPopupContent(popupContent);
          }
        } else {
          // Create new marker
          const color = getTrainColor(train.type);
          const trainIcon = createTrainIcon(color, train);
          
          const marker = L.marker([position.lat, position.lng], { 
            icon: trainIcon,
            title: train.name || train.id
          }).addTo(leafletMapRef.current);

          const popupContent = createTrainPopupContent(train, position);
          marker.bindPopup(popupContent);
          
          marker.on('click', () => {
            setSelectedTrain(train);
          });

          trainMarkersRef.current[trainKey] = marker;
        }
        
        // Store position for reference
        trainPositionsRef.current[train.id] = position;
      }

      // Clean up markers for completed/removed trains
      Object.keys(trainMarkersRef.current).forEach(key => {
        const trainId = key.replace('train-', '');
        const trainExists = validTrains.some(t => t.id === trainId);
        
        if (!trainExists) {
          const marker = trainMarkersRef.current[key];
          if (marker && leafletMapRef.current && leafletMapRef.current.hasLayer(marker)) {
            leafletMapRef.current.removeLayer(marker);
          }
          delete trainMarkersRef.current[key];
          delete trainPositionsRef.current[trainId];
        }
      });

    } catch (error) {
      console.error('Error in animation loop:', error);
    }
  };

  // Create train icon
  const createTrainIcon = (color, train) => {
    const iconHtml = `
      <div style="
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
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        transition: all 0.3s ease;
        transform: scale(1);
      ">🚂</div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: 'smooth-train-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  // Create train popup content
  const createTrainPopupContent = (train, position) => {
    const color = getTrainColor(train.type);
    const progressPercent = position ? Math.round(position.progress * 100) : 0;
    
    return `
      <div style="min-width: 220px; font-family: system-ui;">
        <h4 style="margin: 0 0 12px 0; color: ${color}; font-size: 16px;">
          ${train.name || train.id}
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
          <div><strong>Type:</strong> ${train.type}</div>
          <div><strong>Priority:</strong> ${train.priority}</div>
          <div><strong>Status:</strong> 
            <span style="color: ${train.status === 'running' ? '#059669' : '#dc2626'};">
              ${train.status}
            </span>
          </div>
          <div><strong>Speed:</strong> ${train.speed} km/h</div>
          <div style="grid-column: 1 / -1;">
            <strong>Current:</strong> ${stationCoordinates[train.currentStation]?.name || train.currentStation}
          </div>
          <div style="grid-column: 1 / -1;">
            <strong>Next:</strong> ${train.nextStation ? (stationCoordinates[train.nextStation]?.name || train.nextStation) : 'Journey End'}
          </div>
          ${train.nextStation ? `
            <div style="grid-column: 1 / -1; margin-top: 4px;">
              <div style="background: #f0f0f0; border-radius: 10px; height: 6px; overflow: hidden;">
                <div style="background: ${color}; height: 100%; width: ${progressPercent}%; transition: width 1s ease-out;"></div>
              </div>
              <div style="font-size: 11px; color: #666; margin-top: 2px;">Progress: ${progressPercent}%</div>
            </div>
          ` : ''}
          ${(train.delay > 0 || train.currentDelay > 0) ? `
            <div style="grid-column: 1 / -1; color: #dc2626; margin-top: 4px;">
              <strong>Delay:</strong> +${Math.max(train.delay || 0, train.currentDelay || 0).toFixed(1)} min
            </div>
          ` : ''}
        </div>
        <div style="margin-top: 10px; font-size: 11px; color: #666; border-top: 1px solid #eee; padding-top: 6px;">
          <strong>Route:</strong> ${train.route?.map(code => stationCoordinates[code]?.name || code).join(' → ') || 'No route'}
        </div>
      </div>
    `;
  };

  const getTrainColor = (type) => {
    switch (type) {
      case 'Express': return '#ef4444'; // Red
      case 'Local': return '#3b82f6';   // Blue
      case 'Freight': return '#059669'; // Green
      default: return '#6b7280';        // Gray
    }
  };

  // Start animation loop when map is ready and trains are available
  useEffect(() => {
    if (!mapInitialized || !trains.length) return;

    // Start smooth animation loop
    const startAnimation = () => {
      animateTrains();
      // Use requestAnimationFrame for smooth 60fps animation
      animationFrameRef.current.main = requestAnimationFrame(startAnimation);
    };

    startAnimation();

    return () => {
      if (animationFrameRef.current.main) {
        cancelAnimationFrame(animationFrameRef.current.main);
      }
    };
  }, [trains, mapInitialized, setSelectedTrain]);

  // Add custom CSS for smooth animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .smooth-train-icon {
        transition: transform 0.3s ease !important;
      }
      .smooth-train-icon:hover {
        transform: scale(1.2) !important;
        z-index: 1000 !important;
      }
      .leaflet-marker-pane .smooth-train-icon {
        transition: all 0.2s ease-out !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: '500px' }}
      />
      {!mapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      {mapInitialized && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Live Tracking</span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {trains.filter(t => t.status !== 'completed').length} trains active
          </div>
        </div>
      )}
    </div>
  );
};

const TrainCoordinationDashboard = () => {
  const [trains, setTrains] = useState([]);
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

  // Load Leaflet CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // Initialize Socket.IO connection
  useEffect(() => {
    console.log('Connecting to server...');
    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });
    
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
      if (data.conflicts) setConflicts(data.conflicts);
      loadTrainsData();
    });

    socketRef.current.on('quick_update', (data) => {
      console.log('Quick update received:', data);
      updateNetworkStats(data);
    });

    socketRef.current.on('trains_updated', (trainsData) => {
      console.log('Trains updated:', trainsData);
      if (trainsData && trainsData.length > 0) {
        setTrains(trainsData);
        updateNetworkStats(null, trainsData);
      }
    });

    socketRef.current.on('ai_decision', (decision) => {
      console.log('AI decision received:', decision);
      
      const alert = {
        id: `alert-${Date.now()}`,
        type: 'ai_decision',
        message: `AI made ${decision.decisions?.length || 0} coordination decisions`,
        aiDecision: decision,
        timestamp: new Date(),
        severity: 'info'
      };
      
      setAlerts(prev => [alert, ...prev.slice(0, 4)]);
    });

    loadTrainsData();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const loadTrainsData = async () => {
    try {
      const response = await fetch(`${API_BASE}/trains/bulk`);
      if (response.ok) {
        const trainsData = await response.json();
        console.log('Loaded trains data:', trainsData);
        setTrains(trainsData || []);
        updateNetworkStats(null, trainsData);
      } else {
        console.error('Failed to load trains data:', response.status);
      }
    } catch (error) {
      console.error('Error loading trains data:', error);
    }
  };

  const updateNetworkStats = (quickStats, trainsData) => {
    if (quickStats) {
      setNetworkStats({
        activeTrains: quickStats.running || 0,
        delayedTrains: quickStats.delayed || 0,
        averageDelay: 0,
        efficiency: Math.max(70, 100 - (quickStats.conflicts * 5))
      });
      return;
    }

    const currentTrains = trainsData || trains;
    const activeCount = currentTrains.filter(t => t.status === 'running').length;
    const delayedCount = currentTrains.filter(t => (t.delay || 0) > 0 || (t.currentDelay || 0) > 0).length;
    const avgDelay = currentTrains.length > 0 
      ? currentTrains.reduce((sum, t) => sum + Math.max(t.delay || 0, t.currentDelay || 0), 0) / currentTrains.length 
      : 0;
    const efficiency = Math.max(70, 100 - (avgDelay * 2) - (conflicts.length * 5));
    
    setNetworkStats({
      activeTrains: activeCount,
      delayedTrains: delayedCount,
      averageDelay: Math.round(avgDelay * 10) / 10,
      efficiency: Math.round(efficiency)
    });
  };

  const addNewTrain = async () => {
    const trainTypes = ['Express', 'Local', 'Freight'];
    const stationCodes = Object.keys(stationCoordinates);
    
    const randomType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
    const shuffledStations = [...stationCodes].sort(() => Math.random() - 0.5);
    
    const newTrain = {
      name: `${randomType} ${Date.now()}`,
      type: randomType,
      priority: randomType === 'Express' ? 1 : randomType === 'Local' ? 2 : 3,
      route: shuffledStations.slice(0, 3 + Math.floor(Math.random() * 2)),
      speed: randomType === 'Express' ? 85 : randomType === 'Local' ? 65 : 45,
      departureTime: new Date().toLocaleTimeString().slice(0, 5),
      delay: 0
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
        loadTrainsData();
      }
    } catch (error) {
      console.error('Error adding train:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Train className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                AI Train Coordination System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              <button
                onClick={addNewTrain}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!isConnected}
              >
                Add Train
              </button>
            </div>
          </div>
        </div>
      </div>

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
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Live Train Network</h2>
                <p className="text-sm text-gray-600">
                  Showing {trains.length} trains, {conflicts.length} conflicts
                </p>
              </div>
              <div className="p-4">
                <EnhancedTrainMap 
                  trains={trains}
                  selectedTrain={selectedTrain}
                  setSelectedTrain={setSelectedTrain}
                />
              </div>
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
                    {conflicts.map((conflict, index) => (
                      <div key={conflict.id || `conflict-${index}`} className="border rounded-lg p-3 bg-red-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-red-800">
                            {stationCoordinates[conflict.station]?.name || conflict.station}
                          </span>
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                            {conflict.severity || 'Medium'}
                          </span>
                        </div>
                        <div className="text-sm space-y-1">
                          <p className="text-gray-600">Trains involved:</p>
                          {conflict.trains?.map(train => (
                            <div key={train.id} className="flex justify-between">
                              <span>{train.name || train.id} ({train.type})</span>
                              <span className="text-gray-600">P{train.priority}</span>
                            </div>
                          )) || <p className="text-gray-500 text-xs">No train details</p>}
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
                            {alert.aiDecision?.decisions && (
                              <div className="mt-2 text-xs space-y-1">
                                {alert.aiDecision.decisions.slice(0, 3).map((decision, idx) => (
                                  <div key={idx} className="flex justify-between">
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
                              {stationCoordinates[train.currentStation]?.name || train.currentStation} → {
                                train.nextStation ? (stationCoordinates[train.nextStation]?.name || train.nextStation) : 'End'
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
                            {((train.delay || 0) > 0 || (train.currentDelay || 0) > 0) && (
                              <p className="text-xs text-red-600 mt-1">
                                +{Math.max(train.delay || 0, train.currentDelay || 0).toFixed(1)}min
                              </p>
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

// IMPORTANT: Default export is required
export default TrainCoordinationDashboard;