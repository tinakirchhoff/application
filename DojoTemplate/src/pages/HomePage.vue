<template>
  <section class="o-section">
    <Cards/>
    <div class="o-grid o-grid--center">
      <RouterLink
        class="u-no-link-style u-pt"
        to="/komponenten"
      >
        <Button
          iconId="leavePage"
          text="Alle Komponenten"
          variant="primary"
        />
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import Cards from "../components/Cards.vue";
import Button from "../components/Button.vue";
</script>
