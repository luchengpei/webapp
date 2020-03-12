import Tips from '@/utils/Tips'
import wepy from 'wepy'
// 微信相关API类
export default class WxApi {
  // 微信登录
  static wxLogin() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
    // 微信浏览图片
  static wxLookImg(current, urls = []) {
    return new Promise((resolve, reject) => {
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls, // 需要预览的图片http链接列表
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
  // 跳转小程序
  static navigateToMiniProgram(appId, url = '', data = '') {
    wx.navigateToMiniProgram({
      appId: appId,
      path: url,
      extraData: {
        from: data
      },
      envVersion: 'develop',
      success(res) {
        // 打开其他小程序成功同步触发
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  }
  // 微信小程序获取节点高度
  static wxGetDomHeight(dom) {
    return new Promise((resolve, reject) => {
      let query = wx.createSelectorQuery()
      query.select(dom).boundingClientRect(rect => {
        let height = rect.height
        resolve(height)
      }).exec()
    })
  }
    // 微信选择图片
  static wxChooseImg(count = 9) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          resolve(res.tempFilePaths)// 返回零时路径
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
  // 获取机型状态栏高度
  static wxGetTelStatusHeight() {
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success(res) {
          resolve(res.statusBarHeight)
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
  // 动态设置当前页面的标题
  static wxSetTitle(title) {
    return new Promise((resolve, reject) => {
      wx.setNavigationBarTitle({
        title,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
  // 页面滚动到目标位置
  static wxScrollTo(scrollTop, duration = 300) {
    return new Promise((resolve, reject) => {
      wx.pageScrollTo({
        scrollTop,
        duration,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
  // 微信复制到剪贴板
  static wxSetClipboard(data) {
    return new Promise((resolve, reject) => {
      wx.setClipboardData({
        data,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
  // 微信上传文件
  static wxUploadImg(otherData, pathArr) {
    let urlArr = []
    return new Promise((resolve, reject) => {
      pathArr.forEach((url, i) => {
        Tips.loading(`正在上传`)
        wx.uploadFile({
          url: `${wepy.$appConfig.configData.httpUrl}/api/oss/fileUpload`, // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file', // key
          formData: {
            ...otherData
          },
          success(res) {
            urlArr.push(JSON.parse(res.data))
            if (pathArr.length - 1 === i) {
              Tips.loaded()
              resolve(urlArr)
            }
          },
          fail(err) {
            reject(Error, err)
          }
        })
      })
    })
  }
  // 微信打电话
  static wxCall(phoneNumber) {
    return new Promise((resolve, reject) => {
      wx.makePhoneCall({
        phoneNumber,
        success(res) {
          resolve(res)// 返回零时路径
        },
        fail(err) {
          reject(Error, err)
        }
      })
    })
  }
    // 微信支付函数
  static wxPayFun(query) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        timeStamp: query.timeStamp,
        nonceStr: query.nonceStr,
        package: query.package,
        signType: query.signType,
        paySign: query.paySign,
        success (res) {
          resolve(res)
        },
        fail (res) {
          reject(res)
        }
      })
    })
  }
}
