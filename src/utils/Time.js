/**
 * 时间相关类
 */
class Time {
  constructor() {
    this.timeInter = false
  }
 // 倒计时
  static downTime(time, callback) { // 倒计时时长 s  回调
    let ss = Number(time)
    this.timeInter = setInterval(() => {
      if (ss === 0) {
        this.clearTime()
        ss = 'end'
      }
      ss--
      callback(this.ssToTime(ss), this.timeInter)
    }, 1000)
  }
 // 计时函数
  static startTime(callback) { // 参数为回调函数
    let ss = 0
    this.timeInter = setInterval(() => {
      ss++
      callback(this.ssToTime(ss)) // 回调函数
    }, 1000)
  }
 // 关闭计时 清除定时器
  static clearTime() {
    clearInterval(this.timeInter)
  }
  
  // 秒数转正常时间
  static ssToTime(ss) {
    let strTime = `00:00`
    if (ss === 'end') {
      strTime = 'end'
    }
    if (ss < 60) {
      let currentSs = ss
      strTime = `00:${this.zeroize(currentSs)}`// 最后时间
    }
    if (ss > 60 && ss < 3600) { // 60分钟内
      let currentMin = parseInt(ss / 60)// 当前时间余多少分钟
      let currentSs = ss - (currentMin * 60) // 当前时间余多少秒钟
      strTime = `${this.zeroize(currentMin)}:${this.zeroize(currentSs)}`// 最后时间
    }
    if (ss < 86400 && ss > 3600) { // 超过一小时小余1天
      let currentHour = parseInt(parseInt(ss / 60) / 60)// 当前时间余多少小时
      let currentMin = parseInt((ss - (currentHour * 3600)) / 60)// 当前时间余多少分钟
      let currentSs = ss - ((currentHour * 3600) + (currentMin * 60)) // 当前时间余多少秒钟
      strTime = `${this.zeroize(currentHour)}:${this.zeroize(currentMin)}:${this.zeroize(currentSs)}`// 最后时间
    }
    if (ss > 86400) { // 超过一天
      let currentDay = parseInt(ss / 86400)// 当前时间剩余多少天
      let currentHour = parseInt((ss - (currentDay * 86400)) / 3600)// 当前时间余多少小时
      let currentMin = parseInt((ss - currentDay * 86400 - currentHour * 3600) / 60)// 当前时间余多少分钟
      let currentSs = ss - ((currentDay * 86400) + (currentHour * 3600) + (currentMin * 60)) // 当前时间余多少秒钟
      strTime = `${this.zeroize(currentDay)}天:${this.zeroize(currentHour)}:${this.zeroize(currentMin)}:${this.zeroize(currentSs)}`// 最后时间
    }
    return strTime
  }
 //  格式化
  static zeroize(num) {
    return Number(num) < 10 ? `0${num}` : num
  }
  // 时间转文字
  static timeToWord(timestamp) {
    let timeNew = (timestamp + '').length === 13 ? timestamp : timestamp * 1000
    let curTimestamp = parseInt(new Date().getTime() / 1000) // 当前时间戳
    let timestampDiff = curTimestamp - timeNew / 1000 // 参数时间戳与当前时间戳相差秒数

    let curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
    let tmDate = new Date(timeNew)  // 参数时间戳转换成的日期对象
    let Y = tmDate.getFullYear()
    let m = tmDate.getMonth() + 1
    let d = tmDate.getDate()
    let H = tmDate.getHours()
    let i = tmDate.getMinutes()
    let s = tmDate.getSeconds()

    if (timestampDiff < 60) { // 一分钟以内
      return '刚刚'
    } else if (timestampDiff < 3600) { // 一小时前之内
      return Math.floor(timestampDiff / 60) + '分钟前'
    } else if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
      return `今天${this.zeroize(H)}:${this.zeroize(i)}`
    } else {
      let newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
      if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
        return `昨天${this.zeroize(H)}:${this.zeroize(i)}`
      } else if (curDate.getFullYear() === Y) {
        return `${this.zeroize(m)}月${this.zeroize(d)}日 ${this.zeroize(H)}:${this.zeroize(i)}`
      } else {
        return `${Y}-${this.zeroize(m)}-${this.zeroize(d)}-${this.zeroize(H)}:${this.zeroize(i)}:${this.zeroize(s)}`
      }
    }
  }
}
export default Time
//  Time.downTime(11000, (res) => {
//    console.log(res)
//  })
//  console.log(Time.timeToWord(1589645203))
