import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CanvasDraw from "react-canvas-draw";

import Topbar from "../../src/components/Topbar";
import PrimaryLoadingScreen from '../../src/components/PrimaryLoadingScreen';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
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
  urInputContainer: {
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
    justifyContent: "space-evenly",
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
    fontSize: '20px',
  },
  predictionPercent: {
    fontSize: '20px',
  },
  categoryLabel: {
    fontWeight: 'bold'
  }
});

class UrduNumberClassifier extends Component {
  state = {
    predictionAbsent: true,
    sketchboxEmpty: true,
    predictedNumbers: [],
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

      formData.append('number.png', blob);
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

  resetPredictor() {
    this.saveableCanvas.clear();
    this.setState({
      predictedNumbers: []
    });
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
      let predictedNumbers = response['predictions'];
      // remove low-probability predictions
      predictedNumbers = predictedNumbers.filter(p => p.percentage !== "0.00");

      this.setState({
        predictedNumbers
      });
    }
  }

  setErrorState(message) {
    this.setState({ errorState: message })
  }

  renderPredictions = (predictedNumbers, classes) => {
    if(this.state.fetchingClassification === true) {
      return (<PrimaryLoadingScreen/>);
    } else if (predictedNumbers.length > 0) {
      return (
        predictedNumbers
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
    const { predictedNumbers } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            Urdu Number Classifier
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            <strong>Note</strong>: A walkthrough of this project is forthcoming.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            This application takes in a drawing of a single Urdu number and attempts to predict which number was drawn, returning between 1 and 3 possible numbers along with an associated probability value that reflects the model's confidence for that answer. This model was trained on the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.kaggle.com/hazrat/uhat-urdu-handwritten-text-dataset">UHaT (Urdu Handwritten Text) dataset</Link> using a convolutional neural network with max pooling and dropout.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Not an Urdu-speaker? Like the letters in its alphabet, numbers in Urdu are based on the numbers used in the Arabic and Persian languages (also referred to as the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Eastern_Arabic_numerals">Eastern Arabic numerals</Link>). For an idea of what the handwritten variations look like I would suggest this Google image search: <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=handwritten+urdu+numbers&tbm=isch">handwritten Urdu numbers</Link>.
          </Typography>
          <div className={classes.urInputContainer}>
          <CanvasDraw
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            className={classes.canvasInput}
            hideGrid={true}
            canvasHeight={280}
            canvasWidth={280}
            brushRadius={2}
            lazyRadius={5}
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
                onClick={() => this.resetPredictor()}>
                Clear
              </Button>
            </div>
            <div className={classes.predictionsContainer}>
              { this.renderPredictions(predictedNumbers, classes) }
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

export default withStyles(styles)(UrduNumberClassifier);
