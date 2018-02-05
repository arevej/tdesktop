import React, { Component } from 'react';

import Dock from './Dock'

import './App.css';


class App extends Component {
  state = {
    backgroundImage: 'https://www.nationalgeographic.com/content/dam/adventure/photos/2017/stories/amazing-iceland-adventures/Iceland-mount-Kirkjufell-aurora.jpg',

    applications: [
      { name: 'calc', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: 'reminders', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: 'dsd', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: 'reerer', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
      { name: '43rfer', iconUrl: 'https://www.androidheadlines.com/wp-content/uploads/2015/09/touch-calc-icon.png' },
    ]
  }

  render() {
    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundImage: `url('${this.state.backgroundImage}')`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <Dock applications={this.state.applications} />
      </div>
    );
  }
}

export default App;
