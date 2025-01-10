// 2025年1月7日及1月21日弹窗提示
// import { ShowMessageTip } from "#/composables/message-tip";
// 2025年1月14日及28日弹窗提示
import { ShowMessageTipTwo as ShowMessageTip } from "#/composables/message-tip";

export const isActivityDate = () => {
  const date = new Date();
  const day = date.getDate() + 6;
  if (day !== 14) {
    let title = '';
    let content = '';
    if (day < 14) {
      title = "嘿！小伙伴们";
      content = "活动时间为2025年1月每周二00:00:00开启<br />趣味玩法、丰厚奖品等您来拿！";
    } else {
      title = "嘿！小伙伴们";
      // content = "敬请期待下一场幸运翻翻乐活动吧！<br/>活动时间：2025年1月14日";
      content = "本场活动已结束<br/>请期待下一场四川方言大挑战活动吧！<br />活动时间：2025年1月21日";
    }

    ShowMessageTip({
      title,
      content,
    });
    return false;
  }

  return true;
};
