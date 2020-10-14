import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Topbar from "./Topbar";
import ProjectListing from "./ProjectListing";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: '100%',
    // display: "flex",
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
  box: {
    marginBottom: 40,
    height: 55,
  },
  postHeading: {
    display: "flex",
    justifyContent: "space-between",
  },
  postDate: {

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

class ProjectsList extends Component {
  state = {
    learnMoredialog: false,
    getStartedDialog: false,
    postList: [],
  };

  componentDidMount() {
    this.getPostsLists();
  }

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

  getPostsLists = () => {
    axios
      .get("http://localhost:8000/api/projects/")
      .then(res => {
        this.setState({ postList: res.data })
      })
      .catch(err => console.log(err));
  }

  renderPostList = (posts, classes) => {
    return (
      posts

        .map(post => {
          return (
            <Paper
              className={classes.paper}
              key={post.id}>
              <div>
                  <ProjectListing
                    title={post.title}
                    publishDate={post.publish_date}
                    description={post.description}
                    postLink={post.project_link}
                  />
                </div>
            </Paper>
          );
      })
   );
  };

  render() {
    const { classes } = this.props;
    const { postList } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <div className={classes.backgroundGraph}></div>
          <Typography className={classes.subTitle} gutterBottom>
            A sample of personal projects I've worked on as a machine learning engineer and web developer
          </Typography>
          <Grid container justify="center">
            <Grid
              spacing={4}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  {this.renderPostList(postList, classes)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(ProjectsList));
