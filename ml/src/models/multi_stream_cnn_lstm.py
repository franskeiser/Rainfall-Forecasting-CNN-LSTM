"""
Multi-Stream CNN-LSTM Architecture
===================================
Directly addresses Problem #1 of the dissertation: separate spatial and temporal
feature extraction before integration, instead of early fusion.

Stream A (Spatial): CNN over radar + gridded rainfall maps
Stream B (Temporal): LSTM over rainfall time-series at station points
Fusion: concatenation + dense head -> predicted rainfall (mm/hr)
"""
from __future__ import annotations

import tensorflow as tf
from tensorflow.keras import Model, layers


def build_spatial_stream(
    input_shape: tuple[int, int, int],
    filters: tuple[int, ...] = (32, 64, 128),
) -> Model:
    """CNN encoder for spatial (radar/gridded rainfall) features."""
    inputs = layers.Input(shape=input_shape, name="spatial_input")
    x = inputs
    for f in filters:
        x = layers.Conv2D(f, 3, padding="same", activation="relu")(x)
        x = layers.BatchNormalization()(x)
        x = layers.MaxPooling2D(2)(x)
    x = layers.GlobalAveragePooling2D()(x)
    spatial_vector = layers.Dense(128, activation="relu", name="spatial_vector")(x)
    return Model(inputs, spatial_vector, name="spatial_stream")


def build_temporal_stream(
    input_shape: tuple[int, int],
    lstm_units: tuple[int, ...] = (64, 32),
) -> Model:
    """LSTM encoder for temporal rainfall time-series."""
    inputs = layers.Input(shape=input_shape, name="temporal_input")
    x = inputs
    for i, u in enumerate(lstm_units):
        return_seq = i < len(lstm_units) - 1
        x = layers.LSTM(u, return_sequences=return_seq)(x)
    temporal_vector = layers.Dense(64, activation="relu", name="temporal_vector")(x)
    return Model(inputs, temporal_vector, name="temporal_stream")


def build_multi_stream_cnn_lstm(
    spatial_shape: tuple[int, int, int] = (64, 64, 3),
    temporal_shape: tuple[int, int] = (24, 5),
    output_horizon: int = 24,
) -> Model:
    """
    Full multi-stream model.

    Args:
        spatial_shape: (H, W, C) - gridded radar/rainfall
        temporal_shape: (timesteps, features) - station time-series
        output_horizon: number of hours to predict

    Returns:
        Compiled Keras model predicting rainfall intensity over the horizon.
    """
    spatial_stream = build_spatial_stream(spatial_shape)
    temporal_stream = build_temporal_stream(temporal_shape)

    # Late fusion
    fused = layers.Concatenate(name="fusion")(
        [spatial_stream.output, temporal_stream.output]
    )
    x = layers.Dense(128, activation="relu")(fused)
    x = layers.Dropout(0.3)(x)
    x = layers.Dense(64, activation="relu")(x)
    output = layers.Dense(output_horizon, activation="linear", name="rainfall_mm")(x)

    model = Model(
        inputs=[spatial_stream.input, temporal_stream.input],
        outputs=output,
        name="multi_stream_cnn_lstm",
    )
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="mse",
        metrics=["mae", tf.keras.metrics.RootMeanSquaredError(name="rmse")],
    )
    return model


if __name__ == "__main__":
    model = build_multi_stream_cnn_lstm()
    model.summary()
