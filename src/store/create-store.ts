import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import plainify from 'redux-plainify'
import { createLogger } from 'redux-logger'
import { rootReducer } from 'store'
import firebase from 'utils/firebase'

declare let module: { hot: any }

export default function configureStore() {
  const middleware = applyMiddleware(
    thunkMiddleware.withExtraArgument(firebase),
    plainify,
    createLogger()
  )
  const store = createStore(rootReducer, middleware)

  /*if (module.hot) {
    module.hot.accept('./store/index.ts', () => {
      const newReducer = require('./store/index.ts').default
      store.replaceReducer(newReducer)
    })
  }*/

  return store
}
