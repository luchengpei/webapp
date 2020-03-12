import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'

const modeMap = new Map([
  [1, 'default'],
  [2, 'group'],
  [3, 'flash_sale'],
  [4, 'chain'],
  [5, 'cash_back']
])
/**
 * 订单
 */
export default class order extends base {
  /**
   * 订单分页列表，返回分页对象
   */
  static list() {
    const url = `/api/mall/order/app/order/list`
    return new Page(url, this._processOrderListItem.bind(this))
  }
  // 订单获取优惠券
  static orderCoupon(query) {
    const url = `/api/coupons/show/coupons`
    const params = {...query}
    return this.post(url, params, 'json').then(res => {
      return this.dealCouponList(res)
    })
  }
   /**
   * 获取订单总数
   */
  static getOrderTotel(params) {
    const url = `/api/mall/order/get/order/status/num`
    const param = {
      ...params
    }
    return this.get(url, param).then(res => {
      res.waitPay = res.pendingCount
      res.waitSend = res.tobeDeliveredCount
      res.waitGet = res.shippedCount
      res.ready = res.successCount
      return res
    })
  }
  /**
   * 订单详情
   */
  static detail(productOrderId) {
    const url = `/api/mall/order/app/order/detail`
    const param = { productOrderId: productOrderId }
    return this.get(url, param).then(order => this._processOrderDetail(order))
  }

  /**
   * 取消订单
   */
  static cancel(productOrderId, type = 1) {
    const url = `/api/mall/order/app/order/cancel`
    const param = {
      productOrderId,
      type  // 1 默认普通订单  4接龙订单
    }
    return this.get(url, param)
  }

  /**
   * 催促发货
   */
  static urgeShipment(productOrderId) {
    const url = `/api/mall/order/app/order/urgeShipment`
    const param = { productOrderId: productOrderId }
    return this.get(url, param)
  }

  /**
   * 确认收货
   */
  static confirm(productOrderId) {
    const url = `/api/mall/order/app/order/confirm`
    const param = { productOrderId: productOrderId }
    return this.get(url, param)
  }

  /**
   * 退货退款
   */
  static refund(productOrderId, refundType) {
    const url = `/api/mall/order/app/order/refund`
    const param = { productOrderId, refundType }
    return this.get(url, param)
  }

  /**
   * 取消退款
   * @param {*} productOrderId
   */
  static cancelRefund(productOrderId) {
    const url = `/api/mall/refund/app/refund/cancel`
    const param = { productOrderId }
    return this.post(url, param, 'json')
  }

  /**
   * 删除订单
   * @param {*} productOrderId
   */
  static delete(productOrderId) {
    const url = `/api/mall/order/app/order/delete`
    const param = { productOrderId }
    return this.post(url, param, 'json')
  }

  /**
   * 查物流
   * @param {*} productOrderId
   */
  static logistics(productOrderId) {
    const url = `/api/mall/logistics/app/getLogistics`
    const param = { productOrderId }
    return this.post(url, param, 'json').then(logistic => this._processLogistic(logistic))
  }

  /**
   * 支付
   * payType 支付类型（1微信小程序支付）
   * @param {*} param
   */
  static pay(oid, orderNo, openId, payType = 1, orderType = 13) {
    const url = `/api/pay/wx/pay`
    const param = {
      payType,
      openId,
      orderId: oid,
      outTradeNo: orderNo,
      orderType,
      subject: '电商',
      body: '电商订单'
    }
    return this.post(url, param, 'json')
  }

  /**
   * 第三方支付
   * @param {*} params
   */
  static thirdPay(params) {
    const url = `/api/pay/EpspPay/wxJsPay`
    const user = wx.getStorageSync('user')
    const param = {
      openId: user.openId,
      ...params
    }
    return this.post(url, param, 'json')
  }

  /**
   * 支付后查询状态
   */
  static payStatus(param, orderType = 13) {
    const url = `/api/pay/query`
    const params = {
      ...param,
      payType: 1,
      orderType
    }
    return this.post(url, params, 'json')
  }

  /**
   * 获取待付款预下单订单详情
   */
  static preOrder(param) {
    const url = `/api/mall/product/app/getProductCost`
    return this.get(url, param).then(order => this._processPreOrderDetail(order))
  }
  /**
   * 获取待付款预下单订单详情
   */
  static preOrderfromCart(param) {
    const url = `/api/mall/shopping/cart/app/getProductCost`
    return this.get(url, param).then(order => this._processPreOrderDetail(order))
  }

  /**
   * 下单
   */
  static submit(param) {
    const url = `/api/mall/order/app/submitOrder`
    return this.post(url, param, 'json')
  }
  /**
   * 接龙活动
   */
  static chain() {
    const url = `/app/v1/e-commerce/order/app/groupBuyingList`
    return new Page(url, this._processOrderListItem.bind(this))
  }

  static _processPreOrderDetail(order) {
    // 增加总商品件数 以及价格 图片
    let sumNum = 0
    if (order.dataList) {
      order.dataList.map((item) => {
        sumNum += item.product.buyNum
        if (item.productTpExtend && item.productTpExtend.productSkuName) {
          item.product.skus = item.productTpExtend.productSkuName.replace(/-/g, ',')
          item.product.skusPrice = item.productTpExtend.productTpPrice
        }
      })
    }
    order.sumNum = sumNum
    return order
  }

  /**
   * 处理订单列表数据
   * @param {*} order
   */
  static _processOrderListItem(order) {
    // 处理订单时间
    this._processOrderTime(order)
    // 处理价格
    this._processOrderPrice(order)
    // 处理商品
    if (order.orderProductList) {
      order.orderProductList = order.orderProductList.map(item => {
        item.orderType = order.type
        return item
      })
      this._processOrderGoods(order.orderProductList)
    }
    if (order.productList) {
      this._processOrderGoods(order.productList)
    }
    // 将订单类型写入商品列表中
    order.mode = modeMap.get(order.type)
  }

  /**
   * 处理订单详情数据
   * @param {*} order
   */
  static _processOrderDetail(order) {
    // 处理订单时间
    this._processOrderTime(order)
    // 处理价格
    this._processOrderPrice(order)
    // 处理商品
    if (order.orderProductList) {
      order.orderProductList = order.orderProductList.map(item => {
        item.orderType = order.type
        return item
      })
      this._processOrderGoods(order.orderProductList)
    }
    if (order.productList) {
      this._processOrderGoods(order.productList)
    }
    // 处理订单图片
    return order
  }

  /**
   * 处理订单商品
   * @param {*} order
   */
  static _processOrderGoods(goods) {
    if (goods == null || goods.length < 1) return
    goods.forEach(item => {
      this._processGoodsPrice(item)
      this._processGoodsSku(item)
      this._processGoodsImage(item)
    })
  }

  /**
   * 处理订单时间
   * @param {*} order
   */
  static _processOrderTime(order) {
    order.createAt = Util.dateFormate(new Date(order.createAtStamp * 1000), 'yyyy-MM-dd hh:mm:ss')
    order.payAt = order.payAt ? Util.dateFormate(new Date(order.payTimeStamp * 1000), 'yyyy-MM-dd hh:mm:ss') : ''
  }

  /**
   * 处理订单价格
   * @param {*} order
   */
  static _processOrderPrice(order) {
    order.orderPrice = order.orderPrice.toFixed(2)
    if (order.payPrice) {
      order.payPrice = order.payPrice.toFixed(2)
    }
  }

  /**
 * 处理商品价格
 * @param {*} order
 */
  static _processGoodsPrice(goods) {
    goods.productPrice = goods.productPrice.toFixed(2)
  }

  /**
   * 处理商品图片
   * @param {*} goods
   */
  static _processGoodsImage(goods) {
  }
  /**
   * 处理商品规格
   * @param {*} goods
   */
  static _processGoodsSku(goods) {
    if (!goods.productTpList || goods.productTpList === null || goods.productTpList.length < 1) return
    let skus = []
    goods.productTpList.forEach(item => {
      skus.push(item.productTpValue)
    })
    goods.skus = skus.join(',')
  }

  static _processLogistic(logistic) {
    if (logistic) {
      logistic.map((item, index) => {
        item.current = index === 0
        item.text = item.AcceptStation
        item.timestape = item.AcceptTime
      })
    }
    return logistic
  }
  // 处理优惠券列表
  static dealCouponList(data) {
    let newData = data
    newData.forEach(row => {
      row.userRange = this.dealUseThreShold(row.useThreshold)
      row.faceValue = String(row.faceValue)
      row.validStopTime = Util.dateFormate(new Date(row.validEndTime.replace(/-/g, '/')), 'yyyy.MM.dd hh:mm')
    })
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
