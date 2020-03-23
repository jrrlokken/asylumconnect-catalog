import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import breakpoints from '../../theme/breakpoints';

import config from '../../config/config.js';
import AsylumConnectButton from '../AsylumConnectButton';
import Disclaimer from '../static/Disclaimer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  link: {
    color: theme.palette.secondary[500],
    cursor: 'pointer'
  },
  paddingAbove: {paddingTop: theme.spacing.unit * 5},
  paddingDisclaimer: {paddingTop: theme.spacing.unit * 1},
  paddingVertical: {
    padding: '0 ' + theme.spacing.unit * 10
  },
  disclaimerLink: {
    cursor: 'pointer',
    color: theme.palette.secondary[900]
  },
  [`@media (max-width: ${breakpoints['sm']}px)`]: {
    paddingVertical: {
      padding: theme.spacing.unit * 1 + ' 0'
    }
  }
});

const LoginForm = ({
  classes,
  email,
  handleChange,
  handleRequestOpen,
  handleSubmit,
  password
}) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <TextField
      id="email"
      label="Email"
      margin="normal"
      name="email"
      onChange={handleChange}
      required
      type="email"
      value={email}
    />
    <TextField
      id="password"
      label="Password"
      margin="normal"
      name="password"
      onChange={handleChange}
      required
      type="password"
      value={password}
    />
    <div className={classes.paddingDisclaimer}>
      <Disclaimer
        text={
          <Fragment>
            Due to moving to a new technology system, we are asking all of our
            users who created an account before March 20th, 2020 to create a new
            account. We apologize for any inconvenience. To create your new
            account, please click{' '}
            <u>
              <span
                onClick={() => handleRequestOpen('signup')}
                className={classes.disclaimerLink}
              >
                here
              </span>
            </u>
            .
          </Fragment>
        }
      />
    </div>
    <Typography variant="body1" className={classes.paddingVertical}>
      By clicking "Log In," you agree to AsylumConnect's{` `}
      <a href="https://asylumconnect.org/privacy" target="_blank">
        Privacy Policy
      </a>
      {` `}and{` `}
      <a href="https://asylumconnect.org/terms-of-use" target="_blank">
        Terms of&nbsp;Use
      </a>
      .
    </Typography>
    <AsylumConnectButton variant="primary">Log In</AsylumConnectButton>
    <div onClick={() => handleRequestOpen('forgot')}>
      <Typography className={classes.paddingAbove} variant="body1">
        <span className={classes.link}>Forgot Password?</span>
      </Typography>
    </div>
    <div onClick={() => handleRequestOpen('signup')}>
      <Typography variant="body1">
        <span className={classes.link}>Don't have an account?</span>
      </Typography>
    </div>
  </form>
);

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired
};

export default withStyles(styles)(LoginForm);
