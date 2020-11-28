import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withStyles from "@material-ui/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Image from 'material-ui-image';

import profilePicture from '../images/curtis-profile-pic-small.png';
import Topbar from "./Topbar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 50
  },
  columnsContainer: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    }
  },
  pictureIntroDoubleColumn: {
    display: "flex",
    flexDirection: "row",
    maxWidth: '800px',
    margin: 'auto',
    paddingBottom: '25px',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingBottom: '0',
    }
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  BackgroundTitle: {
    padding: theme.spacing(2),
    maxWidth: '865px',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  },
  title: {
    padding: theme.spacing(2),
    maxWidth: '865px',
    margin: 'auto',
  },
  IntroParagraph: {
    fontSize: '20px',
    lineHeight: "34px",
    textIndent: '20px',
    textAlign: 'justify',
    maxWidth: '450px',
    marginLeft: 'auto',
    paddingLeft: "80px",
    [theme.breakpoints.down("sm")]: {
      fontSize: '16px',
      padding: theme.spacing(2),
      lineHeight: "24px",
      margin: 'auto 16px',
    }
  },
  mainTextColumnLeft: {
    flex: 1,
    maxWidth: '450px',
    marginLeft: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 'auto',
    }
  },
  mainTextColumnRight: {
    flex: 1,
    maxWidth: '450px',
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: 'auto',
    }
  },
  paragraph: {
    padding: theme.spacing(2),
    textIndent: '20px',
    textAlign: 'justify',
    maxWidth: '400px',
    margin: '0 20px',
  },
  externalLink: {
    fontSize: "20px",
    paddingLeft: "20px",
    marginTop: "8px",
    maxWidth: "865px",
    margin: "auto"
  },
  linkText: {
    paddingLeft: "8px",
  },
  talkTitle: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    maxWidth: '865px',
    margin: 'auto',
  },
  publicTalkLink: {
    fontSize: "20px",
    paddingLeft: "12px",
    maxWidth: '865px',
    marginTop: "8px",
    margin: "8px auto"
  },
  talkDescription: {
    maxWidth: '865px',
    paddingLeft: "20px",
    margin: '8px auto',
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
          <div className={classes.pictureIntroDoubleColumn}>
            <Image
              imageStyle={{
                height: "336px",
                width: "317px",
              }}
              style={{
                height: "336px",
                width: "317px",
                paddingTop: 0,
                margin: '12px auto'
              }}
              src={profilePicture}
              aspectRatio={(408/433)}
              alt="profile picture"
            />
            <Typography variant='body1' className={classes.IntroParagraph} >
              I’m a software developer based in the San Francisco Bay Area. After having worked as a web developer at a variety of analytics- and machine learning-startups I recently completed Springboard’s <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.springboard.com/workshops/ai-machine-learning-career-track/">machine learning engineering track</Link> in the next stage of my career and pursuit of using technology to make complex data more comprehensible. (<Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://curt-mitch.com/documents/certificate/">See certificate</Link>)
            </Typography>
          </div>
          <Typography variant='h5' className={classes.BackgroundTitle} >
            Background
          </Typography>
          <div className={classes.columnsContainer}>
            <div className={classes.mainTextColumnLeft}>
              <Typography variant='body1' className={classes.paragraph} >
                I’ve worked at a variety of analytics and machine learning startups as a web developer. Most recently I was at <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://mode.com/">Mode</Link> where I was the lead engineer on a full stack project to capture screenshots of analytics reports and conducted a JavaScript workshop for other internal teams. Prior to that I worked at <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.ayasdi.com/">Ayasdi</Link> where I migrated key parts of our web application UI from the Backbone framework to React and Redux and helped implement a complex UX feature wherein data points selected by a user in one visualization were simultaneously highlighted in other visualizations of the same dataset.
              </Typography>
              <Typography variant='body1' className={classes.paragraph} >
                I moved into web development after being in one of the first cohorts of the coding bootcamp <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.hackreactor.com/">Hack Reactor</Link>, and prior to that I worked as a data analyst and field engineer for the energy consulting firm <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.dnvgl.com/">DNV GL</Link> for several years after completing undergraduate degrees in physics and math from the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.unt.edu/">University of North Texas</Link>. As a born-and-raised Texan living in the Bay Area I like to refer to myself as a NorCal Texpat. 🤠
              </Typography>
            </div>
            <div className={classes.mainTextColumnRight}>
              <Typography variant='body1' className={classes.paragraph} >
                Outside of the worlds of software and analytics my hobbies include reading all categories of books, especially fiction and history (recent favorites include <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/33590210-an-american-marriage">An American Marriage</Link>, <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/223380.Stories_of_Your_Life_and_Others">Stories of Your Life and Others</Link>, and <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.goodreads.com/book/show/76401.Bury_My_Heart_at_Wounded_Knee">Bury My Heart at Wounded Knee</Link>), cooking, meditation, martial arts and exercise, and studying foreign languages (previously: German and Spanish, recently: Urdu, continually: Japanese). I also enjoy traveling and probably my favorite travel experience was getting to live in a dojo in rural Japan for a summer while training in Aikido.
              </Typography>
              <Typography variant='body1' className={classes.paragraph} >
                For more information on my work, to get in touch regarding employment opportunities, or to just say hello, feel free to get in touch at curtis.l.mitchell AT gmail.com.
              </Typography>
            </div>
          </div>
          <Typography variant='h5' className={classes.title} >
            External Links
          </Typography>
          <Typography variant='body1' className={classes.externalLink} >
            <FontAwesomeIcon className={classes.faIcon} icon={['fab', 'github']} /><Link className={classes.linkText} color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.github.com/curt-mitch">Github</Link>
          </Typography>
          <Typography variant='body1' className={classes.externalLink} >
            <FontAwesomeIcon className={classes.faIcon} icon={['fab', 'linkedin']} /><Link className={classes.linkText} color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/curtislmitchell/">LinkedIn</Link>
          </Typography>
          <Typography variant='body1' className={classes.externalLink} >
            <FontAwesomeIcon className={classes.faIcon} icon={['fab', 'twitter']} /><Link className={classes.linkText} color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://twitter.com/Curt_Mitch">Twitter</Link>
          </Typography>
          <Typography variant='h5' className={classes.talkTitle} >
            Public Talks
          </Typography>
          <Typography variant='body1' className={classes.publicTalkLink} >
            <Link className={classes.linkText} color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=Fb1za8ZWhYw">A Pseudorandom Walkthrough of d3-random</Link>
          </Typography>
          <Typography variant='body1' className={classes.talkDescription} >
            A deep-dive of the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://github.com/d3/d3-random">d3-random module</Link> from the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://d3js.org/">d3.js</Link> ecosystem. Hosted by the <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.meetup.com/Bay-Area-d3-User-Group/">Bay Area d3 User Group</Link> and <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://www.opendoor.com/">Opendoor</Link> on August 14th, 2018.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(About));
