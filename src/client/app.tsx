import 'utils/polyfills'
import 'global.scss'

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Dashboard } from 'features/Dashboard'
import { Details } from 'features/Details'
import { Highscore } from 'features/Highscore'
import { Login } from 'features/Login'

export class App extends React.Component<any, any> {
  render() {
    /*
      reroute everything to login
      if (!logedin) {
        return <Redirect route="/login" />
        -> logins
      }
      -> dashboard
    */

    return (
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/details" component={Details} />
          <Route path="/highscore" component={Highscore} />
          <Route path="/login" component={Login} />
          <Route component={props => <div>Not found</div>} />
        </Switch>
      </div>
    )
  }
}
