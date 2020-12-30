import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { solarizedDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Topbar from "../components/Topbar";

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
  title: {
    padding: theme.spacing(2),
    maxWidth: '700px',
    margin: 'auto',
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: "absolute",
    top: "40%",
    left: "40%"
  },
  codeHighlight: {
    padding: '0px 48px',
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
  codeSample: {
    backgroundColor: '#EDEDED',
    fontFamily: 'Courier, monospace',
  },
});

class PythonFeaturesInJS extends Component {

  render() {
    const { classes } = this.props;

    const pyContent1 =
`  example_list = [1, 2, 3, 4]
  example_list[:1] # -> [1]
  example_list[1:] # -> [2, 3, 4]
  example_list[1:3] # -> [2, 3]`;
    const pyContent2 = "  example_list[0:4:2] # -> [1, 3]";
    const pyContent3 = "  [ expression for value in iterable]";
    const pyContent4 =
`  doubled_list = [i * 2 for i in [1,2,3]]
  doubled_list # [2, 4, 6]`;
    const pyContent5 =
`  original_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  transposed_matrix = [[row[i] for row in original_matrix] for i in range(3)]
  transposed_matrix # [[1, 4, 7], [2, 5, 8], [3, 6, 9]]`;
    const pyContent6 =
`  def rectangle_area(width=0,height=0):
      return width * height`;
    const pyContent7 =
`  rectangle_area(5, 7)
  rectangle_area(width=5, height=7)
  rectangle_area(height=7, width=5)`;
    const jsContent1 =
`  function rectangleArea(rectangleObj) {
      return rectangleObj.width * rectangleObj.height;
  }
  rectangleArea({ width: w, height: h });
  rectangleArea({ height: h, width: w });`;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            Three Python Features I Would Love To Have In JavaScript
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            As someone who primarily learned to code using JavaScript, reading languages like C and Java wasn’t too much of a struggle once I learned to read the typing-related code (something that became all the more easy after adopting TypeScript). But once I started digging deeper into machine learning and data science it became clear I would not be able to avoid learning Python. I was reluctant to learn it primarily because its syntax is so different from that of JavaScript (whitespace?!), and I was unmoved by people and <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://xkcd.com/353/">comics</Link> singing the language’s praises (well, maybe slightly moved by the comics).
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            But I eventually acquiesced and once I got comfortable reading and writing Python I discovered some things I actually enjoyed about the language. In fact these were things I wish I could adopt into my JavaScript code. Below is a short list of these features:
          </Typography>
          <Typography variant='h5' className={classes.title} >
            1. Slicing Notation
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            This was probably the first part of Python’s syntax that made me react with “Okay, that’s a pretty nice feature.” Python’s slicing syntax gives you the ability to easily get multiple subsections of any list (i.e., “array” in JavaScript). It looks like the following:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent1}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            As you can see, the slice notation syntax can be thought of as consisting of optional "start" and "stop" values like so <span className={classes.codeSample}>[start:stop]</span> (Technically both the "start" and "stop" values can be optional because using <span className={classes.codeSample}>[:]</span> will return a complete copy of the original list), but you can also use a "step" property to skip values within the sliced subsets like so:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent2}
          </SyntaxHighlighter>
          <Typography variant='h5' className={classes.title} >
            2. List Comprehensions
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            List comprehensions are a prime example of one of the original goals of Python: to make code read more like a human language (at least if you’re an English speaker!). Comprehensions give you a simple way to create new lists using this basic syntax:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent3}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            Here is a simple example:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent4}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            You can even create nested comprehensions, which are especially useful when dealing with nested data structures such as matrices:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent5}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            Unfortunately, although list comprehensions were actually on the roadmap for ECMAScript 2015 and even implemented in some versions of Firefox, the feature was later removed: <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/Array_comprehensions">Array comprehensions - Archive of obsolete content | MDN</Link>
          </Typography>
          <Typography variant='h5' className={classes.title} >
            3. Named Parameters
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Python gives you the ability to both pass arguments to a method in a set order, just like you would in JavaScript, or create named parameters that are defined with a default value and that can then be passed in any order. Let’s look at an example:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent6}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            I could call this method in any of the following ways:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'python'}
            style={solarizedDark}
            wrapLines={true}
          >
            {pyContent7}
          </SyntaxHighlighter>
          <Typography variant='body1' className={classes.paragraph} >
            You can sort of adopt this pattern in JavaScript methods using objects:
          </Typography>
          <SyntaxHighlighter
            className={classes.codeHighlight}
            language={'javascript'}
            style={solarizedDark}
            wrapLines={true}
          >
            {jsContent1}
          </SyntaxHighlighter>
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
