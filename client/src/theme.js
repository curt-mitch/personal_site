import { createMuiTheme } from '@material-ui/core/styles'
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
      '"Helvetica Neue"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif'
    ].join(',')
  }
});

export default theme;
