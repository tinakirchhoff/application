<template>
  <button
    class="c-button"
    :class="`c-button--${variant}`"
    :type="type"
  >
    <span
      v-if="stroke"
      class="c-button--stroke"
    ></span>
    <svg
      v-if="iconId"
      class="c-button__icon"
    >
      <use :href="`#${iconId}`"></use>
    </svg>
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  text: string,
  iconId?: string,
  variant?: string,
  stroke?: boolean,
  type?: string
}>()
</script>
