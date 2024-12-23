// 获取路由hash名字
function getHash(url = '') {
  let str = url;
  let routeName = '';
  // #ifndef MP-WEIXIN
  if (!str) {
    str = window.location.href;
  }
  // #endif
  routeName = str.split('#/')[1] ?? '';
  if (routeName.indexOf('?') > -1) {
    routeName = routeName.split('?')[0] ?? '';
  } else if (routeName.indexOf('&') > -1) {
    routeName = routeName.split('&')[0] ?? '';
  }
  return routeName;
}

// zhaokun20230327
// https://h5.test.bestpay.net/subapps/intelligent-core-h5/mobile/index.html?a=123#/enter
// 原因: 为了处理有同事配置上述形式链接 那么上述形式有?号 上述代码就会用&拼接在后面 导致链接有问题
// 处理: 获取是否有 #/ 从而导致的路由不合规
function getHashRestore(lastUrl: string, hashLocation = '') {
  // 获取链接上的hash值名称
  const rt = getHash(lastUrl);
  let redirectUrl = '';
  if (rt) {
    redirectUrl =
      hashLocation === 'end'
        ? `${lastUrl.split(`#/${rt}`)[0]}${lastUrl.split(`#/${rt}`)[1]}#/${rt}`
        : `${lastUrl.split(`#/${rt}`)[0]}#/${rt}${lastUrl.split(`#/${rt}`)[1]}`;
  } else {
    redirectUrl = lastUrl;
  }
  return redirectUrl;
}

export default {
  getHash,
  getHashRestore,
};
