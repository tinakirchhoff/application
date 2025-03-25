<template id="app">
  <div class="o-page-wrapper">
<Sprite/>
  <Header/>
  <main>
    <div class="background-pattern background-pattern-top"></div>
    <RouterView />
    <div class="background-pattern background-pattern-bottom"></div>
  </main>
  </div>
</template>

<script setup>
import Sprite from "./components/Sprite.vue";
import Header from "./components/Header.vue";
</script>

<style lang="scss">
@import "assets/scss/main.scss";
</style>
