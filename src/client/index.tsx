import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import createStore from './store/create-store'

declare let module: { hot: any }
const rootElement = document.getElementById('app')
const history = createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  rootElement
)

if (module.hot) {
  module.hot.accept(['./App'], () => {
    const NewApp = require('./App').App
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NewApp />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      rootElement
    )
  })
}
