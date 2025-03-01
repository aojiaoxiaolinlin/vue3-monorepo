// 插件参考：https://mdit-plugins.github.io/zh/

import { alert } from "@mdit/plugin-alert";
// import { footnote } from "@mdit/plugin-footnote";
import footnote from "markdown-it-footnote";
import { config } from "md-editor-v3";
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import "@mdit/plugin-alert/style";

// 参考：https://imzbf.github.io/md-editor-v3/zh-CN/api#%F0%9F%92%B4%20%E9%85%8D%E7%BD%AE%E7%BC%96%E8%BE%91%E5%99%A8
config({
  markdownItPlugins(plugins) {
    plugins.push({
      type: "alert",
      plugin: alert,
      options: {},
    });
    plugins.push({
      type: "footnote",
      plugin: footnote,
      options: {},
    });
    return plugins;
  },
});
