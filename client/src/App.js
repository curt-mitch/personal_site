import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    hello: null,
  };

  componentDidMount() {
    axios.get('/api/hello')
      .then(res => this.setState({ hello: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        {this.state.hello
          ? <div> { this.state.hello } </div>
          : null }
      </div>
    );
  }
}

export default App;
