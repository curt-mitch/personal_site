import React, { Component } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import styles from './homepage.module.scss';
import radialGradient from '../public/images/radial_gradient1.png';

class Homepage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.root}>
          <div className={styles.backgroundGraph}>
          <Box
            className={styles.backgroundImageContainer}
            component="img"
            src={radialGradient.src}
            alt="radial gradient design"
          />
          </div>
          <Container className={styles.siteTitleContainer} >
            <Typography variant="h4" className={styles.title} gutterBottom>
              Howdy! I&apos;m Curtis Mitchell, a machine learning engineer based in San Francisco.
            </Typography>
            <Typography variant="h6" className={styles.subTitle} gutterBottom>
              Welcome to my website where I host my articles and projects at the intersection of machine learning, natural language processing, web development, and mathematics.
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
