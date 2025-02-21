import type { Message } from "#/api/models/type";
import { Role } from "#/api/models/type";
import { addChatRecordMessageById, chatStorage } from "#/composes/chat-storage";
import { ulid } from "ulid";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentChatId: "" as string,
      messages: [] as Message[],
      promptContent: "",
      SSEConnectStatus: false,
    };
  },
  actions: {
    loadMessage(chatId = "") {
      if (chatId) {
        this.messages = toRaw(chatStorage.value.get(chatId)?.Messages) ?? [];
      }
      else {
        const firstChatId = chatStorage.value.keys().next().value;
        if (firstChatId) {
          this.messages = toRaw(chatStorage.value.get(firstChatId)?.Messages) ?? [];
        }
      }
    },
    setMessages(messages: Message[]) {
      this.messages = messages;
    },
    setSystemMessage(content: string) {
      if (this.messages[this.messages.length - 1].role !== Role.ASSISTANT) {
        this.messages.push({ role: Role.ASSISTANT, content, id: Date.now() });
      }
      else {
        this.messages[this.messages.length - 1].content += content;
      }
    },
    addUserMessage(content: string) {
      if (this.messages.length === 0) {
        this.currentChatId = ulid();
        chatStorage.value.set(this.currentChatId, { id: this.currentChatId, title: content, Messages: [] });
      }
      const message = { role: Role.USER, content, id: Date.now() };
      this.messages.push(message);
      addChatRecordMessageById(this.currentChatId, message);
    },
    clearMessage() {
      this.messages.splice(0, this.messages.length);
    },
  },
});
