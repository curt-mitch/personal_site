import uuid
from PIL import Image
import numpy as np

from rest_framework import generics
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.http import JsonResponse
# translation model imports
from apps.ml.urdu_number_predictor.model_instance import Model
from apps.ml.urdu_number_predictor.utils import uhat_numerals_map


class Prediction(generics.RetrieveAPIView):
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        input_image = request.data['number.png']
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
        img = img.resize((size), Image.ANTIALIAS)
        npdata = np.asarray(img)
        npdata = (npdata[:, :, [0]])
        npdata = np.expand_dims(npdata, 0)

        return npdata

    def create_prediction_response(self, input_data):
        # initialize prediction model
        model = Model()
        results = model.get_prediction(input_data)
        response_list = []

        for result in results:
            char_map = uhat_numerals_map[result[0]]
            char_map["percentage"] = str("%.2f" % result[1])
            char_map["uuid"] = str(uuid.uuid4())
            response_list.append(char_map)

        return response_list
