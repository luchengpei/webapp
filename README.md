# azalea-applet

#### 项目介绍
代理大师saas小程序仓库。

#### 软件架构
采用wepy小程序组件化开发框架<br/>
仓库：https://github.com/Tencent/wepy.git<br/>
文档：https://tencent.github.io/wepy/<br/>
使用手册: https://tencent.github.io/wepy/document.html#/<br/>


#### 安装依赖
0. 先设置npm加速源
```
npm config set registry http://registry.npm.taobao.org --global 设置淘宝仓库
npm config set registry http://registry.npm.taobao.org 设置淘宝仓库
npm config set disturl https://npm.taobao.org/dist —global 加速
npm config set disturl https://npm.taobao.org/dist  加速
```
1. npm install 安装依赖
2. 下载微信开发者工具，打开项目，选择项目选择根目录打开
3. 需要连接本地接口地址，可以在wepy.config.js中修改，如下
```
const baseUrlMap = new Map([
  ['dev', 'https://web.hhds.laoganbu.cn/platform-api/api'], // 在此处修改接口地址
  // ['uat', 'http://192.168.31.120:8088/platform-api/api'],
  ['uat', 'https://web.hhds.pre.laoganbu.cn/platform-api/api'],
  ['dlds', 'https://api.dailidashi.cn/'],
  ['hhds', 'https://www.hehuodashi.cn/platform-api/api'],
  ['adt', 'https://www.hehuodashi.cn/platform-api/api'],  // 阿帝泰行车记录仪
  // ['adt', 'http://192.168.31.120:8088/platform-api/api'],
  ['gnl', 'https://api.greennewland.com'], // 真生活
  ['jn', 'https://web.hhds.laoganbu.cn/platform-api/api'] // 九牛
])
```
4. 同时对应的项目ID和公司ID修改如下
```
// 默认公司ID
const defaultCidMap = new Map([
  ['dev', 768], // 默认公司ID
  ['uat', 1],
  ['dlds', 'bf866917f4ea4ef98858afb455c88b7f'],
  ['hhds', 1],
  ['adt', 9], // 阿帝泰行车记录仪
  ['gnl', 'eb4dab919488460fa3689595c41928d0'], // 真生活
  ['jn', 370]  // 九牛
])

// 默认项目ID
const defaultPidMap = new Map([
  ['dev', 555], // 默认项目ID
  ['uat', 1],
  ['dlds', 100324],
  ['hhds', 1],
  ['adt', 9], // 阿帝泰行车记录仪
  ['gnl', 100353], // 真生活
  ['jn', 4]  // 九牛
])
```
5. 执行npm run dev
6. 开发者工具中点击右上角详情，勾选“不校验合法域名”，即可本地联调了

#### 开发实时编译

```console
wepy build --watch
建议
npm run dev // 测试环境
npm run dev:dlds // 正式环境
npm run dev:xxx // 相应private分支
一般来说不同环境的appid不一样，所以在微信开发工具需要重新打开项目
```

#### 正式环境打包

提交体验版->发布正式版提审，需要切换正确的appid（微信开发者工具-详情）
```console
npm run build:XXX  // xxx对应变种的配置 需要自行在package.json和wepy.config.js配置
npm run build:hhds // 合伙大师正式环境（小铺头）  wx3304ac4263f11baf
npm run build:adt // 阿帝泰行车记录仪小程序正式环境 wx044378ae3cdfe372
```

#### 分支配置

因为不同分支对应的小程序Appid、API地址、七牛云地址等配置不尽相同
所以各分支的配置信息放在了`wepy.config.js`文件中
再通过配置文件中的`appConfig`引入项目
注意
切换不同分支下的小程序，需要在`微信开发者工具`重新新建一个项目（不同项目小程序的APPID不相同）

#### 新增分支
1、在`package.json`中scripts新增对应的dev:xxx, build:xxx命令
2、在`wepy.config.js`各配置（如baseUrlMap）项添加分支配置

#### config配置说明
1、效仿变种方式，不同打包命令连接着不同flavor
2、目前config中抽离出了首页快捷入口菜单（indexEnterMenu）和我的页面菜单（mineMenu）
3、待抽离的内容包括底部Tab默认配置，目前需要在各变种分支下，对mixins/base中的tab进行配置
4、还有各分支的images目前只能在各分支下上传替换，需要尽快实现脚本拷贝图标，减少切分支的变种方法
5、新增不同变种，设置不同图片资源，bash flavor.sh 变种名称

#### 开发者工具导入项目

使用`微信开发者工具`新建项目，本地开发选择项目根目录，会自动导入项目配置。

#### git工作流开发流程
1、在最新的develop分支上创建一个feature/xxx分支（可在sourceTree点击工作流-新建功能）
2、在feature/xxx进行开发，正常提交（这里指的是提交到本地）
3、如果当前feature/xxx需要开发的内容已完成（颗粒度不要太大，涉及文件不要过多），则把当前分支推送到远程同名分支
4、上码云，新建Pull Request（PR)，申请把feature/xxx分支合并到develop分支
5、选择审批人，勾选合并后删除提交分支、必须审查代码后创建

#### 部分规范

component、page文件名采用下划线命名法
```javascript
goods.wpy、goods_list.wpy
```
component、page文件中的class命名采用大驼峰
```javascript
Goods、GoodsList
export default class GoodsList extends xxx {

}
```
小程序中data、methods、自定义methods的命名采用小驼峰
```javascript
data = {
  userInfo: null,
  goodsList: []
}

methods = {
  handleFormChange() {

  }
}

getList() {

}
```

css样式类名长名称采用横线链接
```css
.main-container {

}
```

自定义组件命名采用大写驼峰
```html
<view>
  <GoodsItem />
</view>
```
```javascript
import GoodsItem from '../goods_item'
export default class GoodsListPage extends wepy.component {
  components = {
    GoodsItem: GoodsItem
  }
}
```

#### 项目目录结构
```
├─src
  ├─api                   API网络请求
    ├─base.js               api基类
  ├─components            组件
    ├─pages                 云配置页面组件
  ├─images                静态图片资源
  ├─mixins                mixins
    base.wpy                通用mixins
    pagination.wpy          分页组件配套mixins
    router.wpy              路由跳转mixins
  ├─pages                 页面
  ├─scss                  scss样式文件
    ├─common.scss           通用配置样式
    ├─iconfont.scss         字体图标样式
  ├─store                 redux-store
  ├─utils                 工具类
    ├─Event.js                广播事件工具类
    ├─Http.js                 Http请求类
    ├─Page.js                 通用分页类
    ├─Tis.js                  提示类
    ├─Util.js                 通用方法类
    ├─WxNotificationCenter.js 广播事件第三方插件
  ├─app.wpy               入口文件
```
#### 平台化开发指南
1、微信开发者工具的appid切换成绑定了平台开发小程序用的appid
2、打开ext.json文件，配置当前平台化模板配置（由后端人员提供）
3、extEnbale设为true，extAppid填写授权用的小程序，如众寻亲人（族谱）
```
{
  "extEnable": true,  // 开启本地ext配置
  "extAppid": "wx8e4697d456f3c7fc",
  ...
}
```
