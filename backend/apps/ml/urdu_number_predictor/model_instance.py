from tensorflow import keras
import numpy as np


class Model():
    def __init__(self):
        self.model = keras.models.load_model(
            'apps/ml/urdu_number_predictor/static/uhat_digits.m5')

    def get_prediction(self, image_data):
        prediction_list = self.model.predict(image_data) * 100
        prediction_keys = np.argsort(-prediction_list[0])[:3]
        prediction_percentages = sorted(prediction_list[0], reverse=True)[:3]
        zipped_predictions = list(zip(prediction_keys, prediction_percentages))

        return zipped_predictions
