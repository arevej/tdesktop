import React, { Component } from 'react';
import AccountInfo from './AccountInfo';
import AccountUpdates from './AccountUpdates';

import './index.css';

import * as api from './GetData';

class FollowersApp extends Component {
  state = {
    account: null,
    history: null,
    requests: null,
    accounts: null,
    activeScreen: 'homescreen',
  };

  componentDidMount() {
    api.getAccountData().then(data => {
      this.setState({ account: data.account })
    })
    api.getHistory().then(data => {
      this.setState({ history: data.history })
    })
    api.getRequests().then(data => {
      this.setState({ requests: data.requests })
    })
    api.getAccounts().then(data => {
      this.setState({ accounts: data.accounts })
    })
  }

  handleChangeScreen = () => (name) => {
    this.setState({ activeScreen: name })
  }

  hadleCancelUpdateScreen = () => {
    this.setState({ activeScreen: 'homescreen' })
  }

  handleAddFollower = (login) => () => {
    this.setState({
      requests: this.state.requests.filter(item => item.login !== login),
      history: [{ login: login, action: 'follow' }, ...this.state.history],
      account: {
        ...this.state.account,
        followers: [...this.state.account.followers, { login: login }],
      }
    })
  }

  handleDeclineFollower = (login) => () => {
    const { account, requests } = this.state;

    const newRequests = requests.filter(item => item.login !== login);

    this.setState({ requests: newRequests })
  }

  handleDeleteFollower = (login) => () => {
    const { account, history } = this.state;

    const newFollowers = account.followers.filter(follower => follower.login !== login);
    const newHistory = history.filter(item => item.login !== login);
    const newAccount = { ...account, followers: newFollowers }
    this.setState({ account: newAccount, history: newHistory })
  }

  render() {
    const { account, history, requests, accounts, activeScreen } = this.state;

    if (!account || !history || !requests || !accounts) {
      return <div className="followers">loading...</div>
    }

    const _requests = requests.map(request => {
      const account = accounts.find(account => account.login === request.login);
      return account;
    });

    const _history = history.map(item => {
      const account = accounts.find(account => account.login === item.login);
      return { ...account, action: item.action };
    });

    return (
      <div className="followers">
        {activeScreen === "homescreen" ? (
          <AccountInfo
            avatarURL={account.avatarURL}
            name={account.name}
            followers={account.followers}
            following={account.following}
            onClick={this.handleChangeScreen('updates')}
            requests={requests}
          />
        ):(
          <AccountUpdates
            requests={_requests}
            history={_history}
            onAdd={this.handleAddFollower}
            onDecline={this.handleDeclineFollower}
            onDelete={this.handleDeleteFollower}
            onCancel={this.hadleCancelUpdateScreen}
          />
        )}
      </div>
    )
  }
}

export default FollowersApp;
