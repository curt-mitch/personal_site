from rest_framework import serializers
from apps.jp_en_endpoints.models import TranslationTextPost


class TranslationTextPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TranslationTextPost
        fields = (
          "id",
          "input_text",
          "created_at",
        )
