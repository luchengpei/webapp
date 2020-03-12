import base from './base'
import Page from '@/utils/Page'
import wepy from 'wepy'
// import Time from '@/utils/Time'
/**
 * 团购类
 */
export default class group extends base {
  /**
   * 团购列表
   */
  static getGroupList() {
    const url = `/api/mall/group/buying/activity/app/list`
    return new Page(
      url,
      this.dealGroupList.bind(this),
      null,
      base.javaKey,
    )
  }
  // 团购详情
  static groupDetail(query) {
    const url = `/api/mall/group/buying/activity/app/detail`
    let param = {
      ...query,
      userId: wepy.getStorageSync('user').userId || -1
    }
    return this.get(url, param)
  }
  // 我的拼团列表
  static getMineGroupList() {
    const url = `/api/mall/group/buying/activity/app/person/group/buying/list`
    return new Page(
      url,
      null,
      null,
      base.javaKey,
    )
  }

  // 处理团购列表
  static dealGroupList(data) {
  }
}
