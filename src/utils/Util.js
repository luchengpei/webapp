import wepy from 'wepy'
import md5 from 'crypto-js/md5'

export default class Util {
  // 判断字符串是否为空
  static isEmpty(str) {
    return str === '' || str == null || str === 'null'
  }
  // 判断字符串是否不为空
  static isNotEmpty(str) {
    return !this.isEmpty(str)
  }
  // 浮点求和
  static sum(numbers, toFixed = 2) {
    let sum = 0
    for (const str of numbers) {
      if (!this.isNumber(str)) {
        return NaN
      }
      const num = parseFloat(str)
      if (isNaN(num)) {
        return NaN
      }
      sum += num
    }
    return sum.toFixed(toFixed)
  }
  // 数字判断
  static isNumber(value) {
    const patrn = /^[-+]?\d+(\.\d+)?$/
    return patrn.test(value)
  }

  // 数字判断
  static isPositiveNumber(value) {
    const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/
    return patrn.test(value)
  }
  // 数组判断
  static isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
  }
  // 时间转日期
  static convertTimestapeToDay(timestape) {
    return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.')
  }

  // 格式化日期
  static dateFormate(date, fmt) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
  }

  // 时间字符串如2017-09-30 15:30:20转时间戳
  static dateToTimeStamp(str) {
    str = `${str}`.replace(/-/g, '/')
    return (new Date(str)).getTime()
  }

  // 七牛图片拼接
  static getQiniuUrl(path) {
    const qiniu = wepy.$appConfig.qiniuUrl
    return `${qiniu}${path}`
  }

  // 密码MD5加密
  static cryptPwd(text) {
    if (!text || text.length <= 0) {
      return ''
    }
    return md5(text).toString()
  }

  // 软判断是否登录
  static isLogin() {
    if (!wepy.getStorageSync('user') || !wepy.getStorageSync('token')) { return false } else { return true }
  }

  // 给手机号中间四位加***
  static starPhone(phone) {
    return phone.substr(0, 3) + '****' + phone.substr(7)
  }

  // 给手机号补空格
  static blankPhone(phone) {
    console.log('aaa', (phone + '').length)
    const len = (phone + '').length
    if (len !== 11) return phone
    return phone.substr(0, 3) + ' ' + phone.substr(3, 4) + ' ' + phone.substr(7)
  }

  // 路由判断
  static isInArrayMap(page, map) {
    const res = map.filter(item => {
      if (page.indexOf(item) > -1) {
        return item
      }
    })
    if (res.length > 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * 倒计时时间渲染
   * @param {*} t 时间
   */
  static countFormat(t) {
    // let day = Math.floor(t / 86400000)
    // let hour = Math.floor((t / 3600000) % 24)
    let hour = Math.floor((t / 3600000))
    let min = Math.floor((t / 60000) % 60)
    let sec = Math.floor((t / 1000) % 60)
    // day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    sec = sec < 10 ? '0' + sec : sec
    let format = ''
    // format = `${day}天${hour}时${min}分${sec}秒`
    format = `${hour}:${min}:${sec}`
    return format
  }

  /**
   * 解析二维码scene
   * scene = ${projectId}_${inviteUser}_${productId}_${type}_${activityId}_${headId}
   * projectId 项目ID
   * inviteUser 邀请人ID/
   * productId 商品ID/接龙活动商品ID
   * type 类型 1普通 2社区团购（接龙） 3 多人团购 4 限时购 5 返现
   * activityId 活动ID如: 接龙ID
   * headId 社区团购团长ID
   * */
  static analyseQrcodeScene(query) {
    const scene = query.scene ? decodeURIComponent(query.scene) : ''
    const param = scene ? scene.split('_') : null
    if (param) {
      const pid = param[0] || null
      const userId = param[1] || null
      const productId = param[2] || null
      const type = param[3] || 1
      const activityId = param[4] || null
      const headId = param[5] || null
      return {
        pid,
        userId,
        productId,
        type,
        activityId,
        headId
      }
    }
    return param
  }
  /**
   * 生成scene
   * projectId 项目id
   * inviteUser 邀请人
   * productId 项目id
   * type 商品类型
   * activityId 活动id
   * headId 团长id
   * @param {Object} query
   */
  static generateScene(query) {
    const userId = wepy.getStorageSync('user').userId
    const pid = wepy.getStorageSync('pid')
    let scene
    if (query) { // 1_3__1__
      const {projectId, inviteUser, productId, type, activityId, headId} = query
      scene = `${projectId || pid || ''}_${inviteUser || userId}_${productId || ''}_${type || 1}_${activityId || ''}_${headId || ''}`
    } else { // 1_3__1__
      scene = `${pid || ''}_${userId}_${''}_1_${''}_${''}`
    }
    return scene
  }
  /**
   * 倒计时
   * @param {*} endTime 结束时间
   * @param {*} callback 回调
   * @param {*} isTimeStamp 是否时间戳
   */
  static counterDown(endTime, callback, isTimeStamp = false) {
    let end = !isTimeStamp ? Util.dateToTimeStamp(endTime) : endTime
    let t = end - new Date().getTime()
    let format = ''
    if (t > 0) {
      format = Util.countFormat(t)
    } else {
      format = ''
    }
    if (callback) {
      callback(format)
    } else {
      return format
    }
  }

  /**
   * 清除计时器
   * @param {*} timer
   */
  static clearCounter(timer) {
    if (timer) {
      clearInterval(timer)
    }
  }

  /**
   * 判断arr1数组是否包含arr2
   * @param {*} arr1
   * @param {*} arr2
   */
  static isContain(arr1, arr2) {
    if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false
    for (var i = arr2.length - 1; i >= 0; i--) {
      if (!arr1.includes(arr2[i])) {
        return false
      }
    }
    return true
  }

  /**
   * 获取百分比
   * @param {*} num1
   * @param {*} num2
   */
  static getPercent(num1, num2) {
    return (Math.round(num1 / num2 * 10000) / 100.00 + '%')
  }

  /**
   * 会员公共处理方法
   */
  static getMember(data) {
    // memberCountType下级会员数量 valPayType自愿缴费满足类 productType购买指定商品满足类型 类型 0满足其一。1必须满足 2未选中
    const typeArr = ['memberCountType', 'productType', 'valPayType']
    let [mustNeed, oneNeed, noNeed, mustNeedLen, oneNeedLen, noNeedLen] = [{}, {}, {}, [], [], [], [], []]
    const keyMap = {0: oneNeed, 1: mustNeed, 2: noNeed}
    const lenMap = {0: oneNeedLen, 1: mustNeedLen, 2: noNeedLen}
    for (let i = 0; i < typeArr.length; i++) {
      const item = typeArr[i]
      if (data[item] || data[item] == 0) {
        let subItem = +data[item]
        keyMap[subItem][item] = true
        lenMap[subItem].push(item)
      }
    }
    return { mustNeed, oneNeed, noNeed, mustNeedLen, oneNeedLen, noNeedLen }
  }

  // 去除字符串首尾指定字符
  static trim(str, target) {
    return str ? str.replace(new RegExp('^\\' + target + '+|\\' + target + '+$', 'g'), '') : ''
  }

  // 判断是否Tab页
  static isTab(url) {
    const baseTabs = ['pages/index', 'pages/mine', 'pages/classify', 'pages/cart', 'pages/activity']
    const ext = wx.getExtConfigSync()
    const tabs = ext.tabBar && ext.tabBar.list ? ext.tabBar.list.map(tab => {
      return this.trim(tab.pagePath, '/')
    }) : baseTabs
    return tabs.includes(url ? this.trim(url, '/') : '')
  }
  static numberToChinese(number) {
    let units = '个十百千万亿'
    let chars = '零一二三四五六七八九'
    let a = (number + '').split('')
    let s = []
    if (a.length > 12) {
      throw new Error('too big')
    } else {
      for (var i = 0, j = a.length - 1; i <= j; i++) {
        if (j == 1 || j == 5 || j == 9) { // 两位数 处理特殊的 1*
          if (i == 0) {
            if (a[i] != '1') s.push(chars.charAt(a[i]))
          } else {
            s.push(chars.charAt(a[i]))
          }
        } else {
          s.push(chars.charAt(a[i]))
        }
        if (i != j) {
          s.push(units.charAt(j - i))
        }
      }
    }
    // return s;
    return s.join('').replace(/零([十百千万亿@#%^&~])/g, function(m, d, b) { // 优先处理 零百 零千 等
      b = units.indexOf(d)
      if (b != -1) {
        if (d == '亿') return d
        if (d == '万') return d
        if (a[j - b] == '0') return '零'
      }
      return ''
    }).replace(/零+/g, '零').replace(/零([万亿])/g, function(m, b) { // 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
      return b
    }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function(m) {
      return {
        '@': '十',
        '#': '百',
        '%': '千',
        '^': '十',
        '&': '百',
        '~': '千'
      }[m]
    }).replace(/([亿万])([一-九])/g, function(m, d, b, c) {
      c = units.indexOf(d)
      if (c != -1) {
        if (a[j - c] == '0') return d + '零' + b
      }
      return m
    })
  }
}
