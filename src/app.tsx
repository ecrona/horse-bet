import * as React from 'react'
import { Provider } from 'react-redux'
import createStore from './create-store'
import { Layout } from './layout'

export class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={createStore()}>
        <Layout />
      </Provider>
    )
  }
}
