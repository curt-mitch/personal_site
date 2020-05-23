import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
          <Typography variant='body1' className={classes.block} >
            I’m a software developer based in the San Francisco Bay Area. I’ve worked at a variety of analytics- and machine learning-startups as a web developer, and now I’m pursing Springboard’s machine learning engineering track as another pivot in my career path of using technology to make complex data more comprehensible.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            Background &#38; Side Projects
          </Typography>
          <Typography variant='body1' className={classes.block} >
            I transitioned to software development after spending several years as a data analyst at an alternative energy and efficiency consultancy. I became a member of one of the first cohorts of the coding boot camp Hack Reactor in 2013 and since then have worked at various startups, primarily as a front-end engineer. Now I’m studying machine learning engineering in one of the first cohorts of that program via Springboard. I obtained a bachelor of science degree in physics and a bachelor of arts degree in math along with minors in German and Japanese from the University of North Texas.
          </Typography>
          <Typography variant='body1' className={classes.block} >
            More recently I’ve been working on courses and side projects in machine learning (especially deep learning), mathematics (especially statistics) and natural language processing. This website gives a place to write about and showcase that work as well as tinker with JavaScript libraries and web development practices.
          </Typography>
          <Typography variant='body1' className={classes.block} >
            Outside of the worlds of software and analytics my hobbies include reading all categories of books, studying foreign languages, cooking, martial arts and general exercise, playing guitar, and pursuing the everlasting struggle to find a balance between the desire to enjoy delicious foods and drinks with the desire to be fit and healthy.
          </Typography>
          <Typography variant='body1' className={classes.block} >
          For more information on my work, to get in touch regarding employment opportunities, or to just say hello, feel free to get in touch at curtis.l.mitchell AT gmail.com.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(About));
