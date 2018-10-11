import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'utils/polyfills'
import { Sandlåda } from './sandlåda/sandlåda'
import 'global.scss'

export class App extends React.Component<any, any> {
  render() {
    return (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Switch>
          <Route exact path="/" component={Sandlåda} />
          <Route
            component={props => console.log(props) || <div>Not found</div>}
          />
        </Switch>
      </div>
    )
  }
}
