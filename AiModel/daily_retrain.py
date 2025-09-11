import requests
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Define API endpoint and file paths
API_URL = "http://localhost:5000/api/conflicts/export"  # Replace with backend URL
DATASET_CSV_PATH = "train_traffic_dataset.csv"
MODEL_PATH = "model_latest.joblib"   
             #  model filepath

def fetch_conflict_logs():
    """Fetch conflict logs via API and return JSON data."""
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json()

def preprocess_conflict_logs(conflicts):
    """Convert conflict logs JSON into DataFrame suitable for training."""
    rows = []
    for c in conflicts:
        features = c.get('features', {})
        # Extract features, use 0 or appropriate default if missing
        row = {
            'priority_diff': features.get('priority_diff', 0),
            'delay_impact': features.get('delay_impact', 0),
            'station_congestion': features.get('station_congestion', 0),
            'time_of_day': features.get('time_of_day', 0),
            'train_count': features.get('train_count', 0),
            'weather_factor': features.get('weather_factor', 1.0),
            'decision': c.get('decision', 'normal_operation') 
            # Use original AI decision or map outcome to label if desired
        }
        rows.append(row)
    return pd.DataFrame(rows)

def load_existing_dataset():
    """Load existing dataset CSV or return empty DataFrame."""
    if os.path.exists(DATASET_CSV_PATH):
        return pd.read_csv(DATASET_CSV_PATH)
    return pd.DataFrame()

def save_dataset(df):
    """Save combined dataset to CSV."""
    df.to_csv(DATASET_CSV_PATH, index=False)
    print(f"Dataset updated and saved to {DATASET_CSV_PATH}")

def retrain_model(df):
    """Retrain RandomForest model and save it with label encoder."""
    X = df.drop(columns=['decision'])
    y = df['decision']

    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    model = RandomForestClassifier(
        n_estimators=100, max_depth=10, random_state=42, class_weight='balanced'
    )
    model.fit(X, y_encoded)

    joblib.dump({'model': model, 'label_encoders': {'decision': le}, 'features': X.columns.tolist()}, MODEL_PATH)
    print(f"Model retrained and saved to {MODEL_PATH}")

def main():
    print("Fetching conflicts from backend API...")
    conflicts = fetch_conflict_logs()
    print(f"Fetched {len(conflicts)} conflicts.")

    new_data = preprocess_conflict_logs(conflicts)
    existing_data = load_existing_dataset()

    combined_data = pd.concat([existing_data, new_data], ignore_index=True)
    save_dataset(combined_data)

    retrain_model(combined_data)

if __name__ == "__main__":
    main()
