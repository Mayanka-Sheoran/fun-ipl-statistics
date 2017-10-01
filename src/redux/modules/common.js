import axios from 'axios'

const GET_MATCHES = 'GET_MATCHES'

export function getMatches(store) {
  return dispatch => new Promise(() => {
    axios
      .get('https://api.myjson.com/bins/9jn19')
      .then(({ data })=> {
        dispatch({ type: GET_MATCHES, matches: data })
      })
      .catch((err)=> {})
  })
}

const ACTION_HANDLER = {
  GET_MATCHES: (state, action) => {
    console.log(state, action)
    return({
    ...state,
    matches: action.matches
   })
  }
}

const initialState = {
  matches: []
}

export default function commonReducer(state = initialState, action) {
  const handler = ACTION_HANDLER[action.type]
  return handler
    ? handler(state, action)
    : state
}
