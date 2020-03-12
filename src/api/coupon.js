import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'
/**
 * 优惠券服务类
 */
export default class Coupon extends base {
   /**
   * 优惠券领取列表
   */
  static getCouponList(query) {
    const url = `/app/v1/discount-coupon/coupon/app/list`
    return this.get(url, 'json').then(res => {
      return this.dealCouponList(res)
    })
  }
  /**
   * 优惠券领取
   */
  static getCoupon(couponId) {
    const url = `/app/v1/discount-coupon/coupon/apply/${couponId}`
    return this.get(url, 'json')
  }
    /**
   * 我的优惠券列表
   */
  static myCouponList(query) {
    const url = `/api/coupons/used/list`
    return new Page(
      url,
      this.dealCouponList.bind(this),
      null,
      base.javaKey,
    )
  }
      /**
   * 我的可用优惠券列表
   */
  static myCouponUseful(query) {
    const url = `/app/v1/discount-coupon/coupon/app/my/usefulList`
    const param = {
      ...query
    }
    return this.get(url, param, 'json').then(res => {
      return this.dealCouponList(res)
    })
  }
  // 获取优惠券领取列表
  static getCouponLists() {
    const url = `/api/coupons/list`
    return new Page(
      url,
      this.dealCouponList.bind(this),
      null,
      base.javaKey,
    )
  }
  // 领取优惠券
  static getCoupons(query) {
    const url = `/api/coupons/get/coupons`
    const params = {...query}
    return this.post(url, params, 'json')
  }
  // 处理优惠券列表
  static dealCouponList(data) {
    let newData = data
    newData.userRange = this.dealUseThreShold(newData.useThreshold)
    newData.faceValue = String(data.faceValue)
    newData.validStopTime = Util.dateFormate(new Date(newData.validEndTime.replace(/-/g, '/')), 'yyyy.MM.dd hh:mm')
    return newData
  }
  // 处理使用门槛
  static dealUseThreShold(val) {
    const status = new Map([
      [0, '无限制'],
      [1, '抵扣邮费'],
      [2, '满减']
    ])
    return status.get(val)
  }
}
