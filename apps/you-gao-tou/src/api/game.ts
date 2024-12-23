import type { EncryptResponse } from "@lin/request";
import { encryptRequest } from "./init-client";

/**
 * 获取游戏次数
 */
export const getGameCountApi = () => {
  const params = { data: 'D2gE1ljWe%2FiCJdyViZJ%2FnpbCaqa9KxV%2BV0gYEdFp092tgAGU%2BrlM1PzEyMROBXB%2BfkR2lh7aolnvXyWXI4ezxA8iLA724LM6zmAvAVQjfoYfDJviwDBaQmDNwjvASni9bkaGC%2BgrshmYZ%2FIFXhYNGR9tjUpqB4qVF7urw3UYlGk%3D' };
  encryptRequest.postAndParams<EncryptResponse>("/game/gameCount", undefined, params).then((res) => {
    const decryptData = JSON.parse(res.data.data.data);
    console.log(decryptData);
  }).catch((err) => {
    console.log('处理错误', err);
  });
}
