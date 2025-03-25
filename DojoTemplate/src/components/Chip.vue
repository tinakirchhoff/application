<template>
  <div
    class="c-chip"
    :class="
    `c-chip--${variant}`,
    {'c-chip--bg': hasBackground}
     "
    @click="$emit('click')"
  >
    <svg class="c-chip__icon">
      <use :href="'#'+iconId"></use>
    </svg>
    <span v-if="content">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
defineEmits(['click'])
defineProps<{
    content?: string,
    iconId: string,
    variant?: string,
    hasBackground?: boolean
  }>()
</script>
