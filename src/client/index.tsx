import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import createStore from './store/create-store'

const rootElement = document.getElementById('app')
const history = createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
  <React.StrictMode>
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  </React.StrictMode>,
  rootElement
)