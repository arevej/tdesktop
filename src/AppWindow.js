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

  handleMouseDown = (evt) => {
    const initCordX = evt.screenX;
    const initCordY = evt.screenY;

    this.downAt = { initCordX, initCordY };
  };

  handleMouseMove = (evt) => {
    if (!this.downAt) return;

    const diffX = evt.screenX - this.downAt.initCordX;
    const diffY = evt.screenY - this.downAt.initCordY;

    const initCordX = evt.screenX;
    const initCordY = evt.screenY;

    this.downAt = { initCordX, initCordY };

    this.props.onChangePosition({ x: this.props.x + diffX, y: this.props.y + diffY });
  };

  handleMouseUp = (evt) => {
    this.downAt = null;
  }

  render() {
    const { name, onClose, width, height, x, y } = this.props;

    return (
      <div className="app-window" style={{ width: width, height: height, top: y, left: x }}>
        <div className="header" onMouseDown={this.handleMouseDown}>
          <Button
            icon="TiDeleteOutline"
            onClick={onClose}
            color="red"
          />
          <span>{name}</span>
        </div>

      </div>
    )
  }
}

export default AppWindow;
