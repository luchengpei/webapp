import base from './base'
import Time from '@/utils/Time'
import Util from '@/utils/Util'
import Page from '@/utils/Page'
import wepy from 'wepy'
// import Util from '@/utils/Util'
/**
 * 资讯服务类
 */
export default class News extends base {
  /**
   * 获取资讯类型列表
   */
  static newsTypelist(query) {
    const url = `/api/informationmain/getInfoCategory`
    const param = {
      ...query
    }
    return this.get(url, param).then(res => {
      return res
    })
  }
  /**
   * 获取资讯列表
   */
  static newsList(query) {
    const url = `/api/informationmain/getInfoByCategoryId`
    return new Page(url, this.dealNewsList.bind(this))
  }
  /**
   * 获取首页推荐资讯
   * @param {*}
   */
  static recommendList() {
    const url = `/api/informationmain/recommend/list`
    return this.get(url, {page: 1, pageSize: 2}).then(data => {
      if (data && data.list) {
        data.list.map(d => {
          d = this.dealNewsList(d)
          return d
        })
      }
      return data.list
    })
  }
   /**
   * 获取资讯详情
   */
  static newsInfo(query) {
    const url = `/api/informationmain/getInfo/${query}`
    const userId = wepy.getStorageSync('user').userId
    const params = userId ? {userId} : {}
    return this.get(url, params).then(res => {
      return this.dealNewsInfo(res)
    })
  }
   /**
   * 收藏
   */
  static addCollection(query) {
    const url = `/api/informationmain/collection`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }

   /**
   * 新增点赞
   */
  static addLike(query) {
    const url = `/api/informationmain/praise`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
  // 新增评论
  static addCommentmian(query) {
    const url = `/api/sys/commentmain/save`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
  // 评论列表
  static commentList(query) {
    const url = `/api/sys/commentmain/list`
    return new Page(
      url,
      this.dealNewsList.bind(this),
      null,
      base.javaKey,
    )
  }
  // 添加阅读量
  static addReadNum(query) {
    const url = `/api/informationmain/addReadNum`
    const param = {
      ...query
    }
    return this.post(url, param, 'json')
  }
  // 添加分享量
  static addShareNum(query) {
    const url = `/api/informationmain/addShareNum`
    const param = {...query}
    return this.post(url, param, 'json')
  }
  // 评论点赞
  static addCommentLike(query) {
    const url = `/api/sys/commentmain/likeComment`
    const param = {...query}
    return this.post(url, param, 'json')
  }
  // 资讯类型处理
  static dealNewsTypelist(data) {
    let newData = JSON.parse(JSON.stringify(data))
    return newData
  }
  // 资讯列表处理
  static dealNewsList(data) {
    console.log('Util.dateToTimeStamp(data.createTime)', data.createTime, Util.dateToTimeStamp(data.createTime))
    data.createTime = Time.timeToWord(Util.dateToTimeStamp(data.createTime))
  }
  // 资讯详情处理
  static dealNewsInfo(data) {
    let newData = JSON.parse(JSON.stringify(data))
    newData.informationMainEntity.createTime = Time.timeToWord(Util.dateToTimeStamp(newData.informationMainEntity.createTime))
    return newData
  }
}
