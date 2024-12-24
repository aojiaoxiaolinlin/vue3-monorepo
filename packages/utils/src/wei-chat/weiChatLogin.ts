import SecurityUtil from './security';
import Url from './url';

/**
 * H5项目实现 - 小程序解密
 * @param {string} str 解密参数
 * @param {string} key 密钥
 */
function decodeKey(str = '', key = 'QYYB') {
  let decodeObj = {
    productNo: '',
  };
  try {
    decodeObj = JSON.parse(SecurityUtil.aesDecrypt256(str, SecurityUtil.bpGenerateKey(key)));
  } catch (err) {
    console.log('catch', err);
  }
  console.log(`加密{${key}}的解密: `, decodeObj);
  return decodeObj;
}

/**
 * H5项目实现 - 小程序通过webview加载的H5页面登录失效特殊处理
 * @param {String} action  默认可以不传 action: 登录login(默认) 续期 getNewSessionKey
 * @param {String} actionPage 默认可以不传 authorization 授权二选一(默认) login 手机号登录
 * @param {Object} params 默认可以不传 小程序登陆成功后返回H5页面，H5链接需要带的参数
 */
export function toXcxLogin(action = '', actionPage = '', params = {}) {
  const xcxKey = {
    action,
    actionPage,
    ...params,
  };
  let str = '';
  for (const i in xcxKey) {
    // @ts-ignore
    str += `${str ? '&' : ''}${i}=${xcxKey[i]}`;
  }

  // console.log('跳转小程序登陆之前传入的参数--------', xcxKey);
  // current是登录成功后需要回到的h5页面 也就是你的当前页面/你想回到的页面
  const current = `${process.env.VUE_APP_DOMAINURL}/subapps/mall-shopping-h5/index.html?hybridVersion=3.0`;
  const currentUrl = `${current}${current.indexOf('?') > -1 ? '&' : '?'}${str}`;
  // 获取是否有 #/ 从而导致的路由不合规
  const redirectUrl = Url.getHashRestore(currentUrl);

  const redirectNewUrl = encodeURIComponent(redirectUrl);
  const path = `/pagesA/xcxlogin/index?url=${redirectNewUrl}`;
  console.log('跳转小程序登陆传入的URL值----------', redirectNewUrl);
  // 跳转到小程序
  // @ts-ignore
  wx.miniProgram.navigateTo({
    url: path,
  });
}

/**
 * WeiChat MINI Program Login Get User Info
 */
export function wxLoginGetUserInfo(key: string) {
  const decode = decodeURIComponent(key.replaceAll(' ', '+'));
  const loginInfo = decodeKey(decode, 'QYYB');

  // 存储用户信息
  // const paramsSk = {
  //   preName: 'BestpayHtml5_',
  //   key: 'sessionKey',
  //   isNewAuthorized: true,
  //   value: {
  //     sessionKey: loginInfo.sessionKey || '',
  //   },
  // };
  // const params = {
  //   preName: 'BestpayHtml5_',
  //   key: 'userInfo',
  //   isNewAuthorized: true,
  //   value: {
  //     productNo: loginInfo.productNo || '',
  //     operatorNo: loginInfo.operatorNo || '',
  //     sessionKey: loginInfo.sessionKey || '',
  //     appType: loginInfo.appType || '',
  //   },
  // };
  // sessionStorage.setItem('userInfo', JSON.stringify(params.value));

  return loginInfo;
}
