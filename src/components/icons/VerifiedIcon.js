import React from 'react';
import PropTypes from 'prop-types';

const VerifiedIcon = ({width, fillColor, extraClasses}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={extraClasses ? extraClasses : null}
  >
    <path
      fill={fillColor}
      d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"
    />
  </svg>
);

VerifiedIcon.defaultProps = {fillColor: '#5073B3', width:'100%'}; 
VerifiedIcon.propTypes = {
  fillColor: PropTypes.string,
  width: PropTypes.string,
  extraClasses: PropTypes.string
};

export default VerifiedIcon;
