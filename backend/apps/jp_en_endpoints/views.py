from rest_framework import generics
from apps.jp_en_endpoints.models import TranslationTextPost
from apps.jp_en_endpoints.serializers import TranslationTextPostSerializer

class Translation(generics.CreateAPIView):
    queryset = TranslationTextPost.objects.all()
    serializer_class = TranslationTextPostSerializer
