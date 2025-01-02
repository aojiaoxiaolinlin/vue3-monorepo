import type { EncryptResponse } from "@lin/request";
import { encryptRequest } from "./init-client";
import type { UserPhoneApiInfo } from "./types";



/**
 * 获取游戏次数
 */
export const getGameCountApi = (userPhoneInfo: UserPhoneApiInfo) => {
  const { params, data } = userPhoneInfo;
  return encryptRequest.postAndParams<EncryptResponse<number>>("/game/gameCount", data, params);
}
/**
 * 领取优惠券
 * @returns Promise<EncryptResponse<string>>
 */
export const issuingCouponApi = () => {
  return encryptRequest.post<EncryptResponse<string>>("/game/issuingCoupon");
}

/**
 * 减少游戏次数
 */
export const decrementGameCountApi = () => {
  return encryptRequest.post<EncryptResponse<number>>("/game/decrementGameCount");
}
