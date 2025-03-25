<template>
  <RouterLink
    class="u-no-link-style u-pt"
    :to="`/${ id }`"
  >
    <div class="c-icon-card">
      <svg>
        <use :href="`#${ id }`"></use>
      </svg>
      <span>{{ id }}</span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
    id: string
  }>()
</script>
