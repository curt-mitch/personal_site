from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from apps.urdu_letter_endpoints import views

urlpatterns = [
  path('api/urdu_letter_predictor/predict', views.Prediction.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
