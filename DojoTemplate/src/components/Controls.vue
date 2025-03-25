<template>
  <div class="c-controls">
    <Divider>
      <template #content>
        <div class="o-grid o-grid--header">
          <div class="o-grid__item o-grid__item--left">
            <Chips/>
          </div>
          <div class="o-grid__item o-grid__item--right">
            <ControlChips
              @start="timerStore.start"
              @stop="timerStore.stop"
              @reset="timerStore.reset"
              @skip="timerStore.skip"
              @settings="formStore.isModalOpen = true"
            />
          </div>
        </div>
      </template>
    </Divider>
    <Modal/>
  </div>
</template>

<script setup lang="ts">
import Chips from "./Chips.vue";
import ControlChips from "./ControlChips.vue";
import Divider from "./Divider.vue";
import Modal from "./Modal.vue";
import {useTimerStore} from "@/stores/timerStore.js";
import {useFormStore} from "@/stores/formStore.js";

const timerStore = useTimerStore()
const formStore = useFormStore()

</script>
