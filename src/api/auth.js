import base from './base'
import wepy from 'wepy'
/**
 * 登录
 */
export default class auth extends base {
  /**
   * 检查登录
   */
  static async checkLogin() {
    const token = this.getConfig('token')
    if (token != null && token !== '') {
      try {
        // token存在
        console.warn('token is working', token)
        // await this.checkLoginCode(loginCode);
      } catch (e) {
        console.warn('check token fail', token)
        await this.doLogin()
      }
    } else {
      console.warn('token not exists', token)
      await this.doLogin()
    }
  }

  /**
   * 新登录
   * @param {*} userInfo
   */
  static async login(query) {
    const url = `/api/sys/base/wechatLogin`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }

  /**
   * 新绑定手机
   */
  static async bindTell(query) {
    const url = `/api/sys/base/bindPhone`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }

  /**
   * 获取个人用户信息
   */
  static async getMineUserInfo() {
    const url = `/api/sys/base/bindPhone`
    return this.get(url)
  }

  /**
  * 设置权限值
  */
  static getConfig(key) {
    return wepy.getStorageSync(key)
  }

  /**
   * 检查是否存在权限制
   */
  static hasConfig(key) {
    const value = this.getConfig(key)
    return value !== null && value !== ''
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({ key: key, data: value })
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`)
    await wepy.removeStorage({ key: key })
  }

  // 绑定上下级关系
  static bindIntroducer(param) {
    const url = `/api/sys/user/bind/introducer`
    return this.post(url, {
      introducerId: param.introducerId || -1
    }, 'json')
  }
    // 注册送优惠券
  static couponsGive() {
    const url = `/api/coupons/couponsGive`
    return this.get(url, {})
  }
}
