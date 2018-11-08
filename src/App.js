import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class LoginButton extends Component {
  render() {
    return (
      <div className="LoginButton">
        <a href="https://accounts.spotify.com/authorize?client_id=b6f4e429c5484a9c9f773c53c0627d7b&redirect_uri=http:%2F%2Flocalhost:3000%2F&scope=user-top-read&response_type=token&state=123">Login</a>
      </div>
    );
  }
}

class App extends Component {
  getAccessToken(hash){
    console.log(hash)
    if (hash === "")
      return null
    else
      return hash.split('&')[0].split('=')[1]
  }

  getBandsOn(festival){
    if (festival!=='glasto')
      console.log("we're only doing glasto right now")
    return [
      'Fleetwood Mac',
      'Eminem',
      'Blur',
      'Radiohead',
      'Kendrick Lamar'
    ];
  }

  getUserTopArtists(accessToken){
    axios({
      'method': 'get',
      'url':'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
      'headers': { 'Authorization': 'Bearer '+ accessToken },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  componentDidMount(){
    const accessToken = this.getAccessToken(window.location.hash)

    if (accessToken != null){
      const bandson = this.getBandsOn('glasto')
      const userTopArtists = this.getUserTopArtists(accessToken)

      console.log(bandson, userTopArtists)

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginButton />
        </header>
      </div>
    );
  }
}

export default App;
