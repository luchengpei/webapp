import base from './base'
import Time from '@/utils/Time'
import wepy from 'wepy'
/**
 * 钱包类
 */
export default class Wallet extends base {
  /**
   * 获取钱包
   */
  static walletNum() {
    const url = `/api/wallet/walletaccount/selectAccount`
    const param = {
      roleId: wepy.getStorageSync('user').userId,
      roleType: 2
    }
    return this.get(url, param).then(res => {
      const cardTypeMap = {
        1: '储蓄卡',
        2: '信用卡'
      }
      res = res || {}
      res.availableAccount = res.walletAccountEntity && res.walletAccountEntity.notPresented ? res.walletAccountEntity.notPresented.toFixed(2) : '0.00'
      res.isBind = !!res.subMerchantEntity
      res.bankCard = res.subMerchantEntity
      if (res.isBind) {
        const cardLen = res.bankCard.subMerchantBankNo.length
        res.cardText = `${res.bankCard.openBank}${cardTypeMap[res.bankCard.cardType] || ''}(${res.bankCard.subMerchantBankNo.substring(cardLen - 4)})`
      } else {
        res.cardText = ''
      }
      return res
    })
  }
  /**
   * 获取流水
   */
  static walletTurnover() {
    const url = `/api/wallet/walletturnover/selectAccountById`
    const param = {
      id: wepy.getStorageSync('user').userId
    }
    return this.get(url, param).then(res => {
      return this.dealWalletTurnover(res)
    })
  }

  /**
   * 提现
   */
  static applyWithdraw(query) {
    const url = `/api/pay/paywithdraworder/withdrawApply`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
     /**
   * 提现验证码
   */
  static withdrawCode(query) {
    const url = `/api/sys/base/regCaptcha`
    const param = {
      type: 5,  // 1 注册手机号 2重置密码 3绑定手机号 5 验证码登陆
      ...query
    }
    return this.post(url, param, 'json')
  }

  /**
   * 匹配银行卡
   * @param {*} query
   */
  static matchBank(query) {
    const url = `/api/provider/submerchant/getBankName`
    const param = {
      ...query
    }
    return this.get(url, param, 'form', false, false)
  }

  /**
   * 绑卡
   * @param {*} query
   */
  static bindCard(query) {
    const url = `/api/provider/submerchant/bindCard`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }

  /**
   * 修改绑卡
   * @param {*} query
   */
  static changeCard(query) {
    const url = `/api/provider/submerchant/updateBindCard`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }

  /**
   * 银行卡信息
   * @param {*} query
   */
  static cardInfo(query) {
    const url = `/api/provider/submerchant/getInfo`
    const param = {
      ...query
    }
    return this.get(url, param).then(res => {
      return this.dealCardInfo(res)
    })
  }

  /**
   * 提现设置
   */
  static withdrawSetting() {
    const url = `/api/pay/paywithdraworder/getMerchantWithdrawSetting`
    return this.get(url, {})
  }

  /**
   * 钱包可提现余额
   */
  static walletAmount(query) {
    const url = `/api/pay/paywithdraworder/getCanWithdrawAmount`
    const param = {
      ...query
    }
    return this.get(url, param)
  }

  // 数据处理
  // 流水处理
  static dealWalletTurnover(data) {
    let newData = JSON.parse(JSON.stringify(data))
    newData.list.map((v, i) => {
      v.creationTime = Time.timeToWord(v.creationTime)
      v.processingTimeMe = Time.timeToWord(v.processingTime)
    })
    return newData
  }

  static dealCardInfo(data) {
    console.log('ddd', data)
    const phone = data.subMerchantPhone
    const idCard = data.subMerchantIdCard
    const cardNo = data.subMerchantBankNo
    data.phone = `${phone.substring(0, 3)} **** ${phone.substring(7)}`
    data.idCard = `${idCard.substring(0, 6)} **** **** ${idCard.substring(idCard.length - 4)}`
    data.cardNo = `**** **** **** ${cardNo.substring(cardNo.length - 4)}`
    return data
  }
}
