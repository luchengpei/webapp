import wepy from 'wepy'
import Tips from '@/utils/Tips'
// 文件上传工具类
export default class FileHttp {
  // 微信上传文件
  static wxUploadImg(apiUrl, pathArr, otherData) {
    let urlArr = []// 返回数据数组
    return new Promise((resolve, reject) => {
      pathArr.forEach((url, i) => {
        Tips.loading(`正在上传`)
        wx.uploadFile({
          url: `${wepy.$appConfig.baseUrl}${apiUrl}`, // 上传URL
          filePath: url,
          name: 'file', // key
          formData: {
            ...otherData
          },
          header: this.httpHeader(), // 请求头
          success(res) {
            let data = JSON.parse(res.data)
            if (data.code === 0) {
              urlArr.push(data.data)
              if (pathArr.length === urlArr.length) {
                resolve(urlArr)
              }
            } else {
              Tips.error(data.message)
            }
            Tips.loaded()
          },
          fail(err) {
            Tips.error('微信接口调用失败')
            reject(Error, err)
            Tips.loaded()
          }
        })
      })
    })
  }
  // 请求头
  static httpHeader() {
    return {
      token: wepy.getStorageSync('token')
    }
  }
  // 外部调用 pathArr临时文件路径数组
  static async uploadImg(pathArr) {
    return await this.wxUploadImg('/api/oss/upload', pathArr, {
      projectId: wepy.getStorageSync('pid'),
      companyId: wepy.getStorageSync('cid')
    })
  }
}
