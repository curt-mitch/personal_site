import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Image from 'material-ui-image'
import profilePicture from '../images/curtis-profile-pic-small.png';

import Topbar from "./Topbar";

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
    padding: theme.spacing(2),
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
  },
  externalLink: {
    padding: theme.spacing(1),
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
  },
  externalLink: {
    fontSize: "20px",
    marginLeft: "20px",
    marginTop: "8px",
  },
  linkText: {
    paddingLeft: "8px",
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
              margin: '12px auto'
            }}
            src={profilePicture}
            aspectRatio={(408/433)}
          />
          <Typography variant='body1' className={classes.paragraph} >
            I’m a software developer based in the San Francisco Bay Area. After having worked as a web developer at a variety of analytics- and machine learning-startups I’m now enrolled in Springboard’s <Link color="secondary" underline="hover" href="https://www.springboard.com/workshops/ai-machine-learning-career-track/">machine learning engineering track</Link> in the next stage of my career and pursuit of using technology to make complex data more comprehensible.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            Background
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            I’ve worked at a variety of analytics and machine learning startups as a web developer. Most recently I was at <Link color="secondary" underline="hover" href="https://mode.com/">Mode Analytics</Link> where I was the lead engineer on a full stack project to capture screenshots of analytics reports and conducted a JavaScript workshop for other internal teams. Prior to that I worked at <Link color="secondary" underline="hover" href="https://www.ayasdi.com/">Ayasdi</Link> where I migrated key parts of our web application UI from the Backbone framework to React and Redux and helped implement a complex UX feature wherein data points selected by a user in one visualization were simultaneously highlighted in other visualizations of the same dataset.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            I moved into web development after being in one of the first cohorts of the coding bootcamp <Link color="secondary" underline="hover" href="https://www.hackreactor.com/">Hack Reactor</Link>, and prior to that I worked as a data analyst and field engineer for the energy consulting firm <Link color="secondary" underline="hover" href="https://www.dnvgl.com/">DNV GL</Link> for several years after completing undergraduate degrees in physics and math from the <Link color="secondary" underline="hover" href="https://www.unt.edu/">University of North Texas</Link>. As a born-and-raised Texan living in the Bay Area I like to refer to myself as a NorCal Texpat. 🤠
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Outside of the worlds of software and analytics my hobbies include reading all categories of books, especially fiction and history (recent favorites include <Link color="secondary" underline="hover" href="https://www.goodreads.com/book/show/33590210-an-american-marriage">An American Marriage</Link>, <Link color="secondary" underline="hover" href="https://www.goodreads.com/book/show/223380.Stories_of_Your_Life_and_Others">Stories of Your Life and Others</Link>, and <Link color="secondary" underline="hover" href="https://www.goodreads.com/book/show/76401.Bury_My_Heart_at_Wounded_Knee">Bury My Heart at Wounded Knee</Link>), cooking, meditation, martial arts and exercise, and studying foreign languages (previously: German and Spanish, recently: Urdu, continually: Japanese). I also enjoy traveling and probably my favorite travel experience was getting to live in a dojo in rural Japan for a summer while training in Aikido.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            For more information on my work, to get in touch regarding employment opportunities, or to just say hello, feel free to get in touch at curtis.l.mitchell AT gmail.com.
          </Typography>
          <Typography variant='h5' className={classes.block} >
            External Links
          </Typography>
          <Typography variant='body1' className={classes.externalLink} >
            <FontAwesomeIcon className={classes.faIcon} icon={['fab', 'github']} /><Link className={classes.linkText} color="secondary" underline="hover" href="https://www.github.com/curt-mitch">Github</Link>
          </Typography>
          <Typography variant='body1' className={classes.externalLink} >
            <FontAwesomeIcon className={classes.faIcon} icon={['fab', 'linkedin']} /><Link className={classes.linkText} color="secondary" underline="hover" href="https://www.linkedin.com/in/curtislmitchell/">LinkedIn</Link>
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(About));
