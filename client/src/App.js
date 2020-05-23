import React, { Component } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '"Helvetica"',
      'sans-serif'
    ].join(',')
  }
});


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
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
