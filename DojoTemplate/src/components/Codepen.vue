<template>
  <section class="o-section u-pt">
    <div class="c-codepen">
      <h2 class="h1">Let's start coding</h2>
      <div class="o-flex o-grid--center u-pt">
        <input
          placeholder="Hier die URL eingeben"
          v-model="key"
        >
        <Button
          @click="getCodepenKey"
          iconId="leavePage"
          text="Senden"
          variant="secondary"
        />
      </div>
      <iframe
        v-if="codepenKey"
        class="c-codepen__iframe"
        height="500" style="width: 100%; border: none" title="Untitled"
        :src="`https://codepen.io/TKirchhoff123/embed/${codepenKey}?default-tab=html%2Cresult&editable=true&theme-id=dark`"
        loading="lazy" allowtransparency="true">
      </iframe>
      <div
        v-else
        class="c-codepen__preview"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Button from "./Button.vue";

const key = ref("")
const codepenKey = ref("");

function getCodepenKey() {
  let result = key.value.split("/")
  codepenKey.value = result.slice(-1)[0]
}
</script>
