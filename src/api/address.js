import base from './base'

/**
 * 收货地址类
 */
export default class address extends base {
  /**
   * 获取收货地址列表
   */
  static list(userId) {
    const url = `/api/mall/address/app/getAddressList`
    const param = {
      userId: userId
    }
    return this.get(url, param)
  }

  /**
   * 添加收货地址
   */
  static add(param) {
    const url = `/api/mall/address/app/insertAddress`
    return this.post(url, param, 'json')
  }
  /**
   * 修改收货地址
   */
  static update(param) {
    const url = `/api/mall/address/app/updateAddress`
    return this.post(url, param, 'json')
  }
  /**
   * 删除收货地址
   */
  static del(addressId) {
    const url = `/api/mall/address/app/deleteAddress`
    const param = {
      addressId: addressId
    }
    return this.post(url, param, 'json')
  }
  /**
   * 设置默认收货地址
   */
  static setDefault(addressId) {
    const url = `/api/mall/address/app/setAddressDefault`
    const param = {
      addressId: addressId
    }
    return this.post(url, param, 'json')
  }
  /**
   * 获取默认收货地址
   */
  static defaultAddr() {
    const url = `/api/mall/address/app/getDefaultAddress`
    return this.get(url, {})
  }
}
