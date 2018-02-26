// @flow
import React, { Component } from 'react';

import './LanguageSwitcher.css';

type Props = {
  chosenLang: string,
  languages: Array<string>,
  onChangeLang: (string) => void,
};
type State = {
  isActiveLangList: bool,
};

class LanguageSwitcher extends Component<Props, State> {
  state = {
    isActiveLangList: false,
  }

  openLangList = () => {
    this.setState({ isActiveLangList: !this.state.isActiveLangList });
  }

  handleChooseLang = (lang: string) => () => {
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

export default LanguageSwitcher;
