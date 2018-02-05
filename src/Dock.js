import React, { Component } from 'react';

import './Dock.css'

function ApplicationIcon ({ name, iconUrl, size, currentSize, onMouseOver, onMouseLeave }) {
  const scale = currentSize / size;
  const pad = (currentSize - size) / 2;
  return (
    <div className="app-icon">
      <span className="tooltiptext">{name}</span>
      <img
        src={iconUrl}
        height={size}
        width={size}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        style={scale !== 1 ? { transform: `scale(${scale}) translateY(-${pad}px)`, margin: `0 ${pad}px` } : null}
      />
    </div>
  )
}

class Dock extends Component {
  state = {
    activeIdx: null,
  };

  handleMouseOver = (idx) => () => this.setState({ activeIdx: idx });
  handleMouseLeave = () => this.setState({ activeIdx: null });
  render() {
    const { applications } = this.props;
    const { activeIdx } = this.state;

    return (
      <div className="dock">
        <div className="app-icon-bar">
          {applications.map((application, index) =>
            <ApplicationIcon
              name={application.name}
              iconUrl={application.iconUrl}
              onMouseOver={this.handleMouseOver(index)}
              onMouseLeave={this.handleMouseLeave}
              size={60}
              currentSize={activeIdx == null ? 60 : activeIdx === index ? 75 : Math.abs(activeIdx - index) === 1 ? 66 : 60}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Dock;
