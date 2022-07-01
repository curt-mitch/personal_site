import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import CssBaseline from '@mui/material/CssBaseline';
import Link from 'next/link';
import moment from 'moment';

import styles from './post-listing.module.scss';
import { postData } from '../types/types';

interface listingProps {
  title: postData['title'];
  publishDate: postData['publish_date'];
  firstSentence: postData['first_sentence'];
  postLink: postData['post_link'];
}
class PostListing extends Component {
  props!: listingProps;

  render() {
    const longDate = moment(this.props.publishDate).format("MMMM DD, YYYY");

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={styles.box}>
          <div className={styles.postHeading}>
            <Typography color="secondary" gutterBottom>
              {this.props.title}
            </Typography>
            <Hidden xsDown={true}>
              <Typography color="secondary" className={styles.postDateLong}>
                {longDate}
              </Typography>
            </Hidden>
          </div>
          <Typography variant="body1" className={styles.projectDescription}>
            {this.props.firstSentence}
          </Typography>
        </div>
        <div className={styles.alignRight}>
          <Link
            color="primary"
            className={styles.actionButton}
            href={this.props.postLink}
          >
            Explore
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default PostListing;
