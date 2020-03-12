import * as types from '../types'
import { createAction } from 'redux-actions'
import cart from '@/api/cart'

export const cartInit = createAction(types.CART_INIT, async() => {
  return await cart.list()
})
