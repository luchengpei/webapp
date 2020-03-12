import base from './base'
import Util from '@/utils/Util'
/**
 * 轮播图类
 */
export default class carousel extends base {
  /**
   * 获取轮播图
   */
  static list() {
    const url = `/api/ads/adscarousels/list`
    const param = {
      classify: '2'  // 分类（1幻灯片 2 弹窗 3海报 4官网 5应用市场6协会管理头部广告7服务头部广告）
    }
    return this.get(url, param).then(data => {
      this._processCarousel(data.list)
      return data.list
    })
  }

  /**
   * 处理轮播图
   * @param {*} list
   */
  static _processCarousel(list) {
    list.map(item => {
      if (item.url.indexOf('internal://') > -1) {
        item.url = item.url.replace('internal://', '')
      }
    })
  }
}
