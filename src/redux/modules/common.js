import axios from 'axios'

const GET_DATA = 'GET_DATA'
const LOADING_START = 'LOADING_START'
const LOADING_STOP = 'LOADING_STOP'

export function getMatches(store) {
  return dispatch => new Promise(() => {
    dispatch({ type: LOADING_START })
    axios.all([
      axios.request('https://api.myjson.com/bins/9jn19').catch(), axios.request('https://jsonblob.com/api/jsonBlob/98e3de4e-a6d3-11e7-acad-c77b9e32153b').catch(), axios.request('https://jsonblob.com/api/jsonBlob/e704a1fc-a6d3-11e7-acad-6d8871ee3b12').catch(), axios.request('https://jsonblob.com/api/jsonBlob/a776fca4-a6d4-11e7-acad-0b4151cfe1c1').catch(), axios.request('https://jsonblob.com/api/jsonBlob/0925db31-a6d5-11e7-acad-2b52067e4f5d').catch(), axios.request('https://jsonblob.com/api/jsonBlob/6eabb154-a6d5-11e7-acad-99a9a2abc49e').catch(), axios.request('https://jsonblob.com/api/jsonBlob/c592172c-a6d5-11e7-acad-d33b7745d885').catch(), axios.request('https://jsonblob.com/api/jsonBlob/34fb843e-a6d6-11e7-acad-5599337f4149').catch(), axios.request('https://jsonblob.com/api/jsonBlob/9520b46e-a6d6-11e7-acad-2fdb9a868fc2').catch(), axios.request('https://jsonblob.com/api/jsonBlob/e69fbe4e-a6d6-11e7-acad-47b404222ff3').catch()
    ]).then(axios.spread(function(res1, res2, res3, res4, res5, res6, res7, res8, res9, res10) {
      dispatch({
        type: GET_DATA,
        matches: res1,
        2008: res2,
        2009: res3,
        2010: res4,
        2011: res5,
        2012: res6,
        2013: res7,
        2014: res8,
        2015: res9,
        2016: res10
      })
      dispatch({ type: LOADING_STOP })
    }))
  })
}

const ACTION_HANDLER = {
  GET_DATA: (state, action) => {
    return ({
      ...state,
      matches: action.matches,
      2008: action['2008'],
      2009: action['2009'],
      2010: action['2010'],
      2011: action['2011'],
      2012: action['2012'],
      2013: action['2013'],
      2014: action['2014'],
      2015: action['2015'],
      2016: action['2016']
    })
  },
 LOADING_START: state => ({
    ...state,
    loaderVisibility: true
  }),
 LOADING_STOP: state => ({
    ...state,
    loaderVisibility: false
  }),
}

const initialState = {
  matches: [],
  loaderVisibility: false
}

export default function commonReducer(state = initialState, action) {
  const handler = ACTION_HANDLER[action.type]
  return handler ?
    handler(state, action) :
    state
}
