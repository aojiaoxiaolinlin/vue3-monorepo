import { API_BASE_URL } from "#/configs";
import { RequestClient } from "@lin/request";

enum ApiURL {
  PUBLIC_KEY = "/publicKey",
  ENCRYPT_TEST = "/publicKey/encrypt",
  ENCRYPT_DATA_TEST = "/encryptDataTest",
}

const request = new RequestClient({
  baseURL: API_BASE_URL,
});

export function getEncryptData() {
  request.post<string>(ApiURL.ENCRYPT_TEST).then(async (res) => {
    console.log(res);
  });
}

export function getData(params: Record<string, string | number>) {
  request.getAndParams<string>("/api/test", params).then((res) => {
    console.log(res);
  });
}

export function getDataWithPaths(paths: Record<string, string | number>) {
  request.getAndPaths<string>("/api/test/{id}", paths).then((res) => {
    console.log(res);
  });
}
