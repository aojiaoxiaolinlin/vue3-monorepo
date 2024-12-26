export const ruleContent = `1.活动时间：2024年12月24日；<br />
          2.活动期间内，每名用户有1次游戏机会；<br />
          3.用户进入活动页面后，点击按钮开始游戏，最终指针的落点区域为中奖区域，即可获得对应奖品，数量有限，先到先得；<br />
          4.获奖奖品分为翼支付通用权益金以及翼支付电商优惠券：<br />
          ①翼支付通用权益金适用于使用翼支付进行话费充值、生活缴费、商城消费等；<br />
          ②翼支付电商券仅限购买指定商品时使用；<br />
          5.奖品券不兑现、不找零，使用时需满足对应使用规则（奖品的具体使用条件以页面展示为准）；<br />
          6.中奖物品发放：奖品券中奖后实时到账，在【活动首页-奖品列表】中查询；<br />
          7.下一场刮刮乐活动时间：2024年12月31日,敬请期待；<br />
          8.本活动最终解释权归翼支付商城。<br />`

/**
 * 满级优惠券奖池奖品列表
 */
export const awardCoupons = [
  {
    aid: '8EF20C0233B7CF0661B023ABCD5B6DA9',
    src: '5yuan.png',
    name: '满减券：满10元减5元',
  },
  {
    name: '满减券：满5元减3元',
    src: '3yuan.png',
    aid: '81CD14050149D923A479E891F815D3CA',
  },
  {
    name: '谢谢参与',
    aid: '0',
  },
];


export enum CouponGetStatus {
  GET = '领取',
  USE = '使用',
  COMPLETE = '已使用',
}

export type GoodsCategory = {
  baseName: string,
  list: Array<{
    src: string,
    url: string,
    aid: string,
    status: CouponGetStatus,
    name: string,
  }>
}
export type GoodsCategories = Array<GoodsCategory>

export const goodsCategories = ref<GoodsCategories>([
  {
    baseName: 'haowu_xianguo_',
    list: [
      {
        src: 'goods_1_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=241112100200646161&channel=YGT',
        aid: '63CCA2D01948C720853ADC174569EA82',
        status: CouponGetStatus.GET,
        name: '22元四川大凉山丑苹果盐源苹果购物券',
      },
      {
        src: 'goods_2_get.png',
        url: 'https://activity.bestpay.cn/subapps/mall-shopping-h5/index.html?hybridVersion=3.0#/pages/detail/main?skuNo=241014163500385564&channel=YGT',
        aid: 'F6D73F467A27387094AC96FF19A547CF',
        status: CouponGetStatus.GET,
        name: '10元京榴香四川爱媛橙购物券',
      },
    ],
  },
  {
    baseName: 'haowu_lingshi_',
    list: [
      {
        src: 'ling_shi_goods_1_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=876888898475581448&channel=YGT',
        aid: 'D9EE2EECCC66C9891F4A1AA1479F530D',
        status: CouponGetStatus.GET,
        name: '5元成都特产张飞手撕豆干购物券',
      },
      {
        src: 'ling_shi_goods_2_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=202409081129326254&channel=YGT',
        aid: '6EDF56165AF3573A4823E98852E48120',
        status: CouponGetStatus.GET,
        name: '5元蝶花牌蝶花牌怪味胡豆购物券',
      },
      {
        src: 'ling_shi_goods_3_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=866005322749202435&channel=YGT',
        aid: 'A391648E0EE7ED821543D3FAD9DE0931',
        status: CouponGetStatus.GET,
        name: '10元统一小浣能干脆面购物券',
      },
      {
        src: 'ling_shi_goods_4_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=855202047863599106&channel=YGT',
        aid: '836BD7813FBE7962E4B0BFA71E41896D',
        status: CouponGetStatus.GET,
        name: '5元酸掌柜无骨鸡爪购物券',
      },
      {
        src: 'ling_shi_goods_5_get.png',
        // url: 'https://h5.bestpay.cn/subapps/myprivilege/couponCenter/alpha/index.html#/pages/detail/index?activityNo=JDFC578221716655267&linkSource=JD&hybridVersion=3.0',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=840907322079846434&channel=YGT',
        aid: 'E90D0B9D09E8BA81704216D18BF82A50',
        status: CouponGetStatus.GET,
        name: '5元谭八爷麻辣冷吃牛肉购物券',
      },
    ],
  },
  {
    baseName: 'haowu_day_',
    list: [
      {
        src: 'day_goods_1_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=240929150227277183&channel=YGT',
        aid: 'B65FF7C68ED6713B130142EC8643C081',
        status: CouponGetStatus.GET,
        name: '10元笨竹能竹柔巾购物券',
      },
      {
        src: 'day_goods_2_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=878580307531116546&channel=YGT',
        aid: 'ACEF212CF38ED8D618D5AAF2E147611A',
        status: CouponGetStatus.GET,
        name: '2元斑布快乐小狗手帕纸购物券',
      },
    ],
  },
])
