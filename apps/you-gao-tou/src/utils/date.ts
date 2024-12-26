export const checkActivityDate = () => {
  // 时间判断
  // 获取当前时间判断是否是星期二
  const date = new Date();
  const week = date.getDay();
  // 如果当前时间是12月10日之前。
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // 只有12月的周二才能玩,
  const res = { isShow: false, num: 0 };
  if (month !== 12 || week !== 2) {
    res.isShow = true;
    if (day < 10) {
      res.num = 0;
    } else if (day > 10 && day < 17) {
      res.num = 1;
    } else if (day > 17 && day < 24) {
      res.num = 2;
    } else if (day > 24 && day < 31) {
      res.num = 3;
    }
  }
  return res;
};
