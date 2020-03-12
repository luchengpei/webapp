import base from './base'
import Page from '@/utils/Page'
import Time from '@/utils/Time'
import Util from '@/utils/Util'

export default class Store extends base {
  // 托管服务
  static hostedService(params) {
    const data = {
      ...params
    }
    const url = `/intime/api/intime/text/info`
    return this.get(url, data)
  }
  // 预约页面的数据
  static orderConfig(params) {
    const data = {
      ...params
    }
    const url = `/intime/api/intime/config/info`
    return this.get(url, data)
  }
  // 我的宝贝列表
  static babyList() {
    const url = `/intime/api/intime/baby/list`
    return new Page(url)
  }
  // 添加宝贝
  static addBaby(params) {
    const url = `/intime/api/intime/baby/save`
    return this.post(url, params, 'json')
  }
  // 修改宝贝
  static updateBaby(params) {
    const url = `/intime/api/intime/baby/update`
    return this.post(url, params, 'json')
  }
  // 获取宝贝信息
  static babyInfo(params) {
    const url = `/intime/api/intime/baby/info/${params.babyId}`
    return this.get(url, params)
  }
  // 删除宝贝
  static deleteBaby(babyIds) {
    const url = `/intime/api/intime/baby/delete/${babyIds}`
    return this.delete(url, {}, 'json')
  }
  // 时光卡列表
  static cardList(params) {
    const data = {
      ...params
    }
    const url = `/intime/api/intime/card/list`
    return this.get(url, data)
  }
  // 获取当前小时卡/月卡设置
  static dishouCard(params) {
    const data = {
      ...params
    }
    const url = `/api/dis/dishourcard/info`
    return this.get(url, data)
  }
  // 托管记录列表
  static trusteeshipList(isLately) {
    // const data = {isLately}
    const url = `/intime/api/intime/deposit/list`
    // return this.get(url, data)
    return new Page(url)
  }
  // 获取托管详情
  static trusteeshipDetail(params) {
    const url = `/intime/api/intime/deposit/info/${params}`
    return this.get(url, {})
  }
  // 托管记录取消预约
  static cancelBook(depositId) {
    const url = `/intime/api/intime/deposit/cancelBook/${depositId}`
    return this.delete(url, {}, 'json')
  }
  // 获取用户信息
  static getUserInfo(query) {
    const url = `/api/sys/base/info`
    const param = {
      ...query
    }
    return this.get(url, param)
  }

  // 修改用户信息
  static updateUserInfo(quary) {
    const url = `/api/sys/user/update`
    const param = {
      ...quary
    }
    return this.post(url, param, 'json')
  }

  // 购买会员购买时光卡
  static async payTime(quary) {
    const url = `/intime/api/intime/timecardorder/payTime`
    const param = {
      ...quary
    }
    return this.post(url, param, 'json')
  }
  // 会员福利详情
  static getVipInfo(query) {
    const url = `/api/dis/memberwelfare/getWelfare`
    const param = {
      ...query
    }
    return this.get(url, param)
  }
  // 提交预约
  static orderSubmit(quary) {
    const url = `/intime/api/intime/deposit/save`
    const data = {
      ...quary
    }
    return this.post(url, data, 'json')
  }
  // 获取可用优惠券
  static getCoupons(params) {
    const url = `/api/coupons/show/coupons`
    const data = {
      ...params
    }
    return this.post(url, data, 'json')
  }
    /**
   * 获取收藏列表
   */
  static collectList(query) {
    const url = `/api/collection/collectionList`
    return new Page(url, this.dealNewsList.bind(this))
  }
  static dealNewsList(data) {
    console.log('Util.dateToTimeStamp(data.createTime)', data.createTime, Util.dateToTimeStamp(data.createTime))
    data.createTime = Time.timeToWord(Util.dateToTimeStamp(data.createTime))
  }
  // 门店列表
  static storeList() {
    const url = `/intime/api/store/store/list`
    return this.get(url, {})
  }

  // 公司介绍
  static companyIntroduction () {
    const url = `/api/sysplatforminfo/companyIntroduce`
    return this.get(url, {})
  }
}
