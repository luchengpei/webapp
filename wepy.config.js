const path = require('path')

// API地址
const baseUrlMap = new Map([
  ['dev', 'https://web.hhds.laoganbu.cn/platform-api'],
  // ['dev', 'http://192.168.1.45:8088/platform-api'],
  ['uat', 'https://web.hhds.pre.laoganbu.cn/platform-api'],
  ['dlds', 'https://api.dailidashi.cn/'],
  ['hhds', 'https://www.hehuodashi.cn/platform-api'],
  ['adt', 'https://www.hehuodashi.cn/platform-api'],  // 阿帝泰行车记录仪
  ['szkp', 'https://www.hehuodashi.cn/platform-api'], // 科普
  ['soonyoung', 'https://www.hehuodashi.cn/platform-api'], // 九牛 SoonYoung颂妍
  ['gnl', 'https://api.greennewland.com'] // 真生活
])

// 七牛云存储地址
const qiniuUrlMap = new Map([
  ['dev', 'https://static.laoganbu.cn/'],
  ['uat', 'https://static.laoganbu.cn/'],
  ['dlds', 'https://static.dailidashi.cn/'],
  ['hhds', 'https://static.laoganbu.cn/'],
  ['adt', 'https://pic.rosoto.cn/'],
  ['szkp', 'https://static.laoganbu.cn/'],  // 科普
  ['soonyoung', 'https://static.laoganbu.cn/'], // 九牛 SoonYoung颂妍
  ['gnl', 'http://static.greennewland.cn/'] // 真生活
])

// 默认公司ID
const defaultCidMap = new Map([
  ['dev', 819],
  ['uat', 1],
  ['dlds', 'bf866917f4ea4ef98858afb455c88b7f'],
  ['hhds', 1],
  ['adt', 9], // 阿帝泰行车记录仪
  ['szkp', 12], // 科普
  ['soonyoung', 24],  // 九牛 SoonYoung颂妍
  ['gnl', 'eb4dab919488460fa3689595c41928d0'] // 真生活
])

// 默认项目ID
const defaultPidMap = new Map([
  ['dev', 735],
  ['uat', 1],
  ['dlds', 100324],
  ['hhds', 1],
  ['adt', 9], // 阿帝泰行车记录仪
  ['szkp', 15], // 深圳科普
  ['soonyoung', 31],  // 九牛 SoonYoung颂妍
  ['gnl', 100353] // 真生活
])

// 默认邀请人
const defaultInviteUserMap = new Map([
  ['dev', -1],
  ['uat', ''],
  ['dlds', 1110],
  ['hhds', ''],
  ['adt', ''],
  ['szkp', ''],
  ['soonyoung', ''],
  ['gnl', 1135] // 真生活
])

// 我的页面pannel列表
const mineMenuMap = new Map([
  ['dev', require('./config/dev/mineMenu')],
  ['uat', require('./config/dev/mineMenu')],
  ['dlds', require('./config/dlds/mineMenu')],
  ['hhds', require('./config/dev/mineMenu')],
  ['adt', require('./config/adt/mineMenu')],
  ['szkp', require('./config/dev/mineMenu')],
  ['soonyoung', require('./config/dev/mineMenu')],
  ['gnl', require('./config/gnl/mineMenu')]
])

// 首页入口
const indexEnterMenuMap = new Map([
  ['dev', require('./config/dev/indexEnterMenu')],
  ['uat', require('./config/dev/indexEnterMenu')],
  ['dlds', require('./config/dlds/indexEnterMenu')],
  ['hhds', require('./config/dev/indexEnterMenu')],
  ['adt', require('./config/adt/indexEnterMenu')],
  ['szkp', require('./config/adt/indexEnterMenu')],
  ['soonyoung', require('./config/dev/indexEnterMenu')],
  ['gnl', require('./config/gnl/indexEnterMenu')]
])

let prod = process.env.NODE_ENV === 'production'
let flavor = process.env.FLAVOR
module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    /* less: {
      compress: prod
    }, */
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
    baseUrl: baseUrlMap.get(flavor),
    qiniuUrl: qiniuUrlMap.get(flavor),
    defaultCid: defaultCidMap.get(flavor),
    defaultPid: defaultPidMap.get(flavor),
    defaultInviteUser: defaultInviteUserMap.get(flavor),
    mineMenu: mineMenuMap.get(flavor),
    indexEnterMenu: indexEnterMenuMap.get(flavor)
  }
}

if (prod) {
  // 压缩sass
  module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
