import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'
export default class Enterprise extends base {
  // 获取所有企业列表
  static getCompanyList() {
    const url = `/clan/api/clancompany/company/list`
    return new Page(
      url,
    )
  }
  // 获取企业分类
  static getclancompanycategory() {
    const url = `/clan/api/clancompanycategory/list`
    return this.get(url, {})
  }
  //获取我的企业列表
  static getMyClancompany() {
    const url = `/clan/api/clancompany/list`
    return new Page(
      url,
    )
  }
  // 获取收藏列表
  static getCollectionList() {
    const url = `/clan/api/collection//clan/list`
    return new Page(
      url
    )
  }
  // 获取好友列表
  static getClanfriendList() {
    const url = `/clan/api/clanfriend/list`
    return new Page(
      url
    )
  }
  // 修改个人主页，如果不存在就是新增
  static addClanuserinfo(params) {
    const url = `/clan/api/clanuserinfo/save`
    return this.post(url, params, 'json')
  }
  // 获取主页人脉列表
  static getClanuserinfoList(params) {
    const url = `/clan/api/clanuserinfo/list`
    return new Page(
      url
    )
  }
  // 获取人脉详情
  static getClanuserinfo(params) {
    let data = params || ''
    const url = `/clan/api/clanuserinfo/info`
    return this.get(url, data)
  }
  // 添加好友申请
  static addClanfriendapply(params) {
    const url = `/clan/api/clanfriendapply/add/friend`
    return this.post(url, params, 'json')
  }
  // 收藏
  static addOrCloeCollection(params) {
    const url = `/clan/api/informationmain/collection`
    return this.post(url, params, 'json')
  }
  // 获取企业详情
  static getClancompanyDetails(params) {
    const url = `/clan/api/clancompany/info`
    return this.get(url, params)
  }
  // 获取验证好友列表
  static getApplyFriend() {
    const url = `/clan/api/clanfriendapply/apply/friend/list`
    return new Page(url)
  }
  // 通过拒绝申请
  static setPassOrRefuse(params) {
    const url = `/clan/api/clanfriendapply/processing/request`
    return this.post(url, params, 'json')
  }
  // 新增企业
  static addClancompany(params) {
    const url = `/clan/api/clancompany/save`
    return this.post(url, params, 'json')
  }
  // 删除企业
  static deleteClancompany(params) {
    const url = `/clan/api/clancompany/delete`
    return this.delete(url, params, 'json')
  }
  // 修改企业
  static modfiyClancompany(params) {
    const url = `/clan/api/clancompany/update`
    return this.post(url, params, 'json')
  }
  // 行业下拉
  static getDownWebList(params) {
    const url = `/clan/api/clancompanycategory/getDownWebList`
    return this.get(url, '')
  }
  // 删除请求
  static deletedRequest(ids) {
    const url = `/clan/api/clanfriendapply/updateIsDeleted/${ids}`
    return this.delete(url, '', 'json')
  }
  // 删除好友请求
  static deletedfriend(friendId) {
    const url = `/clan/api/clanfriend/updateIsDeleted/${friendId}`
    return this.delete(url, '', 'json')
  }
}