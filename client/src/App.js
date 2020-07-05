import React, { Component } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import Routes from './routes'
import theme from './theme';

class App extends Component {

  state = {
    hello: null,
  };

  componentDidMount() {
    // axios.get('/api/hello')
    //   .then(res => this.setState({ hello: res.data }))
    //   .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
