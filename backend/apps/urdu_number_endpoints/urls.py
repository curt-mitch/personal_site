from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from apps.urdu_number_endpoints import views

urlpatterns = [
  path('api/urdu_number_predictor/predict', views.Prediction.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
