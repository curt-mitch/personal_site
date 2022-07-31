import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
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
        <Link
            href={this.props.postLink}
            passHref
          >
          <div className={styles.box}>
            <div className={styles.postHeading}>
              <Typography color="secondary" gutterBottom>
                {this.props.title}
              </Typography>
              <Hidden xsDown={true}>
                <Typography className={styles.postDateLong} gutterBottom>
                  {longDate}
                </Typography>
              </Hidden>
            </div>
            <Typography variant="body1" className={styles.projectDescription}>
              {this.props.firstSentence}
            </Typography>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}

export default PostListing;
