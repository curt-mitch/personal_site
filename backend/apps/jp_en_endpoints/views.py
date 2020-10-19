import re

from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http import JsonResponse
from apps.jp_en_endpoints.models import TranslationTextGet
from apps.jp_en_endpoints.serializers import TranslationTextGetSerializer
from rest_framework.response import Response
# translation model imports
from apps.ml.jp_en_translator.model_instance import Model
from apps.ml.jp_en_translator.prediction import Prediction
from apps.ml.jp_en_translator.model_constants import VOCAB_INPUT_SIZE
from apps.ml.jp_en_translator.model_constants import VOCAB_TARGET_SIZE
from apps.ml.jp_en_translator.model_constants import EMBEDDING_DIM
from apps.ml.jp_en_translator.model_constants import UNITS
from apps.ml.jp_en_translator.model_constants import BATCH_SIZE
from apps.ml.jp_en_translator.model_constants import OPTIMIZER
from apps.ml.jp_en_translator.model_constants import MAX_LENGTH_INPUT
from apps.ml.jp_en_translator.model_constants import MAX_LENGTH_TARGET


class Translation(generics.RetrieveAPIView):
    queryset = TranslationTextGet.objects.all()
    serializer_class = TranslationTextGetSerializer
    parser_classes = [JSONParser]

    def get(self, request, *args, **kwargs):
        print('Translation get request')
        input_text = request.GET.get('input_text')
        prediction = self.create_prediction_response(input_text)

        serializer = TranslationTextGetSerializer(data=input_text)
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
