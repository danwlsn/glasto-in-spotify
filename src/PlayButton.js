import React, { Component } from 'react';
import axios from 'axios';


class PlayButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      'empty': null
    }

    this.playPlayList = this.playPlayList.bind(this);
  }


  playPlayList(){
    const _this = this

    axios({
      'method': 'put',
      'url':'https://api.spotify.com/v1/me/player/play',
      'headers': { 'Authorization': 'Bearer '+ this.props.accessToken },
      'data': {
        "context_uri": "spotify:user:3fklxwqjac5h4rexififydfk1:playlist:06FiRFojyLrIpgPy36cLZD",
        "position_ms": 0
      }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error.status, error.message)
      });
  }

  componentDidMount(){

    // this.setState((state, props) => {
    //   return { 'festivalBandList': bandsOn }
    // })

  }

  render() {
    var divStyle = {
      marginTop: '400px'
    };

    return (

      <div className="PlayButton">
        <button onClick={this.playPlayList}>Play todays playlist</button>
      </div>
    );
  }
}

export default PlayButton;
