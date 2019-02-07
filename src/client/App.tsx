import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Dashboard } from 'features/Dashboard'
import { Details } from 'features/Details'
import { Highscore } from 'features/Highscore'
import { Login } from 'features/Login'
import { StoreProps } from './App.container'
import 'utils/polyfills'
import 'global.scss'

export class App extends React.Component<StoreProps, any> {
  render() {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {this.props.authenticated && (
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/highscore" component={Highscore} />
            <Route component={props => <div>Not found</div>} />
          </Switch>
        )}
        {!this.props.authenticated && <Login show />}
      </div>
    )
  }
}
