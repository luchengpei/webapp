import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'

/**
 * 返现惠品
 */
export default class cashBack extends base {
  /**
   * 返现列表
   */
  static list() {
    const url = `/api/mall/bargain/activity/app/list`
    return new Page(url, this._proccessGoodsList.bind(this))
  }

  /**
   * 返现活动详情
   */
  static detail(bargainActivityId) {
    const url = `/api/mall/bargain/activity/app/detail`
    return this.get(url, { bargainActivityId }).then(item => {
      this._processGoodsRemainTime(item)
      return item
    })
  }

  /**
   * 我的返现列表
   */
  static mine() {
    const url = `/api/mall/bargain/activity/app/user/bargain/list`
    return new Page(url, this._proccessMineList.bind(this))
  }

  /**
   * 我的返现详情
   */
  static mineDetail(userBargainId) {
    const url = `/api/mall/bargain/activity/app/bargain/detail`
    return this.get(url, { userBargainId }).then(item => {
      item.totalAmount = item.totalAmount && item.totalAmount.toFixed(2)
      item.bargainingPrice = item.bargainingPrice && item.bargainingPrice.toFixed(2)
      this._processGoodsRemainTimeStamp(item, 0, item.bargainEndTimeStamp * 1000)
      return item
    })
  }

  /**
   * 返现操作
   */
  static bargain(param) {
    const url = `/api/mall/bargain/activity/app/cut/bargain`
    return this.post(url, param, 'json')
  }

  /**
 * 处理商品列表
 * @param {*} item
 */
  static _proccessGoodsList(item) {
    item.bargainPrice = item.bargainPrice && item.bargainPrice.toFixed(2)
    item.cutBargainPrice = item.cutBargainPrice && item.cutBargainPrice.toFixed(2)
    item.productCrossLinePrice = item.productCrossLinePrice && item.productCrossLinePrice.toFixed(2)
  }

  /**
  * 处理商品列表
  * @param {*} item
  */
  static _proccessMineList(item) {
    item.overBargainMoney = item.overBargainMoney && parseFloat(item.overBargainMoney).toFixed(2)
    this._processMineRemainTime(item)
  }

  /**
   * 处理商品时间
   * @param {*} item
   */
  static _processGoodsRemainTime(item) {
    const begin = Util.dateToTimeStamp(item.bargainBeginTime)
    const end = Util.dateToTimeStamp(item.bargainEndTime)
    this._processGoodsRemainTimeStamp(item, begin, end)
  }

  /**
 * 处理商品时间
 * @param {*} item
 */
  static _processMineRemainTime(item) {
    const begin = Util.dateToTimeStamp(item.joinBargainStartTime)
    const end = Util.dateToTimeStamp(item.joinBargainEndTime)
    this._processGoodsRemainTimeStamp(item, begin, end)
  }

  /**
   * 处理时间
   * @param {*} item
   * @param {*} begin 开始时间
   * @param {*} end 结束时间
   * timeStatus 0未开始 1进行中 2已结束
   * remainTime 剩余时间 remainHour 剩余小时 remainSecond 剩余分 remainMinute 剩余秒
   */
  static _processGoodsRemainTimeStamp(item, begin, end) {
    const now = new Date().getTime()
    item.timeText = now < begin ? '距开始' : now > begin && now < end ? '距结束' : ''
    item.timeStatus = now < begin ? 0 : now > begin && now < end ? 1 : 2
    item.remainTime = now < begin ? begin - now : now > begin && now < end ? end - now : ''
    item.remainFormat = item.remainTime ? Util.countFormat(item.remainTime) : ''
    item.remainHour = item.remainFormat ? item.remainFormat.split(':')[0] : ''
    item.remainSecond = item.remainFormat ? item.remainFormat.split(':')[1] : ''
    item.remainMinute = item.remainFormat ? item.remainFormat.split(':')[2] : ''
  }
}
