import type { EncryptResponse } from "@lin/request";
import { encryptRequest } from "./init-client";
import type { CouponInfo } from "./types";



export const getGoodsCouponsApi = () => {
  return encryptRequest.post<EncryptResponse<Array<CouponInfo>>>('/coupon/goodsCoupons');
}

export const getUserCouponsApi = () => {
  return encryptRequest.post<EncryptResponse<Array<CouponInfo>>>('/coupon/userCoupons');
}

export const getCouponUseStatusApi = () => {
  return encryptRequest.post<EncryptResponse<Array<CouponInfo>>>('/coupon/couponsUseStatus');
}

export const userGetCouponApi = (aid: string) => {
  return encryptRequest.post<EncryptResponse>('/coupon/userGetCoupon', { aid });
}

export const userGetCouponAgainApi = (resultOld: string) => {
  const data = { resultOld };
  return encryptRequest.post<EncryptResponse>('/coupon/userGetCouponAgain', data);
}

export const getCouponsStockApi = () => {
  return encryptRequest.get<EncryptResponse<Array<CouponInfo>>>('/coupon/couponsStock');
}
