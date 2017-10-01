/* eslint-disable no-param-reassign*/
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import commonReducer from './common'

const makeRootReducer = asyncReducers => combineReducers({
    // Add sync reducers here
  router,
  commonData: commonReducer,
  ...asyncReducers
})

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
