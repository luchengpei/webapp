import base from './base'
import Util from '@/utils/Util'

/**
 * 购物车类
 */
export default class cart extends base {
  /**
   * 购物车列表
   */
  static list() {
    const url = `/api/mall/shopping/cart/app/getShoppingCartList`
    return this.get(url, {}).then(carts => this._processCartList(carts))
  }
  /**
   * 加入购物车
   */
  static add(param) {
    const url = `/api/mall/shopping/cart/app/addToShoppingCart`
    return this.post(url, param, 'json')
  }
  /**
   * 更新购物车商品购买数量
   */
  static updateNum(param) {
    const url = `/api/mall/shopping/cart/app/updateShoppingCartNum`
    return this.post(url, param, 'json')
  }
  /**
   * 删除购物车商品（单个）
   */
  static deleteOne(param) {
    const url = `/api/mall/shopping/cart/app/deleteToShoppingCart`
    return this.post(url, param, 'json')
  }
  /**
   * 删除购物车商品（批量）
   */
  static deleteAll(param) {
    const url = `/api/mall/shopping/cart/app/deleteShoppingCartList`
    return this.post(url, param, 'json')
  }
  /**
   * 处理购物车数据
   */
  static _processCartList(carts) {
    if (!carts) return []
    this._processCartItem(carts)
    return carts
  }

  /**
   * 处理购物车商品
   */
  static _processCartItem(carts) {
    carts.forEach(item => {
      let max = item.productTpExtend ? item.productTpExtend.productTpInventory : item.product.inventoryNum
      item.quantity = { num: item.shoppingCart.buyingNum, min: 1, max: max, componentId: item.shoppingCart.shoppingCartId }
      if (item.productTpExtend) {
        item.productTpExtend.productTpPrice = item.productTpExtend.productTpPrice.toFixed(2)
        item.productTpExtend.productSkuName = item.productTpExtend.productSkuName.replace(/-/g, ',')
      }
      if (item.product.isDeleted || !item.product.isPutOn) {
        item.invalid = true
      } else {
        item.invalid = false
      }
      // this._processCartItemSkus(item)
    })
  }

  static _processCartItemSkus(carts) {
    // carts.productTpExtend.productSkuName = carts.productTpExtend.productSkuName.replace(/-/g, ',')
  }
}
