<template>
  <header class="c-header">
    <div class="o-grid o-grid--third">
      <img
        class="c-header__logo-neusta"
        src="../assets/media/logo.png"
        alt="logo"
      >
      <RouterLink
        class="u-no-link-style c-header__logo-dojo"
        to="/"
      >
        <svg class="c-header__logo-dojo">
          <use href="#logoDojo"></use>
        </svg>
      </RouterLink>
      <Navigation/>
    </div>
    <Timer class="u-pb"/>
    <Controls/>
    <Toast
      :isTimeOver="timerStore.isTimeOver"
    />
  </header>
</template>

<script setup lang="ts">
import Navigation from "./Navigation.vue";
import Controls from "./Controls.vue";
import Timer from "@/components/Timer.vue";
import Toast from "@/components/Toast.vue";
import {useTimerStore} from "@/stores/timerStore.ts";

const timerStore = useTimerStore()
</script>
