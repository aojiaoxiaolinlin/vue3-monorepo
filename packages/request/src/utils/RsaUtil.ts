// 浏览器原生的加密 crypto 需要安全上下文（localhost / HTTPS)，是否使用有待评估，保险起见，还是第三方库吧
// 参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
import CryptoJS from 'crypto-js';
import Forge from 'node-forge';
import type { EncryptInfo, EncryptResponse, RequestBody } from './RequestBody';

/**
 *
 * @returns { {publicKey: string; privateKey: string} } 公钥和私钥
 */
export function generateRSAKeyPair(): {
  publicKey: string;
  privateKey: string;
} {
  const rsa = Forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 });
  const publicKey = Forge.pki.publicKeyToPem(rsa.publicKey);
  const privateKey = Forge.pki.privateKeyToPem(rsa.privateKey);
  return { publicKey, privateKey };
}

// 固定后端公钥和前端私钥
const backendPublicKey =
  `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2dk3a6mhwUozg6erryMzGm95sqiNASllCHsBEKv6bGCXAn2Rr0OtbYd72gty6rGMwJp3K3Jh0BffUd3Tr31EGfm4LoUMxYkPI3JN8r+sl+PZ9svb3liY0TJ2TWy2sUtI4UXGC/x79HgOfYJozrVkhXP7+2iLNwPzqltq2MW016QIDAQAB
-----END PUBLIC KEY-----`;

const frontendPrivateKey =
  `-----BEGIN RSA PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALZ2TdrqaHBSjODp6uvIzMab3myqI0BKWUIewEQq/psYJcCfZGvQ61th3vaC3LqsYzAmncrcmHQF99R3dOvfUQZ+bguhQzFiQ8jck3yv6yX49n2y9veWJjRMnZNbLaxS0jhRcYL/Hv0eA59gmjOtWSFc/v7aIs3A/OqW2rYxbTXpAgMBAAECgYATFsGqql0qiiJhues5R3jP+vjcSLj3JggcTCQMhax9HJu/gRV0F6d12CGHy/VMhNI8NIAL3AQJmGG/DU/SyPpcjEA7APzeHIZru+cYLz3aTFD5N2eU34fhaYox2aiz/n6C8EhRf0RIiDyUFpCW6uF5uJmksHB+k96a5FoEb0EzkQJBAPlgZ0UVyAZuIp/8z6xghPG6I4Hd6pZAazbwjU22MXanlLoCfmQbnCm7O0+cqd7ya0Cpvr4LIqUTNLgca2q689kCQQC7Tu0u89QoSMUZGduhlJshyCu2DN9/6Ly+MKlBc9o7ORYkMiIme09GMBTUsDaFeJZq6jT8F45FWJkGGIWB2tiRAkAJ/BImcfjQSRiZz0WBYVvxUcKaMIhz+6BPUtJVijXwykTqLa9h0rkt8pEtXthuVMZ2kFVSxp9cfKhftsOWQmYBAkEAhROkS/GMUDqzXgwTEQ+l0DCJbcRjnlrajj3AYvJOoDkE1B6SSMjfH7zVb+7qLZXpOHjBwEF0ISy7O6t8Xy//IQJBAOEXyZsCs+rvaMmJmrXxFnrBy6/IYGv/pHvXP2NqxpZbEhF1w2pU7LLYqvdcOiAHQWEWO/zMQ78X7SDT8HxMyDI=
-----END RSA PRIVATE KEY-----`;

/**
 * RSA 公钥加密
 * @param {string} data 待加密的数据 AES KEY
 * @returns {string} 加密后的数据
 */
export function rsaEncrypt(data: string): string {
  const publicKey = Forge.pki.publicKeyFromPem(backendPublicKey);
  const encrypted = publicKey.encrypt(data, 'RSA-OAEP');
  return Forge.util.encode64(encrypted);
}

/**
 * RSA 私钥解密
 * @param {string} data 待解密的数据
 * @returns {string} 解密后的数据
 */
export function rsaDecrypt(data: string): string {
  const privateKey = Forge.pki.privateKeyFromPem(frontendPrivateKey);
  const decrypted = privateKey.decrypt(Forge.util.decode64(data), 'RSA-OAEP');
  return decrypted;
}

/**
 * AES 加密
 * @param {string} data 待加密的请求数据
 * @returns {string} 加密后的数据
 */
export function aesEncrypt(data: RequestBody): EncryptInfo {
  // AES 高级加密标准
  // AES KEY 16 bytes
  const aesKey = CryptoJS.lib.WordArray.random(16);
  // AES IV 16 bytes
  const iv = CryptoJS.lib.WordArray.random(16);
  // 原始数据排序
  const sortedData = sortRequestData(data);
  // 加入时间戳
  const timestamp = Date.now();
  const timestampData = Object.assign(sortedData, { timestamp: timestamp });
  // 签名
  const signStr = sign(JSON.stringify(timestampData));
  // 使用 AES 加密数据
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(timestampData), aesKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const aesKey_base64 = CryptoJS.enc.Base64.stringify(aesKey);
  const iv_base64 = CryptoJS.enc.Base64.stringify(iv);
  // AES KEY 用 RSA 公钥加密
  const encrypted_aesKey = rsaEncrypt(aesKey_base64);
  // AES IV 用 RSA 公钥加密
  const encrypted_iv = rsaEncrypt(iv_base64);

  return {
    data: encrypted.toString(),
    e: encrypted_aesKey,
    k: encrypted_iv,
    s: signStr,
    timestamp: timestamp,
  };
}

/**
 * AES 解密
 * @param {string} data 待解密的数据
 */
export function aesDecrypt(data: EncryptResponse): string {
  const aesKey = rsaDecrypt(data.e);
  const iv = rsaDecrypt(data.k);
  const decryptedWordArray = CryptoJS.AES.decrypt(data.data, CryptoJS.enc.Utf8.parse(aesKey), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decrypted = decryptedWordArray.toString(CryptoJS.enc.Utf8);
  // 验签,TODO: 验签失败，不明白为什么, 无法使用，当个花瓶吧
  verify(decrypted, data.s);
  return decrypted;
}

/**
 * 使用前端私钥对数据签名, 无法使用，前后端验签失败，不明白为什么
 * @param {string} data 待签名的数据
 * @returns {string} 签名后的数据
 */
function sign(data: string): string {
  const privateKey = Forge.pki.privateKeyFromPem(frontendPrivateKey);

  // 创建消息摘要（使用 SHA-256）
  const md = Forge.md.sha256.create();
  md.update(data);
  // 使用 RSA 私钥进行签名
  const signature = privateKey.sign(md);

  // 返回 base64 编码的签名
  return Forge.util.encode64(signature);
}

/**
 * 验证签名, 无法使用，前后端验签失败，不明白为什么
 * @param {string} sign 待验证的数据
 */
function verify(data: string, sign: string): boolean {
  const publicKey = Forge.pki.publicKeyFromPem(backendPublicKey);
  // 创建消息摘要（使用 SHA-256）
  const md = Forge.md.sha256.create();
  md.update(data.toString(), 'utf8');
  // 使用 RSA 公钥进行验证
  return publicKey.verify(md.digest().getBytes(), Forge.util.hexToBytes(sign));
}


/**
 * 对请求数据进行 ASCII 码排序，得到有序的数据对象，用于签名
 * @param {Record<string, string | number>} data 待排序的请求数据
 */
export function sortRequestData(data: RequestBody): RequestBody {
  if (typeof data !== 'object' || data === null) {
    return data;  // 如果是基本类型，直接返回
  }
  // 对对象的键进行排序，并递归处理每个键对应的值
  const sortedData: Record<string, unknown> = {};
  const keys = Object.keys(data).sort();
  for (const key of keys) {
    sortedData[key] = sortRequestData(data[key] as RequestBody);
  }

  return sortedData;
}
