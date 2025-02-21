import type { ChatRecord, Message } from "#/api/models/type";
import { useStorage } from "@vueuse/core";

export const chatStorage = useStorage("chat-storage", new Map<string, ChatRecord>());

export function addChatRecordMessageById(currentChatId: string, message: Message) {
  chatStorage.value.get(currentChatId)?.Messages.push(message);
}
