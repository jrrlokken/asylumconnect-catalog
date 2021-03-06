import React from 'react';
import PropTypes from 'prop-types';

import DialogButton from './DialogButton';
import DialogTitle from './DialogTitle';
import DisclaimerText from './DisclaimerText';

const DisclaimerDialog = ({handleRequestClose}) => (
  <div>
    <DialogTitle>AsylumConnect Disclaimer</DialogTitle>
    <DisclaimerText />
    <DialogButton handleRequestClose={handleRequestClose}>OK</DialogButton>
  </div>
);

DisclaimerDialog.propTypes = {
  handleRequestClose: PropTypes.func.isRequired,
};

export default DisclaimerDialog;
