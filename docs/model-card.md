# Model Card — Multi-Stream CNN-LSTM

## Model Details

- **Name:** `multi_stream_cnn_lstm`
- **Version:** v0.1.0
- **Authors:** Andrade, Calumpit, Hubilla, Saladino
- **Date:** TBD
- **Framework:** TensorFlow 2.17 / Keras

## Intended Use

- **Primary:** Short-term (24–72 hr) rainfall forecasting for the City of Manila
- **Users:** Disaster risk reduction agencies, urban planners, academic researchers
- **Downstream task:** Input to GIS-based flood risk assessment

## Architecture

Two independent encoders with late fusion:
- **Spatial stream:** CNN over radar + gridded rainfall (shape: H × W × C)
- **Temporal stream:** LSTM over station time-series (shape: T × F)
- **Fusion head:** concatenation → dense → rainfall prediction

See `ml/src/models/multi_stream_cnn_lstm.py`.

## Training Data

- **Temporal:** PAGASA rainfall records, hourly, [date range TBD]
- **Spatial:** Radar reflectivity grids, [source and date range TBD]
- **Train/Val/Test split:** TBD — held out most recent months as test set

## Metrics

Target metrics (to be updated after training):

| Metric | Multi-Stream | Baseline (single-pipeline) |
|--------|--------------|----------------------------|
| RMSE   | TBD          | TBD                        |
| MAE    | TBD          | TBD                        |
| NSE    | TBD          | TBD                        |

Evaluation per dissertation Statement of the Problem #2.

## Limitations

- Specific to Manila; not validated for other cities
- Does not model drainage hydraulics or river flow
- Limited accuracy on extreme events due to sparse historical data
- Decision-support tool only — not a substitute for PAGASA warnings

## Ethical Considerations

- Flood risk predictions can influence evacuation decisions; users must understand uncertainty bounds
- Model should be re-evaluated as climate patterns shift
- Biases in historical data (e.g., underreported flooding in informal settlements) may propagate

## Reproducibility

Full training run tracked in MLflow. To reproduce:

```bash
cd ml
source venv/bin/activate
python src/training/train.py --config configs/multi_stream_v1.yaml
```
