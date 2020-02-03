import React from 'react'
import 'global.css'
import Dashboard from './features/Dashboard'
import { Switch, Route } from 'react-router-dom'
import Tournaments from './features/Tournaments'
import Details from './features/Details'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="h-screen">
        <Switch>
          <Route exact path="/">
            <Tournaments />
          </Route>

          <Route exact path="/:tournament">
            <Dashboard />
          </Route>

          <Route exact path="/:tournament/:homeTeam/:awayTeam">
            <Details />
          </Route>

          <Route exact path="/:tournament/highscore">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    )
  }
}
