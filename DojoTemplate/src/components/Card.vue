<template>
  <div
    class="c-card"
    :class="{'is-open': isOpen}"
    @click="flip"
  >
    <div class="c-card__header">
      <img
        class="c-card__media"
        :src="getImgUrl(imgName)"
        :alt="id"
      >
      <div class="c-card__headline">
        <svg class="c-card__icon">
          <use :href="`#${id}`"></use>
        </svg>
        <h2 class="u-first-up">{{ id }}</h2>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="c-card__body"
    >
      <span>{{ difficulty }}</span>
      <ul class="c-card__list">
        <li
          class="c-card__list-item"
          v-for="item in description"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <span class="c-card__dots">...</span>
    <RouterLink
      class="c-card__button u-no-link-style"
      :to="`/${id}`"
    >
      <Button
        iconId="leavePage"
        text="Mehr Details"
        variant="default"
      />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Button from "./Button.vue";

defineProps<{
  imgName: string,
  id: string,
  description: {},
  difficulty: string
}>()

const isOpen = ref(false)

function flip() {
  isOpen.value = !isOpen.value
}

function getImgUrl(imgName: string) :string {
  return new URL(`../assets/media/homeImg/${imgName}`, import.meta.url).href
}
</script>
