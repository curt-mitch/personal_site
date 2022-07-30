import React from 'react';
import Typography from '@mui/material/Typography';

import styles from './posts.module.scss';
import PrismCode from '../../components/PrismCode';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const pyCode1 = `
from nltk.translate.bleu_score import sentence_bleu
reference_1 = ['the', 'hungry', 'gray', 'dog', 'ate', 'the', 'tasty', 'treat']
hypothesis_1 = ['the', 'hungry', 'gray', 'dog', 'ate', 'the', 'tasty', 'treat']
score = sentence_bleu([reference_1], hypothesis_1)
score # 1.0
`.trim();
const pyCode2 = `
hypothesis_2 = ['the', 'hungry', 'gray', 'dog', 'ate', 'a', 'tasty', 'treat']
score = sentence_bleu([reference_1], hypothesis_2
score # 0.5946035575013605
`.trim();
const pyCode3 = `
score = sentence_bleu([reference_1], hypothesis_1, weights=(0.5, 0.5))
score # 0.7905694150420949
`.trim();
const pyCode4 = `
from nltk.translate.nist_score import sentence_nist
score = sentence_nist([reference_1], hypothesis_1)
score # 3.0357142857142856
`.trim();
const pyCode5 = `
score = sentence_nist([reference_1], hypothesis_2)
score # 2.642857142857143
`.trim()
const pyCode6 = `
from nltk.translate.meteor_score import meteor_score
reference_1 = 'the hungry gray dog ate the tasty treat'
hypothesis_1 = 'the hungry gray dog ate a tasty treat'
score = meteor_score([reference_1], hypothesis_1)
score # 0.840561224489796
`.trim();

function EvaluatingMachineTranslationModels() {
    const mathJaxConfig = {
        loader: { load: ["input/asciimath"] }
    };

    return <>
        <div className={styles.root}>
            <Typography variant='h3' className={styles.title} >
                How to Evaluate A Machine Translation Model
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Gauging how accurately a machine learning model performs is one of the key questions any ML practioner needs to answer during model development. For many types of tasks such as image recognition, evaluating how accurate a model’s results are is relatively straightfoward: the image label is either correct or it isn’t. But how do you measure how accurate a machine translation result is? After all, for any but the simplest ideas, it’s usually possible to convey that idea in multiple ways in any language. In this post we’ll examine a few of the most common NLP metrics and how they are computed when assessing the performance of machine translation models.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                As I mentioned above, beyond the simplest of sentences multiple translations of one language to another are possible. For instance, the English sentence “Yesterday I went to the store” could be translated into Spanish as “Ayer yo me fui a la tienda.” But since Spanish allows the dropping of subjects, in this case “yo” (because listeners can infer the subject from the form of the verb’s conjugation), this sentence could also be “Ayer me fui a la tienda.” Here is where confusion about the best translation can start to arise. For instance, for a native Spanish-speaker which sentence is closer to the original English sentence? And this is still a fairly simple example where the two languages are relatively closely related and the word order in each sentence is the same!
            </Typography>
            <Typography variant='h5' className={styles.title} >
                Building Blocks
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                With the advent of statistical machine translation in the last 20 years and the more recent rise of deep learning applications in NLP, researchers have created many metrics to “score” the accuracy of machine translation models. In order to calculate a numerical value these various metrics use a variety of measures and linguistic features in sentences and entire documents (in NLP, a document is usually referred to as a “corpus”, plural “corpuses”), primarily n-grams and precision/recall, which we’ll look at here.
            </Typography>
            <Typography variant='body1' className={styles.sectionTitle} >
                n-grams:
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                In NLP n-grams, where “n” stands for any whole number, are the sets of “n” neighboring words in a text. A “unigram” or 1-gram would be any single word, “bigrams” or 2-grams any two neighboring words, and so forth. Below is a table of n-grams for the opening sentence of Nobel Prize-winning author Yasunari Kawabata’s famous 1948 novel, <u>Snow Country</u>: “The train came out of the long tunnel into the snow country.”:
            </Typography>
            <Typography variant='body1' className={styles.exampleList} >
                <strong>unigrams</strong>: [“The”, “train”, “came”, “out”, “of, “the”, “long”, “tunnel”, “into”, “the”, ”snow”, “country”]
            </Typography>
            <Typography variant='body1' className={styles.exampleList} >
                <strong>bigrams</strong>: [“The train”, “train came”, “came out”, “out of”, “of the”, “the long”, “long tunnel”, “tunnel into”, “into the”, “the snow”, ”snow country”]
            </Typography>
            <Typography variant='body1' className={styles.exampleList} >
                <strong>trigrams</strong>: [“The train came”, “train came out”, “came out of”, “out of the”, “of the long”, “the long tunnel”, “long tunnel into”, “tunnel into the”, “into the snow”, “the snow country”]
            </Typography>
            <Typography variant='body1' className={styles.exampleList} >
                <strong>4-grams</strong>: [“The train came out”, “train came out of”, “came out of the”, “out of the long”, “of the long tunnel”, “the long tunnel into”, “long tunnel into the”, “tunnel into the snow”, “into the snow country”]
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                <strong>note</strong>: N-grams over 3 are typically written with the number, but the bigger the n-gram the less frequently it is used for most NLP tasks.
            </Typography>
            <Typography variant='body1' className={styles.sectionTitle} >
                precision and recall:
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Precision is a measure of how well your model performs at detecting members of the class you’re looking for. We use the total number of correctly and incorrectly labeled positives in the denominator to represent precision as:
            </Typography>
            <Typography variant='body1' className={styles.exampleList} >
                true_positives / (true_positives + false_positives).
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Recall (also called “sensitivity”) is similar to precision, wherein the percentage of correct labels that were detected by your model is calculated. Because the total number of true positives and false negatives is the total number of examples, we use that as the denominator and thus recall can be represented as:
            </Typography>
            <Typography variant='body1' className={styles.exampleList} >
                true_positives / (true_positives + false_negatives).
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Note that each metric discussed here uses a different type of average, the details of which I’ll present towards the end of the post along with links to the original papers that introduced each metric.
            </Typography>
            <Typography variant='h5' className={styles.title} >
                BLEU
            </Typography>
            <Typography variant='body1' className={styles.paragraph}>
                The BLEU score has a strong claim to be the most-well known translation metric, as it’s usually the one all other metrics are compared to. It was proposed by Kishore Papineni and his coauthors in a 2002 paper at the Annual Meeting of the Association for Computational Linguistics (ACL). BLEU stands for “BiLingual Evaluation Understudy” and compares a candidate  sentence (i.e., the machine-generated sentence in the case of NLP models) to reference sentences that are usually created by human translators. The general idea behind the BLEU score is that it compares the n-grams in both the candidate sentence and reference sentences and counts the number of matches. The positions of the n-grams within each sentence do not matter, and the more matches there are the higher the BLEU score is.
            </Typography>
            <Typography variant='body1' className={styles.paragraph}>
                Let’s look at some examples to build our intuition. We’ll compare a known reference sentence and a hypothesis sentence that’s hypothetically the output of a machine translation program, and both sentences will be stored as arrays of tokens representing individual words. We can use the sentence-level BLEU score that comes as part of the NLTK API:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='python'
                codeSnippet={pyCode1}
            />
            <Typography variant='body1' className={styles.exampleList} >
                <strong>note</strong>: you may notice that the argument for the reference sentence is inside list brackets. This is because the BLEU methods in NLTK assume there will generally be more than one reference sentence passed as a list.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Not surprisingly, this method returns a perfect score when the two sentences are identical.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                What happens when we change one word in the hypothesis sentence (the second “the” becomes “a”)?
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='python'
                codeSnippet={pyCode2}
            />
            <Typography variant='body1' className={styles.paragraph} >
                We can see a dramatic drop in the score here. It won’t be intuitive based on the score value, but the BLEU score is calculated by comparing the precision of n-grams in the hypothesis and reference sentences. Another thing to note is that by default the BLEU methods in NTLK compare 1- to 4-grams. If we were to only compare unigrams and bigrams by specifying their weighting, our score would be significantly boosted:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='python'
                codeSnippet={pyCode3}
            />
            <Typography variant='body1' className={styles.paragraph} >
                More concretely, the BLEU score is comparing the precision and recall of the hypothesis sentence versus the reference sentences. Assuming we’re only looking at the unigrams of each sentence, the BLEU score tests to see how many of the words in the reference sentence (8 words total) appear in the hypothesis sentence (7, since the second “the” has become “a”). This would give a score of 7/8 = 0.875.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                When computing the BLEU score for an entire corpus, the precision scores of individual sentences are combined using the geometric mean, along with a penalty applied when the length of the reference corpus is shorter is less than or equal the length of the hypothesis sentence.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Although the BLEU score was innovative when introduced and creates scores between 0 and 1 that can be easy to reason about, compared to more recently-introduced methods it can seem somewhat simplistic to use a method that only compares the number of overlapping n-grams.
            </Typography>
            <Typography variant='h5' className={styles.title} >
                NIST
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                In 2002 DARPA (The US Defense Advanced Research Projects Agency) commissioned NIST (the US National Institute of Standards and Technology) to evaluate and create their own machine translation metric based on BLEU. The result was a method similar to the BLEU score but with a few minor changes such as increased weighting for less-common n-grams and a reduced scoring penalty for shorter sentences (known as the “brevity penalty”):
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='python'
                codeSnippet={pyCode4}
            />
            <Typography variant='body1' className={styles.paragraph} >
                and with the second hypothesis sentence:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='python'
                codeSnippet={pyCode5}
            />
            <Typography variant='body1' className={styles.paragraph} >
                Notice that the NIST scores will tend to be greater than one. This is due to the differences between the NIST and BLEU methods given above, plus the fact that the NIST method uses the arithmetic mean of the n-gram overlaps while BLEU uses the geometric mean. See the final section below for details on the differences.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Although the NIST does have slight improvements over BLEU due to the higher weighting of uncommon n-grams and the different calculation of the brevity penalty, those same features make the potential range of score values more difficult to reason about.
            </Typography>
            <Typography variant='h5' className={styles.title} >
                METEOR
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Another popular translation evaluation metric is METEOR, which stands for “Metric for Evaluation of Translation with Explicit ORdering.” METEOR was designed explicitly to make up for some of the shortcomings of BLEU, including a focus on sentence-level translations as opposed to BLEU’s focus on translations at the corpus level. Additionally, METEOR uses the harmonic mean (described in the mathematical details section below) on unigram precision and recall with a greater weighting for recall.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Let’s compute the METEOR scores using the same example sentence we used for the BLEU examples, noting that the <span className={styles.monospaceSpan}>meteor_score</span> method expects sentences as whole strings instead of an array of tokens as with the BLEU and NIST methods:
            </Typography>
            <PrismCode
                pageClass={styles.codeHighlight}
                language='python'
                codeSnippet={pyCode6}
            />
            <Typography variant='body1' className={styles.exampleList} >
                <strong>note</strong>: The NLTK <span className={styles.monospaceSpan}>meteor_score</span> method takes full sentences as strings (or a list of sentences in the case of reference sentences) for its arguments instead of a list of tokens.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                We can see that the METEOR score is significantly higher here versus that of the BLEU score (it was about 0.5946) on the same pair of sentences. This reflects one of the goals of the METEOR metric to more closely mimic human judgement versus the BLEU score, as most people would agree that the sentences are overall very similiar, i.e. that changing “the” to “a” in the translation would be a minor error.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Because of the increased weighting for recall, and the use of the harmonic mean which works better than the arithmetic or geometric means for situations where an average of weights is desired, METEOR is a great choice for machine translation models that is relatively simple to calculate (versus more modern methods) and remains easy to reason about. This is especially true for sentence level translations and these are the reasons I chose to use the METEOR score when evaluating my own translation model that I’ll discuss in a future post.
            </Typography>
            <Typography variant='h5' className={styles.title} >
                Conclusion
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                As we’ve seen from the variety of machine translation evaluation metrics, there’s no single method for determining translation accuracy. Depending on which properties of a sentence or corpus are measured, such as unigram recall rate or the weighting of the rareness of particular n-grams, there are a variety of metrics to choose from. On the other hand each metric provides some calculation of common components of a translation, usually the overlap of n-grams using some type of average.
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                Translation metrics is still a field of active development, but it’s not uncommon for newer methods to be compared to the three metrics described here. In fact Google recently announced a newly developed metric they call “BLEURT” (<a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://ai.googleblog.com/2020/05/evaluating-natural-language-generation.html">Google AI Blog: Evaluating Natural Language Generation with BLEURT</a>), so it’s clear that BLEU is still often considered the metric to beat!
            </Typography>
            <Typography variant='h6' className={styles.title} >
                Supplement: Mathematical Details
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                <strong>Arithmetic mean</strong>: The NIST metric utilizes the arithmetic mean, which is the most common version of an average and is usually what is implied when someone uses the word “mean” on its own. The arithmetic mean is the sum of n numbers divided by n:
            </Typography>
            <Typography variant='body1' className={styles.equation}>
                <MathJaxContext config={mathJaxConfig}>
                    <MathJax>{"`A = frac{1}{n} sum_{i-1}^n x_i = frac{x_1 + x_2 + ... + x_n}{n}`"}</MathJax>
                </MathJaxContext>
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
            For instance, the arithmetic mean of 2, 4, and 3 would be (2 + 4 + 3) / 3 = 9/3 = 3
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                <strong>Geometric mean</strong>: The BLEU metric utilizes the geometric mean of the number of overlapping n-grams. The geometric mean is defined as the nth root of the product of n numbers:
            </Typography>
            <Typography variant='body1' className={styles.equation}>
                <MathJaxContext config={mathJaxConfig}>
                    <MathJax>{"`G = (prod_{i=1}^n x_i)^frac{1}{n} = sqrt[n]{x_1 x_2 ... x_n}`"}</MathJax>
                </MathJaxContext>
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                For instance, the geometric mean of the numbers 1, 4, and 2 would be (1 * 4 * 2) ^ (1/3) = 8^(1/3) = 2
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                <strong>Harmonic mean</strong>: The METEOR metric utilizes the harmonic mean of the number of overlapping n-grams. The harmonic mean is defined as the reciprocal of the arithmetic mean of the reciprocals of n numbers:
            </Typography>
            <Typography variant='body1' className={styles.equation}>
                <MathJaxContext config={mathJaxConfig}>
                    <MathJax>{"`H = (frac{sum_{i=1}^n x_i^{-1}}{n})^{-1} = frac{n}{sum_{i=1}^n frac{1}{x_i}} = frac{n}{frac{1}{x_1} + frac{1}{x_2} + ... + frac{1}{x_n}}`"}</MathJax>
                </MathJaxContext>
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                For instance, the harmonic mean of 1, 4, and 4 would be ((1/1 + 1/4 + 1/4) / 3) ^ (-1) = 3/(1 + 0.25 + 0.25) = 3/1.5 = 2
            </Typography>
            <Typography variant='h6' className={styles.title} >
                Supplement: Original Papers for Machine Translation Metrics
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                BLEU: <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.aclweb.org/anthology/P02-1040.pdf">BLEU: a Method for Automatic Evaluation of Machine Translation</a>
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                NIST: <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://dl.acm.org/doi/pdf/10.5555/1289189.1289273">Automatic Evaluation of Machine Translation Quality Using N-gram Co-Occurrence Statistics</a>
            </Typography>
            <Typography variant='body1' className={styles.paragraph} >
                METEOR: <a className={styles.link} target="_blank" rel="noopener noreferrer" href="https://www.cs.cmu.edu/~alavie/METEOR/pdf/Lavie-Agarwal-2007-METEOR.pdf">Meteor: An Automatic Metric for MT Evaluation with High Levels of Correlation with Human Judgments</a>
            </Typography>
        </div>
    </>;
}

export default EvaluatingMachineTranslationModels;
