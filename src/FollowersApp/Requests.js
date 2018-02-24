import React, { Component } from 'react';
import Avatar from '../Avatar';
import Button from './Button';

import './Requests.css';

function Request({ avatarURL, login, onAdd, onDecline }) {
  return (
    <li>
      <Avatar size={50} avatarURL={avatarURL} />
      <span>{login} wants to follow you</span>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <Button
          onClick={onAdd(login)}
          label="Add"
          success
        />
        <div style={{ width: '5px' }} />
        <Button
          onClick={onDecline(login)}
          label="Decline"
          danger
        />
      </div>
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

export default Requests;
