import base from './base'
import Page from '@/utils/Page'
// import Time from '@/utils/Time'
// import Page from '@/utils/Page'
// import Util from '@/utils/Util'
/**
 * 我的服务类
 */
export default class Mine extends base {
  /**
   * 提交意见反馈
   */
  static subFeedback(query) {
    const url = `/api/sys/opinion`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
  /**
   * 获取我的公益
   */
  static commonweal(query) {
    const url = `/app/v1/e-commerce/commonweal/app/getMyCommonwealInfo`
    return new Page(url, null, null, base.javaKey)
  }
  /**
   * 添加店铺数据
   */
  static postStore(query) {
    const url = `/api/mall/brand/app/join/brand`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
  /**
   * 获取店铺数据
   */
  static storeList(query) {
    const url = `/api/mall/brand//app/list`
    return new Page(url, null, null, base.javaKey)
  }
  /**
   *  店铺数据删除
   */
  static delStoreList(query) {
    const url = `/api/mall/brand/app/delete`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
  // 申请管理列表
  static getMessageList() {
    const url = `/api/sys/message/getList`
    return new Page(
      url,
    )
  }
  // 申请管理列表
  static getMessageDetails(messageId) {
    const url = `/api/sys/message/info/${messageId}`
    return this.get(url, '')
  }
  //
  static setAlreadyView(messageId) {
    const url = `/api/sys/message/see/${messageId}`
    return this.get(url, '')
  }
  // 获取消息数量
  static getMessageCount() {
    const url = `/api/sys/message/getCount`
    return this.get(url, '')
  }
  // 删除消息
  static deletedMessage(messageId) {
    const url = `/api/sys/message/updateIsDeleted/${messageId}`
    return this.delete(url, '')
  }
  // 获取单页文档
  static getProtocol(param) {
    const url = `/api/sys/base/getProtocol`
    const params = {
      ...param
    }
    return this.post(url, params, 'json')
  }
  // 关于我们
  static async getAboutMessage(query) {
    const url = `/api/sys/companyconf/aboutus`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
}
