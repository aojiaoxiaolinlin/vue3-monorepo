import Button from './Button.vue';


console.log('Component One');

// 导出 Button 组件
export { Button };

export function add(a: number, b: number): number {
    return a + b;
}