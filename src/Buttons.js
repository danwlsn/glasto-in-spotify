import React from 'react';

export const FindMatchingButton = ({disabled, click}) => {
  return (
    <div className="MatchingButton">
      <button disabled={disabled} onClick={click}>
        Find matching
      </button>
    </div>
  )
}

export const LoginButton = () => {
  return (
    <div className="LoginButton">
      <a href="https://accounts.spotify.com/authorize?client_id=b6f4e429c5484a9c9f773c53c0627d7b&redirect_uri=http:%2F%2Flocalhost:3000%2F&scope=user-top-read&response_type=token&state=123">Login</a>
    </div>
  )
}

