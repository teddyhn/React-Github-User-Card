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

  async componentDidUpdate(prevState) {
    if (this.state.searchuser !== prevState.searchuser) {
      const [firstResponse] = await Promise.all([
        axios.get(`https://api.github.com/users/${this.state.searchuser}`),
      ]);
    
      const secondResponse = await axios.get(`https://api.github.com/users/${this.state.searchuser}/followers`);
    
      this.setState({
        user: firstResponse.data,
        followers: secondResponse.data,
      });
    }
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchUser = e => {
    e.preventDefault();
    this.setState({ searchuser: this.state.username })
  };

  render() {
    const { user, followers } = this.state;
    return (
      <div className="App">
        <form>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            placeholder="Search GitHub user..."
          />
          <button onClick={this.fetchUser}>Get user</button>
        </form>
        <div className="card">
          <h1>Github User: {user.login}'s Card</h1>
          <img src={user.avatar_url} />
          <h2>{user.name}</h2>
          <h3>{user.bio}</h3>
          <h3>{user.location}</h3>
          <h4>Followers:</h4>
          {followers.map(follower => (
              <p>{follower.login}</p>
            ))}
        </div>
      </div>
    )
  }
}

export default App;
