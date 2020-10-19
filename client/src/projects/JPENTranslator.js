import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Topbar from "../components/Topbar";

// TODO: use https://github.com/wooorm/franc to detect Japanese in input before sending to backend

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
  jpInputContainer: {
    padding: '0px 48px',
    margin: '8px'
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
  },
});

class JPENTranslator extends Component {
  state = {
    predictionAbsent: true,
    jpTextAbsent: true,
    japaneseText: '',
    englishTranslation: '',
};

  makeTranslationRequest() {
    const textValue = this.state.japaneseText;

    axios
      .get(`http://localhost:8000/api/jp_en_translator/predict?input_text=${textValue}`)
      .then(res => {
        this.showTranslationResult(res.data.prediction);
      })
      .catch(err => console.error(err));
  }

  onTextFieldChange(textValue) {
    if (textValue.length > 0) {
      this.setState({
        jpTextAbsent: false,
        japaneseText: textValue,
      })
    } else {
      this.setState({
        jpTextAbsent: true,
        japaneseText: '',
      })
    }
  }

  showTranslationResult(englishTranslation) {
    this.setState({ englishTranslation });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.block} >
            Japanese-To-English Translation Application
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            This application takes in a Japanese sentence and returns a predicted English translation of that sentence. It was trained on the <Link color="secondary" underline="hover" href="https://nlp.stanford.edu/projects/jesc/">JESC Japanese-English Subtitle Corpus</Link> using an encoder-decoder neural network. To read more about the design and training of the model please read my post here.
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
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.jpTextAbsent}
              onClick={() => this.makeTranslationRequest()}>
              Get Translation
            </Button>
            <TextField
              placeholder=""
              helperText="The English translation will appear here - 英訳がここにがここに表示させます"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={this.state.englishTranslation}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(JPENTranslator));
