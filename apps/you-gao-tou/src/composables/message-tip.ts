import { createVNode, render } from "vue";
import MessageTip from "#/components/MessageTip.vue";

type MessageTipProps = {
  title: string;
  content: string;
  f?: () => void;
}

/**
 * 显示提示框
 * @param messageTipProps 提示框的属性
 */
export const ShowMessageTip = (messageTipProps: MessageTipProps) => {
  const { title, content, f } = messageTipProps;
  const div = document.createElement('div');
  document.body.appendChild(div);
  const vNode = createVNode(MessageTip, {
    title,
    content,
    onClose: () => {
      f?.();
      render(null, div);
      div.remove();
    }
  });
  render(vNode, div);
  document.body.appendChild(div);
}
