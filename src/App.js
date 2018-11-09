import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class Band extends Component {
  render(){
    return (
      <div className="Band">
        { this.props.name }
      </div>
    )
  }
}

class BandList extends Component {
  render() {
    let bandList = null
    if (this.props.bandList){
      const propsBandList = this.props.bandList
      bandList = propsBandList.map(band => {
        return <li><Band name={band} /></li>
      })
    }
    return (
      <div className="BandList">
        <h2>{this.props.title}</h2>
        <ul>
          {bandList}
        </ul>
      </div>
    );
  }
}

class FindMatchingButton extends Component {
  render() {
    return (
      <div className="MatchingButton">
        <button disabled={this.props.disabled} onClick={this.props.click}>
          Find matching
        </button>
      </div>
    );
  }
}

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
  constructor(props){
    super(props)
    this.state = {
      'authed': false,
      'accessToken': null,
      'festivalBandList': this.getBandsOn(),
      'userTopBands': null,
      'matchingBands': null
    }

    this.findMatchingButtonOnClick = this.findMatchingButtonOnClick.bind(this);
  }

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

  findMatchingButtonOnClick(){
    const festivalBands = this.state.festivalBandList
    const userTopBands = this.state.userTopBands

    console.log(this.findMatchingBands(festivalBands, userTopBands))
  }

  findMatchingBands(festivalBands, userBands){
    let matching = []

    for(let band in festivalBands) {
      if(userBands.indexOf(festivalBands[band]) > -1){
          matching.push(festivalBands[band]);
      }
    }

    this.setState((state, props) => {
      return {'matchingBands': matching }
    })
    return matching
  }

  mapApiDataToBandList(data){
    return data.items.map(item => item.name)
  }

  getUserTopArtists(accessToken){
    const _this = this

    axios({
      'method': 'get',
      'url':'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
      'headers': { 'Authorization': 'Bearer '+ accessToken },
    })
      .then(function (response) {
        // TODO enable button because we're ready
        const userTopBands = _this.mapApiDataToBandList(response.data)

        _this.setState((state, props) => {
          return {'userTopBands': userTopBands }
        })
        console.log(_this.state)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      });
  }

  componentDidMount(){
    const accessToken = this.getAccessToken(window.location.hash)

    if (accessToken != null){
      this.getUserTopArtists(accessToken)
      this.setState((state, props) => {
        return {'authed': true, 'accessToken': accessToken }
      })

      console.log(this.state)

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <LoginButton />
            <FindMatchingButton disabled={!this.state.authed} click={this.findMatchingButtonOnClick}/>
        </header>
        <BandList title="Glasto" bandList={this.state.festivalBandList} />
        <BandList title="Your favs" bandList={this.state.userTopBands} />
        <BandList title="Matching bands" bandList={this.state.matchingBands} />
      </div>
    );
  }
}

export default App;
