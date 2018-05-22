import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './create-store'

export class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={createStore()}>
        Hejsan
      </Provider>
    )
  }
}