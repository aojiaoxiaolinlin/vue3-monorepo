import { encryptRequest } from "./init-client";
import type { CouponInfo } from "./types";

export const getGoodsCouponsApi = () => {
  return encryptRequest.post<Array<CouponInfo>>("/coupon/goodsCoupons");
};

export const getUserCouponsApi = () => {
  return encryptRequest.post<Array<CouponInfo>>("/coupon/userCoupons");
};

export const getCouponUseStatusApi = () => {
  return encryptRequest.post<Array<CouponInfo>>("/coupon/couponsUseStatus");
};

export const userGetCouponApi = (aid: string) => {
  return encryptRequest.post("/coupon/userGetCoupon", { aid });
};

export const userGetCouponAgainApi = (resultOld: string) => {
  const data = { resultOld };
  return encryptRequest.post("/coupon/userGetCouponAgain", data);
};

export const getCouponsStockApi = () => {
  return encryptRequest.get<Array<CouponInfo>>("/coupon/couponsStock");
};
