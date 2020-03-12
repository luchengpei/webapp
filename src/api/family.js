import base from './base'
import Page from '@/utils/Page'
import wepy from 'wepy'
import Util from '@/utils/Util'
/**
 * 家谱
 */

export default class Dis extends base {
  // 字辈或堂号文化列表
  static getGenealogyOrHallList() {
    const url = `/clan/api/clanworkgeneration/list`
    return new Page(
      url,
    )
  }
  // 字辈或堂口文化详情
  static getGenealogyOrHallDetails(workGenerationId) {
    const url = `/clan/api/clanworkgeneration/info/${workGenerationId}`
    return this.get(url, {})
  }
  // 新增寻根问祖
  static askThemSave(params) {
    const url = `/clan/api/clanseekingroots/save`
    return this.post(url, params, 'json')
  }
  // 寻根问祖详细信息
  static askThemInfo(seekingRootsId) {
    const url = `/clan/api/clanseekingroots/info/${seekingRootsId}`
    return this.get(url, {})
  }
  // 寻根问祖详细列表
  static askThemList() {
    const url = `/clan/api/clanseekingroots/list`
    return new Page(
      url,
    )
  }
  // 世系图
  static pedigreeChart() {
    const url = `/clan/api/clanlineagemap/list`
    return this.get(url, {})
  }
  // 申请管理列表
  static getApplyList() {
    const url = `/clan/api/clanapply/getApplyList`
    return new Page(
      url,
    )
  }
  // 改变申请状态
  static updateStatus(params) {
    const url = `/clan/api/clanapply/updateStatus`
    return this.post(url, params, 'json')
  }
  // 家谱管理
  static familyManagementlist() {
    const url = `/clan/api/clangenealogy/list`
    return new Page(
      url,
    )
  }
  // 新增家谱
  static familySave(params) {
    const url = `/clan/api/clangenealogy/save`
    return this.post(url, params, 'json')
  }
  // 家谱树
  static familyTree(params) {
    const url = `/clan/api/clanrelationship//get/all/node`
    return this.get(url, params)
  }
  // 家谱树节点增加
  static familyNodeAdd(params) {
    const url = `/clan/api/clanrelationship/add/node`
    return this.post(url, params, 'json')
  }
  // 获取成员列表
  static getMemberList() {
    const url = `/clan/api/clanmember/list`
    return this.get(url, {})
  }
  // 申请绑定成员
  static saveApplyMember(params) {
    const url = `/clan/api/clanapply/saveApply`
    return this.post(url, params, 'json')
  }
  // 获取省市区
  static getCity() {
    const url = `/api/region/list`
    return this.get(url, {})
  }
  // 成员详细信息
  static memberInfo(memberId) {
    const url = `/clan/api/clanmember/info/${memberId}`
    return this.get(url, {})
  }
  // 更新成员
  static updateMember(params) {
    const url = `/clan/api/clanmember/update`
    return this.post(url, params, 'json')
  }
  // 删除成员
  static deletedMember(memberId) {
    const url = `/clan/api/clanrelationship/deletedNode/${memberId}`
    return this.delete(url, {}, 'json')
  }
  // 查询创建的家谱id
  static getFamilyId() {
    const url = `/clan/api/clangenealogy/queryGenealogy`
    let params = {
      userId: wepy.getStorageSync('user') ? wepy.getStorageSync('user').userId : ''
    }
    return this.get(url, params, 'json')
  }
  // 获取普书
  static getBook() {
    const url = `/api/sys/protocol/getBook`
    return this.get(url, {})
  }
  // 修改家谱
  static modifyFamily(params) {
    const url = `/clan/api/clangenealogy/update`
    return this.post(url, params, 'json')
  }
  // 查询家谱
  static getFamily(genealogyId) {
    const url = `/clan/api/clangenealogy/info/${genealogyId}`
    return this.get(url, {})
  }
  // 获取成员头像列表
  static getAvatar() {
    const url = `/clan/api/clanrelationship/get/member/avatar`
    return this.get(url, {})
  }
  // 获取成员成员节点的所有成员列表
  static getMemberAll(params) {
    const url = `/clan/api/clanrelationship/get/curr/node/list`
    return this.get(url, params)
  }
  // 修改家谱成员排序
  static modifyMemberSort(params) {
    const url = `/clan/api/clanrelationship/update/node/sort`
    return this.post(url, params, 'json')
  }
  // 删除申请
  static deleteApplication(applyIds) {
    const url = `/clan/api/clanapply/updateIsDeleted/${applyIds}`
    return this.delete(url, {}, 'json')
  }
}
