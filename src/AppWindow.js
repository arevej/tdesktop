import React, { Component } from 'react';

import * as Icons from 'react-icons/lib/ti';

import './AppWindow.css'

function Button ({ icon, color, onClick }) {
  const Icon = Icons[icon];
  return (
    <div onClick={onClick}>
      <Icon size={18} color={color}/>
    </div>
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
    const initCordX = evt.screenX;
    const initCordY = evt.screenY;

    this.downAt = { initCordX, initCordY, where };
  };

  handleMouseMove = (evt) => {
    if (!this.downAt) return;

    const MIN_WIDTH = 250;
    const MIN_HEIGHT = 150;

    const { x, y, width, height } = this.props;

    const areDimensionsCool = newDimensions => newDimensions.height > MIN_HEIGHT && newDimensions.width > MIN_WIDTH;

    if (this.downAt.where === 'header') {
      const diffX = evt.screenX - this.downAt.initCordX;
      const diffY = evt.screenY - this.downAt.initCordY;

      this.props.onChangePositionAndDimensions({ x: x + diffX, y: y + diffY }, { width: width, height: height });
    } else {
      const { newCoords, newDimensions } = this.calculateNewPositionAndDimensions(this.downAt.where, evt.screenX, evt.screenY);

      if (areDimensionsCool(newDimensions)) {
        this.props.onChangePositionAndDimensions(newCoords, newDimensions);
      } else {
        return
      }
    }

    this.downAt = { initCordX: evt.screenX, initCordY: evt.screenY, where: this.downAt.where };
  };

  calculateNewPositionAndDimensions = (direction, screenX, screenY) => {
    const { x, y, width, height } = this.props;

    let newCoords = { x, y };
    let newDimensions = { width, height };

    const { initCordX, initCordY } = this.downAt;

    if (direction === 'right') {
      const diffX = screenX - initCordX;
      newCoords = { x, y };
      newDimensions = { width: width + diffX, height };
    } else if (direction === 'left') {
      const diffX = initCordX - screenX;
      newCoords = { x: x - diffX, y };
      newDimensions = { width: width + diffX, height };
    } else if (direction === 'bottom') {
      const diffY = screenY - initCordY;
      newCoords = { x, y };
      newDimensions = { width, height: height + diffY };
    } else if (direction === 'top') {
      const diffY = initCordY - screenY;
      newCoords = { x, y: y - diffY };
      newDimensions = { width, height: height + diffY };
    } else if (direction === 'right-top') {
      const diffY = initCordY - screenY;
      const diffX = screenX - initCordX;
      newCoords = { x, y: y - diffY };
      newDimensions = { width: width + diffX, height: height + diffY };
    } else if (direction === 'right-bottom') {
      const diffY = screenY - initCordY;
      const diffX = screenX - initCordX;
      newCoords = { x, y};
      newDimensions = { width: width + diffX, height: height + diffY };
    } else if (direction === 'left-top') {
      const diffY = initCordY - screenY;
      const diffX = initCordX - screenX;
      newCoords = { x: x - diffX, y: y - diffY };
      newDimensions = { width: width + diffX, height: height + diffY };
    } else if (direction === 'left-bottom') {
      const diffX = initCordX - screenX;
      const diffY = screenY - initCordY;
      newCoords = { x: x - diffX, y };
      newDimensions = { width: width + diffX, height: height + diffY };
    }

    return { newCoords, newDimensions };
  };

  handleMouseUp = (evt) => {
    this.downAt = null;
  }

  render() {
    const { name, onClose, width, height, x, y } = this.props;

    return (
      <div className="app-window" style={{ width: width, height: height, top: y, left: x }}>
        <div className="header" onMouseDown={(evt) => this.handleMouseDown('header', evt)}>
          <Button
            icon="TiDeleteOutline"
            onClick={onClose}
            color="red"
          />
          <span>{name}</span>
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
