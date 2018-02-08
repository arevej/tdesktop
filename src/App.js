import React, { Component } from 'react';

import Dock from './Dock';
import AppWindow from './AppWindow';

import './App.css';

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

    windows: [
      { name: 'calc', width: 600, height: 400, cordX: 150 , cordY: 150 }
    ],
  }

  handleOpenWindow = (appName) => {
    const newWindows = this.state.windows.concat({ name: appName, width: 600, height: 400, cordX: 170, cordY: 170 })
    this.setState({ windows: newWindows });
  };

  handleCloseWindow = (windowName) => {
    const newWindows = this.state.windows.filter(window => windowName !== window.name)
    this.setState({ windows: newWindows });
  };

  handleChangePosition = (windowName, { x, y }) => {
    const newWindows = this.state.windows.map(window => {
      if (window.name === windowName) {
        return {
          ...window,
          cordX: x,
          cordY: y,
        };
      }
      return window;
    });

    this.setState({ windows: newWindows })
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
            name={window.name}
            onClose={() => this.handleCloseWindow(window.name)}
            x={window.cordX}
            y={window.cordY}
            width={window.width}
            height={window.height}
            onChangePosition={(coords) => this.handleChangePosition(window.name, coords)}
          />
        )}
      </div>
    );
  }
}

export default App;
