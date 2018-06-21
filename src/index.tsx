import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import createStore from 'store/create-store'

declare let module: { hot: any }
const rootElement = document.getElementById('app')
const store = createStore()

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept(['./app.tsx'], () => {
    const NewApp = require('./app.tsx').App
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NewApp />
        </Provider>
      </AppContainer>,
      rootElement
    )
  })
}
