<template>
  <div
    class="c-accordion"
    :class="{'is-open': isOpen}"
  >
    <div
      class="c-accordion__header"
      @click="toggle"
    >
      <svg class="c-accordion__icon">
        <use href="#open"></use>
      </svg>
      <span class="c-accordion__titel">{{ title }}</span>
    </div>
    <div
      v-if="isOpen"
      class="c-accordion__body"
    >
      <span>{{ contentTitle }}</span>
      <a
        :href="link"
        target="_blank"
      >
        Beispiel
      </a>
      <svg class="c-accordion__triangle">
        <use href="#triangle"></use>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  title: string,
  contentTitle: string,
  link: string,
}>()

const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>
