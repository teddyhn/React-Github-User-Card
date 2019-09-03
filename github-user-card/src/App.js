import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    user: {},
    followers: []
  };

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios
      .get('https://api.github.com/users/teddyhn')
      .then(response => this.setState())
  }

  render() {
    return (
      <div className="App">
        App goes here
      </div>
    )
  }
}

export default App;
