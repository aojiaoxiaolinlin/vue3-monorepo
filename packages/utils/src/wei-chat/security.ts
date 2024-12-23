// EncryptMin: AES和MD5加解密
// @ts-ignore
import * as EncryptMin from './GibberishAES.min';
const { GibberishAES } = EncryptMin;

/**
 * [ aes加密，长度为256 ]
 * @param {String} plainText
 * @param {String} key
 */
const aesEncrypt256 = (plainText: string, key: string) => {
  GibberishAES.size(256);
  const encryptData = GibberishAES.aesEncrypt(plainText, key);
  return encryptData;
};

/**
 * [ aes解密，长度为256 ]
 * @param {String} plainText
 * @param {String} key
 */
const aesDecrypt256 = (plainText: string, key: string) => {
  GibberishAES.size(256);
  return GibberishAES.aesDecrypt(plainText, key);
};

/**
 * [ aes加密，长度为128 ]
 *
 * @param {String} plainText
 * @param {String} key
 */
const aesEncrypt128 = (plainText: string, key: string) => {
  GibberishAES.size(128);
  const encryptData = GibberishAES.aesEncrypt(plainText, key);
  return encryptData;
};

/**
 * [ aes解密，长度为128 ]
 *
 * @param {String} plainText
 * @param {String} key
 */
const aesDecrypt128 = (plainText: string, key: string) => {
  GibberishAES.size(128);
  const encryptData = GibberishAES.aesDecrypt(plainText, key);
  return encryptData;
};

/**
 * [ 生成文本的md5 ]
 * @description 调用CryptoJS的md5方法，全大写
 * @param {String} plainText
 */
const md5ByCryptoJS = (plainText: string) => {
  // GibberishAES.Hash.MD5(plainText)  16位DM5加密串（不适用）
  // GibberishAES.MD5  32位DM5加密串
  // let sign = GibberishAES.Hash.MD5(plainText).toString().toUpperCase();
  // @ts-ignore
  const sign = GibberishAES.MD5(plainText).toString().toUpperCase();
  return sign;
};

/**
 * [ 生成翼支付独有的key ]
 *
 * 建议从公共方法中剥离，放在业务方法中
 *
 * @param {String} text
 * @param {Array<String>} rangeList
 */
const bpGenerateKey = (text: string, rangeList: Array<string> = ['YHYY', 'QYYB', 'WGCZ']) => {
  let key = '*$BAS784@!jk9';
  if (rangeList.indexOf(text) > -1) {
    key = text + key;
    return md5ByCryptoJS(key);
  }
  return null;
};

export default {
  aesEncrypt256,
  aesDecrypt256,
  aesEncrypt128,
  aesDecrypt128,
  md5ByCryptoJS,
  bpGenerateKey,
};
