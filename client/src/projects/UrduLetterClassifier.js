import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CanvasDraw from "react-canvas-draw";

import Topbar from "../components/Topbar";
import PrimaryLoadingScreen from '../components/PrimaryLoadingScreen';

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
  canvasInput: {
    border: '1px solid #000',
    margin: 'auto',
  },
  predictionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  predictionBox: {
    border: '1px solid #000',
    margin: '5px'
  },
  mainUrduCharacter: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  characterNames: {
    // textAlign: 'center',
    fontSize: '20px',
  },
  predictionPercent: {
    fontSize: '20px',
  },
  categoryLabel: {
    fontWeight: 'bold'
  }
});

class UrduLetterClassifier extends Component {
  state = {
    predictionAbsent: true,
    sketchboxEmpty: true,
    predictedLetters: [],
    fetchingClassification: false,
    errorState: null,
  };

  makeClassificationRequest() {
    let imageURL = this.saveableCanvas.canvasContainer.childNodes[1].toDataURL('image/png', 0.1)
    const updateFetchState = this.updateFetchState.bind(this);
    const showClassificationResult = this.showClassificationResult.bind(this);
    run().catch(err => console.log(err));
    async function run() {
      const blob = await fetch(imageURL).then(res => res.blob());
      const formData = new FormData();

      formData.append('letter.png', blob);
      // TODO: this.setState not accessible inside async/await functions
      updateFetchState(true);

      const res = await axios.post(`${process.env.REACT_APP_HOST_IP_ADDRESS}/api/urdu_number_predictor/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      showClassificationResult(res.data);
      updateFetchState(false);
    }

  }

  updateFetchState(currentlyFetching) {
    this.setState({
      fetchingClassification: currentlyFetching,
    });
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

  showClassificationResult(response) {
    console.log('response', response);
    if (response.error) {
      if (response.error === 'KeyError') {
        const message = `There appears to be an error from the server. Please try again later.`;
        this.setErrorState(message)
      }
    } else {
      let predictedLetters = response['predictions'];
      // remove low-probability predictions
      predictedLetters = predictedLetters.filter(p => p.percentage !== "0.00");

      this.setState({
        predictedLetters
      });
    }
  }

  setErrorState(message) {
    this.setState({ errorState: message })
  }

  renderPredictions = (predictedLetters, classes) => {
    if(this.state.fetchingClassification === true) {
      return (<PrimaryLoadingScreen/>);
    } else if (predictedLetters.length > 0) {
      return (
        predictedLetters
          .map(letterInfo => {
            return (
              <div
                key={letterInfo['uuid']}
                className={classes.predictionBox}
              >
                <div className={classes.mainUrduCharacter}>{letterInfo['char']}</div>
                <div className={classes.characterNames}><span className={classes.categoryLabel}>Name</span>: {letterInfo['en']} / {letterInfo['ur']}</div>
                <div className={classes.predictionPercent}><span className={classes.categoryLabel}>Probability</span>: {letterInfo['percentage']}%</div>
              </div>
            );
          })
      );
    } else {
      return null;
    }
  };

  render() {
    const { classes } = this.props;
    const { predictedLetters } = this.state;
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
            brushRadius={2}
            onChange={(e) => { this.updateEmptyState(e)}}
          ></CanvasDraw>
            <div className={classes.buttonSpinnerContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.sketchboxEmpty}
                onClick={() => this.makeClassificationRequest()}>
                Get Prediction
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.sketchboxEmpty}
                onClick={() => this.saveableCanvas.clear()}>
                Clear
              </Button>
            </div>
            <div className={classes.predictionsContainer}>
              { this.renderPredictions(predictedLetters, classes) }
            </div>
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
