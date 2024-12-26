import type { EncryptResponse } from "@lin/request";
import { encryptRequest } from "./init-client";
import type { CouponInfo, UserPhoneApiInfo } from "./types";



export const getGoodsCouponsApi = () => {
  return encryptRequest.post<EncryptResponse<Array<CouponInfo>>>('/coupon/goodsCoupons');
}

export const getUserCouponsApi = (userPhoneInfo: UserPhoneApiInfo) => {
  const { params, data } = userPhoneInfo;
  return encryptRequest.post<EncryptResponse<Array<CouponInfo>>>('/coupon/userCoupons', data, params);
}

export const getCouponUseStatusApi = (userPhoneInfo: UserPhoneApiInfo) => {
  const { params, data } = userPhoneInfo;
  return encryptRequest.post<EncryptResponse<Array<CouponInfo>>>('/coupon/couponsUseStatus', data, params);
}
