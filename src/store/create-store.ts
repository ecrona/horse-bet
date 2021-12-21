import { isDevelopment } from '@client/environment'
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { endpoints } from '../utils/endpoints'
import { mockEndpoints } from '../utils/mock-endpoints'
import { rootReducer } from './reducers'

export default function configureStore() {
  const middleware = [
    thunkMiddleware.withExtraArgument(
      isDevelopment ? mockEndpoints : endpoints
    ),
  ]

  if (isDevelopment) {
    middleware.push(createLogger())
  }

  return createStore(rootReducer, applyMiddleware(...middleware))
}
