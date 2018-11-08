/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQAWJDFJR5qXWo4szW2gFIjnih8hoHouWnipUcnXKa8GaL6sbEFCNl1oCrNcp-EpthQttGieb7BnTsRuFdESeh84VXEAwR9w_mtSlF7iVQMJjE0c5kQafKQiDNPV15SPo7fCD9A4WuKU8gw7jGBbQDmIlFy6G4nI5hQ';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

class AlbumCover extends Component {
  render() {
    const src = this.props.track.album.images[0].url;
    const alt = 'Album cover for ' + this.props.track.album.name;
    return (<img src={src} alt={alt} style={{ width: 400, height: 400 }}/>);
  }
}

class App extends Component {

  constructor() {
    super();
      this.state = {
        text: "",
        tracks: null,
        tracksLoaded: false,
    };
  }

  componentDidMount(){
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          tracksLoaded:true,
          tracks: data.items,
        });
      });

  }

  render() {
    if (!this.state.tracksLoaded) {
      return (
        <div className="App">
          <img src={loading} alt="Chargement en cours"/>
        </div>
      );
    }
    else{
      const track0 = this.state.tracks[0];
      const track1 = this.state.tracks[1];
      const track2 = this.state.tracks[2];
      return (
        console.log(this.state.tracks[0].track.name),
        console.log(track1.track.preview_url),
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Bienvenue sur le Blindtest</h1>
          </header>
          <div className="App-images">
          <AlbumCover track = {track1.track} />

          <Sound url={track1.track.preview_url} playStatus={Sound.status.PLAYING}/>
            <p>Nous avons chargé {this.state.tracks.length} chansons.</p>
            <p>Titre de la première chanson : {this.state.tracks[0].track.name}.</p>
          </div>
          <div className="App-buttons">
          </div>
        </div>
      );
    }
  }
}

export default App;
