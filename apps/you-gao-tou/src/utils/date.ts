import { ShowMessageTip } from "#/composables/message-tip";

export const isActivityDate = () => {
  const date = new Date();
  const day = date.getDate();
  if (day !== 7) {
    let title = '';
    let content = '';
    if (day < 7) {
      title = "嘿！小伙伴们";
      content = "活动时间为2025年1月每周二00:00:00开启<br />趣味玩法、丰厚奖品等您来拿！";
    } else {
      title = "本场活动已结束";
      content = "敬请期待下一场幸运翻翻乐活动吧！<br/>活动时间：2025年1月14日";
    }

    ShowMessageTip({
      title,
      content,
    });
    return false;
  }

  return true;
};
