import Tips from './Tips'
export default class WxUtils {
  /**
   * 检查更新
   */
  static checkUpdate() {
    // 更新小程序
    if (!this.canIUse()) return
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(res => {
        console.log('res.hasUpdate', res.hasUpdate)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示', // 提示的标题,
              content: '新版本已经准备好，按确定重启应用', // 提示的内容,
              confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(() => {
            wx.showModal({
              title: '已经有新版本了~', // 提示的标题,
              content: '新版本已上线，请您删除当前小程序，重新搜索打开', // 提示的内容,
              success: function(res) { }
            })
          })
        }
      })
    }
  }
  /**
   * 兼容性判断
   */
  static canIUse(str) {
    if (wx.canIUse) {
      return wx.canIUse(str)
    } else {
      return false
    }
  }
  /**
   * 检查SDK版本
   */
  static isSDKExipred() {
    const { SDKVersion } = wx.getSystemInfoSync()
    console.info(`[version]sdk ${SDKVersion}`)
    return SDKVersion == null || SDKVersion < '1.2.0'
  }
  /**
   * 检查SDK版本
   */
  static checkSDK() {
    if (this.isSDKExipred()) {
      Tips.modal('您的微信版本太低，为确保正常使用，请尽快升级')
    }
  }
}
