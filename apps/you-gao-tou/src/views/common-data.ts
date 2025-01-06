export const ruleContent = `
1.活动时间：2025年1月7日；<br/>
2.活动期间，每名用户有3次游戏机会，每名用户限1次中奖机会，若已中奖，游戏次数归零；<br/>
3.游戏随机出1题四川方言词汇，答对即有机会获得奖品；<br/>
4.获奖奖品分为翼支付话费券、翼支付通用券以及翼支付电商优惠券：<br/>
①翼支付话费券适用于使用翼支付进行话费充值；<br/>
②翼支付通用券适用于使用翼支付进行话费充值、生活缴费、商城消费等；<br/>
③翼支付电商券仅限购买指定商品时使用；<br/>
5.奖品券不兑现、不找零，使用时需满足对应使用规则（奖品的具体使用条件以页面展示为准）；<br/>
6.中奖物品发放：奖品券中奖后实时到账，在【活动首页-奖品列表】中查询；<br/>
7.活动预告：下一场幸运翻翻乐活动时间：2025年1月14日,敬请期待；<br/>
8.本活动最终解释权归翼支付商城。`

/**
 * 满级优惠券奖池奖品列表
 */
export const awardCoupons = [
  {
    aid: 'BB3A2838F50C8925D13783E15F731B14',
    src: '5yuan.png',
    name: '5元话费充值券',
  },
  {
    name: '一张3元通用券',
    src: '3yuan.png',
    aid: '9A538B90C8C9AE624700986D4EBBB065',
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
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=241203111600795880&channel=YGT',
        aid: '13937CA40DEA4D3772DA2243CF6CBE67',
        status: CouponGetStatus.GET,
        name: '5元雷波脐橙购物券',
      },
    ],
  },
  {
    baseName: 'haowu_lingshi_',
    list: [
      {
        src: 'ling_shi_goods_1_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=202409081107401306&channel=YGT',
        aid: 'DEEC4FE70F6F7FAF2CCA087513EEFAD1',
        status: CouponGetStatus.GET,
        name: '5元秀林黄粑竹叶糕购物券',
      },
      {
        src: 'ling_shi_goods_2_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=240912111313453124&channel=YGT',
        aid: '5926D60C4AE0F7A74F95E04D0C027AA5',
        status: CouponGetStatus.GET,
        name: '5元饶大姐花生酥购物券',
      },
      {
        src: 'ling_shi_goods_3_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=202409111551285208&channel=YGT',
        aid: '330DF43DD3F452061F45897B795DA5BB',
        status: CouponGetStatus.GET,
        name: '5元郑友谊桔饼购物券',
      },
      {
        src: 'ling_shi_goods_4_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=855202047758741505&channel=YGT',
        aid: 'D26F39F416C8F837EDD18F66B2007D22',
        status: CouponGetStatus.GET,
        name: '15元小牛凯西烤肠购物券',
      },
      {
        src: 'ling_shi_goods_5_get.png',
        url: 'https://activity.bestpay.cn/subapps/mall-shopping-h5/index.html?hybridVersion=3.0#/pages/detail/main?skuNo=840907322079846434&channel=YGT',
        aid: 'E50ED8980D837CD10AC719652148980F',
        status: CouponGetStatus.GET,
        name: '5元谭八爷麻辣冷吃牛肉购物券',
      },
      {
        src: 'ling_shi_goods_6_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=876888898500747270&channel=YGT',
        aid: 'B3F84223A59DEC299F97ED75D423FDF4',
        status: CouponGetStatus.GET,
        name: '5元张飞手磨豆干购物券',
      },
    ],
  },
  {
    baseName: 'haowu_day_',
    list: [
      {
        src: 'day_goods_1_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=855394387895144451&channel=YGT',
        aid: '30C21A0055E7E491B63CEE31C3C4044F',
        status: CouponGetStatus.GET,
        name: '10元立白洗衣液购物券',
      },
      {
        src: 'day_goods_2_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=883038255371689989&channel=YGT',
        aid: 'AB1771B2B5119231A6D1F63078C74155',
        status: CouponGetStatus.GET,
        name: '15元古蜀香丝贡米购物券',
      },
      {
        src: 'day_goods_3_get.png',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=241021154700475701&channel=YGT',
        aid: '3D4FB92A7C0B138D9C1495B6672F5E9C',
        status: CouponGetStatus.GET,
        name: '15元42度泸州老窖潮代购物券',
      },
    ],
  },
])
