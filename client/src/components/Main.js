import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Image from 'material-ui-image';

import radialGradient from '../images/radial_gradient1.png';
import Topbar from "./Topbar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: '100%',
    height: "100%",
    width: "100%",
  },
  backgroundGraph: {
    position: "absolute",
    backgroundColor: theme.palette.grey["100"],
    height: "100%",
    width: "100%",
    imageRendering: "-webkit-optimize-contrast",
  },
  siteTitleContainer: {
    position: "absolute",
    bottom: "0px",
    maxWidth: "790px",
    // lower on mobile
    ['@media (min-width:780px)']: { // eslint-disable-line no-useless-computed-key
      bottom: "70px",
    }
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(3.5),
    fontSize: "40px",
  },
  subTitle: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(3.5),
  },
  grid: {
    width: 1200,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary,
    margin: theme.spacing(2)
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
  outlinedButton: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  postHeading: {
    display: "flex",
    justifyContent: "space-between",
  },
  postDescription: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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

class Main extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <div className={classes.backgroundGraph}>
          <Image
            imageStyle={{
              height: "576px",
              width: "100%",
            }}
            src={radialGradient}
          />
          </div>
          <Container className={classes.siteTitleContainer} >
            <Typography className={classes.title} gutterBottom>
              Howdy! I'm Curtis Mitchell, a software engineer based in San Francisco.
            </Typography>
            <Typography className={classes.subTitle} gutterBottom>
              Welcome to my website where I host my articles and projects at the intersection of machine learning, natural language processing, web development, and mathematics.
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Main));
