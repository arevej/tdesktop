import React, { Component } from 'react';

import Dock from './Dock';
import AppWindow from './AppWindow';

import './App.css';

let idCounter = 2;

class App extends Component {
  state = {
    backgroundImage: 'https://www.nationalgeographic.com/content/dam/adventure/photos/2017/stories/amazing-iceland-adventures/Iceland-mount-Kirkjufell-aurora.jpg',

    apps: [
      { name: 'calc', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: 'reminders', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: 'dsd', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: 'reerer', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: '43rfer', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
    ],

    windows: [],
  }

  handleOpenWindow = (appName) => {
    const newWindows = this.state.windows.concat({ id: idCounter++, name: appName, width: 600, height: 400, coordX: 170, coordY: 170 })
    this.setState({ windows: newWindows });
  };

  handleCloseWindow = (id) => {
    const newWindows = this.state.windows.filter(window => id !== window.id)
    this.setState({ windows: newWindows });
  };

  handleChangePositionAndDimensions = (id, { x, y }, { width, height }) => {
    const newWindows = this.state.windows.map(window => {
      if (window.id === id) {
        return {
          ...window,
          width,
          height,
          coordX: x,
          coordY: y,
        };
      }
      return window;
    });

    this.setState({ windows: newWindows })
  };

  handleMakeFirstWindow = (id) => {
    const activeWindow = this.state.windows.find(window => window.id === id)
    const newWindows = this.state.windows.filter(window => window.id !== id)
    this.setState({ windows: [...newWindows, activeWindow] })
  };

  render() {
    const { apps, windows } = this.state;

    return (
      <div>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundImage: `url('${this.state.backgroundImage}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          <Dock
            apps={this.state.apps}
            onClickApp={this.handleOpenWindow}
          />
        </div>
        {windows.map(window =>
          <AppWindow
            key={window.id}
            name={window.name}
            onClose={() => this.handleCloseWindow(window.id)}
            x={window.coordX}
            y={window.coordY}
            width={window.width}
            height={window.height}
            onChangePositionAndDimensions={(coords, dims) => this.handleChangePositionAndDimensions(window.id, coords, dims)}
            onInteraction={() => this.handleMakeFirstWindow(window.id)}
          />
        )}
      </div>
    );
  }
}

export default App;
