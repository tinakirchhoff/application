<template>
  <div
    v-if="formStore.isModalOpen"
    class="c-modal"
  >
    <div class="c-modal__content">
      <svg
        class="c-modal__close"
        @click="formStore.isModalOpen = false"
      >
        <use href="#close"></use>
      </svg>
      <FormSettings v-if="!formStore.isComponentFormOpen"/>
      <FormComponent v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import FormSettings from "@/components/FormSettings.vue";
import FormComponent from "@/components/FormComponent.vue";
import {useFormStore} from "@/stores/formStore.js";

const formStore = useFormStore()
</script>
