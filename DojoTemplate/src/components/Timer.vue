<template>
  <div class="o-grid o-grid--center">
    <div class="c-timer">
      <span
        :data-text="timerStore.time"
        class="c-timer__counter js-counter"
      >
        {{ timerStore.time }}
      </span>
      <svg class="c-timer__stroke">
        <use href="#stroke"></use>
      </svg>
    </div>
    <div
      v-if="hasScrolled"
      class="c-timer c-timer--small"
    >
      <span class="o-flex o-flex--gap-s">
        <svg class="c-timer__icon">
          <use href="#clock"></use>
        </svg> {{ timerStore.time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useTimerStore} from "@/stores/timerStore.js";

const timerStore = useTimerStore()
const hasScrolled = ref(false)

document.addEventListener("scroll", () => {
  hasScrolled.value = document.documentElement.scrollTop > 150;
})

</script>
