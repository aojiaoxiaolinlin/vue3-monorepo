// 浏览器原生的加密 crypto 需要安全上下文（localhost / HTTPS)，是否使用有待评估，保险起见，还是第三方库吧
// 参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
import CryptoJS from 'crypto-js'
import Forge from 'node-forge'

/**
 *
 * @returns { {publicKey: string; privateKey: string} } 公钥和私钥
 */
export function generateRSAKeyPair(): { publicKey: string; privateKey: string } {
  const rsa = Forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 })
  const publicKey = Forge.pki.publicKeyToPem(rsa.publicKey)
  const privateKey = Forge.pki.privateKeyToPem(rsa.privateKey)
  return { publicKey, privateKey }
}
