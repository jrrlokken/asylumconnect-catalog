import React from 'react';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  title: { paddingBottom: '1rem', textAlign: 'center' },
});

const DialogTitle = ({ children, classes }) => (
  <Typography className={classes.title} type="display1">
    { children }
  </Typography>
);

export default withStyles(styles)(DialogTitle);