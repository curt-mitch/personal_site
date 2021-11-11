import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';

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

class FrontendMigrationNote extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            Upcoming Website Updates
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            I'm closing in on one year since I've written a new piece for this site, but I wanted to leave one now to avoid the impression I'm no longer maintaining this project. Part of the reason has been a recent move and starting my current role at <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.nasa.gov/ames/">NASA Ames</Link> back in May. More recently I’ve been busy working on refactoring parts of the site, primarily on the frontend. When I first created the site I didn’t spend much of my effort on the client-side code. At the time I was enrolled in Springboard’s <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.springboard.com/courses/ai-machine-learning-career-track/">machine learning engineering program</Link>, and since I was spending a lot of my time working through that curriculum I wanted to focus on this site’s content and to a lesser extent getting the backend up and running (the backend is built on <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.djangoproject.com/">Django</Link>, which I hadn’t previously worked with).
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            In any case it’s now time for an upgrade. There’s nothing obviously wrong with the site as it is, but there are some additional optimizations I could make and newer React patterns and best practices I’m keen on incorporating. First and foremost, I’m migrating the frontend framework I’m using from <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://create-react-app.dev/">Create React App</Link> to <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://nextjs.org/">Next.js</Link>. Next is also a React-based framework, but it incorporates several new features I haven’t previously used such as server-side rendering and asset optimizations that should improve loading and rendering performance. Additionally, I’ll be switching from standard JavaScript to <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/">TypeScript</Link> for better type safety, updating <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://mui.com/">Material-UI</Link> to utilize server-side rendering, and incorporating modern React patterns like hooks and functional components. I have been attempting to perform this migration more directly, but after several cumulative hours of troubleshooting, reading documentation and Stackoverflow, and banging my head against the wall I’ve decided instead to wholly rebuild the frontend as a new Next app. Dealing with various build and undefined errors got frustrating and since this is a side-project I feel it should be a mostly enjoyable experience! Once the transition is complete the content should all be the same, but the final UI might look slightly different. And once that’s completed (hopefully by New Year’s!) I have a lot of interesting posts planned such as finally writing a walkthrough of the <Link color="secondary" underline="hover" href="/project/urdu-number-classifier">Urdu number classifier</Link> and a post about the history of cryptography.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Stay tuned!
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(FrontendMigrationNote));
