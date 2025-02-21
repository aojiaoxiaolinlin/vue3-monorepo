import { useMessageStore } from "#/stores";
import { objectIsEmpty } from "@lin/utils";
import { useStorage } from "@vueuse/core";
import { ulid } from "ulid";
import { addChatRecordMessageById } from "./chat-storage";

export function useChatStream() {
  const messageStore = useMessageStore();
  const userId = useStorage("userId", ulid());
  const eventSource = new EventSource(`/api/chat?userId=${userId.value}`);

  const chatStream = () => {
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.warn("收到消息内容是:", data.metadata.id);
      if (objectIsEmpty(data.result)) {
        addChatRecordMessageById(
          messageStore.currentChatId,
          messageStore.messages[messageStore.messages.length - 1],
        );
      }
      else {
        messageStore.setSystemMessage(data.result.output.text);
      }
    };

    eventSource.onopen = (event) => {
      console.warn("连接已经建立", event.timeStamp);
      messageStore.SSEConnectStatus = true;
    };

    eventSource.onerror = (event) => {
      console.warn("连接出现错误", event);
    };
  };

  return {
    eventSource,
    chatStream,
  };
}
