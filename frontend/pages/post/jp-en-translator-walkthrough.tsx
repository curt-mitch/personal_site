import React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import styles from './posts.module.scss';
import PrismCode from '../../components/PrismCode';
import encoderDecoderDiagram from '../../public/images/Encoder-Decoder-Model-for-Text-Translation.png';
import LSTMCell from '../../public/images/LSTM-network-cell.png';
import bahdanauAttentionDiagram from '../../public/images/attention_bahdanau.png';
import deployedAppDiagram from '../../public/images/jp-en-translation-deployment.png';

const pyContent1 =`
mode = tokenizer.Tokenizer.SplitMode.C
[m.surface() for m in tokenizer_obj.tokenize("国家公務員", mode)]
# => ['国家公務員']

mode = tokenizer.Tokenizer.SplitMode.B
[m.surface() for m in tokenizer_obj.tokenize("国家公務員", mode)]
# => ['国家', '公務員']

mode = tokenizer.Tokenizer.SplitMode.A
[m.surface() for m in tokenizer_obj.tokenize("国家公務員", mode)]
# => ['国家', '公務', '員']`.trim();


function JpEnTranslatorWalkthrough() {
    return <>
        <div className={styles.root}>
          <Typography variant='h3' className={styles.title} >
            Creating A Japanese-English Translation Application
          </Typography>
          <Typography variant='body1' className={styles.note}>
            <strong>Note</strong>: this is a walkthrough of the JP-EN translation application that can be found <a className={styles.link} href="/posts/jp-en-translator">here</a>. I assume the reader understands the main principles of deep learning and related concepts such as gradient descent and loss functions.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            When deciding on a topic for my Springboard capstone project, I knew quickly that I wanted to work on a neural machine translation (NMT) model. Machine translation has been a focus of my studies within machine learning due to my facination with linguistics and learning foreign languages. I was drawn to work on a Japanese-English translator because of my familiarity with the language (I minored in Japanese in college and continue studying it in my free time) as well as curiosity to see how it would be to work with a language that does not use the Roman alphabet.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            After several months of work I’m happy to share the progress I’ve made so far with this project. In this post I’ll detail various aspects of the project from data gathering and cleaning to deployment, and I’ll also give a walkthrough of the neural network architecture and ideas for future improvements to the project.
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            The Data
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The dataset I chose to use for this project was the Japanese-English Subtitle Corpus, or <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://nlp.stanford.edu/projects/jesc/">JESC</a>. This is a corpus of 2.8 million pairs of sentences taken from internet crawls of television and movie subtitles. Unlike most translation datasets, the JESC features a large amount of slang and colloquialisms which was part of its draw for me. It also did not require a large amount of processing to get it into a Python-friendly format as it came from a simple text file (as opposed to more complicated formats such as an XML document).
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Preprocessing the data before feeding it to the neural network did require significant effort, however. This was largely due to some of the characteristics of Japanese text and how it gets encoded by computers. Let’s go through a short description of written Japanese to get a feel for its differences from written English.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            A brief overview of written Japanese
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            While English sentences are typically in the subject-verb-object order (“I go to the store”), Japanese is subject-object-verb (“I to the store go”). The written language uses 3 different alphabets:
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            1. Chinese characters called “kanji” (漢字) that denote ideas and thus are used to represent any words and can have multiple readings or pronunciations.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            2. A native syllabary (meaning the characters represent whole syllables instead of individual sounds) “hiragana” (ひらがな), which is characterized by fewer lines per character than kanji and with more curved shapes. Hiragana is used for conjugation (often following kanji that form the first part of a word), grammatical parts-of-speech like adverbs and conjunctions, native words not represented by kanji, and several other purposes.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            3. A second native syllabary “katakana” (カタカナ), characterized by few lines similar to hiragana, but with sharper lines and angles. Katakana is used for non-East Asian proper nouns and loan words, emphasizing text (like italic or bold letters in English), animal and plant names, and other uses.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Text Preprocessing
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            It turns out that because Japanese has multiple types of characters, native speakers can often use this feature to visually distinguish a sentence’s individual words instead of using spaces as European languages use. This sentence, “I came from the supermarket”, features all three alphabets:
          </Typography>
          <Typography variant='body1' className={styles.exampleSentence} >
            私はスーパーから来た。
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            While this visual division works fine for human readers of Japanese, it’s still easier for software if it can break up English and Japanese text in similar ways, a process known in natural language processing as “tokenization”. Therefore we need a way to add spaces between logical portions of Japanese text, which can present challenges for things like compound words. For my project I used the popular NLP Python library <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://spacy.io/">Spacy</a> along with the Japanese tokenizer library <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://github.com/WorksApplications/SudachiPy">SudachiPy</a>. This library actually has settings that allow you to vary the level of granularity in its tokenization. For instance, here is an example from the documentation showing the various options available to break up the word for “government official” (I opted for the middle-of-the-road option “B” in my project):
          </Typography>
          <PrismCode
            pageClass={styles.codeHighlight}
            language='python'
            codeSnippet={pyContent1}
          />
          <Typography variant='body1' className={styles.paragraph} >
            Another issue is that while Japanese has some obviously different puncuation marks (periods are “。”, for example), even punctuation that looks similar to the English counterparts (！or !) have different unicode values. Handling these as well as removing potential accented characters from the English text (i.e., turning “résumé” into “resume”) and transforming the text of both languages from Unicode into ASCII encodings was the majority of my pre-processing and text normalization work. Additionally, each sentence needs to start and end with special tokens (literally <span className={styles.codeSample}>&lt;start&gt;</span> and <span className={styles.codeSample}>&lt;end&gt;</span> in this case) as guidance for parsing each sentence.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Preparing The Text Data for Training
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Since neural networks can only work with numbers, it’s necessary to convert text data into numerical data for both the input language and target (or “output”) language of a NMT model. This process gives a numerical value to each unique word that appears in the data along with “word indexes” to be able to look up the words by their numerical values and vice-versa. The process also creates vectors with the same length as the longest sentence in the dataset (one for the input sentences and one for the target sentences). Each sentence is then one-hot encoded as a vector with numerical values at the space of each word and zeroes padding the vector to the maximum sentence length.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            After this vectorization of the sentences has been performed, I split the data into the following ratios using Scikit-learn’s <span className={styles.codeSample}>train_test_split</span> method: training data = 75%, validation data = 15%, test data = 10%. I then created a dataset using Tensorflow’s <span className={styles.codeSample}>tf.data.Dataset</span> class.
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            Neural Network Architecture
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The neural network used in this project was built using the <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.tensorflow.org/">Tensorflow</a> framework, and the architecture I chose for this project was a sequence-to-sequence (seq2seq) model, more specifically an encoder-decoder model with attention. Seq2seq models use recurrent-neural-networks (RNNs), a natural choice for NLP problems as RNNs are capable of working with variable-length inputs and thus can handle text of various lengths. An additional appeal of RNNs, especially in NLP contexts, is that they have a sense of “memory” by being able to pass state between the layers of a neural network.
          </Typography>
          <div className={styles.diagram}>
            <Image
                height={148}
                width={622}
                src={encoderDecoderDiagram}
                alt="encoder-decoder diagram"
                priority
            />
          </div>
          <Typography variant='body1' className={styles.pictureCaption} >
            Depiction of a sequence-to-sequence model, &quot;EOS&quot; is &quot;end of sentence&quot; (Sutskever et al., 2014)
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            RNNs feature several sub-classes of networks such as long-short term memory networks (LSTMs). It turns out that standard RNNs have a difficult time if the space between references gets too long (an example would be having the context from the beginning of a long sentence to help translate the end of a sentence). This problem is referred to as the “long-term dependency problem”, and LSTMs were designed specifically to avoid this issue! They feature a concept called “cell state” that lets information pass between modules of a neural network to overcome the long-term dependency problem. My model specifically uses GRUs, or “Gated Recurrent Units” which, among other changes, simplifies the storing and passing around of this hidden state versus traditional LSTMs.
          </Typography>
          <div className={styles.diagram}>
            <Image
                height={169}
                width={450}
                src={LSTMCell}
                alt="LSTM cell diagram"
            />
          </div>
          <Typography variant='body1' className={styles.pictureCaption} >
            Visualization of An LSTM network cell (<a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://colah.github.io/posts/2015-08-Understanding-LSTMs/">Source</a>)
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            At the layer of the encoder-decoder part of the architecture, the encoder RNN reads in an input sentence and creates a vector representation of that sentence, which is then used by the decoder to extract a target sequence of that vector. During this process each word in the input sentence is assigned a weight value by the attention mechanism (described below), and this weight value is in turn used by the decoder to predict the next word in the target sentence.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Loss Function
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            This model used the sparse categorical cross-entropy method. Cross-entropy loss methods are also called “log-loss” methods and use a logarithmic function to increase the loss value as the predicted probability of an observation diverges from the actual observation. Sparse categorical cross-entropy is a specific use case for lots of categories (predicted translated words, in our case) that are represented as one-hot encodings, i.e. as vectors with a few ones and many zeros.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Attention Mechanism
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The general idea of an attention mechanism is to prevent the model from associating a single vector with each sentence and use “attention weights” to influence which input vectors to prioritize and create a “context vector” that summarizes the input data received by the decoder. In encoder-decoder LSTMs without this attention mechanism, only the last hidden state value would be used to generate the context vector.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The network used in this project utilized Bahdanau attention, which works by using a linear combination of the encoder and decoder states to generate the context vector. The context vectors created by the Bahdanau attention mechanism as well as previously generated target words are then used by the model to predict a new target word. See the original paper that introduced Bahdanau attention, <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://arxiv.org/pdf/1409.0473.pdf">&quot;Neural Machine Translation by Jointly Learning to Align and Translate&quot;</a>, for more information.
          </Typography>
          <div className={styles.diagram}>
            <Image
                height={314}
                width={250}
                src={bahdanauAttentionDiagram}
                alt="Bahdanau Attention Diagram"
            />
          </div>
          <Typography variant='body1' className={styles.pictureCaption} >
            Bahdanau Attention Diagram (Bahdanau et al., 2015)
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Optimizer
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The optimization algorithm used in this model is the Adam optimizer. This optimizer is an extention of the stochastic gradient descent algorithm, and improves on it by using an adaptive learning rate to speed up optimization. More technically, the Adam algorithm calculates the exponential moving average of the gradient and squared gradient and uses two parameters (beta1 and beta2) to control the decay rate of these two averages. The original paper that introduced the Adam optimizer can be found here: <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://arxiv.org/pdf/1412.6980.pdf">&quot;Adam: A Method for Stochastic Optimization&quot;</a>.
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            Model Performance
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            This model was trained in a Jupyter notebook with an accessible GPU hosted by Paperspace (the notebook can be found here: <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://console.paperspace.com/te1qh03hs/notebook/prqqoypka">Encoder-Decoder model for Japanese-to-English Translation</a>). After 100 epochs that ran for about 30 hours and another 12 hours for evaluating the model on test data, the process was complete.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            I evaluated the models using the METEOR metric. Unfortunately, the performance was not as great as I had hoped (it rarely is!). The average METEOR score per translation turned out to be just 0.10576, however this doesnt mean that roughly 1 in 10 words matched the expected translation. Briefly, the METEOR metric calculates the harmonic mean of unigram recall and precision together while giving more weight to recall. See my post on evaluating machine translation models here for more details: <Link className={styles.link} href="/post/evaluating-machine-translation-models">&quot;How to Evaluate A Machine Translation Model&quot;</Link>.
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            Deployment
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Once training and evaluation were complete, I chose to deploy this model through this site. After saving the weights of the model using Tensorflow&apos;s own model saving method and saving the input and target language vectorizers as pickle objects, I built a class within the <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.djangoproject.com/">Django</a> backend that instantiates a model, uses the saved, static weights and vectorizers from the Paperspace training, and returns a predicted English translation. The entire Django application runs within a <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.docker.com/">Docker</a> container.
          </Typography>
          <div className={styles.diagram}>
            <Image
                height={247}
                width={624}
                src={deployedAppDiagram}
                alt="Deployed app data flow diagram"
            />
          </div>
          <Typography variant='body1' className={styles.pictureCaption} >
            Data flow in the deployed application
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The application has basic error handling in place on both the frontend and backend, and logging on the backend as well.
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            Ideas for Further Development
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Even though I was not satisfied with the model performance I remembered the maxim that “perfect is the enemy of done” and decided to continue with deploying the model, as completing an end-to-end machine learning project was more important than chasing a high metric score for too long. Nevertheless I’d like to share potential ideas for improving the model’s performance and additional deployment ideas.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Data
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Data is the fuel of machine learning models, and one of the first steps I intend to take when returning to this project is adding additional training data. While I thought it could be an interesting feature at the time, in retrospect having a dataset like the JESC that features a lot of slang hampers the model performance from a user standpoint, and it tends to be missing a lot of common vocabulary. Widely-used translation apps like <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://translate.google.com/">Google Translate</a> deal mostly with formal written language, and since translation apps have set a paradigm of avoid informal speech and text I would seek out additional datasets with more standard vocabulary. I would expect having additional training and testing data like this to have the largest impact on model performance.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Another idea is changes to the data preprocessing methods, especially choosing different options for how the Japanese and English text is tokenized as I described earlier. However, I would expect these changes to have less significant affects on the score versus changes to the data and model architecture.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Architecture and Hyperparameters
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            While using an encoder-decoder with LSTMs/GNUs are the dominant architecture choice for a machine translation model, some changes to the architecture are worth exploring. The initial change I would make would be to use standard LSTMs instead of GNUs within the encoder and decoder, as LSTMs have been shown to have better performance than GNUs for some neural machine translation cases.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Another change would be to the attention mechanism used. While I used the Bahdanau attention mechanism here I could also explore using Luong attention, which is a newer method that attempts to improve on Bahdanau attention by simplifying the calculations of attention scores, leading to a faster and more efficient attention mechanism. It also uses the decoder’s current hidden state to create the context vector, unlike the Bahdanau’s use of the previously computed hidden state.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            A more significant change than these architecture adjustments I&apos;ve discussed so far would be to use a model utilizing transfer learning with <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://github.com/google-research/bert">BERT</a>, or “Bidirectional Encoder Representations from Transformers”. Transfer learning is a technique wherein neural networks trained for one task are used for predictions on a different (but usually related) task. Transformers are a class of neural networks with the encoder-decoder pattern that deal with long-term dependencies even better than LSTMs, and BERT is a class of transformer models that show excellent performance on a variety of NLP tasks than can be used with several pretrained models. Comparing my more “from scratch” model described in this post versus a transfer-learning-with-BERT model would be a very interesting follow up to this project.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Changing the hyperparameters could also have a significant impact on performance. However, because the size of the GPU memory limited how much data I could process at a time, the primary hyperparameter I could significantly adjust would be the total number of epochs. Nonetheless there’s always the chance that training on the same data for longer could lead to overfitting, and given that training for 100 epochs took well over a day, fine-tuning this value could take a significant amount of time, assuming I’m limited to working with one GPU.
          </Typography>
          <Typography variant='body1' className={styles.subSectionTitle} >
            Deployment
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            The deployment is generally working fine, although one thing I would like to add is a caching layer to avoid recomputing estimated translations for common input values. For this I would probably use <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://redis.io/">Redis</a> or a similar in-memory database to store common input-output pairs of sentences.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            If usage of the app grew large enough, considering strategies for deploying, managing, and networking multiple instances of the backend application would be fun. Using <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://kubernetes.io/">Kubernetes</a> to orchestrate multiple Docker containers would be a natural choice here, and my existing <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.nginx.com/">NGINX</a> configuration could be updated to handle routing requests to multiple backend servers.
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            Extra Lessons Learned
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            I greatly enjoyed working on this project, and I learned a great deal during the process. Often when I read other project walkthroughs I wish developers would share some “war stories” of unexpected hurdles, both to avoid giving readers the impression that development is very rarely a smooth process and to help readers avoid similar pitfalls. Accordingly, here are a two interesting issues I didn’t expect to run into.
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            So much of the material I’ve read about machine learning and data science says that you’ll spend much more time on data cleaning and preprocessing than you expect, and that was true for me as well. One particular error I dealt with that stood out was the appearance of two line separator unicode (<a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.fileformat.info/info/unicode/char/2028/index.htm">U+2028</a>) characters (which I had never encountered until now) hiding in 2 Japanese sentences, which didn’t show up until I saved the processed data to local files. When I loaded these files the Japanese sentences would have 2 extra instances versus the English sentences because of these line separators, giving me an “off by 2” error amongst 2.8 million sentences!
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            Another tool&apos;s quirks that I noticed which will save me lost time from now on is some of the nuances of working with the Large File Storage Git extension, aka <span className={styles.codeSample}>git-lfs</span> or &quot;LFS&quot; (<a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://git-lfs.github.com/">a</a>). LFS allows you to store large files on a site like Github using pointer files while the large file itself is stored on a different server. Frequently when I would clone my project from one environment to another, say from my local computer to Paperspace, I unconciously thought the large files themselves would be included in the cloning process, but I shouldn’t have been surprised in retrospect that only the pointer file would move while I would have to manually copy/paste the large files themselves!
          </Typography>
          <Typography variant='h5' className={styles.sectionTitle} >
            Acknowledgements
          </Typography>
          <Typography variant='body1' className={styles.paragraph} >
            I want to give a huge thank you to my Springboard mentor, Dhiraj Kumar. During our weekly calls (which were late in the evening for his timezone!) he would regularly provide me with suggestions and feedback that kept me moving forward when I could have gotten stuck or spent too much time on a particular aspect or another of the project. Please check out his <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://dhirajkumarblog.medium.com/">Medium blog</a> and <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCuOT2b1Umrr0MittMzuxNcA/">YouTube channel</a>.
          </Typography>
        </div>
    </>;
}

export default JpEnTranslatorWalkthrough;
