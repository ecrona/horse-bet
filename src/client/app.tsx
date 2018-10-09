import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from './layout'
import { Dashboard } from './features/dashboard'
import 'utils/polyfills'

export class App extends React.Component<any, any> {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route
            component={props => console.log(props) || <div>Not found</div>}
          />
        </Switch>
      </Layout>
    )
  }
}
