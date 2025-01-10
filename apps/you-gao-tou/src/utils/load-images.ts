// 获取assets静态资源
export const getAssetsImage = (url: string) => {
  return new URL(`../assets/images${url}`, import.meta.url).href
}

export const getAssetsDateImage = (url: string) => {
  return new URL(`../assets/images/date-tip/${url}`, import.meta.url).href
}

export const getAssetsGoodsImage = (url: string) => {
  return new URL(`../assets/images/goods/${url}`, import.meta.url).href
}

export const getAssetsCardListImage = (url: string) => {
  return new URL(`../assets/images/card-list/${url}`, import.meta.url).href
}

export const getAssetCouponImage = (url: string) => {
  return getAssetsGoodsImage(url).includes('undefined') ? new URL(`../assets/images/coupon-list/${url}`, import.meta.url).href : getAssetsGoodsImage(url)
}

export const getAssetChuanPuImage = (url: string) => {
  return new URL(`../assets/images/chuan-pu/${url}`, import.meta.url).href
}

export const getAssetFanFanImage = (url: string) => {
  return new URL(`../assets/images/fan-fan/${url}`, import.meta.url).href
}
