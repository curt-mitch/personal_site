import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Topbar from "../components/Topbar";
import isJapaneseText from "../utils/jpTextDetector";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: '100%',
    height: "100%",
    width: "100%",
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
  title: {
    padding: theme.spacing(2),
    maxWidth: '700px',
    margin: 'auto',
  },
  jpInputContainer: {
    padding: '0px 24px',
    maxWidth: '700px',
    margin: 'auto',
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
    maxWidth: '700px',
    margin: 'auto',
  },
  errorMessage: {
    color: 'red',
  },
  buttonSpinnerContainer: {
    display: 'flex'
  },
  translationBtn: {
    marginRight: '18px',
  }
});

class JPENTranslator extends Component {
  state = {
    predictionAbsent: true,
    jpTextAbsent: true,
    japaneseText: '',
    englishTranslation: '',
    fetchingTranslation: false,
    errorState: null,
};

  makeTranslationRequest() {
    const textValue = this.state.japaneseText;
    if (isJapaneseText(textValue)) {
      this.setState({
        fetchingTranslation: true,
      });
      axios
      .get(`${process.env.REACT_APP_HOST_IP_ADDRESS}/api/jp_en_translator/predict?input_text=${textValue}`)
      .then(res => {
        this.showTranslationResult(res.data.prediction);
        this.setState({
          fetchingTranslation: false,
        });
      })
      .catch(err => {
        console.error(err);
        const message = `The server does not appear to be connected. Please try again later.
        サーバーが接続されていないようです。 後でもう一度やり直してください。`
        this.setErrorState(message);
        this.setState({
          fetchingTranslation: false,
        });
      });
    } else {
      const message = `The input text does not appear to be Japanese. Please try a different sentence.
      入力テキストが日本語ではないようです。別の文を試してください。`
      this.setErrorState(message);
    }
  }

  onTextFieldChange(textValue) {
    if (textValue.length > 0) {
      this.setState({
        jpTextAbsent: false,
        japaneseText: textValue,
        errorState: null,
      })
    } else {
      this.setState({
        jpTextAbsent: true,
        japaneseText: '',
        errorState: null,
      })
    }
  }

  showTranslationResult(englishTranslation) {
    if (englishTranslation.error) {
      if (englishTranslation.error === 'KeyError') {
        const message = `It appears one or more words are not included in the model's lexicon. Please try a different phrase.
        1つ以上の単語がモデルのレキシコンに含まれていないようです。別のフレーズを試してください。`;
        this.setErrorState(message)
      }
    } else {
      this.setState({ englishTranslation });
    }
  }

  setErrorState(message) {
    this.setState({ errorState: message })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            Japanese-To-English Translation Application
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            <strong>Note</strong>: A walkthrough of this project can be found here: <Link color="secondary" underline="hover" href="/post/jp-en-translator-walkthrough">Creating a Japanese-English Translation Application</Link>.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            This application takes in a Japanese sentence and returns a predicted English translation of that sentence. It was trained on the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://nlp.stanford.edu/projects/jesc/">JESC Japanese-English Subtitle Corpus</Link> using an encoder-decoder neural network.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Not a Japanese-speaker? Just click this link to got to Google Translate where you can create and copy some Japanese text to paste back here: <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://translate.google.com/#view=home&op=translate&sl=en&tl=ja">EN-JP Google Translate</Link>
          </Typography>
          <div className={classes.jpInputContainer}>
            <TextField
              placeholder="こんにちは"
              helperText="Add Japanese text here - ここに日本語のテキストを入力してください"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={e => this.onTextFieldChange(e.target.value)}
            />
            <div className={classes.buttonSpinnerContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.jpTextAbsent}
                className={classes.translationBtn}
                onClick={() => this.makeTranslationRequest()}>
                Get Translation
              </Button>
              { this.state.fetchingTranslation ? <CircularProgress /> : null }
            </div>
            <TextField
              placeholder=""
              helperText="The English translation will appear here - 英訳がここに表示させます"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={this.state.englishTranslation}
            />
            <Typography className={classes.errorMessage}>
              {this.state.errorState}
            </Typography>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(JPENTranslator));
