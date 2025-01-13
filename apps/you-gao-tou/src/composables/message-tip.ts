import { createVNode, render } from "vue";
import MessageTip from "#/components/MessageTip.vue";
import MessageTipTwo from "#/components/MessageTipTwo.vue";

type MessageTipProps = {
  title: string;
  firstContent?: string;
  content: string;
  bgImg?: string;
  bigFontSize?: boolean;
  confirm?: {
    btnImg: string;
    callback: () => void;
  };
  close?: () => void;
}

/**
 * 显示提示框
 * @param messageTipProps 提示框的属性
 */
export const ShowMessageTip = (messageTipProps: MessageTipProps) => {
  const { title, content, confirm, close } = messageTipProps;
  const div = document.createElement('div');
  document.body.appendChild(div);
  const vNode = createVNode(MessageTip, {
    title,
    content,
    confirmBtn: confirm?.btnImg,
    onClose: () => {
      close?.();
      render(null, div);
      div.remove();
    },
    onConfirm: () => {
      confirm?.callback();
      render(null, div);
      div.remove();
    }
  });
  render(vNode, div);
  document.body.appendChild(div);
}


/**
 * 显示提示框
 * @param messageTipProps 提示框的属性
 */
export const ShowMessageTipTwo = (messageTipProps: MessageTipProps) => {
  const { title, content, confirm, close, bgImg, firstContent, bigFontSize } = messageTipProps;
  const div = document.createElement('div');
  document.body.appendChild(div);
  const vNode = createVNode(MessageTipTwo, {
    title,
    firstContent,
    content,
    bgImg,
    confirmBtn: confirm?.btnImg,
    bigFontSize,
    onClose: () => {
      close?.();
      render(null, div);
      div.remove();
    },
    onConfirm: () => {
      confirm?.callback();
      render(null, div);
      div.remove();
    }
  });
  render(vNode, div);
  document.body.appendChild(div);
}
