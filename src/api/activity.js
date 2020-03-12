import base from './base'
import Util from '@/utils/Util'
import Time from '@/utils/Time'
import Page from '@/utils/Page'
import wepy from 'wepy'
/**
 * 活动类
 */
export default class activity extends base {
  /**
   * 官方活动列表
   */
  static list() {
    const url = `/api/activity/officialList`
    return new Page(url, this._proccessActivityList.bind(this))
  }

  /**
   * 首页推荐列表
   */
  static recommendList(params) {
    const url = `/api/activity/homeRecommendList`
    return this.get(url, {...params}).then(data => {
      if (data && data.list) {
        data.list.map(d => {
          d.startTime = d.startTime ? Util.dateFormate(new Date(d.startTime.replace(/-/g, '/')), 'yyyy.MM.dd hh:mm') : ''
          d.endTime = d.endTime ? Util.dateFormate(new Date(d.endTime.replace(/-/g, '/')), 'yyyy.MM.dd hh:mm') : ''
          d.typeStr = `${d.activityTypeName}·${d.activitySubTypeName}`
          return d
        })
      }
      return data.list
    })
  }
  /**
   * 我参与的活动列表
   */
  static mineList() {
    const url = `/api/activity/getMyJoinActivityList`
    return new Page(url, this._myActivityList.bind(this))
  }
  /**
   * 活动详情
   */
  static detail(id) {
    const url = `/api/activity/info/${id}`
    return this.get(url, {
      userId: wepy.getStorageSync('user') ? wepy.getStorageSync('user').userId : ''
    }).then(res => {
      this._proccessActivityItem(res)
      return res
    })
  }
  // 获取表单字段
  static getForm(query) {
    const url = `/api/activity/getActivityFormField`
    const params = {
      ...query
    }
    return this.get(url, params)
  }
  // 获取票种
  static getTicketList(query) {
    const url = `/api/activity/getActivitySettingList`
    const params = {
      ...query
    }
    return this.get(url, params)
  }
  // 活动报名
  static signUp(query) {
    const url = `/api/activity/officialApplyActivity`
    const params = {
      ...query
    }
    return this.post(url, params, 'json')
  }
  // 订单详情
  static orderInfo(orderId) {
    const url = `/api/activity/activityorder/info/${orderId}`
    return this.get(url, {})
  }
  // 获取订单数据
  static getOrderData(query) {
    const url = `/api/activity/getOrderConfirmInfo`
    const params = {
      ...query
    }
    return this.get(url, params).then(item => {
      item.activityInfo._startTime = Util.dateFormate(new Date(Date.parse(item.activityInfo.startTime.replace(/-/g, '/'))), 'yyyy.MM.dd hh:mm')
      item.activityInfo._endTime = Util.dateFormate(new Date(Date.parse(item.activityInfo.endTime.replace(/-/g, '/'))), 'yyyy.MM.dd hh:mm')
      return item
    })
  }
  // 服务通知发送formId
  static insertFormId(query) {
    const url = `/api/activity/activityorder/saveFormId`
    const params = {
      ...query
    }
    return this.post(url, params, 'json')
  }
  // 活动支付
  static pay(query) {
    const url = `/api/pay/wx/pay`
    const params = {
      ...query
    }
    return this.post(url, params, 'json')
  }
  // 活动支付回调
  static payReturn(query) {
    const url = `/api/activity/activityorder/orderPayConfirm`
    const params = {
      ...query,
      payType: 1,
      orderType: 18
    }
    return this.post(url, params, 'json')
  }
  // 支付失败回调
  static payFailReturn(pathQuery, query) {
    const url = `/api/activity/activityorder/delOrder/${pathQuery}`
    const params = {
      ...query
    }
    return this.get(url, params)
  }
  // 评论留言
  static publishSaying(query) {
    const url = `/api/sys/commentmain/save`
    const params = {
      ...query,
      sourceType: 4
    }
    return this.post(url, params, 'json')
  }
  // 获取评论留言
  static getComment(query) {
    const url = `/api/sys/commentmain/getCommentList`
    const params = {
      ...query,
      userId: wepy.getStorageSync('user') ? wepy.getStorageSync('user').userId : ''
    }
    return this.get(url, params).then(res => {
      res.map(v => {
        v._commentLabel = v.commentLabel ? v.commentLabel.split(',') : []
        v._isLiked = Boolean(v.isLiked)
        v._createTime = Time.timeToWord(Date.parse(v.createTime.replace(/-/g, '/')))
        v._commentImg = v.commentImg ? v.commentImg.split(',') : []
      })
      return res
    })
  }
  // 点赞
  static async clickLike(query) {
    const url = `/api/sys/commentmain/likeComment`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
  /**
   * 处理活动列表
   * @param {*} list 列表
   */
  static _proccessActivityList(item) {
    item.startTime = item.startTime ? Util.dateFormate(new Date(item.startTime), 'yyyy.MM.dd hh:mm') : ''
    item.endTime = item.endTime ? Util.dateFormate(new Date(item.endTime), 'yyyy.MM.dd hh:mm') : ''
    item.typeStr = `${item.activityTypeName}·${item.activitySubTypeName}`
  }

  // 处理我的活动列表的时间
  static _myActivityList(item) {
    item.startTime = item.startTime ? Util.dateFormate(new Date(Util.dateToTimeStamp(item.startTime)), 'yyyy/MM/dd hh:mm') : ''
    item.endTime = item.endTime ? Util.dateFormate(new Date(Util.dateToTimeStamp(item.endTime)), 'yyyy/MM/dd hh:mm') : ''
    item.typeStr = `${item.activityTypeName}·${item.activitySubTypeName}`
  }

  /**
   * 处理活动项
   * @param {*} item 活动项
   */
  static _proccessActivityItem(item) {
    const {
      activityMain,
      activitySubType,
      activityType
    } = item
    item.activityMain.startTime = Util.dateFormate(new Date(Date.parse(activityMain.startTime.replace(/-/g, '/'))), 'yyyy.MM.dd hh:mm')
    item.activityMain.endTime = Util.dateFormate(new Date(Date.parse(activityMain.endTime.replace(/-/g, '/'))), 'yyyy.MM.dd hh:mm')
    // 状态
    item.activitySetting = item.activitySetting ? item.activitySetting : {
      isFree: 1
    }
    item._isSign = item.activitySetting.formId ? 'sign' : 'no-sign'
    item._isFree = Number(item.activitySetting.isFree) // 是否免费 0为收费，1为免费
    item._isJoin = Number(item.isJoined) // 当前用户是否加入 0未加入 1加入
    item._activityStatus = item.activityMain.activityStatus // 1为未开始，2为报名中，3为进行中，4为已结束，5为组团失败 6已满人
    item._settingCount = item.settingCount ? item.settingCount : 0
    item._settingCount = item._settingCount > 1 ? 2 : item._settingCount // 票种数量 0无票 1单票 3多票
    // 组合分类名称
    item.activityMain.typeStr = `${activityType.typeName}·${activitySubType.typeName}`
  }
}
