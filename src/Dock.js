import React, { Component } from 'react';

import './Dock.css'

function ApplicationIcon ({ name, iconUrl }) {
  return (
    <div className="app-icon">
      <span className="tooltiptext">{name}</span>
      <img src={iconUrl} height={60} width={60}/>
    </div>
  )
}

class Dock extends Component {
  render() {
    const {applications} = this.props;

    return (
      <div className="container">
        <div className="app-icon-bar">
          {applications.map((application, index) =>
            <ApplicationIcon
              name={application.name}
              iconUrl={application.iconUrl}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Dock;
