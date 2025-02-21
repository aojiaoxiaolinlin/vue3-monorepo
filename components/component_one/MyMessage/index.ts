import { createVNode, render } from "vue";
import MyMessage from "./MyMessage.vue";

export function ShowMessage(message: string, f: () => void) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  /**
   * createVNode —— 创建虚拟 DOM
   * @param 参数1 要创建的组件，必选
   * @param 参数2 组件的属性，可选
   * @param 参数3 子节点，可选
   * @description 虚拟 DOM 创建完成后，需要使用 render 函数，才能在页面中渲染
   */
  const vNode = createVNode(MyMessage, {
    message,
    // 通过在子组件的 defineEmits 中定义事件名称， 然后这里在事件名称前加上 on，就可以在父组件中监听到子组件的事件，这样就可以实现子组件向父组件传递数据
    onClick: () => {
      f();
      render(null, div);
      div.remove();
    },
    onClickMe: (message: string) => {
      console.warn("onClickMe", message);
      render(null, div);
      div.remove();
    },
  });
  /**
   * render —— 渲染虚拟 DOM
   * @param 参数1 要被渲染的虚拟 DOM，必选
   * @param 参数2 要渲染的位置，必选
   * @description 虚拟 DOM 创建完成后，需要使用 render 函数，才能在页面中渲染
   */
  render(vNode, div);
  document.body.appendChild(div);
}
