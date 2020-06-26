import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Image from 'material-ui-image'
import profilePicture from '../images/curtis-profile-pic-small.png';

import Topbar from "./Topbar";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
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
    padding: theme.spacing(2),
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
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
  }
});

class About extends Component {
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
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Image
            imageStyle={{
              height: "140px",
              width: "132px",
            }}
            style={{
              height: "140px",
              width: "132px",
              paddingTop: 0,
            }}
            src={profilePicture}
            aspectRatio={(408/433)}
          />
          <Typography variant='body1' className={classes.paragraph} >
            I’m a software developer based in the San Francisco Bay Area. I’ve worked at a variety of analytics- and machine learning-startups as a web developer, and now I’m enrolled in Springboard’s machine learning engineering track in the next stage of my career and pursuit of using technology to make complex data more comprehensible.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            Background
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            I’ve worked at a variety of analytics and machine learning startups and a web developer. Most recently I was at Mode Analytics where I lead a full stack project to capture screenshots of analytics reports and taught JavaScript to other internal teams. Prior to that I worked at Ayasdi where I migrated key parts of our web application from the Backbone framework to React and Redux. I moved into web development after being in one of the first cohorts of the coding bootcamp Hack Reactor, and prior to that I worked as a data analyst and field engineer for the energy consulting firm DNV GL for several years after completing undergraduate degrees in physics and math from the University of North Texas.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Outside of the worlds of software and analytics my hobbies include reading all categories of books, especially fiction and history (recent favorites include <a href="https://www.goodreads.com/book/show/33590210-an-american-marriage">An American Marriage</a>, <a href="https://www.goodreads.com/book/show/223380.Stories_of_Your_Life_and_Others">Stories of Your Life and Others</a>, and <a href="https://www.goodreads.com/book/show/76401.Bury_My_Heart_at_Wounded_Knee">Bury My Heart at Wounded Knee</a>), cooking, martial arts and exercise, and studying foreign languages (previously: German and Spanish, recently: Urdu, continually: Japanese). I also enjoy traveling and probably my favorite travel experience was getting to live in a dojo in rural Japan for a summer while training in Aikido.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            For more information on my work, to get in touch regarding employment opportunities, or to just say hello, feel free to get in touch at curtis.l.mitchell AT gmail.com.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(About));
