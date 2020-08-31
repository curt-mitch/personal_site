import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

const styles = theme => ({
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

class PostListing extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.box}>
          <div className={classes.postHeading}>
            <Typography color="secondary" gutterBottom>
              {this.props.title}
            </Typography>
            <Hidden xsDown={true}>
              <Typography color="secondary" className={classes.postDate}>
                {this.props.publishDate}
              </Typography>
            </Hidden>
          </div>
          <Typography variant="body1" className={classes.postDescription}>
            {this.props.firstSentence}
          </Typography>
        </div>
        <div className={classes.alignRight}>
          <Button
            color="primary"
            variant="contained"
            className={classes.actionButton}
            component={Link}
            to={this.props.postLink}
          >
            Continue reading
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(PostListing));
