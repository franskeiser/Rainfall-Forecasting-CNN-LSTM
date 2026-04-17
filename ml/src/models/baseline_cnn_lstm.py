"""
Baseline Single-Pipeline CNN-LSTM (Early Fusion)
=================================================
Used to answer Problem #2: does separating streams actually improve performance?
Keep this model identical in capacity so the comparison is fair.
"""
from __future__ import annotations

import tensorflow as tf
from tensorflow.keras import Model, layers


def build_baseline_cnn_lstm(
    input_shape: tuple[int, int, int, int] = (24, 64, 64, 3),
    output_horizon: int = 24,
) -> Model:
    """
    Single-stream ConvLSTM: spatial + temporal data fused at input.

    Args:
        input_shape: (timesteps, H, W, C)
        output_horizon: hours to predict
    """
    inputs = layers.Input(shape=input_shape)
    x = layers.ConvLSTM2D(32, 3, padding="same", return_sequences=True)(inputs)
    x = layers.BatchNormalization()(x)
    x = layers.ConvLSTM2D(64, 3, padding="same", return_sequences=False)(x)
    x = layers.BatchNormalization()(x)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(128, activation="relu")(x)
    x = layers.Dropout(0.3)(x)
    output = layers.Dense(output_horizon, activation="linear")(x)

    model = Model(inputs, output, name="baseline_cnn_lstm")
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss="mse",
        metrics=["mae", tf.keras.metrics.RootMeanSquaredError(name="rmse")],
    )
    return model


if __name__ == "__main__":
    model = build_baseline_cnn_lstm()
    model.summary()
