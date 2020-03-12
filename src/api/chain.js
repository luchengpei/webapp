import base from './base'
import Page from '@/utils/Page'
import Util from '@/utils/Util'

/**
 * 接龙类
 */
export default class chain extends base {
  /**
   * 接龙列表
   */
  static list() {
    const url = `/api/mall/community/relay/app/getRelayProductList`
    return new Page(url, this._processChainListItem.bind(this))
  }
  /**
   * 接龙详情
   */
  static info(param) {
    const url = `/api/mall/community/relay/app/getRelayDetail`
    return this.get(url, param).then(chain => {
      this._processGoodsTpName(chain)
      this._processGoodsImg(chain)
      this._processGoodsRemainTime(chain)
      this._processGoodsMoney(chain)
      return chain
    })
  }
  /**
   * 一键接龙
   */
  static order(param) {
    const url = `/api/mall/community/relay/app/oneClickSolitaire`
    return this.post(url, param, 'json')
  }
  /**
   * 接龙用户列表
   */
  static userlist() {
    const url = `/api/mall/community/relay/app/getRelayUserList`
    return new Page(url, null, {
      pageSize: 20
    })
  }
  /**
   * 处理接龙列表数据
   * @param {*} order
   */
  static _processChainListItem(chain) {
    this._processGoodsTpName(chain)
    this._processGoodsImg(chain)
    this._processGoodsRemainTime(chain)
    this._processGoodsMoney(chain)
  }

  /**
   * 处理图片
   * @param {*} chain
   */
  static _processGoodsImg(chain) {
  }

  /**
   * 处理商品规格
   * @param {*} chain
   */
  static _processGoodsTpName(chain) {
    if (chain.productTpList && chain.productTpList.length) {
      let tpNames = []
      let tps = chain.productTpList
      tps.map((item) => {
        tpNames.push(item.productTpValue)
      })
      chain.tpNames = tpNames.join(',')
    } else {
      chain.tpNames = ''
    }
  }

  /**
   * 处理商品剩余时间
   * @param {*} chian
   */
  static _processGoodsRemainTime(chain) {
    let t = Util.dateToTimeStamp(chain.endTime) - (new Date().getTime())
    if (t > 0) {
      let format = ''
      format = Util.countFormat(t)
      chain.remainFormat = format
    } else {
      chain.remainFormat = ''
    }
  }

  // 我的拼团列表
  static getMineChainList() {
    const url = `/api/mall/community/relay/app/my/list`
    return new Page(url, null)
  }

  static _processGoodsMoney(chain) {
    chain.productTpPrice = chain.productTpPrice.toFixed(2)
    chain.groupByPrice = chain.groupByPrice.toFixed(2)
  }
}
