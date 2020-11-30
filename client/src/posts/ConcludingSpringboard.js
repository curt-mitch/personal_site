import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { pdfjs, Document, Page } from 'react-pdf';

import Link from '@material-ui/core/Link';

import Topbar from "../components/Topbar";
import SpringboardCertificate from "../documents/springboard-certificate.pdf"

// include pdf service worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  title: {
    padding: theme.spacing(2),
    maxWidth: '700px',
    margin: 'auto',
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
  certificatePdf: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

class ConcludingSpringboard extends Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Typography variant='h3' className={classes.title} >
            Concluding my Springboard Journey, and Starting my Next Adventure
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            During this week of Thanksgiving I’m incredibly thankful to the staff and my fellow students at Springboard, as I finally completed the requirements for the machine learning engineering program. When I was included in a COVID-19-related layoff in May I was very fortunate in that just the week before I had been accepted to the ML engineering program, so I knew right away where to do with my newly open schedule. I’m also incredibly thankful to my wife for her support and grateful for the ability to spend several months focusing on completing the Springboard program and working on significant related side projects such as this website.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Through the ML engineering program I covered a huge range of topics from reviewing how linear regression works to methods for deploying full-scale ML applications in a production environment. I also completed my end-to-end capstone project that I deployed on <Link color="secondary" underline="hover" href="/project/jp-en-translator">this site</Link>, and met several other Springboard students and mentors across multiple disciplines.  I’m especially grateful to my mentor <Link color="secondary" underline="hover" target="_blank" rel="noopener noreferrer" href="https://dhirajkumarblog.medium.com/">Dhiraj Kumar</Link>, who assisted me through our weekly 1:1 calls by answering all of my questions about the ML engineering curriculum and providing guidance at several stages of my capstone project.
          </Typography>
          <Typography variant='body1' className={classes.paragraph} >
            Now that I’ve completed the program my search for a full-time ML engineering role begins in earnest. If you’re looking to hire or know a team that is, I’d be extremely grateful if you could let me know! My email is curtis.l.mitchell AT gmail.com.
          </Typography>
          <div className={classes.certificatePdf}>
            <Document file={ SpringboardCertificate }>
              <Page pageNumber={1} />
            </Document>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(ConcludingSpringboard));
