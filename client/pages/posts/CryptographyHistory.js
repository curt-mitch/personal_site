import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import Topbar from "../../src/components/Topbar";

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
  sectionTitle: {
    paddingLeft: theme.spacing(2),
    textDecoration: 'underline',
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
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
    maxWidth: '700px',
    margin: 'auto',
  },
  caesarCypher: {}
});

class CryptographyHistory extends Component {
  state = {
    // learnMoredialog: false,
    // getStartedDialog: false
  };

  encipherText() {
    const originalValue = this.cypherText.value;
    let cypherText = originalValue;

    for (let i=0; i < cypherText.length; i++) {

    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            Cryptography: The First 2000 Years
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            It’s not hard to imagine that for as long as humans have lived in groups there has been a desire to keep certain kinds of knowledge secret. At the same time humans are social creatures with a capability for communication in general and language in particular that is unmatched by any other species. The desire to communicate while also keeping that communication safe from prying eyes and ears lead to the development of cryptography.
          </Typography>
          <Typography variant='h5' className={classes.title} >
            The Caesar Cypher
          </Typography>
          <div className={classes.caesarCypher}>
            <label htmlFor="original-text">Original Text</label>
            <textarea
              ref={originalText => (this.originalText = originalText)}
              id="original-text"
              name="original-text"
              rows="5"
              cols="33"
              placeholder="It was a dark and stormy night..."
              >
            </textarea>
            <button onClick={() => this.encipherText()}>Encipher Text</button>
            <label htmlFor="cypher-text">Cypher Text</label>
            <textarea
              ref={cypherText => (this.cypherText = cypherText)}
              id="cypher-text"
              name="cypher-text"
              rows="5"
              cols="33">
            </textarea>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CryptographyHistory);
