<script setup lang="ts">
import type { ObservableInput } from "rxjs";

import DemoPage from "#/layouts/demo-page.vue";
import { fromEvent, useObservable } from "@vueuse/rxjs";
import { concatAll, forkJoin, map, mergeMap, of, scan, take } from "rxjs";
import { ajax } from "rxjs/ajax";

const BASE_URL = "https://jsonplaceholder.typicode.com";
const button = useTemplateRef<HTMLButtonElement>("button");

const posts = useObservable(
  fromEvent(button as Ref<HTMLButtonElement>, "click").pipe(
    mergeMap(() => ajax.getJSON<ObservableInput<{ id: string, userId: string, title: string }>>(`${BASE_URL}/posts`).pipe(
      concatAll(),
      take(2),
      mergeMap(({ id, userId }) => forkJoin({
        test: of(1, 2, 4, 9999),
        id: of(id),
        comments: ajax.getJSON<string>(`${BASE_URL}/posts/${id}/comments`).pipe(
          map(comments => comments.length),
        ),
        username: ajax.getJSON<{ username: string }>(`${BASE_URL}/users/${userId}`).pipe(
          map(i => i.username),
        ),
      }), 2),
      scan((acc, cur) => [...acc, cur], [] as { id: string, comments: number, username: string }[]),
    )),
  ),
);
</script>

<template>
  <DemoPage>
    <button ref="button">
      RsJS
    </button>
    <div>{{ posts }}</div>
  </DemoPage>
</template>
