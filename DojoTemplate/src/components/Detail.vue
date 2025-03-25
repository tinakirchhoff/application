<template>
  <div class="c-detail-page">
    <div class="c-detail-page__start">
      <Button
        iconId="back"
        text="Zurück"
        variant="primary"
        stroke
        @click="$router.go(-1)"
      />
      <h1 class="u-first-up">{{ props.id }}</h1>
    </div>
    <div class="c-detail-page__body">
      <div class="o-grid o-grid--half">
        <div class="c-detail-page__content">
          <ul class="c-detail-page__list">
            <li
              class="c-detail-page__text"
                v-for="item in props.description"
            >
              {{ item }}
            </li>
          </ul>
          <div class="o-grid">
            <Accordion
              v-for="accordions in props.accordions"
              :title="accordions.title"
              :contentTitle="accordions.contentTitle"
              :link="accordions.link"
            />
          </div>
        </div>
        <div class="c-detail-page__img">
          <img
            :src="getImgUrl(`${id}.png`)"
            :alt="id">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import Accordion from "./Accordion.vue";

const props = defineProps<{
    description: object,
    id: string,
    accordions: object
  }>()

function getImgUrl(name) {
  return new URL(`../assets/media/detailImg/${name}`, import.meta.url).href
}
</script>

