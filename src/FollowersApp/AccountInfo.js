import React, { Component } from 'react';
import Avatar from '../Avatar';
import Button from './Button';

import './AccountInfo.css';

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
      <Button
        onClick={onClick}
        hasBadge={requests.length !== 0 ? true : false }
        label='Updates'
       />
    </div>
  )
}

export default AccountInfo;
