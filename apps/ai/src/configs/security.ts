// 禁用开发者工具
import DisableDevtool from "disable-devtool";

/**
 * 生产环境禁用开发者工具
 */
export function disableDevtool() {
  if (import.meta.env.PROD) {
    DisableDevtool();
  }
}
