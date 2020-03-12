export default class Validator {
  // 手机号校验
  static isMobile(val, {name = '联系电话'}, that = this) {
    const mobileReg = /^1[3|4|5|6|7|8|9]\d{9}$/
    if (!val) {
      wx.showToast({
        title: `${name}不能为空`,
        icon: 'none'
      })
      that.isSubmit = 0
      return false
    } else if (!mobileReg.test(val)) {
      wx.showToast({
        title: `请填写正确的${name}`,
        icon: 'none'
      })
      that.isSubmit = 0
      return false
    }
    return true
  }
  // 输入2-15个字符校验
  static isCharacter(val, that, name = '姓名', empty = true) {
    let string = val
    string = string.replace(/\r\n/g, '<br>')
    string = string.replace(/\n/g, '')
    string = string.replace(/\s/g, '')
    const characterReg = /^.{2,}$/
    if (!string) {
      if (empty) {
        wx.showToast({
          title: `${name}不能为空`,
          icon: 'none'
        })
        that.isSubmit = 0
      }
    } else if (!characterReg.test(string)) {
      wx.showToast({
        title: `${name}不能少于2个字符`,
        icon: 'none'
      })
      that.isSubmit = 0
    } else {
      that.isSubmit = 1
    }
  }
  // 非空校验
  static isBlank(val, {name = '姓名'}) {
    if (val === '') {
      wx.showToast({
        title: `${name}不能为空`,
        icon: 'none'
      })
      return false
    }
    return true
  }
}
