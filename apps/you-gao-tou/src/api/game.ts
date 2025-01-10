import type { HttpResponse } from "@lin/request";
import { encryptRequest } from "./init-client";
import type { UserPhoneApiInfo } from "./types";



/**
 * 获取游戏次数
 */
export const getGameCountApi = (userPhoneInfo: UserPhoneApiInfo) => {
  const { params, data } = userPhoneInfo;
  return encryptRequest.postAndParams<HttpResponse<number>>("/game/gameCount", data, params);
}
/**
 * 领取优惠券
 * @returns Promise<HttpResponse<string>>
 */
export const issuingCouponApi = () => {
  return encryptRequest.post<HttpResponse<string>>("/game/issuingCoupon");
}

/**
 * 减少游戏次数
 */
export const decrementGameCountApi = () => {
  return encryptRequest.post<HttpResponse<number>>("/game/decrementGameCount");
}

/**
 * 判断是否有每日库存
 * @returns Promise<HttpResponse<boolean>>
 */
export const hasDailyStock = () => {
  return encryptRequest.get<HttpResponse<boolean>>("/game/hasDailyStock");
}
