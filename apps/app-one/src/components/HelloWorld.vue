<script setup lang="ts">
import { fromEvent, useObservable } from '@vueuse/rxjs';
import { type ObservableInput, concatAll, forkJoin, map, mergeMap, of, scan, take } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import imageUrl from '#/assets/images/btn/btn2.png';
import { getAssetsFile } from '#/utils/load-images';

defineProps<{ msg: string }>();
const count = ref(0);

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const button = ref<HTMLButtonElement | null>(null)

const posts = useObservable(
  fromEvent(button as Ref<HTMLButtonElement>, 'click').pipe(
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
          map(i => i.username)
        ),
      }), 2),
      scan((acc, cur) => [...acc, cur], [] as { id: string, comments: number, username: string }[]),
    )),
  ),
)

console.log(getAssetsFile('/btn/btn2.png'));
</script>

<template>
  <h1>{{ msg }}</h1>
  <div>
    <img :src="count % 2 === 0 ? getAssetsFile('/btn/btn2.png') : getAssetsFile('z-pan-ding.png')" alt="" srcset="" />
  </div>
  <img :src="imageUrl" alt="" srcset="" />
  <span>我是文字</span>
  <div class="box">我是Box</div>
  <button type="button" @click="count++">count is {{ count }}</button>
  <button ref="button" type="button">RsJS</button>
  {{ posts }}
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
