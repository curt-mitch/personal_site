import React, { Component } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import styles from './posts-list.module.scss';
import Topbar from '../../components/Topbar';
import PostListing from '../../components/PostListing';
import PrimaryLoadingScreen from '../../components/PrimaryLoadingScreen';
import jsonPostData from '../../data.json';
import { postData } from '../../types/types';


class PostsList extends Component {
  state = {
    postList: [] as postData[],
    isLoading: true,
  };

  componentDidMount() {
    this.getPostsLists();
  }

  getPostsLists = () => {
    // axios
    //   .get(`${process.env.REACT_APP_HOST_IP_ADDRESS}/api/posts/`)
    //   .then(res => {
    //     this.setState({
    //       postList: res.data,
    //       isLoading: false,
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     this.setState({ isLoading: false })
    //   });
    this.setState({
      // serve posts in reverse chronological order
      postList: jsonPostData.sort((post1, post2) => post1.id > post2.id ? -1: 1),
      isLoading: false,
    })

  }

  renderPostList = (posts: postData[]) => {
    if(this.state.isLoading === true) {
      return (<PrimaryLoadingScreen/>);
    } else {
      return (
        posts
          .map(post => {
            return (
              <Paper
                className={styles.paper}
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
    const { postList } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={styles.root}>
          <div className={styles.backgroundGraph}></div>
          <Typography className={styles.subTitle} gutterBottom>
            Articles on various technical topics in machine learning, web development, and related fields.
          </Typography>
          <Grid container>
            <Grid
              spacing={8}
              container
              className={styles.grid}
            >
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  {this.renderPostList(postList)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default PostsList;
