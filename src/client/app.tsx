import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from './layout'
import { Dashboard } from './features/dashboard'
import 'utils/polyfills'
import { Sandlåda } from './sandlåda/sandlåda'

export class App extends React.Component<any, any> {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/sandlåda" component={Sandlåda} />
          <Route
            component={props => console.log(props) || <div>Not found</div>}
          />
        </Switch>
      </Layout>
    )
  }
}
