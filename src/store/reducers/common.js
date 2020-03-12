import { handleActions } from 'redux-actions'
import * as types from '../types'

export default handleActions({
  [types.KF_INIT](state, action) {
    if (action.error || !action.payload) {
      return state
    } else {
      return {
        ...state,
        kf: action.payload ? action.payload : state.kf,
        kfIsInit: false
      }
    }
  },
  [types.PROJECT_INIT](state, action) {
    if (action.error || !action.payload) {
      return state
    } else {
      return {
        ...state,
        project: {
          ...action.payload
        }
      }
    }
  }
}, {
  kf: {
    // telephone: '13715142716',
    // weixin: 'zskf-1',
    // name: '客服'
    telephone: '',
    weixin: '',
    name: ''
  },
  kfIsInit: false,
  project: {}
})
