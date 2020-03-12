import { combineReducers } from 'redux'
import cart from './cart'
import common from './common'
import richText from './richText'

export default combineReducers({
  cart,
  common,
  richText
})
