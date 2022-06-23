import React, { Component } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import CssBaseline from '@mui/material/CssBaseline';
import Link from 'next/link';
import moment from 'moment';

import styles from './post-listing.module.scss';


class PostListing extends Component {
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
            {this.props.description}
          </Typography>
        </div>
        <div className={styles.alignRight}>
          <Button
            color="primary"
            variant="contained"
            className={styles.actionButton}
            // component={Link}
            href={this.props.postLink}
          >
            Explore
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default PostListing;