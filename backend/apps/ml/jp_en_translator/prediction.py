import tensorflow as tf
from .text_preprocessing import PreprocessText


class Prediction():
    def __init__(self, encoder, decoder, units, max_length_input,
                 max_length_target, input_lang_tokenizer,
                 target_lang_tokenizer, input_text):
        self.encoder = encoder
        self.decoder = decoder
        self.units = units
        self.max_length_input = max_length_input
        self.max_length_target = max_length_target
        self.input_lang_tokenizer = input_lang_tokenizer
        self.target_lang_tokenizer = target_lang_tokenizer
        self.input_text = input_text
        self.preprocess = PreprocessText(input_text)

    def predict(self):
        sentence = self.preprocess.normalize_text()
        inputs = [self.input_lang_tokenizer.word_index[i]
                  for i in sentence.split('\u3000')]
        inputs = tf.keras.preprocessing.sequence\
                   .pad_sequences([inputs],
                                  maxlen=self.max_length_input,
                                  padding='post')
        inputs = tf.convert_to_tensor(inputs)
        result = ''
        hidden = [tf.zeros((1, self.units))]
        enc_out, state = self.encoder(inputs, hidden)

        hidden_state = state
        dec_input = tf.expand_dims([
                    self.target_lang_tokenizer.word_index['<start>']], 0)

        for t in range(self.max_length_target):
            predictions, hidden_state, _ = self.decoder(dec_input,
                                                        hidden_state,
                                                        enc_out)

            predicted_id = tf.argmax(predictions[0]).numpy()

            result += self.target_lang_tokenizer.index_word[predicted_id] + ' '

            if (self.target_lang_tokenizer.index_word[predicted_id] == '<end>'
                    or len(result) > self.max_length_target):
                return result

            # the predicted ID is fed back into the model
            dec_input = tf.expand_dims([predicted_id], 0)
        return result
