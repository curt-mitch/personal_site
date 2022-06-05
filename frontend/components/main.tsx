import React, { Component } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import styles from './main.module.scss';
import radialGradient from '../public/images/radial_gradient1.png';
import Topbar from './Topbar';

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
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
            <Typography className={styles.title} gutterBottom>
              Howdy! I'm Curtis Mitchell, a machine learning engineer based in San Francisco.
            </Typography>
            <Typography className={styles.subTitle} gutterBottom>
              Welcome to my website where I host my articles and projects at the intersection of machine learning, natural language processing, web development, and mathematics.
            </Typography>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;