import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { endpoints } from '../utils/endpoints'
import { mockEndpoints } from '../utils/mock-endpoints'
import { rootReducer } from './reducers'

console.log(import.meta.env)

export default function configureStore() {
  const middleware = [
    thunkMiddleware.withExtraArgument(
      import.meta.env.DEV ? mockEndpoints : endpoints
    ),
  ]

  if (import.meta.env.DEV) {
    middleware.push(createLogger())
  }

  return createStore(rootReducer, applyMiddleware(...middleware))
}
