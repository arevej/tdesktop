import React, { Component } from 'react';
import Avatar from './Avatar';

import './FollowersApp.css';

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

function AccountUpdates({ requests, history, onAdd, onDecline, onDelete, onCancel }) {
  return (
    <div className='followers-updates'>
      {requests.length !== 0 ? (
        <React.Fragment>
          <ul>
            {requests.map(request => {
              return (
                <li>
                  <Avatar size={50} avatarURL={request.avatarURL} />
                  <span>{request.login} wants to follow you</span>
                  <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div onClick={onAdd(request.login)} className="followers-updates-add-button">Add</div>
                    <div onClick={onDecline(request.login)} className="followers-updates-decline-button">Decline</div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="line" />
        </React.Fragment>
      ): null}
      <ul>
        {history.map(item => item.action === "follow" ? (
          <li>
            <Avatar size={50} avatarURL={item.avatarURL} />
            <span>{item.login} started to follow you</span>
            <div onClick={onDelete(item.login)} className="followers-updates-decline-button">Delete</div>
          </li>) : null
        )}
      </ul>
      <div onClick={onCancel}>X</div>
    </div>
  )
}

class FollowersApp extends Component {
  state={
    account: {
      login: 'Tim',
      avatarURL: 'https://pp.userapi.com/c638624/v638624890/4f427/gizTR-4andk.jpg',
      following: [
        { login: 'Fjsk' },
        { login: 'Gjee' }
      ],
      followers: [
        { login: 'bd' },
        { login: 'asas' },
        { login: 'kiee' },
      ],
      requests: [
        { login: 'Gosha' },
        { login: 'Rusya' },
        { login: 'asas' },
        { login: 'kiee' },
      ],
      history: [
        { login: 'kiee', action: 'follow' },
      ]
    },
    accounts: [
      { login: 'Gosha', avatarURL: 'https://pp.userapi.com/c629222/v629222406/25bd7/z5EqmubTJFk.jpg' },
      { login: 'Rusya', avatarURL: 'https://pp.userapi.com/c629222/v629222406/25bd7/z5EqmubTJFk.jpg' },
      { login: 'kiee', avatarURL: 'https://pp.userapi.com/c629222/v629222406/25bd7/z5EqmubTJFk.jpg' },
      { login: 'bd', avatarURL: 'https://pp.userapi.com/c629222/v629222406/25bd7/z5EqmubTJFk.jpg' },
      { login: 'asas', avatarURL: 'https://pp.userapi.com/c629222/v629222406/25bd7/z5EqmubTJFk.jpg' },
      { login: 'kiee', avatarURL: 'https://pp.userapi.com/c629222/v629222406/25bd7/z5EqmubTJFk.jpg' }
    ],
    activeScreen: 'homescreen',
  }

  handleChangeScreen = () => (name) => {
    this.setState({ activeScreen: name })
  }

  hadleCancelUpdateScreen = () => {
    this.setState({ activeScreen: 'homescreen' })
  }

  handleAddFollower = (login) => () => {
    const {account} = this.state;

    const newFollowers = account.followers.concat({ login: login });
    const newRequests = account.requests.filter(item => item.login !== login);
    const newHistory = [{ login: login, action: 'follow' }, ...account.history];
    const newAccount = {
      ...account,
      followers: newFollowers,
      requests: newRequests,
      history: newHistory
    }
    this.setState({ account: newAccount })
  }

  handleDeclineFollower = (login) => () => {
    const {account} = this.state;

    const newRequests = account.requests.filter(item => item.login !== login);
    const newAccount = {
      ...account,
      requests: newRequests
    }
    this.setState({ account: newAccount })
  }


  handleDeleteFollower = (login) => () => {
    const {account} = this.state;

    const newFollowers = account.followers.filter(follower => follower.login !== login);
    const newHistory = account.history.filter(item => item.login !== login);
    const newAccount = {
      ...account,
      followers: newFollowers,
      ...account,
      history: newHistory
    }
    this.setState({ account: newAccount })
  }

  render() {
    const { account, accounts, activeScreen } = this.state;

    const requests = account.requests.map(request => {
      const account = accounts.find(account => account.login === request.login);
      return account;
    });

    const history = account.history.map(item => {
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
            requests={account.requests}
          />
        ):(
          <AccountUpdates
            requests={requests}
            history={history}
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
