<template>
  <div
    class="o-flex o-flex--gap-s"
    :class="{'o-flex--scroll-controls': hasScrolled}"
  >
    <Chip
      v-for="(value, key) in controls"
      @click="$emit(key); toggle(key)"
      :iconId="key"
      :variant=value
    />
  </div>
</template>

<script setup lang="ts">
import Chip from "./Chip.vue";
import {ref} from "vue";

defineEmits(['start', 'stop', 'reset', 'skip', 'settings'])

const controls = ref({
  "start": "",
  "stop": "",
  "reset": "",
  "skip": "",
  "settings": "secondary"
})

const hasScrolled = ref(false)

window.onscroll = function () {
  hasScrolled.value = document.documentElement.scrollTop > 150;
}

function toggle(key) {
  controls.value["start"] = ""
  controls.value["stop"] = ""
  if (key === 'start' || key === 'stop') {
    controls.value[key] = "primary"
  }
}
</script>
