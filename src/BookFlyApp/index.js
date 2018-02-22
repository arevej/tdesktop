import React, { Component } from 'react';

import './index.css';


class LanguageSwitcher extends Component {
  state = {
    isActiveLangList: false,
  }

  openLangList = () => {
    this.setState({ isActiveLangList: !this.state.isActiveLangList });
  }

  handleChooseLang = (lang) => () => {
    this.setState({ isActiveLangList: false });
    this.props.onChangeLang(lang);
  }

  render () {
    const { languages, chosenLang } = this.props;

    const { isActiveLangList } = this.state;
    return (
      <div className='lang-swit'>
        <div className="lang-swit-main" onClick={this.openLangList}>{chosenLang}</div>
        <div className='lang-swit-list' style={{ display: isActiveLangList ? 'block' : 'none'}}>
          {languages.filter(lang => lang !== chosenLang).map(lang =>
            <div className='lang-swit-list-item' onClick={this.handleChooseLang(lang)}>{lang}</div>
          )}
        </div>
      </div>
    )
  }
}


class BookFlyApp extends Component {
  state = {
    chosenLang: 'English',
    languages: ['English', 'Spanish', 'French', 'German']
  }

  handleChooseLang = (lang) => {
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
