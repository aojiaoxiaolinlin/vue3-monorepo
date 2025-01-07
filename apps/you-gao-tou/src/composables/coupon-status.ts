import { CouponUseStatus, getCouponUseStatusApi, getGoodsCouponsApi, getUserCouponsApi } from "#/api";
import { CouponGetStatus, type GoodsCategories, awardCoupons } from "#/views/common-data";


/**
 *用于首页展示的电商券（商品券）状态
 *
 * @param userPhoneApiInfo 用户登录信息
 * @param goodsCategories 分类电商券
 */
export const getGoodsCouponStatus = async (goodsCategories: Ref<GoodsCategories>) => {
  const start = Date.now();
  const [{ data: { data: { data: goodsCouponsRes } } }, { data: { data: { data: userCoupons } } }] = await Promise.all([getGoodsCouponsApi(), getUserCouponsApi()])
  const end = Date.now();
  console.log('获取商品优惠券耗时', end - start, 'ms');
  const goodsCoupons = goodsCouponsRes.map((item) => {
    const data = {
      aid: item.aid,
      stockSurplus: item.stockSurplus,
    };
    return data;
  });
  for (const item of goodsCategories.value) {
    for (const coupon of item.list) {
      for (const goodsCoupon of goodsCoupons) {
        if (coupon.aid === goodsCoupon.aid) {
          coupon.status = goodsCoupon.stockSurplus > 0 ? CouponGetStatus.GET : CouponGetStatus.COMPLETE;
        }
      }
    }
  }
  const userGoodsCoupons = userCoupons.map((item) => item.aid);
  for (const item of goodsCategories.value) {
    for (const coupon of item.list) {
      if (userGoodsCoupons.some((userCoupon) => userCoupon === coupon.aid)) {
        coupon.status = CouponGetStatus.USE;
      }
    }
  }

  for (const item of goodsCategories.value) {
    for (const coupon of item.list) {
      switch (coupon.status) {
        case CouponGetStatus.USE:
          coupon.src = getGoodsCouponSrc(coupon.src, 'use.png');
          break;
        case CouponGetStatus.COMPLETE:
          coupon.src = getGoodsCouponSrc(coupon.src, 'complete.png');
          break;
      }
    }
  }
};

/**
 * 实现对字符串 goods_1_get.png 的处理，将最后一个_后的字符串替换为 newStr
 */
export const getGoodsCouponSrc = (src: string, newStr: string) => {
  // 如果src不包含_，则直接返回src拼接newStr
  if (!src.includes('_')) {
    const srcArr = src.split('.');
    return `${srcArr[0]}_${newStr}`;
  }
  const srcArr = src.split('_');
  srcArr[srcArr.length - 1] = newStr;
  return srcArr.join('_');
}

export type ShowCouponInfo = {
  aid: string;
  src: string;
  name: string;
  url: string;
  createTime: string;
  arriveStatus: CouponArriveStatus;
  resultOld: string;
};

export enum CouponArriveStatus {
  ARRIVE = 'ARRIVE',
  NOT_ARRIVE = 'NOT_ARRIVE',
}

/**
 * 用于奖品列表的优惠券状态
 *
 * @param userPhoneApiInfo 用户登录信息
 * @param goodsCategories 分类电商券
 */
export const getCouponsStatus = async (goodsCategories: Ref<GoodsCategories>) => {
  // 提取goodsCategories中的aid和use属性
  // 本活动的优惠券
  const coupons: Array<ShowCouponInfo> = goodsCategories.value
    .flatMap((item) => {
      return item.list.map((coupon) => {
        const { aid, src } = coupon;
        return { aid, src: getGoodsCouponSrc(src, 'use.png'), createTime: '', url: coupon.url, name: coupon.name, arriveStatus: CouponArriveStatus.ARRIVE, resultOld: '' };
      });
    })
    .flat();
  // 提取awardCoupons中的aid属性
  const awardCouponAids: Array<ShowCouponInfo> = awardCoupons
    .filter((item) => item.aid !== '0')
    .map((item) => {
      return {
        aid: item.aid,
        src: item.src as string,
        createTime: '',
        url: item.url as string,
        name: `${item.name}有搞头活动券`,
        arriveStatus: CouponArriveStatus.ARRIVE,
        resultOld: '',
      };
    });
  coupons.push(...awardCouponAids);
  // const goodsStart = Date.now();
  // const userCoupons = (await getUserCouponsApi(userPhoneApiInfo)).data.data;
  // const goodsEnd = Date.now();
  // console.log('获取用户优惠券耗时', goodsEnd - goodsStart, 'ms');
  // const start = Date.now();
  // // 这个请求很慢，大约需要1s
  // const couponUseStatus = (await getCouponUseStatusApi(userPhoneApiInfo)).data.data;
  // const end = Date.now();
  // console.log('获取用户优惠券状态耗时', end - start, 'ms');
  // 优化：使用Promise.all处理多个异步请求
  const [{ data: { data: userCoupons } }, { data: { data: couponUseStatus } }] = await Promise.all([getUserCouponsApi(), getCouponUseStatusApi()]);
  const res = userCoupons.data
    // 过滤出本活动的优惠券, 分开写是为了方便后续维护
    .filter((item) => coupons.some((coupon) => coupon.aid === item.aid))
    // 过滤出未使用和未到账的优惠券
    .filter((item) => {
      const target = couponUseStatus.data.find(
        (couponStatus) => couponStatus.resultOld === item.resultOld
      );
      // 如果没有找到对应的优惠券使用状态, 两种可能：1. 未到账 2. 未使用
      if (!target) {
        return true;
      }
      if (target.status === CouponUseStatus.NOT_USED) {
        return true;
      }
      return false;
    })
    .map((item) => {
      const target = coupons.find((coupon) => coupon.aid === item.aid);
      if (target) {
        target.createTime = item.createTime;
        target.resultOld = item.resultOld;
        // 如果未到账，则显示未到账的图片
        if (item.resultCode !== "000000") {
          target.src = getGoodsCouponSrc(target.src, 'not_arrive.png');
          target.arriveStatus = CouponArriveStatus.NOT_ARRIVE;
        }
        return target;
      }
      // 按照endTime从小到大排序
    })
    .filter((item) => item !== undefined)
    .sort((a, b) => {
      return new Date(a.createTime).getTime() - new Date(b.createTime).getTime();
    });
  return res;
};
