
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from datetime import datetime
import joblib
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = 'model_latest.joblib'  # Use this file for latest model

class TrainCoordinationML:
    def __init__(self):
        self.model = None
        self.label_encoders = {}
        self.is_trained = False
        self.train_features = [
            'priority_diff', 'delay_impact', 'station_congestion', 
            'time_of_day', 'train_count', 'weather_factor'
        ]
        
    def generate_synthetic_data(self, n_samples=1000):
        np.random.seed(42)
        data = []
        for _ in range(n_samples):
            priority_diff = np.random.randint(1, 4)
            delay_impact = np.random.randint(0, 60)
            station_congestion = np.random.randint(1, 5)
            time_of_day = np.random.randint(0, 24)
            train_count = np.random.randint(2, 6)
            weather_factor = np.random.uniform(0.5, 1.0)
            peak_hours = time_of_day in [7, 8, 9, 17, 18, 19]
            if priority_diff >= 2:
                decision = 'proceed_high_priority'
            elif delay_impact > 30 and peak_hours:
                decision = 'redistribute_load'
            elif station_congestion >= 4:
                decision = 'hold_lower_priority'
            elif weather_factor < 0.7:
                decision = 'increase_safety_margin'
            else:
                decision = 'normal_operation'
            data.append([
                priority_diff, delay_impact, station_congestion, 
                time_of_day, train_count, weather_factor, decision
            ])
        columns = self.train_features + ['decision']
        return pd.DataFrame(data, columns=columns)
    
    def train_model(self):
        print("Generating synthetic training data...")
        df = self.generate_synthetic_data()
        X = df[self.train_features]
        y = df['decision']
        self.label_encoders['decision'] = LabelEncoder()
        y_encoded = self.label_encoders['decision'].fit_transform(y)
        self.model = RandomForestClassifier(
            n_estimators=100, max_depth=10, random_state=42, class_weight='balanced'
        )
        print("Training Random Forest model...")
        self.model.fit(X, y_encoded)
        self.is_trained = True
        print("Model training completed!")
        self.save_model()
        
    def save_model(self):
        if self.model:
            joblib.dump({
                'model': self.model,
                'label_encoders': self.label_encoders,
                'features': self.train_features
            }, MODEL_PATH)
            print("Model saved successfully!")

    def load_model(self):
        try:
            saved_data = joblib.load(MODEL_PATH)
            self.model = saved_data['model']
            self.label_encoders = saved_data['label_encoders']
            self.train_features = saved_data['features']
            self.is_trained = True
            print(f"Loaded latest model from {MODEL_PATH}")
            return True
        except FileNotFoundError:
            print(f"No saved model found at {MODEL_PATH}. Training new model.")
            return False
    
    def predict_decision(self, conflict_features):
        if not self.is_trained:
            raise ValueError("Model is not trained yet!")
        features_df = pd.DataFrame([conflict_features], columns=self.train_features)
        prediction_encoded = self.model.predict(features_df)[0]
        prediction_proba = self.model.predict_proba(features_df)[0]
        prediction = self.label_encoders['decision'].inverse_transform([prediction_encoded])[0]
        feature_importance = dict(zip(self.train_features, self.model.feature_importances_))
        return {
            'decision': prediction,
            'confidence': float(max(prediction_proba)),
            'feature_importance': feature_importance
        }
    
    def extract_features_from_conflict(self, conflict_data):
        trains = conflict_data.get('trains', [])
        if len(trains) < 2:
            raise ValueError("At least 2 trains required for conflict analysis")
        priorities = [train.get('priority', 3) for train in trains]
        priority_diff = max(priorities) - min(priorities)
        delays = [train.get('delay', 0) for train in trains]
        delay_impact = sum(delays)
        station_congestion = len(trains)
        current_hour = datetime.now().hour
        train_count = len(trains)
        weather_factor = np.random.uniform(0.7, 1.0)
        return [priority_diff, delay_impact, station_congestion, current_hour, train_count, weather_factor]

ml_service = TrainCoordinationML()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_trained': ml_service.is_trained,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/train-model', methods=['POST'])
def train_model():
    try:
        ml_service.train_model()
        return jsonify({
            'success': True,
            'message': 'Model trained successfully',
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/predict-decision', methods=['POST'])
def predict_decision():
    try:
        conflict_data = request.json
        if not ml_service.is_trained:
            return jsonify({
                'success': False,
                'error': 'Model not trained yet. Please train the model first.'
            }), 400
        features = ml_service.extract_features_from_conflict(conflict_data)
        ml_result = ml_service.predict_decision(features)
        train_decisions = convert_ml_decision_to_actions(
            ml_result['decision'], 
            conflict_data['trains']
        )
        return jsonify({
            'success': True,
            'ml_decision': ml_result['decision'],
            'confidence': ml_result['confidence'],
            'feature_importance': ml_result['feature_importance'],
            'train_decisions': train_decisions,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def convert_ml_decision_to_actions(ml_decision, trains):
    decisions = []
    if ml_decision == 'proceed_high_priority':
        trains_sorted = sorted(trains, key=lambda x: x.get('priority', 3))
        high_priority = trains_sorted[0]
        for train in trains:
            if train['id'] == high_priority['id']:
                decisions.append({
                    'trainId': train['id'],
                    'action': 'PROCEED',
                    'delay': 0,
                    'reason': f"Highest priority {train['type']} train"
                })
            else:
                decisions.append({
                    'trainId': train['id'],
                    'action': 'HOLD',
                    'delay': 15,
                    'reason': f"Waiting for higher priority train {high_priority['id']}"
                })
    elif ml_decision == 'redistribute_load':
        for i, train in enumerate(trains):
            delay = (i + 1) * 10
            decisions.append({
                'trainId': train['id'],
                'action': 'HOLD',
                'delay': delay,
                'reason': f"Load redistribution - staggered departure"
            })
    elif ml_decision == 'hold_lower_priority':
        trains_sorted = sorted(trains, key=lambda x: x.get('priority', 3))
        for train in trains:
            if train['id'] == trains_sorted[0]['id']:
                decisions.append({
                    'trainId': train['id'],
                    'action': 'PROCEED',
                    'delay': 0,
                    'reason': "Highest priority in congested station"
                })
            else:
                decisions.append({
                    'trainId': train['id'],
                    'action': 'HOLD',
                    'delay': 20,
                    'reason': "Reducing station congestion"
                })
    elif ml_decision == 'increase_safety_margin':
        for i, train in enumerate(trains):
            delay = i * 20
            decisions.append({
                'trainId': train['id'],
                'action': 'HOLD' if i > 0 else 'PROCEED',
                'delay': delay,
                'reason': "Increased safety margin due to weather"
            })
    else:
        trains_sorted = sorted(trains, key=lambda x: x.get('priority', 3))
        for i, train in enumerate(trains):
            if i == 0:
                decisions.append({
                    'trainId': train['id'],
                    'action': 'PROCEED',
                    'delay': 0,
                    'reason': "Normal priority-based operation"
                })
            else:
                decisions.append({
                    'trainId': train['id'],
                    'action': 'HOLD',
                    'delay': 10,
                    'reason': "Standard priority queue"
                })
    return decisions

@app.route('/model-info', methods=['GET'])
def model_info():
    if not ml_service.is_trained:
        return jsonify({
            'model_trained': False,
            'message': 'Model not trained yet'
        })
    return jsonify({
        'model_trained': True,
        'features': ml_service.train_features,
        'model_type': 'RandomForestClassifier',
        'decision_classes': list(ml_service.label_encoders['decision'].classes_),
        'timestamp': datetime.now().isoformat()
    })

# --- OPTIONAL: Automatically reload latest model at midnight ---
from apscheduler.schedulers.background import BackgroundScheduler

def reload_model_job():
    print(f"[{datetime.now().isoformat()}] Reloading latest AI model...")
    ml_service.load_model()

scheduler = BackgroundScheduler()
scheduler.add_job(reload_model_job, 'cron', hour=0, minute=0)
scheduler.start()

if __name__ == '__main__':
    # Always try to load the latest model; train new one if not found
    if not ml_service.load_model():
        print("Training new model...")
        ml_service.train_model()
    print("Starting ML service...")
    app.run(debug=True, port=5001, host='0.0.0.0')
