<script setup lang="ts">
import type { Themes } from "md-editor-v3";
import { chat, closeSse } from "#/api/chat";
import Button from "#/components/Button.vue";
import { useChatStream } from "#/composes/chat-sse";
import { chatStorage } from "#/composes/chat-storage";
import { useMessageStore } from "#/stores";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const route = useRoute<"/chat/[id]">();
const id = route.params.id;
console.warn(id);
useHead({
  title: chatStorage.value.get(route.params.id)?.title,
});

const { eventSource, chatStream } = useChatStream();
const messageStore = useMessageStore();

messageStore.promptContent = "你是很有帮助的助手";

const content = ref("");

const chatListBox = useTemplateRef("chatListBox");
const theme: Array<Themes> = ["light", "dark"];
const previewTheme = ["default", "github", "vuepress", "mk-cute", "smart-blue", "cyanosis"];
const codeTheme = [
  "atom",
  "ally",
  "github",
  "gradient",
  "kimbie",
  "paraiso",
  "qtcreator",
  "stackoverflow",
];

function onSend() {
  if (content.value.trim() === "") {
    return;
  }
  chat(content.value);
  nextTick(() => {
    chatListBox.value?.scrollTo(0, chatListBox.value.scrollHeight);
  });
}

onMounted(() => {
  chatStream();
  messageStore.loadMessage(route.params.id as string);
  window.addEventListener("beforeunload", () => {
    closeSse();
    eventSource.close();
  });
});

onBeforeUnmount(() => {
  closeSse();
  eventSource.close();
});

// TODO: 一堆问题
watch(
  [() =>
    messageStore.messages.length === 0
      ? ""
      : messageStore.messages[messageStore.messages.length - 1].content, () => route.params.id],
  ([newMessage, newId], _old) => {
    newId && messageStore.loadMessage(newId);
    newMessage && chatListBox.value?.scrollTo(0, chatListBox.value.scrollHeight);
  },
);
</script>

<template>
  <div>
    <div
      ref="chatListBox"
      class="h-[calc(100vh-7.25rem)]"
      overflow-y-auto
    >
      <div
        v-for="message in messageStore.messages"
        :key="message.id"
      >
        <MdPreview
          :theme="theme[0]"
          :code-theme="codeTheme[0]"
          :preview-theme="previewTheme[5]"
          :model-value="message.content"
        />
      </div>
    </div>

    <div
      w="80%"
      m-auto
      h-25
      flex-center
    >
      <div
        w-full
        flex-center
        border-2
        border-black
        border-rd
        border-solid
        px-2
        py-1
      >
        <input
          v-model="content"
          h-8
          flex-1
          text-size-lg
          outline="none active:none"
          @keydown.enter="onSend"
        >
        <Button @click="onSend">
          发送
        </Button>
      </div>
    </div>
  </div>
</template>
