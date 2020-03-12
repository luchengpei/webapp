import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'
/**
 * 商品相关服务类
 */
export default class goods extends base {
    /**
   * 获取广告弹窗
   */
  static getAlert() {
    const url = `/api/mall/config/popups/info`
    return this.get(url, {}).then(res => {
      res.hasConfig = res && res.limit !== ''
      return res
    })
  }
  /**
   * 获取海报
   */
  static getPoster(productId) {
    const url = `/api/mall/product/product/poster`
    return this.get(url, {productId}).then(res => {
      res.shopImg = res.productThumbnail
      res.shopText = res.productName
      res.price = res.productPrice
      res.notPrice = res.productCrossLinePrice
      res.activeTip = res.productName // 活动标签
      res.posterImg = res.festivalImg
      res.codeImg = res.minProgramCode
      return res
    })
  }
  /**
   * 获取商品分类
   */
  static categories() {
    const url = `/api/mall/category/app/getCategoryList`
    return this.get(url, {}).then(list => {
      this._processCategoriesImage(list)
      return list
    })
  }

  /**
   * 根据分类ID获取商品列表
   */
  static goodsByCategoryId() {
    const url = `/api/mall/product/app/getProductListUnderCategory`
    return new Page(url, this._proccessGoodsList.bind(this))
  }

  /**
   * 搜索
   */
  static search() {
    const url = `/api/mall/product/searchProject`
    return new Page(url, this._proccessGoodsList.bind(this))
  }

  /**
   * 获取商品详情
   */
  static goodsInfo(goodsId) {
    const url = `/api/mall/product/app/getProductDetail`
    return this.get(url, { id: goodsId }).then(info => {
      this._processGoodsInfo(info)
      return info
    })
  }

  /**
   * 获取首页商品列表
   */
  static indexGoods() {
    const url = `/api/mall/product/indexGetProductList`
    return new Page(url, this._proccessGoodsList.bind(this), {pageSize: 4})
  }

  /**
   * 收藏商品
   */
  static addCollection(param) {
    const url = `/app/v1/favor/collection/add`
    return this.post(url, param)
  }
  /**
   * 取消收藏商品
   */
  static delCollection(param) {
    const url = `/app/v1/favor/collection/del`
    return this.post(url, param)
  }
  /**
   * 检查是否收藏
   */
  static checkCollection(param) {
    const url = `/app/v1/favor/collection/check`
    return this.get(url, param)
  }
  /**
   * 我的收藏列表
   */
  static myCollection() {
    const url = `/app/v1/e-commerce/product/collection`
    return this.get(url, {}).then(list => {
      if (!list) list = []
      this._proccessCollectList(list)
      return list
    })
  }

  /**
   * 处理分类图片
   */
  static _processCategoriesImage(list) {
  }

  /**
   * 处理商品详情
   * @param {*} item
   */
  static _processGoodsInfo(item) {
    if (!isNaN(Number(item.product.commision))) {
      item.product.commision = item.product.commision.toFixed(2)
    }
    // 处理商品轮播图
    item.product.productImg = item.product.productImg.split(',')
    // 销量
    if (item.product.inventoryNum && item.product.inventoryNum > 999) {
      item.product.inventoryNum = '999+'
    }
    // 规格图列表（用于预览）
    let tpImgs = []
    tpImgs.push(item.product.productThumbnail)
    // 规格图
    if (item.productTpList && item.productTpList[0]) {
      item.productTpList[0] = item.productTpList[0].map(i => {
        if (i.productTpImg) {
          tpImgs.push(i.productTpImg)
        }
        return i
      })
    }
    item.product.tpImgs = tpImgs
    // 处理富文本图片
    if (item.product.productDesc) {
      const regex = new RegExp('<img', 'gi')
      item.product.productDesc = item.product.productDesc.replace(regex, `<img style="max-width: 100%;"`)
    }
    // 处理运费
    if (item.postage && item.postage.type) {
      const {type, spend, every, start, subtract} = item.postage
      if (+type === 1) {  // 包邮
        item.postage.name = '包邮'
      } else if (+type === 2) {  // 每单
        item.postage.name = `每单${spend}元`
      } else if (+type === 3) { // 满X包邮,未满每单y元
        item.postage.name = `满${every}每单${subtract}元/未满每单${start}元`
      } else {
        item.postage.name = ''
      }
    }
  }

  /**
   * 处理收藏列表
   * @param {*} list
   */
  static _proccessCollectList(list) {
    list.map(item => {
      item.productPrice = item.productPrice.toFixed(2)
    })
  }

  /**
   * 处理商品列表
   * @param {*} item
   */
  static _proccessGoodsList(item) {
    if (!isNaN(Number(item.commision))) {
      item.commision = item.commision.toFixed(2)
    }
    if (item.memberPrice) {
      item.memberPrice = (+item.memberPrice).toFixed(2)
    }
    item.productCrossLinePrice = item.productCrossLinePrice && item.productCrossLinePrice.toFixed(2)
    this._processGoodsRemainTime(item)
  }

  /**
   * 处理商品剩余时间
   * @param {*} chian
   */
  static _processGoodsRemainTime(item) {
    if (!item.flashSaleBeginTimeStamp || !item.flashSaleEndTimeStamp) return
    let current = (new Date().getTime())
    let start = Util.dateToTimeStamp(item.flashSaleBeginTimeStamp)
    let end = Util.dateToTimeStamp(item.flashSaleEndTimeStamp)
    let t = end - current
    if (current > end) {
      // 已结束
      item.remainFormat = ''
      item.timeStatus = 2
    } else if (current < start) {
      // 未开始
      item.remainFormat = ''
      item.timeStatus = 0
    } else if (current > start && current < end) {
      item.remainFormat = Util.countFormat(t)
      item.timeStatus = 1
    }
  }
  // 获取公告
  static getCarousel() {
    let url = `/api/sys/notice/getCarousel`
    return this.get(url, {})
  }
  // 获取公告详情
  static getCarouselDetails(noticeId) {
    let url = `/api/sys/notice/info/${noticeId}`
    return this.get(url, {})
  }
}
