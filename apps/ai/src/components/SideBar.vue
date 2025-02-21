<script setup lang="ts">
import { deleteChatById } from "#/api/chat";
import { chatStorage } from "#/composes/chat-storage";
import { useMessageStore } from "#/stores";
import { useStorage } from "@vueuse/core";
import { ulid } from "ulid";

const router = useRouter();
const messageStore = useMessageStore();

function onNewChat() {
  messageStore.clearMessage();
  messageStore.currentChatId = ulid();
  router.push(`/chat/${messageStore.currentChatId}`);
}

function onDeleteChat(chatId: string) {
  chatStorage.value.delete(chatId);
  if (messageStore.currentChatId === chatId) {
    messageStore.clearMessage();
    router.push("/");
  }
  deleteChatById(useStorage("userId", "").value, chatId);
}
</script>

<template>
  <div
    border="1px solid #ddd"
    flex
    flex-col
    items-center
    bg-sidebar
  >
    <div
      mb-4
      flex
      flex-col
      items-center
    >
      <p
        text-xl
        font-600
      >
        DeepSeek
      </p>
      <div
        flex-center
        cursor-pointer
        border-rd
        bg-black
        px-2
        py-1
        text-white
        @click="onNewChat"
      >
        <div i-ri-add-fill />
        <span text-lg>开始新对话</span>
      </div>
    </div>
    <nav w-full>
      <ul>
        <li
          v-for="chat in chatStorage.values()"
          :key="chat.id"
          relative
          m-1
          class="group"
        >
          <RouterLink
            :to="`/chat/${chat.id}`"
            block
            cursor-pointer
            border-rd
            px-2
            py-1
            hover:bg-sidebar-accent
          >
            <span
              block
              w-50
              overflow-hidden
              text-ellipsis
              whitespace-nowrap
            >{{ chat.title }}</span>
          </RouterLink>
          <button
            absolute
            right-1
            top-1.5
            w-5
            flex-center
            opacity-0
            hover:bg-sidebar-accent
            group-hover-opacity-100
            @click="onDeleteChat(chat.id)"
          >
            <div i-ri:delete-bin-5-line />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
