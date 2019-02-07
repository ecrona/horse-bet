import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'utils/polyfills'
import 'global.scss'
import { Dashboard } from 'features/dashboard'
import { Highscore } from 'features/Highscore'
import { Login } from 'features/login'

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

    console.log('app', { props: this.props })

    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/highscore" component={Highscore} />
          <Route path="/login" component={Login} />
          <Route component={props => <div>Not found</div>} />
        </Switch>
      </div>
    )
  }
}
