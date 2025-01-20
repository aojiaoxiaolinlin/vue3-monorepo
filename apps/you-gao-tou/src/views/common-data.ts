// export const ruleContent = `
// 1.活动时间：2025年1月28日；<br/>
// 2.活动期间，每名用户有3次游戏机会，每名用户限1次中奖机会，若已中奖，游戏次数归零；<br/>
// 3.用户进入活动页面后，任意翻开一张心仪的卡片，即可获得对应奖品，数量有限，先到先得；<br/>
// 4.获奖奖品分为翼支付话费券、翼支付通用券：<br/>
// ①翼支付话费券适用于使用翼支付进行话费充值；<br/>
// ②翼支付通用券适用于使用翼支付进行话费充值、生活缴费、商城消费等；<br/>
// 5.奖品券不兑现、不找零，使用时需满足对应使用规则（奖品的具体使用条件以页面展示为准）；<br/>
// 6.中奖物品发放：奖品券中奖后实时到账，在【活动首页-奖品列表】中查询；<br/>
// 7.活动预告：下一场四川方言大挑战活动时间：2025年1月21日,敬请期待；<br/>
// 8.四川电信19元以下套餐用户（不含19元，包括美丽乡村卡、8分卡、学生证套餐、居家养老项目、10元GGMM卡等）、170/171/149号段用户，随意卡，体验期内体验套餐参与活动无法享优惠券。<br/>
// 9.本活动最终解释权归翼支付商城。`;

export const ruleContent = `
1.活动时间：2025年1月21日；<br/>
2.活动期间，每名用户有3次游戏机会，每名用户限1次中奖机会，若已中奖，游戏次数归零；<br/>
3.游戏随机出1题四川方言词汇，答对即有机会获得奖品；<br/>
4.获奖奖品分为翼支付话费券、翼支付通用券：<br/>
①翼支付话费券适用于使用翼支付进行话费充值；<br/>
②翼支付通用券适用于使用翼支付进行话费充值、生活缴费、商城消费等；<br/>
5.奖品券不兑现、不找零，使用时需满足对应使用规则（奖品的具体使用条件以页面展示为准）；<br/>
6.中奖物品发放：奖品券中奖后实时到账，在【活动首页-奖品列表】中查询；<br/>
7.活动预告：下一场幸运翻翻乐活动时间：2025年1月28日,敬请期待；<br/>
8.四川电信19元以下套餐用户（不含19元，包括美丽乡村卡、8分卡、学生证套餐、居家养老项目、10元GGMM卡等）、170/171/149号段用户，随意卡，体验期内体验套餐参与活动无法享优惠券。<br/>
9.本活动最终解释权归翼支付商城。`;

/**
 * 优惠券奖池奖品列表
 */
export const awardCoupons = [
  {
    aid: "BB3A2838F50C8925D13783E15F731B14",
    url: "https://h5.bestpay.cn/subapps/txjfwap-h5/index.html#/?channel=fs_sc",
    src: "5yuan.png",
    name: "5元话费券",
  },
  {
    name: "3元通用券",
    url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/?channel=fs_sc",
    src: "3yuan.png",
    aid: "9A538B90C8C9AE624700986D4EBBB065",
  },
  {
    name: "谢谢参与",
    aid: "0",
  },
];

export enum CouponGetStatus {
  GET = "领取",
  USE = "使用",
  COMPLETE = "已使用",
}

export type GoodsCategory = {
  baseName: string;
  list: Array<{
    src: string;
    url: string;
    aid: string;
    status: CouponGetStatus;
    name: string;
  }>;
};
export type GoodsCategories = Array<GoodsCategory>;

export const goodsCategories = ref<GoodsCategories>([
  {
    baseName: "haowu_xianguo_",
    list: [
      {
        src: "goods_1_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=241212115900826900",
        aid: "DA2EA990F95ED7A89ED0D9B60890AB3F",
        status: CouponGetStatus.GET,
        name: "15元凉山蓝莓1斤装购物券",
      },
    ],
  },
  {
    baseName: "haowu_lingshi_",
    list: [
      {
        src: "ling_shi_goods_1_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=855202047863599106&channel=YGT",
        aid: "E3E3CE8F94A57D142011413F2CAA66E7",
        status: CouponGetStatus.GET,
        name: "5元酸掌柜无骨鸡爪购物券",
      },
      {
        src: "ling_shi_goods_2_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=857921341676883972&channel=YGT",
        aid: "4C90EA9F3ED676D00F06203C37C3A35D",
        status: CouponGetStatus.GET,
        name: "10元包德安华蓥山土蜂蜜购物券",
      },
      {
        src: "ling_shi_goods_3_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=241219112900890551&channel=YGT",
        aid: "E600649B506358A57CD202F9BE8816A5",
        status: CouponGetStatus.GET,
        name: "15元蓬州什锦牛肉购物券",
      },
      {
        src: "ling_shi_goods_4_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=241219113600895552&channel=YGT",
        aid: "380128AD237026BB47B52676CD897CA5",
        status: CouponGetStatus.GET,
        name: "20元蓬州手撕兔购物券",
      },
      {
        src: "ling_shi_goods_5_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=875837906244841473&channel=YGT",
        aid: "F27219D6BEDA0A1FE9ACFA26EA0EF334",
        status: CouponGetStatus.GET,
        name: "5元仁寿黑芝麻购物券",
      },
      {
        src: "ling_shi_goods_6_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=878961251292471306&channel=YGT",
        aid: "EE36827A7DC483B5BEA81DD5B535F4CF",
        status: CouponGetStatus.GET,
        name: "5元椒盐麻饼购物券",
      },
    ],
  },
  {
    baseName: "haowu_day_",
    list: [
      {
        src: "day_goods_1_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=855394387886755843&channel=YGT",
        aid: "18E6B7A82BA4C20AD65E5841470416D6",
        status: CouponGetStatus.GET,
        name: "5元满婷除螨香皂购物券",
      },
      {
        src: "day_goods_2_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=883000095372193794&channel=YGT",
        aid: "C7BC7DC39A82BA7EFD9FCED963010DDB",
        status: CouponGetStatus.GET,
        name: "15元山清荷花香米购物券",
      },
      {
        src: "day_goods_3_get.png",
        url: "https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/pages/detail/main?hybridVersion=3.0&skuNo=202409041132280126&channel=YGT",
        aid: "141012C6A1B0C8AAC7FBFFFF8FF1DA7B",
        status: CouponGetStatus.GET,
        name: "5元丽雅时代纤维素湿巾购物券",
      },
    ],
  },
]);
