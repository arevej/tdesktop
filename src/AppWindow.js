import React, { Component } from 'react';

import './AppWindow.css'

// 'a' + x === `a${x}`

function Button ({ color, onClick }) {
  return (
    <div onClick={onClick} style={{ background: color }} className="round-button"/>
  )
}

class AppWindow extends Component {
  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = (where, evt) => {
    const initCoordX = evt.screenX;
    const initCoordY = evt.screenY;

    this.downAt = { initCoordX, initCoordY, where };
  };

  handleMouseMove = (evt) => {
    if (!this.downAt) return;

    const MIN_WIDTH = 450;
    const MIN_HEIGHT = 350;

    const { x, y, width, height } = this.props;

    const areDimensionsCool = newDimensions => newDimensions.height > MIN_HEIGHT && newDimensions.width > MIN_WIDTH;

    if (this.downAt.where === 'header') {
      const diffX = evt.screenX - this.downAt.initCoordX;
      const diffY = evt.screenY - this.downAt.initCoordY;

      this.props.onChangePositionAndDimensions({ x: x + diffX, y: y + diffY }, { width: width, height: height });
    } else {
      const { newCoords, newDimensions } = this.calculateNewPositionAndDimensions(this.downAt.where, evt.screenX, evt.screenY);

      if (areDimensionsCool(newDimensions)) {
        this.props.onChangePositionAndDimensions(newCoords, newDimensions);
      } else {
        return
      }
    }

    this.downAt = { initCoordX: evt.screenX, initCoordY: evt.screenY, where: this.downAt.where };
  };

  calculateNewPositionAndDimensions = (direction, screenX, screenY) => {
    const { x, y, width, height } = this.props;

    let newCoords = { x, y };
    let newDimensions = { width, height };

    const { initCoordX, initCoordY } = this.downAt;

    if (direction === 'right') {
      const diffX = screenX - initCoordX;
      newCoords = { x, y };
      newDimensions = { width: width + diffX, height };
    } else if (direction === 'left') {
      const diffX = initCoordX - screenX;
      newCoords = { x: x - diffX, y };
      newDimensions = { width: width + diffX, height };
    } else if (direction === 'bottom') {
      const diffY = screenY - initCoordY;
      newCoords = { x, y };
      newDimensions = { width, height: height + diffY };
    } else if (direction === 'top') {
      const diffY = initCoordY - screenY;
      newCoords = { x, y: y - diffY };
      newDimensions = { width, height: height + diffY };
    } else if (direction === 'right-top') {
      const diffY = initCoordY - screenY;
      const diffX = screenX - initCoordX;
      newCoords = { x, y: y - diffY };
      newDimensions = { width: width + diffX, height: height + diffY };
    } else if (direction === 'right-bottom') {
      const diffY = screenY - initCoordY;
      const diffX = screenX - initCoordX;
      newCoords = { x, y};
      newDimensions = { width: width + diffX, height: height + diffY };
    } else if (direction === 'left-top') {
      const diffY = initCoordY - screenY;
      const diffX = initCoordX - screenX;
      newCoords = { x: x - diffX, y: y - diffY };
      newDimensions = { width: width + diffX, height: height + diffY };
    } else if (direction === 'left-bottom') {
      const diffX = initCoordX - screenX;
      const diffY = screenY - initCoordY;
      newCoords = { x: x - diffX, y };
      newDimensions = { width: width + diffX, height: height + diffY };
    }

    return { newCoords, newDimensions };
  };

  handleMouseUp = (evt) => {
    this.downAt = null;
  }

  render() {
    const { name, onClose, isMinimized, onMinimize, width, height, x, y, onInteraction } = this.props;

    return (
      <div className="app-window" style={{ display: isMinimized ? 'none' : 'block', width: width, height: height, top: y, left: x }} onMouseDown={onInteraction}>
        <div className="header" onMouseDown={(evt) => this.handleMouseDown('header', evt)}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              onClick={onClose}
              color="red"
            />
            <Button
              onClick={onMinimize}
              color="yellow"
            />
          </div>
          <span>{name}</span>
        </div>
        <div className="window-container">
          {this.props.children}
        </div>
        <div
          onMouseDown={(evt) => this.handleMouseDown('right', evt)}
          style={{ width: '5px', position: 'absolute', top: 0, bottom: 0, right: 0, cursor: 'ew-resize' }}
        />

        <div
          onMouseDown={(evt) => this.handleMouseDown('bottom', evt)}
          style={{ height: '5px', position: 'absolute', bottom: 0, right: 0, left: 0, cursor: 'ns-resize'  }}
        />

        <div
          onMouseDown={(evt) => this.handleMouseDown('left', evt)}
          style={{ width: '5px', position: 'absolute', top: 0, bottom: 0, left: 0, cursor: 'ew-resize'  }}
        />

        <div
          onMouseDown={(evt) => this.handleMouseDown('top', evt)}
          style={{ height: '5px', position: 'absolute', top: 0, left: 0, right: 0, cursor: 'ns-resize'  }}
        />




        <div
          onMouseDown={(evt) => this.handleMouseDown('right-top', evt)}
          style={{ width: '10px', height: '10px', position: 'absolute', top: 0, right: 0, cursor: 'ne-resize' }}
        />

        <div
          onMouseDown={(evt) => this.handleMouseDown('right-bottom', evt)}
          style={{ width: '10px', height: '10px', position: 'absolute', bottom: 0, right: 0, cursor: 'se-resize'  }}
        />

        <div
          onMouseDown={(evt) => this.handleMouseDown('left-top', evt)}
          style={{ width: '10px', height: '10px', position: 'absolute', top: 0, left: 0, cursor: 'nw-resize'  }}
        />

        <div
          onMouseDown={(evt) => this.handleMouseDown('left-bottom', evt)}
          style={{ width: '10px', height: '10px', position: 'absolute', bottom: 0, left: 0, cursor: 'sw-resize'  }}
        />

      </div>
    )
  }
}

export default AppWindow;
