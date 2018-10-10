import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

export class Splash extends React.PureComponent<{}> {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={100} color="secondary" />
      </div>
    )
  }
}
