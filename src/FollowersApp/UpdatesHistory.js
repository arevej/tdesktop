import React, { Component } from 'react';
import Avatar from '../Avatar';

import './UpdatesHistory.css';

function HistoryItem({ avatarURL, login, onDelete }) {
  return (
    <li>
      <Avatar size={50} avatarURL={avatarURL} />
      <span>{login} started to follow you</span>
      <div onClick={onDelete(login)} className="decline-button">Delete</div>
    </li>
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

export default UpdatesHistory;
