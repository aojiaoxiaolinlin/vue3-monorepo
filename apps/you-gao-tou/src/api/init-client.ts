import { type ExceptionResponse, type HttpResponse, aesDecrypt, createEncryptRequest } from "@lin/request";
import { AxiosError } from "axios";
import { ShowMessageTip } from "#/composables/message-tip";
// import { ShowMessageTipTwo as ShowMessageTip } from "#/composables/message-tip";
import { tipText } from "#/views/January/one/data";
import { API_BASE_URL } from "../../configs";

const encryptRequest = createEncryptRequest({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 可能需要更好的处理方式
encryptRequest.addResponseInterceptor<HttpResponse<unknown>>({
  fulfilled: (response) => {
    if (response.data.code === 200) {
      if (response.data.msg === "无数据") {
        // 组织一个空数据返回
        // const data: HttpResponse<unknown> = {
        //   data: { data: [], e: "", k: "", s: "", timestamp: 0 },
        //   code: 200,
        //   msg: "无数据",
        // };
        return { data: [], e: "", k: "", s: "", timestamp: 0 };
      }
      // 统一解密数据
      if (response.data.data != null) {
        const decryptData = aesDecrypt(response.data.data);
        try {
          // 尝试解析为 JSON，如果解析失败，直接返回字符串，让调用方自行处理
          return JSON.parse(decryptData);
        } catch (error) {
          return decryptData;
        }
      }
    }
    return Promise.reject(response.data);
  },
  rejected: (error) => {
    console.log("response intercept error", error);
    if (error instanceof AxiosError) {
      // 服务器错误，TODO: 下面这坨太长了，需要整理
      switch (error.status) {
        case 500:
        case 600: {
          handleExceptionMessage(error);
          break;
        }
        case 401: {
          ShowMessageTip({
            title: "未登录",
            content: "请登录后再试",
          });
          break;
        }
      }
    }
    return Promise.reject(error);
  },
});

const handleExceptionMessage = (error: AxiosError<ExceptionResponse>) => {
  const data = error.response?.data;
  if (data) {
    // 只不是为了获取错误信息，ts 会报错，所以需要断言
    let errorMsg: undefined | string;
    const errorRes = data;
    errorMsg = errorRes.msg;
    // 无法准确定义错误信息，直接提示服务器错误
    if (errorMsg?.includes("已结束")) {
      errorMsg = "活动已结束";
      ShowMessageTip({
        title: "嗨！活动已结束啦！",
        content: errorMsg,
        close: () => {
          // 路由后退，是否需要后退要根据活动页面所在位置判断
          window.history.back();
        },
      });
      return Promise.reject(error);
    }
    switch (errorMsg) {
      case "该渠道优惠券已抢光!": {
        ShowMessageTip({
          title: tipText.notStock.title,
          content: tipText.notStock.content,
          close: () => {
            // 路由后退
            window.history.back();
          },
        });
        break;
      }
      case "发放中，请稍候": {
        ShowMessageTip({
          title: "发放中",
          content: errorMsg,
        });
        break;
      }
      default: {
        ShowMessageTip({
          title: "服务器错误",
          content: errorMsg ?? "请稍后再试",
        });
      }
    }
  } else {
    ShowMessageTip({
      title: "服务器错误",
      content: "未知异常",
    });
  }
};

export { encryptRequest };
