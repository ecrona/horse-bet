import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Dashboard } from 'features/Dashboard'
import { Details } from 'features/Details'
import { Highscore } from 'features/Highscore'
import { Layout } from './features/Layout'
import 'utils/polyfills'
import 'global.scss'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/highscore" component={Highscore} />
            <Route
              exact
              path="/fixture/:homeTeam/:awayTeam"
              component={Details}
            />
            <Route component={props => <div>Not found</div>} />
          </Switch>
        </Layout>
      </div>
    )
  }
}
