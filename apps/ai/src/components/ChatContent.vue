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

const chatListBox = useTemplateRef<HTMLDivElement>("chatListBox");
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
  scrollToBottom();
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

// 在 script 部分添加
function scrollToBottom() {
  nextTick(() => {
    if (!chatListBox.value)
      return;

    const chatListContainer = chatListBox.value;
    const isScrolledToBottom
      = chatListContainer.scrollHeight - chatListContainer.scrollTop <= chatListContainer.clientHeight + 100;

    if (isScrolledToBottom) {
      chatListContainer.scrollTo({
        top: chatListContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  });
}

// 监听消息变化和路由变化
watch(
  [() => messageStore.messages, () => route.params.id],
  ([_messages, newId], [_oldMessages, _]) => {
    // 处理路由变化
    newId && messageStore.loadMessage(newId);
    // 处理消息变化导致的滚动
    scrollToBottom();
  },
  { deep: true }, // 深度监听消息变化
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
