import thunkMiddleware from 'redux-thunk'
import {
  combineReducers,
  ReducersMapObject,
  createStore,
  applyMiddleware
} from 'redux'
import { rootReducer } from './store'

declare let module: { hot: any }

export default function configureStore() {
  const middleware = applyMiddleware(thunkMiddleware.withExtraArgument(fetch))
  const store = createStore(rootReducer, middleware)

  /*if (module.hot) {
        module.hot.accept('./store/index.ts', () => {
            const newReducer = require('store/index.ts').default
            store.replaceReducer(newReducer)
        })
    }*/

  return store
}
