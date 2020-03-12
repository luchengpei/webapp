// 小程序端请求标识
export const IDENTITY_HTTP_HEADER = 'minProgram'

// 首页自定义模块组件映射关系
export const COMPONENT_MAP = {
  'CarouselMap': 'Swiper',            // 轮播图
  'SearchModule': 'SearchBar',        // 搜索栏
  'ShopNavigation': 'NavigateBar',    // 店铺导航
  'ProductModule': 'GoodsPanel',      // 商品模块
  'NewsModule': 'NewsPanel',          // 资讯模块
  'ActivityModule': 'ActivityPanel',  // 活动模块
  'NoticeModule': 'NoticeBar'         // 公告栏
}

// 订单支付类型 13电商 15会员 18活动
export const EC_ORDER_TYPE = 13
export const MEMBER_ORDER_TYPE = 15
export const ACTIVITY_ORDER_TYPE = 18
