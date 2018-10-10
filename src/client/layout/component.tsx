import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import green from '@material-ui/core/colors/green'
import { View } from 'models/view'
import { StoreProps } from './container'
import { Login } from 'features/login'
import { Splash } from 'features/splash'

interface Props extends StoreProps {}

const theme = createMuiTheme({
  palette: {
    background: {
      default: green[500]
    }
  }
})

export class Layout extends React.PureComponent<Props> {
  componentDidMount() {
    //this.props.load()
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '180px',
            width: '180px',
            margin: '20px auto',
            background: '#fff',
            boxShadow: '0px 2px 10px 4px #fdfdfd',
            borderRadius: '100%',
            fontFamily: 'Segoe Print',
            fontSize: '24px'
          }}
        >
          <img style={{ height: '100px' }} src="/assets/logo.png" />
          <span>Hästbett</span>
        </div>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}
