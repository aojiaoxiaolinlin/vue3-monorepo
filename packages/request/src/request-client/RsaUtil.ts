// 浏览器原生的加密 crypto 需要安全上下文（localhost / HTTPS)，是否使用有待评估，保险起见，还是第三方库吧
// 参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
import CryptoJS from 'crypto-js';
import Forge from 'node-forge';
import type { EncryptInfo, EncryptResponseBody, RequestBody } from './RequestBody';

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
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRgxE2ofAo0ilt+8ViU0gQ2vz
i08MvYBgDRXUHLQ1uPCd4i478czaNEXbNyiUrR0wql/aQBVddklA7B6vpriLrfp
J7Sm2U6+HLMBA26yVE7sCcX5+52x9ZBvoaCaDqs4gZC9Te1UsebZa2iVMtEMTOZ
ah41Pbn1DtDOXZgDVkMBwIDAQAB
-----END PUBLIC KEY-----`;

const frontendPrivateKey =
  `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCBWwNewEy37qkmyTi/uMIsdin6lQRX7xj3s/dF+doO6Kzc0vXg
3CSDcE9b21JV2ZBFSj9bFjafqgH6zBuiwUNrnqAKNijU6SrWSnH+8Of3VEMuWyfv
Dgxx4G9K0fSPNyTnGGlr2KiyvFBWaUIB8j8J7inavfUzoHm3WG+L86INJQIDAQAB
AoGAevNbHLCDO0CpnqgcPH8McN5PwFHrsvkcLjTsj6KQVSNrSulps7ULL7OMeq7Y
b6k/q9yKo7VVbiVVhGCE1AoGXeZHtFLMBEDcXL0Km1LhOpqhLGn4i7LbDzN92oTv
B+4WSdlY2R3mZHpIZpeIIecCo9dC8jFVthUBi63Y1qpgQHECQQC9uGvzRO8wSIat
g5xxgepUOLh7b/6IXzgmZakQV6gSZX41YwkpJI1y817JpFkcSFVYHXKOW41tiQF0
cUxATjTHAkEArovhKBPJhrXnSYYczs/Ps2eOiRUj4RCF9X36Dbe+Z2GPt29R8JDx
DtqrpOGpGjLTlOtPVFdSSN78nMdO/eGqswJANewr6nnGTf/fH4QPvAdD1epFLPhY
7OO7btZoJff0Ej58j6n1WZdFCM35O/CVTz+T2jaMb7+/w8kz+6eUF5bi0wJBAJ3l
MbAEflhbMzfCl0rKmJQtSLZfJk7RmKzj4hEIt7hjfBOvIwugwj/ytjT4YfWuJtJf
LysXtvrupMvaTG3D95sCQQCRf48ZZpUikBRrfp4QRsU3DS8lucIXI3jwrg9w8t+5
BoHMGAtWrGLPeUroH+lyaJi+eSgEcm1fjtkA7tTaiimb
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
  // const sortedData = sortRequestData(data);
  // 加入时间戳
  const timestamp = Date.now();
  // 签名
  const stringData = JSON.stringify(data);
  const signStr = sign(stringData, timestamp);
  // 使用 AES 加密数据
  const encrypted = CryptoJS.AES.encrypt(stringData, aesKey, {
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
export function aesDecrypt(data: EncryptResponseBody): string {
  const aesKey = rsaDecrypt(data.e);
  const iv = rsaDecrypt(data.k);
  const decryptedWordArray = CryptoJS.AES.decrypt(data.data as string, CryptoJS.enc.Utf8.parse(aesKey), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decrypted = decryptedWordArray.toString(CryptoJS.enc.Utf8);
  // 验签,TODO: 验签失败，不明白为什么, 无法使用，当个花瓶吧
  if (!verify(decrypted, data.s, data.timestamp)) {
    throw new Error('验签失败');
  };
  return decrypted;
}

/**
 * 使用前端私钥对数据签名, 无法使用，前后端验签失败，不明白为什么,
 * RSA 私钥签名无法被后端验证，不明白为什么，改为使用摘要校验
 * @param {string} data 待签名的数据
 * @returns {string} 签名后的数据
 */
function sign(data: string, timestamp: number): string {
  // const privateKey = Forge.pki.privateKeyFromPem(frontendPrivateKey);
  const timeOut = 30 * 60 * 1000;
  // 创建消息摘要（使用 SHA-256）
  const md = Forge.md.sha256.create();
  md.update(`${data}{${timestamp + timeOut}}`, 'utf8');
  // // 使用 RSA 私钥进行签名
  // const signature = privateKey.sign(md);
  // // 返回 base64 编码的签名
  // return Forge.util.encode64(signature);
  return md.digest().toHex();
}

/**
 * 验证签名, 无法使用，前后端验签失败，不明白为什么
 * @param {string} sign 待验证的数据
 */
function verify(data: string, sign: string, timestamp: number): boolean {
  // const publicKey = Forge.pki.publicKeyFromPem(backendPublicKey);
  const timeOut = 30 * 60 * 1000;
  // 创建消息摘要（使用 SHA-256）
  const md = Forge.md.sha256.create();
  md.update(`${data}{${timestamp + timeOut}}`, 'utf8');
  // 使用 RSA 公钥进行验证
  // return publicKey.verify(md.digest().getBytes(), Forge.util.hexToBytes(sign));
  return md.digest().toHex() === sign;
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
