import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import hljs from 'highlight.js/lib/highlight';
import Highlight from 'react-highlight.js';

import Topbar from "../components/Topbar";

const backgroundShape = require("../images/shape.svg");

// allow single-line comments in code examples
hljs.configure({ useBR: true })

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
  },
  highlight: {
    padding: '0px 48px'
  }
});

class PythonFeaturesInJS extends Component {
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

    const pyContent1 = "example_list = [1, 2, 3, 4]";
    const pyContent2 = "example_list[:1] # -> [1]";
    const pyContent3 = "example_list[1:] # -> [2, 3, 4]";
    const pyContent4 = "example_list[1:3] # -> [2, 3]";
    const pyContent5 = "example_list[0:4:2] # -> [1, 3]";

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.block} >
            Python Features I Would Love To Have In JavaScript
          </Typography>
          <Typography variant='body1' className={classes.block} >
            As someone who primarily learned to code using JavaScript, reading languages like C and Java wasn’t too much of a struggle once I learned to read the typing-related code (something that became all the more easy after adopting TypeScript). But once I started digging deeper into machine learning and data science it became clear I would not be able to avoid learning Python. I was reluctant to learn it primarily because its syntax is so different from that of JavaScript (whitespace?!), and I was unmoved by people and <a href="https://xkcd.com/353/">comics seeking the language’s praises</a>.
          </Typography>
          <Typography variant='body1' className={classes.block} >
            But I eventually acquiesced and once I got comfortable reading and writing Python I discovered some things I actually enjoyed about the language. In fact these were things I wish I could adopt into my JavaScript code. Below is a short list of these features:
          </Typography>
          <Typography variant='h5' className={classes.block} >
            1. Slicing Notation
          </Typography>
          <Typography variant='body1' className={classes.block} >
            This was probably the first part of Python’s syntax that made me react with “Okay, that’s pretty cool.” Python’s slicing syntax gives you the ability to easily get multiple subsections of any list (i.e., “array” in JavaScript). It looks like the following:
          </Typography>
          <Highlight className={classes.highlight} language='python'>
            {pyContent1}
            <br/>
            {pyContent2}
            <br/>
            {pyContent3}
            <br/>
            {pyContent4}
          </Highlight>
          <Typography variant='body1' className={classes.block} >
            As you can see, the slice notation syntax can be thought of as consisting of optional "start" and "stop" values like so <code>[start:stop]</code> (Technically both the "start" and "stop" values can be optional because using <code>[:]</code> will return a complete copy of the original list), but you can also use a "step" property to skip values within the sliced subsets like so:
          </Typography>
          <Highlight className={classes.highlight} language='python'>
            {pyContent5}
          </Highlight>

        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(PythonFeaturesInJS));
