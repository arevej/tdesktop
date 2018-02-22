import React, { Component } from 'react';

import Dock from './Dock';
import AppWindow from './AppWindow';
import FollowersApp from './FollowersApp';

import './App.css';

let idCounter = 2;
const coordX = 100;
const coordY = 100;

class App extends Component {
  state = {
    backgroundImage: 'https://www.nationalgeographic.com/content/dam/adventure/photos/2017/stories/amazing-iceland-adventures/Iceland-mount-Kirkjufell-aurora.jpg',

    apps: [
      { name: 'calc', iconUrl: 'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/' },
      { name: 'reminders', iconUrl: 'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/' },
      { name: 'dsd', iconUrl: 'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/' },
      { name: 'Followers', iconUrl: 'https://cdn6.aptoide.com/imgs/c/1/a/c1aba453cdd956ee25dd72fad7663bdc_icon.png?w=240' },
      { name: '43rfer', iconUrl: 'https://static1.squarespace.com/static/55fc0004e4b069a519961e2d/t/55fc301ae4b01342ae9212a1/1442590746805/' },
    ],

    windows: [],
  }

  handleOpenWindow = (appName) => {
    const openWindow = this.state.windows.filter(window => window.name === appName)[0]
    if (openWindow) {
      this.handleMakeFirstWindow(openWindow.id)
      if(openWindow.isMinimized) {
        const newWindows = this.state.windows.map(window => window.id === openWindow.id ? { ...window, isMinimized: false } : window);
        this.setState({ windows: newWindows })}
      } else {
        const newWindows = this.state.windows.concat({
          id: idCounter++,
          name: appName,
          width: 600,
          height: 400,
          coordX: coordX +  this.state.windows.length*20,
          coordY: coordY +  this.state.windows.length*20,
          isMinimized: false,
          isMaximized: false,
          lastPositionAndDimensions:
            {width: 0, height: 0, coordX: 0, coordY: 0}
        })
      this.setState({ windows: newWindows });
    }
  }

  handleCloseWindow = (id) => {
    const newWindows = this.state.windows.filter(window => id !== window.id)
    this.setState({ windows: newWindows });
  };

  handleMinimizeWindow = (id) => {
    const newWindows = this.state.windows.map(window =>
      window.id === id ?
      { ...window, isMinimized: true } : window);
    this.setState({ windows: newWindows });
  }

  handleMaximizeWindow = (id) => {
    const _window = this.state.windows.find(w => w.id === id);
    if(_window.isMaximized) {
      const newWindows = this.state.windows.map(window =>
        window.id === id ?
        { ...window,
          height: window.lastPositionAndDimensions.height,
          width: window.lastPositionAndDimensions.width,
          coordX: window.lastPositionAndDimensions.coordX,
          coordY: window.lastPositionAndDimensions.coordY,
          isMaximized: false
        } : window);
      this.setState({ windows: newWindows });
    } else {
      const newWindows = this.state.windows.map(__window =>
        __window.id === id ?
        { ...__window,
          width: window.innerWidth,
          height: window.innerHeight,
          coordX: 0,
          coordY: 0,
          isMaximized: true,
          lastPositionAndDimensions:
            { coordX: __window.coordX, coordY: __window.coordY, width: __window.width, height: __window.height }
        } : __window);
      this.setState({ windows: newWindows });
    }
  }

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
            onMinimize={() => this.handleMinimizeWindow(window.id)}
            onMaximize={() => this.handleMaximizeWindow(window.id)}
            x={window.coordX}
            y={window.coordY}
            width={window.width}
            height={window.height}
            onChangePositionAndDimensions={(coords, dims) => this.handleChangePositionAndDimensions(window.id, coords, dims)}
            onInteraction={() => this.handleMakeFirstWindow(window.id)}
            isMinimized={window.isMinimized}
          >
            {window.name === "Followers" ?
            <FollowersApp />
            : null
          }
          </AppWindow>
        )}
      </div>
    );
  }
}

export default App;
