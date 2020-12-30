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
import CanvasDraw from "react-canvas-draw";

import Topbar from "../components/Topbar";

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
    width: 280,
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto'
  },
  predictionBtn: {
    // marginRight: '18px',
  },
  canvasInput: {
    border: '1px solid #000',
    margin: 'auto',
  }
});

class UrduLetterClassifier extends Component {
  state = {
    predictionAbsent: true,
    sketchboxEmpty: true,
    predictedLetter: '',
    fetchingClassification: false,
    errorState: null,
  };

  makeClassificationRequest() {
    const canvasData = this.saveableCanvas.getSaveData();
    const canvasGrid = this.saveableCanvas.canvas.grid;
    const imgData = canvasGrid.getContext('2d').getImageData(0, 0, 280, 280);
    console.log(imgData)
      this.setState({
        fetchingClassification: true,
      });
      // axios
      // .get(`${process.env.REACT_APP_HOST_IP_ADDRESS}/apGridp_en_translator/predict?input_text=${textValue}`)
      // .then(res => {
      //   this.showClassificationResult(res.data.prediction);
      //   this.setState({
      //     fetchingClassification: false,
      //   });
      // })
      // .catch(err => {
      //   console.error(err);
      //   const message = `The server does not appear to be connected. Please try again later.
      //   サーバーが接続されていないようです。 後でもう一度やり直してください。`
      //   this.setErrorState(message);
      //   this.setState({
      //     fetchingClassification: false,
      //   });
      // });
  }

  updateEmptyState(e) {
    this.setState({
      sketchboxEmpty: false,
    });
  }

  onTextFieldChange(textValue) {
    if (textValue.length > 0) {
      this.setState({
        sketchboxEmpty: false,
        japaneseText: textValue,
        errorState: null,
      })
    } else {
      this.setState({
        sketchboxEmpty: true,
        japaneseText: '',
        errorState: null,
      })
    }
  }

  showClassificationResult(predictedLetter) {
    if (predictedLetter.error) {
      if (predictedLetter.error === 'KeyError') {
        const message = `It appears one or more words are not included in the model's lexicon. Please try a different phrase.
        1つ以上の単語がモデルのレキシコンに含まれていないようです。別のフレーズを試してください。`;
        this.setErrorState(message)
      }
    } else {
      this.setState({ predictedLetter });
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
            Urdu Letter Classifier
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            <strong>Note</strong>: A walkthrough of this project is forthcoming.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            This application takes in a drawing of an Urdu letter and attempts to predict which letter was drawn. It was trained on the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.kaggle.com/hazrat/uhat-urdu-handwritten-text-dataset">UHaT (Urdu Handwritten Text) dataset</Link> using a convolutional neural network with max pooling and dropout.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Not an Urdu-speaker? Just click this link to go to the Wikipedia entry for the Urdu Alphabet and write one of the characters from the left side of the table of letters: <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Urdu_alphabet">Urdu Alphabet</Link>. Note that the Urdu alphabet, like the Arabic and Persian alphabets it's derived from, has joined and isolated versions of most of the letters. For example, this is the isolated version of the letter "be": ب , but here are three connected "be" letters: ببب , which shows the different connected versions. <strong>This classifier works only for the isolated versions of each letter</strong>.
          </Typography>
          <div className={classes.jpInputContainer}>
          <CanvasDraw
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            className={classes.canvasInput}
            hideGrid={true}
            canvasHeight={280}
            canvasWidth={280}
            brushRadius={5}
            onChange={(e) => { this.updateEmptyState(e)}}
          ></CanvasDraw>
            <div className={classes.buttonSpinnerContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.sketchboxEmpty}
                className={classes.predictionBtn}
                onClick={() => this.makeClassificationRequest()}>
                Get Prediction
              </Button>
              { this.state.fetchingClassification ? <CircularProgress /> : null }
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.sketchboxEmpty}
                className={classes.predictionBtn}
                onClick={() => this.saveableCanvas.clear()}>
                Clear
              </Button>
            </div>
            <TextField
              placeholder=""
              helperText="The predicted letter will appear here"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={this.state.predictedLetter}
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

export default withRouter(withStyles(styles)(UrduLetterClassifier));
