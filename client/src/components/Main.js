import React, { Component } from "react";
import { Link } from 'react-router-dom';
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Topbar from "./Topbar";

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
  backgroundGraph: {
    color: "green",
    height: "100%",
    width: "100%",
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
  actionButton: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 175
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },
  btnContainer: {
    marginBottom: 40,
    marginLeft: 20,
    height: 55,
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
          <div className={classes.backgroundGraph} />
          <Typography className={classes.subTitle} gutterBottom>
            Howdy! I'm Curtis Mitchell, a software engineer based in San Francisco. Welcome to my website where I host my articles and projects at the intersection of machine learning, natural language processing, web development, and mathematics.
          </Typography>
          <div className={classes.btnContainer}>
            <Button
              color="primary"
              variant="contained"
              className={classes.actionButton}
              component={Link}
              to="/posts"
            >
              Go to Posts
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.actionButton}
              component={Link}
              to="/projects"
            >
              Go to Projects
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Main));
