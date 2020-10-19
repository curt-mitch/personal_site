from rest_framework import serializers
from apps.jp_en_endpoints.models import TranslationTextGet


class TranslationTextGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranslationTextGet
        fields = (
          "id",
          "input_text",
          "created_at",
        )
