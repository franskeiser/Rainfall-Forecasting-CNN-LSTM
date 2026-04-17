# ML — Multi-Stream CNN-LSTM

## Setup

```bash
# From the ml/ directory
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Run Experiments

```bash
# Start MLflow UI (new terminal)
mlflow ui --backend-store-uri sqlite:///mlflow.db

# Launch notebooks
jupyter lab
```

## Test the Architectures

```bash
# Verify the multi-stream model builds and runs
python src/models/multi_stream_cnn_lstm.py

# Verify the baseline for comparison
python src/models/baseline_cnn_lstm.py

# Run unit tests
pytest tests/ -v
```

## Project Layout

```
src/
├── models/         Multi-stream + baseline architectures
├── preprocessing/  Data cleaning, alignment, normalization
├── training/       Training loops, callbacks
├── evaluation/     Metrics (RMSE, MAE, NSE, CSI)
└── inference/      Inference for backend consumption
configs/            YAML hyperparameters
notebooks/          EDA and experiments
data/               Raw and processed data (gitignored)
artifacts/          Trained model weights (gitignored)
```

## Logging Experiments

```python
import mlflow

mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("multi-stream-cnn-lstm")

with mlflow.start_run():
    mlflow.log_params({"lstm_units": 64, "epochs": 50})
    mlflow.log_metric("rmse", 2.34)
    mlflow.log_metric("mae", 1.12)
    mlflow.tensorflow.log_model(model, "model")
```
