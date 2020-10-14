from django.urls import path, include
from rest_framework import routers
from apps.jp_en_endpoints.views import EndpointViewSet
from apps.jp_en_endpoints.views import MLAlgorithmViewSet
from apps.jp_en_endpoints.views import MLAlgorithmStatusViewSet
from apps.jp_en_endpoints.views import MLRequestViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'endpoints', EndpointViewSet, 'endpoints')
router.register(r'mlalgorithms', MLAlgorithmViewSet, 'mlalgorithms')
router.register(r'mlalgorithmsstatuses', MLAlgorithmStatusViewSet, 'mlalgorithmsstatuses')
router.register(r'mlrequests', MLRequestViewSet, 'mlrequests')

urlpatterns = [
    path('api/', include(router.urls))
]
