# Rail Optimization System

A real-time train coordination and conflict resolution system that optimizes railway operations using AI/ML for decision making.

## Features

- **Real-time Train Tracking**: Monitor train positions, speeds, and statuses
- **Conflict Detection**: Automatically detect potential conflicts between trains
- **AI-Powered Decision Making**: Uses machine learning to make optimal conflict resolution decisions
- **Priority-Based Coordination**: Handles different train priorities (Express, Local, Freight)
- **Interactive Dashboard**: Visualize the railway network and train movements
- **Alert System**: Get notified about conflicts, delays, and important events

## 🏗️ System Architecture

### Backend (Node.js/Express)
- **server.js**: Main server handling WebSocket connections and train coordination
- **models/train.js**: Defines Train and Station data models
- **AI/ML Integration**: Python-based ML service for decision making

### Frontend (React/TypeScript)
- **Dashboard**: Real-time visualization of trains and stations
- **Train Details**: View detailed information about each train
- **Conflict Resolution**: Interface for viewing and managing conflicts

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, Socket.IO, MongoDB
- **Frontend**: React, TypeScript, Tailwind CSS, Leaflet.js
- **AI/ML**: Python, Flask, scikit-learn, pandas
- **Deployment**: Docker, Nginx (optional)

## 📡 API Endpoints

### Train Management
- `GET /api/trains` - Get all trains
- `GET /api/trains/:id` - Get train by ID
- `POST /api/trains` - Add new train
- `PUT /api/trains/:id` - Update train
- `DELETE /api/trains/:id` - Remove train

### Station Management
- `GET /api/stations` - Get all stations
- `GET /api/stations/:id` - Get station by ID

### Conflict Resolution
- `GET /api/conflicts` - Get all active conflicts
- `POST /api/conflicts/:id/resolve` - Resolve conflict
- `GET /api/decisions` - Get decision history

### System Status
- `GET /api/status` - System health check
- `GET /api/metrics` - Performance metrics

## 🤖 AI/ML Integration

The system uses a Python-based ML service for making intelligent decisions about train coordination. The ML model is trained on synthetic data that simulates various railway scenarios.

### ML Model Features
- Priority difference between trains
- Delay impact analysis
- Station congestion levels
- Time of day considerations
- Weather conditions

### Decision Types
- Proceed with higher priority train
- Hold lower priority train
- Redistribute load
- Increase safety margins
- Normal operation

## 🚂 Train Types & Priorities

1. **Express Trains** (Priority 1)
   - Highest priority
   - Minimum delays allowed
   - Maximum speed

2. **Local Trains** (Priority 2-3)
   - Medium priority
   - Can be delayed for Express trains
   - Moderate speed

3. **Freight Trains** (Priority 4)
   - Lowest priority
   - Can be significantly delayed
   - Lowest speed

## 🛤️ Station Network

The system currently includes the following stations:
- **DEL**: New Delhi
- **AGR**: Agra
- **JHS**: Jhansi
- **BPL**: Bhopal
- **NGP**: Nagpur

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB 5.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/utkarshX-dev/rail_optimize
   cd rail_optimize
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Python environment**
   ```bash
   cd ../AiModel
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/rail_optimize
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

3. **Start the frontend**
   ```bash
   cd frontend
   npm start
   ```

4. **Start the AI/ML service**
   ```bash
   cd AiModel
   python app.py
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📊 Monitoring

The system provides real-time monitoring through:
- Network statistics (active trains, delays, efficiency)
- Conflict history
- Decision logs
- Performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📧 Contact

For any queries, please contact [Your Email] or open an issue on GitHub.

---

Made with ❤️ by CodeChasers
