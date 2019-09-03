import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    user: {},
    followers: []
  };

  componentDidMount() {
    this.getUser();
    this.getFollowers();
  }

  getUser() {
    axios
      .get('https://api.github.com/users/teddyhn')
      .then(response => this.setState({ user: response.data }))
  }

  getFollowers() {
    axios
      .get('https://api.github.com/users/teddyhn/followers')
      .then(response => this.setState( { followers: response.data }))
  }

  render() {
    console.log(this.state.followers);

    return (
      <div className="App">
        <h1>Github User: {this.state.user.login}'s Card</h1>
        <img src={this.state.user.avatar_url} />
        <h2>{this.state.user.name}</h2>
        <h3>{this.state.user.bio}</h3>
        <h3>{this.state.user.location}</h3>
        <h4>Followers:</h4>
        {this.state.followers.map(follower => (
            <p>{follower.login}</p>
          ))}
      </div>
    )
  }
}

export default App;
