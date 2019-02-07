import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { App } from './App.container'
import createStore from './store/create-store'

declare let module: { hot: any }
const rootElement = document.getElementById('app')
const history = createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </BrowserRouter>
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
          <BrowserRouter>
            <ConnectedRouter history={history}>
              <NewApp />
            </ConnectedRouter>
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      rootElement
    )
  })
}
