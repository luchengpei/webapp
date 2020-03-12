import base from './base'
import Util from '@/utils/Util'
/**
 * 代理相关
 */
export default class agency extends base {
  /**
   * 获取客服
   */
  static kf() {
    const url = `/api/agent/kf/getByComIdAndProjectId`
    return this.get(url, {})
  }

  /**
   * 获取项目资料
   * @param {*} projectId
   */
  static async project(projectId) {
    const url = `/api/sys/project/alone/info`
    return this.get(url, {
      projectId
    }).then(project => {
      this._proccessProject(project)
      return project
    })
  }

  static _proccessProject(project) {
  }
}
