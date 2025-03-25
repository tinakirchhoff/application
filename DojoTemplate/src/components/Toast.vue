<template>
  <div
    class="c-toast"
    :class="{'is-hidden': !timerStore.isTimeOver}"
  >
    <div class="c-toast__flag">
      <div class="c-toast__icon-container">
        <svg class="c-toast__icon">
          <use href="#warning"></use>
        </svg>
      </div>
    </div>
    <div class="c-toast__content">
      <span>Die Zeit ist abgelaufen!</span>
      <button
        class="c-toast__close"
        @click="timerStore.isTimeOver = false"
      >
        <svg>
          <use href="#close"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTimerStore} from "@/stores/timerStore.js";

const timerStore = useTimerStore()
</script>

