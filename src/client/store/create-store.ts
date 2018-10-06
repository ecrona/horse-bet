import firebase from 'utils/firebase'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { History } from 'history'
import { endpoints } from 'utils/endpoints'
import { rootReducer } from './reducers'

declare let module: { hot: any }

export default function configureStore(history: History) {
  const middleware = applyMiddleware(
    routerMiddleware(history),
    // thunkMiddleware.withExtraArgument(endpoints),
    thunkMiddleware.withExtraArgument(firebase),
    createLogger()
  )
  const store = createStore(connectRouter(history)(rootReducer), middleware)

  if (module.hot) {
    module.hot.accept('./index.ts', () => {
      const { rootReducer: nextRootReducer } = require('./index.ts')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
