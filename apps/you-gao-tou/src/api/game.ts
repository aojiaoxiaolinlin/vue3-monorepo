import type { EncryptResponse } from "@lin/request";
import { encryptRequest } from "./init-client";

export type UserPhoneInfo = {
  token?: string;
  phone?: string;
}

const getUserPhone = (userPhoneInfo: UserPhoneInfo) => {
  const params = userPhoneInfo.token ? { data: userPhoneInfo.token } : undefined;
  const data = userPhoneInfo.phone ? { phone: userPhoneInfo.phone } : undefined;
  if (!params && !data) {
    // TODO:需要提示退出后重新登录
    console.error("Invalid user phone info");
    // throw new Error("无效用户信息");
  }
  return { params, data }
}

/**
 * 获取游戏次数
 */
export const getGameCountApi = (userPhoneInfo: UserPhoneInfo) => {
  const { params, data } = getUserPhone(userPhoneInfo);
  return encryptRequest.postAndParams<EncryptResponse>("/game/gameCount", data, params);
}
