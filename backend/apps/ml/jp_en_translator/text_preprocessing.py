import unicodedata
import re
import mojimoji
from spacy.lang.ja import Japanese


class PreprocessText():

    def __init__(self, text):
        self.text = text

    def tokenize_jp_sentence(self, text):
        jcfg = {"split_mode": "B"}
        j_tokenizer = Japanese(meta={"tokenizer": {"config": jcfg}})
        return " ".join([i.text for i in j_tokenizer(text)])

    # convert any half-width katakana to normal-width katakana using
    # mojimoji library
    def norm_kt(self, text):
        return mojimoji.han_to_zen(text)

    # convert unicode to ascii
    def jp_unicode_to_ascii(self, text):
        return ''.join(ascii_text for ascii_text in
                       unicodedata.normalize('NFKD', text))

    # keep only Kanji, Hiragana, Katakana, numerals,
    # and common punctuation: ("。", "、", "?", "？", "!", "！"))
    def jp_preprocessing_and_spacing(self, text):
        text = re.sub(r"([。、?？!！])", r" \1", text)
        pattern = r"[^\u3041-\u309F\u30A1-\u30FF\uFF66-\uFF9F\u4E00-\u9FD0\u309B\
                     \u3099\uFF9E\u309C\u309A\uFF9F?!！\s、。.,0-9]+"
        text = re.sub(pattern, '', text).rstrip().strip()

        # add spaces between words and punctuation
        text = re.sub(r'[" "]+', " ", text)
        # remove interpunct (黒丸)
        text = text.replace("・", "")

        text = text.lower()

        return text

    # utilize preprocessing functions and mark start and end of sentences
    def normalize_text(self):
        jp_text = self.text

        jp_text = self.jp_preprocessing_and_spacing(jp_text)
        jp_text = self.tokenize_jp_sentence(jp_text)
        jp_text = self.norm_kt(jp_text)
        jp_text = self.jp_unicode_to_ascii(jp_text)
        jp_text = "<start>\u3000" + jp_text + "\u3000<end>"

        return jp_text
