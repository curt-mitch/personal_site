from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from apps.jp_en_endpoints import views

urlpatterns = [
  path('api/jp_en_translator/predict', views.Translation.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
