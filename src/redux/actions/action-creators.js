import { testPromise } from 'services/api'

export const getSomething = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_METADATA',
    store: getState()
  })
  testPromise().then(res => {
    dispatch({
      type: 'SAVE_METADATA',
      payload: res
    })
  }).catch(() => {
    dispatch({
      type: 'SAVE_METADATA',
      payload: 'test'
    })
  })
}

export const showloader = () => ({
  type: 'LOADER_SHOW'
})

export const hideloader = () => ({
  type: 'LOADER_HIDE'
})

