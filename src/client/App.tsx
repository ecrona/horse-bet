import 'global.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from './features/Dashboard'
import Details from './features/Details'
import Highscore from './features/Highscore'
import Layout from './features/Layout'
import Tournaments from './features/Tournaments'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div className="h-screen">
        <Layout>
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
              <Highscore />
            </Route>
          </Switch>
        </Layout>
      </div>
    )
  }
}
