<template>
  <section class="o-section o-section--small">
    <div class="o-flex o-grid--center">
    <IconCard
      v-for="(component, index) in components"
      :key="index"
      :id="component.id"
    />
    </div>
  </section>
</template>

<script setup lang="ts">
import components from "../assets/json/components.json"
import IconCard from "../components/IconCard.vue";
</script>
