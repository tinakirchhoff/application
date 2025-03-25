<template>
  <section class="o-section">
    <Detail
      :description="component.description"
      :id="component.id"
      :accordions="component.accordions"
    />
  </section>
  <Codepen/>
</template>

<script setup lang="ts">
import Detail from "../components/Detail.vue";
import Codepen from "../components/Codepen.vue";

defineProps<{
  component: object
}>()
</script>
