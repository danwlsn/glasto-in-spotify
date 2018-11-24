import React, { Component } from 'react';
import axios from 'axios';
import { FindMatchingButton, LoginButton } from './Buttons.js';
import { BandList } from './BandList.js';
import { FestivalSwitcher } from './FestivalSwitcher.js';
import PlayButton from './PlayButton.js';
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'authed': false,
      'accessToken': null,
      'festival': 'Glasto',
      'festivalBandList': null,
      'userTopBands': null,
      'matchingBands': null
    }

    this.findMatchingButtonOnClick = this.findMatchingButtonOnClick.bind(this);
    this.onFestivalChange = this.onFestivalChange.bind(this);
  }

  getAccessToken(hash){
    console.log(hash)
    if (hash === "")
      return null
    else
      return hash.split('&')[0].split('=')[1]
  }

  getBandsOn(festival){
    if (festival==='Glasto'){
      return [
        'Fleetwood Mac',
        'Eminem',
        'Blur',
        'Radiohead',
        'Kendrick Lamar'
      ]
    } else {
      return [
        'Ty Segall',
        'Tyler The Creator',
        'Spice Girls'
      ]
    }
  }

  onFestivalChange(festival){
    const bandsOn = this.getBandsOn(festival)
    this.setState((state, props) => {
      return {
        'festival': festival,
        'festivalBandList': bandsOn,
        'matchingBands': null
      }
    })
  }

  findMatchingButtonOnClick(){
    const festivalBands = this.state.festivalBandList
    const userTopBands = this.state.userTopBands

    const matching = this.findMatchingBands(festivalBands, userTopBands)

    this.setState((state, props) => {
      return {'matchingBands': matching }
    })
  }

  findMatchingBands(festivalBands, userBands){
    let matching = []

    for(let band in festivalBands) {
      if(userBands.indexOf(festivalBands[band]) > -1){
          matching.push(festivalBands[band]);
      }
    }

    return matching
  }

  getUserTopBands(accessToken){
    const _this = this

    axios({
      'method': 'get',
      'url':'https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term',
      'headers': { 'Authorization': 'Bearer '+ accessToken },
    })
      .then(function (response) {
        const userTopBands = response.data.items.map(item => item.name)

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

    const bandsOn = this.getBandsOn(this.state.festival)
    this.setState((state, props) => {
      return { 'festivalBandList': bandsOn }
    })

    const accessToken = this.getAccessToken(window.location.hash)

    if (accessToken != null){
      this.getUserTopBands(accessToken)
      this.setState((state, props) => {
        return {'authed': true, 'accessToken': accessToken }
      })
    }
  }

  render() {
    var divStyle = {
      marginTop: '400px'
    };

    return (

      <div className="App">
        <header className="App-header">

          { this.state.authed ? null : <LoginButton host={window.location.host}/> }


          <PlayButton accessToken={ this.state.accessToken }/>
        </header>
        <h1 style={ divStyle }>Glasto in Spotify</h1>
        <FindMatchingButton
          disabled={!this.state.authed}
          click={this.findMatchingButtonOnClick}
        />
        <FestivalSwitcher
          list={['Glasto', 'SXSW']} 
          handleChange={this.onFestivalChange}
        />

        <BandList
          title={this.state.festival} 
          bandList={this.state.festivalBandList}
        />
        <BandList
          title="Your favs"
          bandList={this.state.userTopBands}
        />
        <BandList
          title="Matching bands"
          bandList={this.state.matchingBands}
        />

      </div>
    );
  }
}

export default App;
