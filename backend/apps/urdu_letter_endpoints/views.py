import uuid
# from PIL import Image
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
        # input_image = request.data['letter.jpg']
        # input_data = self.convert_image_to_npdata(input_image)
        predictions = []

        # try:
        #     predictions = self.create_prediction_response(input_data)
        # except Exception as exception:
        #     predictions = {"error": exception.__class__.__name__}
        response = {"predictions": predictions}

        return JsonResponse(response, safe=False)

    # def convert_image_to_npdata(self, input_image):
    #     img = Image.open(input_image)
    #     size = 28, 28
    #     img = img.resize((28, 28), Image.ANTIALIAS)
    #     img.save('img.png')
    #     npdata = np.asarray(img)
    #     whiten_and_normalize = lambda x: 1 if 0 < x <= 255 else 0
    #     print('whiten')
    #     vectorized_whiten = np.vectorize(whiten_and_normalize)
    #     print('vectorized_whiten')
    #     npdata = vectorized_whiten(npdata)
    #     print(npdata)
    #     npdata = (npdata[:, :, [0]])
    #     for row in npdata[:, :, [0]]:
    #         print(row)
    #     npdata = np.expand_dims(npdata, 0)
    #     return npdata

    # def create_prediction_response(self, input_data):
    #     # initialize prediction model
    #     model = Model()
    #     results = model.get_prediction(input_data)
    #     response_list = []
    #     for result in results:
    #         char_map = uhat_map[result[0]]
    #         char_map["percentage"] = str("%.2f" % result[1])
    #         char_map["uuid"] = str(uuid.uuid4())
    #         response_list.append(char_map)

    #     return response_list
