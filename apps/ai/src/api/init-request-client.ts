import { RequestClient } from "@lin/request";

const request = new RequestClient({
  baseURL: "/api",
});

request.addRequestInterceptor({
  fulfilled: (config) => {
    Object.assign(config.headers, {
      Authorization:
        "Bearer hU_NYThcjoK8ibiVrPC1-Zr4v8CHpmjF4pzThA2S_RiRmYbTUFLHLPR67zHpUYIRytuQmwunU3H7n8A-m20Lsw",
    });
    return config;
  },
});

export { request };
