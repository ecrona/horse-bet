import 'global.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from './features/Admin'
import Dashboard from './features/Dashboard'
import Details from './features/Details'
import Highscore from './features/Highscore'
import Layout from './features/Layout'
import Tournaments from './features/Tournaments'

export default function App() {
  return (
    <div className="max-w-xl m-auto">
      <Layout>
        <Switch>
          <Route exact path="/">
            <Tournaments />
          </Route>

          <Route exact path="/:id/:slug/admin">
            <Admin />
          </Route>

          <Route exact path="/:id/:slug">
            <Dashboard />
          </Route>

          <Route exact path="/:id/:slug/:homeTeam/:awayTeam">
            <Details />
          </Route>

          <Route exact path="/:id/:slug/highscore">
            <Highscore />
          </Route>
        </Switch>
      </Layout>
    </div>
  )
}
