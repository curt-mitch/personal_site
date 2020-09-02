import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import hljs from 'highlight.js/lib/highlight';
import Highlight from 'react-highlight.js';

import Topbar from "../components/Topbar";

// allow single-line comments in code examples
hljs.configure({ useBR: true })

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  },
  highlight: {
    padding: '0px 48px'
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
  },
  sectionTitle: {
    paddingLeft: theme.spacing(2),
    textDecoration: 'underline',
  },
  exampleList: {
    paddingLeft: theme.spacing(2),
  },
  codeSample: {
    backgroundColor: '#EDEDED',
    fontFamily: 'Courier, monospace',
  },
});

class EvaluatingMTModels extends Component {
  state = {
    learnMoredialog: false,
    getStartedDialog: false
  };

  componentDidMount() {}

  openDialog = event => {
    this.setState({ learnMoredialog: true });
  };

  dialogClose = event => {
    this.setState({ learnMoredialog: false });
  };

  openGetStartedDialog = event => {
    this.setState({ getStartedDialog: true });
  };

  closeGetStartedDialog = event => {
    this.setState({ getStartedDialog: false });
  };

  render() {
    const { classes } = this.props;

    const pyContent1 = "from nltk.translate.bleu_score import sentence_bleu";
    const pyContent2 = "reference_1 = ['the', 'hungry', 'gray', 'dog', 'ate', 'the', 'tasty', 'treat']";
    const pyContent3 = "hypothesis_1 = ['the', 'hungry', 'gray', 'dog', 'ate', 'the', 'tasty', 'treat']";
    const pyContent4 = "score = sentence_bleu([reference_1], hypothesis_1)";
    const pyContent5 = "score # 1.0";
    const pyContent6 = "hypothesis_2 = ['the', 'hungry', 'gray', 'dog', 'ate', 'a', 'tasty', 'treat']";
    const pyContent7 = "score = sentence_bleu([reference_1], hypothesis_2";
    const pyContent8 = "score # 0.5946035575013605";
    const pyContent9 = "score = sentence_bleu([reference_1], hypothesis_1, weights=(0.5, 0.5))";
    const pyContent10 = "score # 0.7905694150420949";
    const pyContent11 = "from nltk.translate.nist_score import sentence_nist";
    const pyContent12 = "score = sentence_nist([reference_1], hypothesis_1)";
    const pyContent13 = "score # 3.0357142857142856";
    const pyContent14 = "score = sentence_nist([reference_1], hypothesis_2)";
    const pyContent15 = "score # 2.642857142857143";
    const pyContent16 = "from nltk.translate.meteor_score import meteor_score";
    const pyContent17 = "reference_1 = 'the hungry gray dog ate the tasty treat'";
    const pyContent18 = "hypothesis_1 = 'the hungry gray dog ate a tasty treat'";
    const pyContent19 = "score = meteor_score([reference_1], hypothesis_1)";
    const pyContent20 = "score # 0.840561224489796";

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.block} >
            How to Evaluate A Machine Translation Model
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Gauging how accurately a machine learning model performs is one of the key questions any ML practioner needs to answer during model development. For many types of tasks such as image recognition, evaluating how accurate a model’s results are is relatively straightfoward: the image label is either correct or it isn’t. But how do you measure how accurate a machine translation result is? After all, for any but the simplest ideas, it’s usually possible to convey that idea in multiple ways in any language. In this post we’ll examine a few of the most common NLP metrics and how they are computed when assessing the performance of machine translation models.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            As I mentioned above, beyond the simplest of sentences multiple translations of one language to another are possible. For instance, the English sentence “Yesterday I went to the store” could be translated into Spanish as “Ayer yo fui a la tienda.” But since Spanish allows the dropping of subjects (because listeners can infer the subject from the form of the verb’s conjugation), this could also be “Ayer fui a la tienda.” Here is where confusion about the best translation can start to arise. For instance, for a native Spanish-speaker which sentence is closer to the original English sentence? And this is still a fairly simple example where the two languages are relatively closely related and the word order in each sentence is the same!
          </Typography>
          <Typography variant='h5' className={classes.block} >
            Building Blocks
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            With the advent of statistical machine translation in the last 20 years and the more recent rise of deep learning applications in NLP, researchers have created many metrics to “score” the accuracy of machine translation models. These metrics work by examining a variety of measures and linguistic features in sentences and entire documents (usually called a “corpus”, plural “corpuses”). Probably the most commonly used feature across most translation scoring methods is n-grams.
          </Typography>
          <Typography variant='body1' className={classes.sectionTitle} >
            n-grams:
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            In NLP n-grams, where “n” stands for any whole number, are the sets of “n” neighboring words in a text. A “unigram” or 1-gram would be any single word, “bigrams” or 2-grams any two neighboring words, and so forth. Below is a table of n-grams for the sentence “The dog ate the treat”:
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            unigrams: [“The”, “dog”, “ate”, “the”, ”treat”]
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            bigrams: [“The dog”, “dog ate”, “ate the”, “the treat”]
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            trigrams: [“the dog ate”, “dog ate the”, “ate the treat”]
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            4-grams: [“The dog ate the”, “dog ate the treat”]
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            <strong>note</strong>: N-grams over 3 are typically written with the number, but the bigger the n-gram the less frequently it is used for most NLP tasks.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} ></Typography>
          <Typography variant='body1' className={classes.sectionTitle} >
            precision and recall:
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Precision is a measure of how well your model performs at detecting members of the class you’re looking for. The formula for precision can re represented as:
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            true_positives / (true_positives + false_positives).
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Recall (also called “sensitivity”) is similar to precision, wherein the percentage of correct labels that were detected by your model is calculated. Recall can be represented as:
          </Typography>
          <Typography variant='body1' className={classes.exampleList} >
            true_positives / (true_positives + false_negatives).
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Note that each metric discussed here uses a different type of average, the details of which I’ll present towards the end of the post along with links to the original papers that introduced each metric.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            BLEU
          </Typography>
          <Typography variant='body1' className={classes.paragraph}>
            Probably the most well-known NLP metric, and usually the one other NLP metrics are compared to, is the BLEU score. It was proposed by Kishore Papineni and his coauthors in a 2002 paper at the Annual Meeting of the Association for Computational Linguistics (ACL). BLEU stands for “BiLingual Evaluation Understudy” and compares a candidate  sentence (i.e., the machine-generated sentence in the case of NLP models) to reference sentences that are usually created by human translators. The general idea behind the BLEU score is that it compares the n-grams in both the candidate sentence and reference sentences and counts the number of matches. The positions of the n-grams within each sentence do not matter, and the more matches there are the higher the BLEU score is.
          </Typography>
          <Typography variant='body1' className={classes.paragraph}>
            Let’s look at some examples to build our intuition. We’ll compare a known reference sentence and a hypothesis sentence that’s hypothetically the output of a machine translation program, and both sentences will be stored as arrays of tokens representing individual words. We can use the sentence-level BLEU score that comes as part of the NLTK API:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent1}
            <br/>
            {pyContent2}
            <br/>
            {pyContent3}
            <br/>
            {pyContent4}
            <br/>
            {pyContent5}
          </Highlight>
          <Typography variant='body1' className={classes.exampleList} >
            <strong>note</strong>: you may notice that the argument for the reference sentence is inside list brackets. This is because the BLEU methods in NLTK assume there will generally be more than one reference sentence passed as a list.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Not surprisingly, this method returns a perfect score when the two sentences are identical.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            What happens when we change one word in the hypothesis sentence (the second “the” becomes “a”)?
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent6}
            <br/>
            {pyContent7}
            <br/>
            {pyContent8}
            <br/>
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            We can see a dramatic drop in the score here. It won’t be intuitive based on the score value, but the BLEU score is calculated by comparing the precision of n-grams in the hypothesis and reference sentences. Another thing to note is that by default the BLEU methods in NTLK compare 1- to 4-grams. If we were to only compare unigrams and bigrams by specifying their weighting, our score would be significantly boosted:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent9}
            <br/>
            {pyContent10}
            <br/>
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            More concretely, the BLEU score is comparing the precision and recall of the hypothesis sentence versus the reference sentences. Assuming we’re only looking at the unigrams of each sentence, the BLEU score tests to see how many of the words in the reference sentence (8 words total) appear in the hypothesis sentence (7, since the second “the” has become “a”). This would give a score of 7/8 = 0.875.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            When computing the BLEU score for an entire corpus, the precision scores of individual sentences are combined using the geometric mean, along with a penalty applied when the length of the reference corpus is shorter is less than or equal the length of the hypothesis sentence.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            NIST
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            In 2002 DARPA (The US Defense Advanced Research Projects Agency) commissioned NIST (the US National Institute of Standards and Technology) to evaluate and create their own machine translation metric based on BLEU. The result was a method similar to the BLEU score but with a few minor changes such as increased weighting for less-common n-grams and a reduced scoring penalty for shorter sentences (known as the “brevity penalty”):
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent11}
            <br/>
            {pyContent12}
            <br/>
            {pyContent13}
            <br/>
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            and with the second hypothesis sentence:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent14}
            <br/>
            {pyContent15}
            <br/>
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            Notice that the NIST scores will tend to be greater than one. This is due to the differences between the NIST and BLEU methods given above, plus the fact that the NIST method uses the arithmetic mean of the n-gram overlaps while BLEU uses the geometric mean. See the final section below for details on the differences.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            METEOR
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Another popular translation evaluation metric is METEOR, which stands for “Metric for Evaluation of Translation with Explicit ORdering.” METEOR was designed explicitly to make up for some of the shortcomings of BLEU, including a focus on sentence-level translations as opposed to BLEU’s focus on translations at the corpus level. Additionally, METEOR uses the harmonic mean (described in the mathematical details section below) on unigram precision and recall with a greater weighting for recall.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Let’s compute the METEOR scores using the same example sentence we used for the BLEU examples, noting that the <span fontFamily="Monospace">meteor_score</span> method expects sentences as whole strings instead of an array of tokens as with the BLEU and NIST methods:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent16}
            <br/>
            {pyContent17}
            <br/>
            {pyContent18}
            <br/>
            {pyContent19}
            <br/>
            {pyContent20}
            <br/>
          </Highlight>
          <Typography variant='body1' className={classes.exampleList} >
            <strong>note</strong>: The NLTK <span fontFamily="Monospace">meteor_score</span> method takes full sentences as strings (or a list of sentences in the case of reference sentences) for its arguments instead of a list of tokens.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            We can see that the METEOR score is significantly higher here versus that of the BLEU score (it was about 0.5946) on the same pair of sentences. This reflects one of the goals of the METEOR metric to more closely mimic human judgement versus the BLEU score, as most people would agree that the sentences are overall very similiar, i.e. that changing “the” to “a” in the translation would be a minor error.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            Conclusion
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            As we’ve seen from the variety of machine translation evaluation metrics, there’s no single method for determining translation accuracy. Depending on which properties of a sentence or corpus are measured, such as unigram recall rate or the weighting of the rareness of particular n-grams, there are a variety of metrics to choose from. On the other hand each metric provides some calculation of common components of a translation, usually the overlap of n-grams using some type of average.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Translation metrics is still a field of active development, but it’s not uncommon for newer methods to be compared to the three metrics described here. In fact Google recently announced a newly developed metric they call “BLEURT” (<a href="https://ai.googleblog.com/2020/05/evaluating-natural-language-generation.html">Google AI Blog: Evaluating Natural Language Generation with BLEURT</a>), so it’s clear that BLEU is still often considered the metric to beat!
          </Typography>
          <Typography variant='h6' className={classes.block} >
            Mathematical Details
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Arithmetic mean: The NIST metric utilizes the arithmetic mean, which is the most common version of an average and is usually what is implied when someone uses the word “mean” on its own. The arithmetic mean is the sum of n numbers divided by n, i.e. (x1 + x2 + … + xn) / n. For instance, the arithmetic mean of 2, 4, and 3 would be (2 + 4 + 3) / 3 = 9/3 = 3
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Geometric mean: The BLEU metric utilizes the geometric mean of the number of overlapping n-grams. The geometric mean is defined as the nth root of the product of n numbers, i.e. (x1 * x2 * … * xn) ^ (1/n). For instance, the geometric mean of the numbers 1, 4, and 2 would be (1 * 4 * 2) ^ (1/3) = 8^(1/3) = 2
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Harmonic mean: The METEOR metric utilizes the harmonic mean of the number of overlapping n-grams. The harmonic mean is defined as the reciprocal of the arithmetic mean of the reciprocals of n numbers, i.e. ((1/x1 + 1/x2 + … + 1/xn) / n) ^ (-1). For instance, the harmonic mean of 1, 4, and 4 would be ((1/1 + 1/4 + 1/4) / 3) ^ (-1) = 3/(1 + 0.25 + 0.25) = 3/1.5 = 2
          </Typography>
          <Typography variant='h6' className={classes.block} >
            Original Papers for Machine Translation Metrics
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            BLEU: <a href="https://www.aclweb.org/anthology/P02-1040.pdf">BLEU: a Method for Automatic Evaluation of Machine Translation</a>
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            NIST: <a href="https://dl.acm.org/doi/pdf/10.5555/1289189.1289273">Automatic Evaluation of Machine Translation Quality Using N-gram Co-Occurrence Statistics</a>
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            METEOR: <a href="https://www.cs.cmu.edu/~alavie/METEOR/pdf/Lavie-Agarwal-2007-METEOR.pdf">Meteor: An Automatic Metric for MT Evaluation with High Levels of Correlation with Human Judgments</a>
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(EvaluatingMTModels));
