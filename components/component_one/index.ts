import Button from './Button.vue';



export * from './MyModal';
export * from './MyMessage';
// 导出 Button 组件
export { Button };
export function add(a: number, b: number): number {
  return a + b;
}
