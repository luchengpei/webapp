import wepy from 'wepy'
import Tips from '@/utils/Tips'
import Event from '@/utils/Event'
import { IDENTITY_HTTP_HEADER } from '@/utils/Constants'
// HTTP工具类
export default class http {
  static queue = []

  static async request(method, url, data, contentType = 'form', loading = true, errorToast = true) {
    const baseUrl = wepy.$appConfig.baseUrl
    const projectId = data.projectId ? data.projectId : wepy.getStorageSync('pid')
    const companyId = data.companyId ? data.companyId : wepy.getStorageSync('cid')
    const platformAppId = wepy.getStorageSync('platformAppId') || ''
    // 拼接extraData
    data = Object.assign(data, {
      projectId,
      companyId,
      platformAppId
    })
    // return
    const param = {
      url: `${baseUrl}${url}?projectId=${projectId}&companyId=${companyId}&platformAppId=${platformAppId}`,
      method: method,
      data: data,
      header: {
        'Accept': '*/*',
        'content-type': contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8',
        // 'companyId': companyId,
        // 'projectId': projectId,
        ...this.createAuthHeader()
      }
    }
    if (loading) {
      Tips.loading()
    }
    console.log('%c[Request param] ==>', 'color: #0091ea; font-weight: bold', param)
    console.log(`%c[Request param data json] ==>${JSON.stringify(param.data)}`, 'color: #0091ea; font-weight: bold')
    console.info(`%c[Request url] ==> ${url}`, 'color: #ff9100; font-weight: bold;')
    const res = await wepy.request(param)
    console.log('%c[Request response] ==> ', 'color: #558b2f; font-weight: bold;', res)
    Tips.loaded()
    if (this.isSuccess(res)) {
      return res.data.data
    } else {
      throw this.requestException(res, errorToast)
    }
  }

  /**
   * 判断请求是否成功
   */

  static isSuccess(res) {
    const wxCode = res.statusCode
    // 微信请求错误
    if (wxCode !== 200) {
      return false
    }
    const wxData = res.data
    // 服务器请求错误
    return !(wxData && wxData.code !== 0)
  }

  /**
   * 异常
   */
  static requestException(res, errorToast) {
    const error = {}
    error.statusCode = res.statusCode
    const wxData = res.data
    if (wxData) {
      error.code = wxData.code ? wxData.code : 'error'
      error.message = wxData.message ? wxData.message : '未知错误'
    }
    if (error.code === 401) {
      wx.removeStorageSync('token')
      wx.removeStorageSync('user')
      Event.emit(Event.UPDATE_USERINFO)
      wx.navigateTo({
        url: '/pages/login'
      })
    } else {
      if (errorToast) {
        Tips.toast(error.message, null, 'none', 1500)
      }
    }
    return error
  }

  /**
   * 构造授权头部
   */
  static createAuthHeader() {
    const token = wepy.getStorageSync('token')
    const invitationUserId = wepy.getStorageSync('inviteUser')
    const header = {}
    header['identity'] = IDENTITY_HTTP_HEADER
    header['invitationUserId'] = invitationUserId
    if (token) {
      header['token'] = token
    }
    return header
  }

  static get(url, data, contentType = 'form', loading = true, errorToast = true) {
    return this.request('GET', url, data, contentType, loading, errorToast)
  }

  static put(url, data, contentType = 'form', loading = true, errorToast = true) {
    return this.request('PUT', url, data, contentType, loading, errorToast)
  }

  static post(url, data, contentType = 'form', loading = true, errorToast = true) {
    return this.request('POST', url, data, contentType, loading, errorToast)
  }

  static patch(url, data, contentType = 'form', loading = true, errorToast = true) {
    return this.request('PATCH', url, data, contentType, loading, errorToast)
  }

  static delete(url, data, contentType = 'form', loading = true) {
    return this.request('DELETE', url, data, contentType, loading)
  }
}
