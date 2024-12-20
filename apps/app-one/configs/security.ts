// 禁用开发者工具
import DisableDevtool from 'disable-devtool';

export const disableDevtool = () => {
  if (import.meta.env.PROD) {
    DisableDevtool();
  }
}
