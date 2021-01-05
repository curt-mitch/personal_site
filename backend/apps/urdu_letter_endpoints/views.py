import json
from PIL import Image
import numpy as np

from rest_framework import generics
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.response import Response
# translation model imports
from apps.ml.urdu_letter_predictor.model_instance import Model
from apps.ml.urdu_letter_predictor.utils import uhat_map
from apps.urdu_letter_endpoints.serializers import PredictionsSerializer


class Prediction(generics.RetrieveAPIView):
    # queryset = TranslationTextGet.objects.all()
    # serializer_class = TranslationTextGetSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        input_image = request.data['letter.jpg']
        input_data = self.convert_image_to_npdata(input_image)
        predictions = []

        try:
            predictions = self.create_prediction_response(input_data)
        except Exception as exception:
            predictions = {"error": exception.__class__.__name__}
        response = {"predictions": predictions}

        return JsonResponse(response, safe=False)

    def convert_image_to_npdata(self, input_image):
        img = Image.open(input_image)
        size = 28, 28
        img.thumbnail(size)
        npdata = np.asarray(img)
        npdata = npdata[:, :, [0]] / 255.
        npdata = np.expand_dims(npdata, 0)
        return npdata

    def create_prediction_response(self, input_data):
        # initialize prediction model
        model = Model()
        results = model.get_prediction(input_data)
        response_list = []
        for result in results:
            char_map = uhat_map[result[0]]
            char_map["percentage"] = str(result[1])
            response_list.append(char_map)

        return response_list
