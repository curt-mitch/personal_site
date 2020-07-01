import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import hljs from 'highlight.js/lib/highlight';
import Highlight from 'react-highlight.js';

import Topbar from "../components/Topbar";

// allow single-line comments in code examples
hljs.configure({ useBR: true })

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
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
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
  },
  codeSample: {
    backgroundColor: '#EDEDED',
    fontFamily: 'Courier, monospace',
  },
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
    const pyContent6 = "[ expression for value in iterable]";
    const pyContent7 = "doubled_list = [i * 2 for i in [1,2,3]]";
    const pyContent8 = "doubled_list # [2, 4, 6]";
    const pyContent9 = "original_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]";
    const pyContent10 = "transposed_matrix = [[row[i] for row in original_matrix] for i in range(3)]";
    const pyContent11 = "transposed_matrix # [[1, 4, 7], [2, 5, 8], [3, 6, 9]]";
    const pyContent12 = "def rectangle_area(width=0,height=0):";
    const pyContent13 = "  return width * height";
    const pyContent14 = "rectangle_area(5, 7)";
    const pyContent15 = "rectangle_area(width=5, height=7)";
    const pyContent16 = "rectangle_area(height=7, width=5)";
    const jsContent1 = "function rectangleArea(rectangleObj) {";
    const jsContent2 = "  return rectangleObj.width * rectangleObj.height;";
    const jsContent3 = "}";
    const jsContent4 = "rectangleArea({ width: w, height: h });";
    const jsContent5 = "rectangleArea({ height: h, width: w });";

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.block} >
            Python Features I Would Love To Have In JavaScript
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            As someone who primarily learned to code using JavaScript, reading languages like C and Java wasn’t too much of a struggle once I learned to read the typing-related code (something that became all the more easy after adopting TypeScript). But once I started digging deeper into machine learning and data science it became clear I would not be able to avoid learning Python. I was reluctant to learn it primarily because its syntax is so different from that of JavaScript (whitespace?!), and I was unmoved by people and <a href="https://xkcd.com/353/">comics</a> singing the language’s praises (well, maybe slightly moved by the comics).
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            But I eventually acquiesced and once I got comfortable reading and writing Python I discovered some things I actually enjoyed about the language. In fact these were things I wish I could adopt into my JavaScript code. Below is a short list of these features:
          </Typography>
          <Typography variant='h5' className={classes.block} >
            1. Slicing Notation
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            This was probably the first part of Python’s syntax that made me react with “Okay, that’s a pretty nice feature.” Python’s slicing syntax gives you the ability to easily get multiple subsections of any list (i.e., “array” in JavaScript). It looks like the following:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent1}
            <br/>
            {pyContent2}
            <br/>
            {pyContent3}
            <br/>
            {pyContent4}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            As you can see, the slice notation syntax can be thought of as consisting of optional "start" and "stop" values like so <span className={classes.codeSample}>[start:stop]</span> (Technically both the "start" and "stop" values can be optional because using <span className={classes.codeSample}>[:]</span> will return a complete copy of the original list), but you can also use a "step" property to skip values within the sliced subsets like so:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent5}
          </Highlight>
          <Typography variant='h5' className={classes.block} >
            2. List Comprehensions
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            List comprehensions are a prime example of one of the original goals of Python: to make code read more like a human language (at least if you’re an English speaker!). Comprehensions give you a simple way to create new lists using this basic syntax:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent6}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            Here is a simple example:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent7}
            <br/>
            {pyContent8}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            You can even create nested comprehensions, which are especially useful when dealing with nested data structures such as matrices:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent9}
            <br/>
            {pyContent10}
            <br/>
            {pyContent11}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            Unfortunately, although list comprehensions were actually on the roadmap for ECMAScript 2015 and even implemented in some versions of Firefox, the feature was later removed: <a href="https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/Array_comprehensions">Array comprehensions - Archive of obsolete content | MDN</a>
          </Typography>
          <Typography variant='h5' className={classes.block} >
            3. Named Parameters
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Python gives you the ability to both pass arguments to a method in a set order, just like you would in JavaScript, or create named parameters that are defined with a default value and that can then be passed in any order. Let’s look at an example:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent12}
            <br/>
            {pyContent13}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            I could call this method in any of the following ways:
          </Typography>
          <Highlight className={classes.highlight} language={'python'}>
            {pyContent14}
            <br/>
            {pyContent15}
            <br/>
            {pyContent16}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            You can sort of adopt this pattern in JavaScript methods using objects:
          </Typography>
          <Highlight className={classes.highlight} language={'javascript'}>
            {jsContent1}
            <br/>
            {jsContent2}
            <br/>
            {jsContent3}
            <br/>
            {jsContent4}
            <br/>
            {jsContent5}
          </Highlight>
          <Typography variant='body1' className={classes.paragraph} >
            But I personally find the Python pattern easier to read at-a-glance, especially for methods with more than three or four arguments which are common in several data science and machine learning libraries.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            If you’re a developer who has worked with JavaScript but never with Python, hopefully this gives you a small taste of some of the things Python does well. Some features such as the mandatory whitespace and lack of keywords for variable declarations still look a little strange when I step back into Python after working in JavaScript for a while, but I am enjoying working with these features and many other methods in the standard library on a daily basis.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(PythonFeaturesInJS));
