import React, { Component } from 'react';

import './Dock.css'

function AppIcon ({ name, iconUrl, size, currentSize, onMouseOver, onMouseLeave, onClick, isAppOpened }) {
  const scale = currentSize / size;
  const pad = (currentSize - size) / 2;
  return (
    <div className="app-icon">
      <span className="tooltiptext">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      {isAppOpened ?
        <div style={{ position: 'absolute', bottom: 0, right: 5, left: 5, display: 'flex',  justifyContent: 'center'}}>
          <div style={{ background: '#aaa', height: '6px', width: '6px', borderRadius: '6px' }}></div>
        </div> : null}

      <img
        src={iconUrl}
        height={size}
        width={size}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
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
  handleClick = (appName) => () => this.props.onClickApp(appName);


  render() {
    const { apps } = this.props;
    const { activeIdx, activeAppName } = this.state;

    return (
      <div className="dock">
        <div className="app-icon-bar">
          {apps.map((app, index) =>
            <AppIcon
              key={index}
              name={app.name}
              iconUrl={app.iconUrl}
              onMouseOver={this.handleMouseOver(index)}
              onMouseLeave={this.handleMouseLeave}
              onClick={this.handleClick(app.name)}
              size={60}
              currentSize={activeIdx == null ? 60 : activeIdx === index ? 75 : Math.abs(activeIdx - index) === 1 ? 66 : 60}
              isAppOpened={app.isOpen}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Dock;
