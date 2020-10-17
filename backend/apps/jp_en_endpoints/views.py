from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework import status
from apps.jp_en_endpoints.models import TranslationTextPost
from apps.jp_en_endpoints.serializers import TranslationTextPostSerializer
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


class Translation(generics.CreateAPIView):
    queryset = TranslationTextPost.objects.all()
    serializer_class = TranslationTextPostSerializer
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        print('Translation post request')
        prediction = self.create_prediction_response(request)

        serializer = TranslationTextPostSerializer(data=request.data)
        # TODO: add prediction to response object
        if serializer.is_valid():
            serializer.save()
            response = serializer.data
            response.prediction = prediction
            return Response(response,
                                status=status.HTTP_201_CREATED)
        return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        # return Response({'received data': request.data})

    def create_prediction_response(self, request):
        # initialize translation model
        model = Model(VOCAB_INPUT_SIZE, VOCAB_TARGET_SIZE, EMBEDDING_DIM,
                      UNITS, BATCH_SIZE, OPTIMIZER)
        encoder, decoder, input_token, target_token = model.define_model()

        data = request.data["input_text"]

        # predict
        predict = Prediction(encoder, decoder, UNITS, MAX_LENGTH_INPUT,
                             MAX_LENGTH_TARGET, input_token, target_token,
                             data)
        result = predict.predict()

        return result
