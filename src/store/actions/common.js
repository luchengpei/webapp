import * as types from '../types'
import { createAction } from 'redux-actions'
import agency from '@/api/agency'

export const kfInit = createAction(types.KF_INIT, async () => {
  return await agency.kf()
})

export const projectInit = createAction(types.PROJECT_INIT, async (projectId) => {
  return await agency.project(projectId)
})
