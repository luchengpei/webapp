import base from './base'
import Page from '@/utils/Page'
/**
 * 团购类
 */
export default class Flash extends base {
  /**
   * 获取限时购列表
   */
  static getFlashList() {
    const url = `/api/mall/productflashsale/app/getFlashSaleList`
    return new Page(
      url,
      this.dealFlashList.bind(this),
      null,
      base.javaKey,
    )
  }
  // 限时购活动详情
  static detail(query) {
    const url = `/api/mall/productflashsale/app/detail`
    let param = {
      ...query
    }
    return this.get(url, param)
  }
  // 处理限时列表数据
  static dealFlashList(data) {

  }
}
