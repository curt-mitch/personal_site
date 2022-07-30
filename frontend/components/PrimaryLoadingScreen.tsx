import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

import styles from './primary-loading-screen.module.scss';

function PrimaryLoadingScreen() {

  return (
    <div className={styles.loadingScreenRoot}>
      <CircularProgress color='secondary' />
    </div>
  );
}

export default PrimaryLoadingScreen;