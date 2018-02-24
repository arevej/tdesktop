import React, { Component } from 'react';
import Requests from './Requests';
import UpdatesHistory from './UpdatesHistory';

import './AccountUpdates.css';


function AccountUpdates({ requests, history, onAdd, onDecline, onDelete, onCancel }) {
  return (
    <div className='updates'>
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
      <span className="updates-cancel-button" onClick={onCancel}>×</span>
    </div>
  )
}

export default AccountUpdates;
