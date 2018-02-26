// @flow
import React, { Component } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

import './index.css';

type State = {
  chosenLang: string,
  languages: Array<string>,
};

class BookFlyApp extends Component<{}, State> {
  state = {
    chosenLang: 'English',
    languages: ['English', 'Spanish', 'French', 'German']
  }

  handleChooseLang = (lang: string) => {
    this.setState({ chosenLang: lang })
  }

  render () {
    return (
      <div className='bookfly'>
        <div className="bookfly-header">
          <h3>BookFly</h3>
          <LanguageSwitcher
            chosenLang={this.state.chosenLang}
            languages={this.state.languages}
            onChangeLang={this.handleChooseLang}
          />
        </div>
        <div className="bookfly-banner">
          <div className="bookfly-booking-panel">
            <div className="bookfly-booking-panel--hidden">
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default BookFlyApp;
