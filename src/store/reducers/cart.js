import { handleActions } from 'redux-actions'
import * as types from '../types'

export default handleActions({
  [types.CART_INIT](state, action) {
    if (action.error) {
      return state
    } else {
      return {
        ...state,
        list: action.payload,
        num: action.payload.length,
        init: true
      }
    }
  }
}, {
  list: [],
  num: 0,
  init: false // 是否初始化
})
