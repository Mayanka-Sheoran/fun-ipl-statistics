import axios from 'axios'
import firebase from 'firebase'
const GET_DATA = 'GET_DATA'
const LOADING_START = 'LOADING_START'
const LOADING_STOP = 'LOADING_STOP'
import _ from 'lodash'

export function getMatches (store) {
  const config = {
    apiKey: 'AIzaSyDE-RytOHAPh_AyZl4LBn3vJ7-N0Y88AwI',
    authDomain: 'fun-ipl-facts.firebaseapp.com',
    databaseURL: 'https://fun-ipl-facts.firebaseio.com',
    projectId: 'fun-ipl-facts',
    storageBucket: '',
    messagingSenderId: '1024757586979'
  }
  return dispatch => new Promise(() => {
    dispatch({ type: LOADING_START })
    axios.get('https://api.myjson.com/bins/9jn19')
      .then(function (response) {
        firebase.initializeApp(config)
        const database = firebase.database()
        database.ref('/').once('value', snap => {
          const data = snap.val()
          dispatch({
            type: GET_DATA,
            matches: response,
            2008: _.filter(data, function (item) {
              return (item['match_id'] > 0 && item['match_id'] < 59)
            }),
            2009: _.filter(data, function (item) {
              return (item['match_id'] > 58 && item['match_id'] < 116)
            }),
            2010: _.filter(data, function (item) {
              return (item['match_id'] > 115 && item['match_id'] < 176)
            }),
            2011: _.filter(data, function (item) {
              return (item['match_id'] > 175 && item['match_id'] < 249)
            }),
            2012: _.filter(data, function (item) {
              return (item['match_id'] > 248 && item['match_id'] < 323)
            }),
            2013: _.filter(data, function (item) {
              return (item['match_id'] > 322 && item['match_id'] < 399)
            }),
            2014: _.filter(data, function (item) {
              return (item['match_id'] > 398 && item['match_id'] < 459)
            }),
            2015: _.filter(data, function (item) {
              return (item['match_id'] > 458 && item['match_id'] < 518)
            }),
            2016: _.filter(data, function (item) {
              return (item['match_id'] > 517 && item['match_id'] < 588)
            })
          })
          dispatch({ type: LOADING_STOP })
        })
      })
      .catch(function (error) {
      })
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
  })
}

const initialState = {
  matches: [],
  loaderVisibility: false
}

export default function commonReducer (state = initialState, action) {
  const handler = ACTION_HANDLER[action.type]
  return handler
    ? handler(state, action)
    : state
}
