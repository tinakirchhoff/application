<template>
  <div class="o-grid o-grid--fifth">
    <Card
      v-for="(component, index) in summarizedJson" :key="index"
      :id="component.id"
      :img-name="component.homeImg"
      :difficulty="component.difficulty"
      :description="component.description"
    />
  </div>
</template>

<script setup lang="ts">
import homeImgNames from "../assets/json/homeImgNames.json"
import Card from "./Card.vue";
import components from "../assets/json/components.json"

const summarizedJson = Object.fromEntries(Object.entries(components).slice(0, 5))

Object.values(homeImgNames).forEach((homeImgName, index) => {
  Object.values(summarizedJson).forEach((component, key) => {
      Object.values(summarizedJson)[index]["homeImg"] = Object.values(homeImgNames)[index];
    }
  )
})
</script>

