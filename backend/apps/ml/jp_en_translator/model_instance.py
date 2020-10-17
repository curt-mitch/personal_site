import tensorflow as tf
from .translation_model import Encoder, Decoder
import pickle


class Model():
    def __init__(self, inp_vocab_size, tar_vocab_size, embedding_dim, units,
                 batch_size, optimizer):
        self.inp_vocab_size = inp_vocab_size
        self.tar_vocab_size = tar_vocab_size
        self.embedding_dim = embedding_dim
        self.units = units
        self.batch_size = batch_size
        self.optimizer = optimizer

    def define_model(self):
        # initialize model
        encoder = Encoder(vocab_size=self.inp_vocab_size,
                          embedding_dim=self.embedding_dim,
                          enc_units=self.units, batch_size=self.batch_size)

        decoder = Decoder(vocab_size=self.tar_vocab_size,
                          embedding_dim=self.embedding_dim,
                          dec_units=self.units, batch_size=self.batch_size)

        model = tf.train.Checkpoint(optimizer=self.optimizer,
                                    encoder=encoder,
                                    decoder=decoder)

        # load trained model
        model.restore("apps/ml/jp_en_translator/static/jp_en_model")\
             .expect_partial()

        encoder = model.encoder
        decoder = model.decoder

        # load word tokenizers
        with open("apps/ml/jp_en_translator/static/"
                  "input_lang_tokenizer.pickle", "rb") as f:
            input_token = pickle.load(f)

        with open("apps/ml/jp_en_translator/static/"
                  "target_lang_tokenizer.pickle", "rb") as f:
            target_token = pickle.load(f)

        return encoder, decoder, input_token, target_token
