import type { UserPhoneApiInfo } from "#/api";
import { CouponUseStatus, getCouponUseStatusApi, getGoodsCouponsApi, getUserCouponsApi } from "#/api";
import { CouponGetStatus, type GoodsCategories, awardCoupons } from "#/views/data";


/**
 *用于首页展示的电商券（商品券）状态
 *
 * @param userPhoneApiInfo 用户登录信息
 * @param goodsCategories 分类电商券
 */
export const getGoodsCouponStatus = async (userPhoneApiInfo: UserPhoneApiInfo, goodsCategories: Ref<GoodsCategories>) => {
  const goodsCouponsRes = (await getGoodsCouponsApi()).data.data.data;
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

  const userCoupons = (await getUserCouponsApi(userPhoneApiInfo)).data.data;

  const userGoodsCoupons = userCoupons.data.map((item) => item.aid);
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
  const srcArr = src.split('_');
  srcArr[srcArr.length - 1] = newStr;
  return srcArr.join('_');
}

/**
 * 用于奖品列表的优惠券状态
 *
 * @param userPhoneApiInfo 用户登录信息
 * @param goodsCategories 分类电商券
 */
export const getCouponsStatus = async (userPhoneApiInfo: UserPhoneApiInfo, goodsCategories: Ref<GoodsCategories>) => {
  // 提取goodsCategories中的aid和use属性
  // 本活动的优惠券
  const coupons = goodsCategories.value
    .flatMap((item) => {
      return item.list.map((coupon) => {
        const { aid, src } = coupon;
        return { aid, src: getGoodsCouponSrc(src, 'use.png'), createTime: '', url: coupon.url, name: coupon.name };
      });
    })
    .flat();
  // 提取awardCoupons中的aid属性
  const awardCouponAids = awardCoupons
    .filter((item) => item.aid !== '0')
    .map((item) => {
      return {
        aid: item.aid,
        src: item.src as string,
        createTime: '',
        url: 'https://h5.bestpay.cn/subapps/mall-shopping-h5/index.html#/?channel=fs_sc',
        name: `${item.name}有搞头活动券`,
      };
    });
  coupons.push(...awardCouponAids);
  const userCoupons = (await getUserCouponsApi(userPhoneApiInfo)).data.data;
  const start = Date.now();
  // 这个请求很慢，大约需要1s
  const couponUseStatus = (await getCouponUseStatusApi(userPhoneApiInfo)).data.data;
  const end = Date.now();
  console.log('获取用户优惠券状态耗时', end - start, 'ms');


  const res = userCoupons.data
    // 过滤出本活动的优惠券, 分开写是为了方便后续维护
    .filter((item) => coupons.some((coupon) => coupon.aid === item.aid))
    // 过滤出未使用的优惠券
    .filter((item) => {
      const target = couponUseStatus.data.find(
        (couponStatus) => couponStatus.resultOld === item.resultOld
      );
      // 如果没有找到对应的优惠券使用状态, 则默认为未使用，这种是电商券
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
