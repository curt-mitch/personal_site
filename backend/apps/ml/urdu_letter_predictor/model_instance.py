from tensorflow.keras.models import load_model


class Model():
    def __init__(self):
        self.model = load_model('uhat.h5')

    def get_prediction(self, image):
        print(image)
        print(self.model.predict(image))
