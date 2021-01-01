import sys
import re

from rest_framework import generics
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework import status
from django.http import JsonResponse
from apps.jp_en_endpoints.models import TranslationTextGet
from apps.jp_en_endpoints.serializers import TranslationTextGetSerializer
from rest_framework.response import Response
# translation model imports
# from apps.ml.jp_en_translator.model_instance import Model


class Prediction(generics.RetrieveAPIView):
    print('prediction!!!')
    queryset = TranslationTextGet.objects.all()
    serializer_class = TranslationTextGetSerializer
    parser_classes = [JSONParser, MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        print('Prediction post request')
        input_image = request.POST.get('form-data')
        print(request.data)
        prediction = ''
        # try:
        #   prediction = self.create_prediction_response(input_text)
        # except Exception as exception:
        #   prediction = { 'error': exception.__class__.__name__}

        # serializer = TranslationTextGetSerializer(data=input_text)
        response = {'prediction': prediction}

        return JsonResponse(response)

    def create_prediction_response(self, request_sentence):
        # initialize translation model
        model = Model(VOCAB_INPUT_SIZE, VOCAB_TARGET_SIZE, EMBEDDING_DIM,
                      UNITS, BATCH_SIZE, OPTIMIZER)
        encoder, decoder, input_token, target_token = model.define_model()

        # predict
        predict = Prediction(encoder, decoder, UNITS, MAX_LENGTH_INPUT,
                             MAX_LENGTH_TARGET, input_token, target_token,
                             request_sentence)
        result = predict.predict()

        # remove spaces around punctuation and ' <end> ' substring
        result = re.sub(r'\s([?.!,"](?:\s|$))', r'\1', result)[:-7]
        return result
