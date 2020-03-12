import { handleActions } from 'redux-actions'
import * as types from '../types'

export default handleActions({
  [types.RICH_TEXT_UPDATE](state, action) {
    return {
      ...state,
      text: action.payload
    }
  },
  [types.RICH_TEXT_REMOVE](state, action) {
    return {
      ...state,
      text: ''
    }
  }
}, {
  text: ''
})
