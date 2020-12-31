from django.db import models


class LetterPredictionGet(models.Model):
    """
    Prediction get for the UHaT letter model
    input_image = image data to be predicted on
    response = top three predicted letters
    created_at = date of prediction
    """
    input_image = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
