import React from 'react';
import PropTypes from 'prop-types';

const MicrosoftIcon = ({ bgColor, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 25 25" fill={bgColor}>
    <rect width="10.931" height="10.931" fill="#ddd" />
    <rect x="12.069" width="10.931" height="10.931" fill="#ddd" />
    <rect y="12.069" width="10.931" height="10.931" fill="#ddd" />
    <rect x="12.069" y="12.069" width="10.931" height="10.931" fill="#ddd" />
  </svg>
);

MicrosoftIcon.defaultProps = {
  bgColor: '',
  width: '25',
  height: '25',
};

MicrosoftIcon.propTypes = {
  bgColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default MicrosoftIcon;

// <rect width="10.931" height="10.931" fill="#f25022" />
// <rect x="12.069" width="10.931" height="10.931" fill="#7fba00" />
// <rect y="12.069" width="10.931" height="10.931" fill="#00a4ef" />
// <rect x="12.069" y="12.069" width="10.931" height="10.931" fill="#ffb900" />
