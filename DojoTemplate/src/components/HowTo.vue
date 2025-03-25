<template>
  <div class="c-how-to">
    <div class="o-grid o-grid--half">
      <div class="o-grid__item">
        <div class="c-how-to__headline">
          <Button
            @click="$router.go(-1)"
            icon="back"
            text="Zurück"
            variant="primary"
          />
          <h1>How To</h1>
        </div>
        <div class="c-how-to__text">
          <div
            class="c-how-to__contentBlock"
            v-for="(howToBlock) in howTos"
          >
            <h2>{{ howToBlock.title }}</h2>
            <ul
              class="c-how-to__list"
            >
              <li
                class="c-how-to__list-item"
                v-for="(howToListItem) in howToBlock.list">
                <svg class="c-how-to__list-item-icon">
                  <use href="#brush-stroke"></use>
                </svg>
                {{ howToListItem }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <img
        class="c-how-to__img"
        src="../assets/media/funkyMan.png"
        alt="thinkingMan">
    </div>
  </div>
</template>

<script setup lsng="ts">
import howTos from "../assets/json/howTo.json"
import Button from "./Button.vue";
</script>
