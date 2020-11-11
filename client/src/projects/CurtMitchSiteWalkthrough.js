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
    paddingBottom: '100%',
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
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
    maxWidth: '700px',
    margin: 'auto',
  },
});

class CurtMitchSiteWalkthrough extends Component {
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
          <Typography variant='h3' className={classes.title} >
            Curt-Mitch.com
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            I initially started work on this project to test out website and web development ideas, to have a place to tinker with various frameworks and UI libraries, and to have a place to write articles with more control over the appearance and layout. It’s also a showcase of articles and projects to share with recruiters, hiring managers, and colleagues. <span role="img" aria-label="grinning face">😄</span>
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            The frontend portion of the site was bootstrapped using the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://create-react-app.dev/">Create React App</Link> tool and uses <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/">React</Link>, <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://reactrouter.com/">React Router</Link>, and several components from <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://material-ui.com/">Material-UI</Link>. This does mean that the size of the website is not small and that a user must have JavaScript enabled on their browser. Much of the site could certainly be a more lightweight, progressive web application. However building something using React was a primary goal for me and I have nonetheless added <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/docs/code-splitting.html#route-based-code-splitting">router-based code splitting</Link> to reduce the loading time by about 30% to 50% across the site.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            The backend of the website is a <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.djangoproject.com/">Django</Link> application with a <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.sqlite.org/index.html">SQLite</Link> database. I built this backend in order to learn the Django framework itself and to have an environment for deploying my Python-based machine learning projects. Additionally, I’m using the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.django-rest-framework.org/">Django REST framework</Link> for API endpoints rather than utilizing the default Django template layer (the “view” layer in standard MVC architectures).
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            The entire project is hosted on <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.digitalocean.com/">DigitalOcean</Link> and served via <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.docker.com/">Docker</Link> containers. The site's web server is <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.nginx.com/">NGINX</Link> with HTTPS enabled thanks to TLS certificates issued by <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://letsencrypt.org/">Let's Encrypt</Link>. I’ve made additional NGINX customizations to enable HTTP/2 and ensure I have an A+ SSL rating from <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.ssllabs.com/ssltest/analyze.html?d=curt-mitch.com">Qualys</Link>.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            The fractal design on the homepage was generated using this tool: <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="http://rectangleworld.com/blog/archives/462">Generative Art in HTML5 Canvas – Sweeping Fractal Lines</Link>. I also owe my friend and experienced creative director <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="http://www.mbarnesdesigns.com/">Mathew Barnes</Link> my gratitude for his wireframes and design suggestions to give this site a wonderful esthetic boost.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(CurtMitchSiteWalkthrough));
