import * as React from 'react'
import { Provider } from 'react-redux'
import createStore from 'store/create-store'
import { Layout } from './layout'
import 'utils/polyfills'

export class App extends React.Component<any, any> {
  render() {
    return <Layout />
  }
}
