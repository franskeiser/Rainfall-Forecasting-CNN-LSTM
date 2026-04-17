"""Smoke tests for the multi-stream CNN-LSTM model."""
import numpy as np


def test_multi_stream_builds():
    from src.models.multi_stream_cnn_lstm import build_multi_stream_cnn_lstm

    model = build_multi_stream_cnn_lstm(
        spatial_shape=(32, 32, 3),
        temporal_shape=(12, 5),
        output_horizon=24,
    )
    assert model is not None
    assert model.count_params() > 0


def test_multi_stream_forward_pass():
    from src.models.multi_stream_cnn_lstm import build_multi_stream_cnn_lstm

    model = build_multi_stream_cnn_lstm(
        spatial_shape=(16, 16, 3),
        temporal_shape=(12, 5),
        output_horizon=24,
    )
    spatial = np.random.rand(2, 16, 16, 3).astype(np.float32)
    temporal = np.random.rand(2, 12, 5).astype(np.float32)
    output = model.predict([spatial, temporal], verbose=0)
    assert output.shape == (2, 24)


def test_baseline_builds():
    from src.models.baseline_cnn_lstm import build_baseline_cnn_lstm

    model = build_baseline_cnn_lstm(
        input_shape=(12, 32, 32, 3),
        output_horizon=24,
    )
    assert model is not None
    assert model.count_params() > 0
