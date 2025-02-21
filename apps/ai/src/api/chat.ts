import type { MessageDto } from "./models/type";
import { useMessageStore } from "#/stores";
import { useStorage } from "@vueuse/core";
import { ulid } from "ulid";
import { request } from "./init-request-client";

export function chat(content: string) {
  const messageStore = useMessageStore();
  const userId = useStorage("userId", ulid());

  // if (messageStore.SSEConnectStatus) {
  messageStore.addUserMessage(content);

  request.post<boolean, MessageDto>("/chat", {
    userId: userId.value,
    chatId: messageStore.currentChatId,
    content,
  });
  // }
  // throw new Error("SSE 未连接");
}

export function deleteChatById(userId: string, chatId: string) {
  request.delete(`/chat/${userId}/${chatId}`);
}

export function closeSse() {
  const userId = useStorage("userId", ulid());
  request.delete(`/chat/${userId.value}`);
}
