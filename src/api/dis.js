import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'
/**
 * 分销会员类
 */

export default class Dis extends base {
  /**
   * 获取人脉信息
   */
  static getRelationshipList() {
    const url = `/api/dis/member/query/connection/info`
    return new Page(url, this._proccessRelationship.bind(this), {
      pageSize: 16
    })
  }

  // 处理人脉数据
  static _proccessRelationship(data) {
    data.realName = data.realName || ''
    data.mobile = Util.blankPhone(Util.starPhone(data.mobile))
    data.sumOrderPrice = data.sumOrderPrice ? data.sumOrderPrice.toFixed(2) : '0.00'
    return data
  }

  // 我的会员页面展示
  static getMemberInfo() {
    const url = `/api/dis/member/query/member/info`
    return this.get(url, {})
  }

  // 单个会员介绍信息
  static getLevelInfo() {
    const url = `/api/dis/level/info`
    return this.get(url, {})
  }

  // 缴费成为会员
  static onPayMember(param) {
    const url = `/api/dis/rebate/payment`
    return this.post(url, param, 'json')
  }

  // 取消缴费订单
  static onCancelMember() {
    const url = `/api/dis/rebate/payment/cancel`
    return this.post(url, {}, 'json')
  }

  // 申请会员
  static onApplyMember(param) {
    const url = `/api/dis/member/apply/member`
    return this.post(url, param, 'json')
  }

  // 升级会员
  static onUpgradeMember() {
    const url = `/api/dis/member/upgrade/member`
    return this.post(url, {}, 'json')
  }

  // 佣金明细
  static onCommission() {
    const url = `/api/dis/rebate/count/list`
    return new Page(url, this._proccessCommissionList.bind(this))
  }

  // 会员排行榜列表
  static onRank(param) {
    const url = `/api/dis/level/rankingList`
    return this.get(url, param).then(res => {
      this._proccessRankList(res, param)
      return res
    })
  }

  // 处理排行榜
  static _proccessRankList(data, param) {
    data.map(item => {
      item.nickname = item.nickname || ''
      if (param.type === 1) item.sortBasis = item.sortBasis ? item.sortBasis.toFixed(2) : '0.00'
    })
  }

  // 处理佣金明细数据
  static _proccessCommissionList(data) {
    data.rebateAmount = (data.rebateAmount || 0).toFixed(2)
  }

  // 会员等级信息列表
  static getLevelList() {
    const url = `/api/dis/level/list`
    return this.get(url, {})
  }

  // 会员二维码
  static getQrCode() {
    const url = `/api/dis/rebate/member/code`
    return this.get(url, {})
  }
}
