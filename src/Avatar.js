import React, { Component } from 'react';

function Avatar ({ size, avatarURL }) {
  return (
    <img src={avatarURL}
      style={{
        width: size,
        height: size,
        borderRadius: size
      }}
    />
  )
}

export default Avatar;
