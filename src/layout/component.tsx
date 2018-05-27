import * as React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import green from '@material-ui/core/colors/green'
import { View } from 'models/view'
import { StoreProps } from './container'
import dashboard from 'features/dashboard'
import login from 'features/login'

interface Props extends StoreProps {}

const theme = createMuiTheme({
  palette: {
    background: {
      default: green[500]
    }
  }
})

export default class Component extends React.PureComponent<Props> {
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
            position: 'absolute',
            top: '10px',
            left: '10px',
            height: '100px',
            background: '#fff',
            boxShadow: '0px 2px 10px 4px #fdfdfd',
            padding: '90px 40px',
            borderRadius: '100%',
            fontFamily: 'Segoe Print',
            fontSize: '24px'
          }}
        >
          <img
            style={{ height: 'inherit' }}
            src="https://cdn.onlinewebfonts.com/svg/img_73645.png"
          />
          <span>Hästbett</span>
        </div>

        {this.props.view === View.Dashboard ? dashboard : login}
      </MuiThemeProvider>
    )
  }
}
