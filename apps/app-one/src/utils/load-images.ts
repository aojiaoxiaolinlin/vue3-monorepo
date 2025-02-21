// 获取assets静态资源，动态加载image放在public目录下更好
export function getAssetsFile(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
}
