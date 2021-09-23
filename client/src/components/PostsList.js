import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Topbar from "./Topbar";
import PostListing from "./PostListing";
import PrimaryLoadingScreen from './PrimaryLoadingScreen';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
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
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  postHeading: {
    display: "flex",
    justifyContent: "space-between",
  },
  postDescription: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
});

class PostsList extends Component {
  state = {
    postList: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getPostsLists();
  }

  getPostsLists = () => {
    axios
      .get(`${process.env.REACT_APP_HOST_IP_ADDRESS}/api/posts/`)
      .then(res => {
        this.setState({
          postList: res.data,
          isLoading: false,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false })
      });
  }

  renderPostList = (posts, classes) => {
    if(this.state.isLoading === true) {
      return (<PrimaryLoadingScreen/>);
    } else {
      return (
        posts
          .map(post => {
            return (
              <Paper
                className={classes.paper}
                key={post.id}>
                <div>
                    <PostListing
                      title={post.title}
                      publishDate={post.publish_date}
                      firstSentence={post.first_sentence}
                      postLink={post.post_link}
                    />
                  </div>
              </Paper>
            );
          })
      );
    }
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
            Articles on various technical topics in machine learning, web development, and related fields.
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

export default withRouter(withStyles(styles)(PostsList));
