import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
  },
}));

function PrimaryLoadingScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color='secondary' />
    </div>
  );
}

export default withRouter(PrimaryLoadingScreen);
