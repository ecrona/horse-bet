import React from 'react'
import 'global.css'
import Dashboard from './features/Dashboard'
import { Switch, Route } from 'react-router-dom'
import Tournaments from './features/Tournaments'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="h-screen">
        <Switch>
          <Route path="/">
            <Tournaments />
          </Route>

          <Route path="/tournament">
            <Dashboard />
          </Route>

          <Route path=":tournament/:homeTeam/:awayTeam">
            <Dashboard />
          </Route>

          <Route path=":tournament/highscore">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    )
  }
}
