from django.db import models


class TranslationTextPost(models.Model):
    """
    Prediction post for the JP-EN Translation model
    input_text = Japanese text to be translated
    response = translated English response text
    created_at = date of translation
    """
    input_text = models.CharField(max_length=10000)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
