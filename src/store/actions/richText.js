import * as types from '../types'
import { createAction } from 'redux-actions'

export const richTextUpdate = createAction(types.RICH_TEXT_UPDATE)
export const richTextRemove = createAction(types.RICH_TEXT_REMOVE)
