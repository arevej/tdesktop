import React, { Component } from 'react';
import Avatar from '../Avatar';

import './index.css';


import * as api from './GetData';

function Button ({ onClick, requests }) {
  return (
    <div className="followers-account-updates-button" onClick={onClick}>
      Updates
      {requests.length !== 0 ?
        <div style={{ position: 'absolute', top: 5, right: 5, background: '#0091ff', width: '8px', height: '8px', borderRadius: '5px' }}></div>
      : null
      }
    </div>
  )
}

function AccountInfo({ avatarURL, login, following, followers, onClick, requests }) {
  return (
    <div className="followers-account">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar size={50} avatarURL={avatarURL} />
        <div className="followers-account-info">
          <span className="followers-account-name">{login}</span>
          <div className="followers-account-info-counters">
            <div>Following: <span>{following.length}</span></div>
            <div>Followers: <span>{followers.length}</span></div>
          </div>
        </div>
      </div>
      <Button onClick={onClick} requests={requests} />
    </div>
  )
}

function Request({ avatarURL, login, onAdd, onDecline}) {
  return (
    <li>
      <Avatar size={50} avatarURL={avatarURL} />
      <span>{login} wants to follow you</span>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div onClick={onAdd(login)} className="add-button">Add</div>
        <div onClick={onDecline(login)} className="decline-button">Decline</div>
      </div>
    </li>
  )
}

function HistoryItem({ avatarURL, login, onDelete }) {
  return (
    <li>
      <Avatar size={50} avatarURL={avatarURL} />
      <span>{login} started to follow you</span>
      <div onClick={onDelete(login)} className="decline-button">Delete</div>
    </li>
  )
}

function Requests ({ requests, onAdd, onDecline }) {
  return (
    <React.Fragment>
      <ul className="requests">
        {requests.map(request => {
          return (
            <Request
              key={request.login}
              avatarURL={request.avatarURL}
              login={request.login}
              onAdd={onAdd}
              onDecline={onDecline}
            />
          );
        })}
      </ul>
      <div className="line" />
    </React.Fragment>
  )
}

function UpdatesHistory ({ history, onDelete }) {
  return (
    <ul className="updates-history">
      {history.map(item => item.action === "follow" ?
        <HistoryItem
          key={item.login}
          avatarURL={item.avatarURL}
          login={item.login}
          onDelete={onDelete}
        /> : null)}
    </ul>
  )
}

function AccountUpdates({ requests, history, onAdd, onDecline, onDelete, onCancel }) {
  return (
    <div className='followers-updates'>
      <div style={{ flex: 1 }}>
        {requests.length !== 0 ?
          <Requests
            requests={requests}
            onAdd={onAdd}
            onDecline={onDecline}
          /> : null}
        <UpdatesHistory
          history={history}
          onDelete={onDelete}
        />
      </div>
      <span className="followers-updates-cancel-button" onClick={onCancel}>×</span>
    </div>
  )
}




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
