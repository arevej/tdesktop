import React, { Component } from 'react';
import cx from 'classnames';

import './Button.css';

function Button ({ onClick, label, hasBadge, success, danger }) {
  return (
    <div className={cx({ "button": true, "button--success": success, "button--danger": danger })} onClick={onClick}>
      {label}
      {hasBadge ?
        <div style={{ position: 'absolute', top: 5, right: 5, background: '#0091ff', width: '8px', height: '8px', borderRadius: '5px' }}></div>
      : null
      }
    </div>
  )
}

export default Button;
