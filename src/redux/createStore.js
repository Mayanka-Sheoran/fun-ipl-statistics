/* eslint-disable no-param-reassign*/
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import _ from 'lodash'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import makeRootReducer from './modules/reducers'
// Create the ReduxGTM middleware
// const analyticsMiddleware = createMiddleware(eventDefinitionsMap)

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(history), promiseMiddleware()]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./modules/reducers', () => {
      const reducers = makeRootReducer
      store.replaceReducer(reducers)
    })
  }

  return store
}
