import React, { Component } from 'react';
import Avatar from '../Avatar';

import './Requests.css';

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
