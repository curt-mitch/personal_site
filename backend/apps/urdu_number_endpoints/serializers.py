from rest_framework import serializers


class LetterPredictionSerializer(serializers.Serializer):
    """Serialize discounts"""
    prediction_id = serializers.IntegerField(required=False)
    char = serializers.CharField(max_length=1)
    en = serializers.CharField(max_length=10)
    ur = serializers.CharField(max_length=10)
    percentage = serializers.DecimalField(max_digits=2, decimal_places=3)


class PredictionsSerializer(serializers.ModelSerializer):
    predictions = LetterPredictionSerializer(many=True)
