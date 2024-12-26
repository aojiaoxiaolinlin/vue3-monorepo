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
