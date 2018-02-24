import React, { Component } from 'react';
import Avatar from '../Avatar';

import './AccountInfo.css';

function Button ({ onClick, requests }) {
  return (
    <div className="button" onClick={onClick}>
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
    <div className="account">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Avatar size={50} avatarURL={avatarURL} />
        <div className="account-info">
          <span className="account-name">{login}</span>
          <div className="account-info-counters">
            <div>Following: <span>{following.length}</span></div>
            <div>Followers: <span>{followers.length}</span></div>
          </div>
        </div>
      </div>
      <Button onClick={onClick} requests={requests} />
    </div>
  )
}

export default AccountInfo;
