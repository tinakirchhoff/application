<template>
  <div>
    <h2>Neues Komponenten Object</h2>
    <Button
      class="u-mb"
      @click="formStore.isComponentFormOpen = false"
      text="Einstellung"
      variant="link-style"
    />
    <Divider/>
    <div
      @submit.prevent="getValuesComponent"
      class="c-form"
    >
      <div class="c-form__row">
        <div class="c-form__column">
          <label>Title: </label>
          <input
            placeholder="Titel der Komponente"
            required
            type="text"
            v-model="newComponentId"
          >
        </div>
        <div class="c-form__column">
          <label>Schwierigkeit: </label>
          <input
            placeholder="z.B. Erstes Ausbildungsjahr"
            required
            v-model="newComponentDifficulty"
            type="text"
          >
        </div>
      </div>
      <div class="c-form__column">
        <label>Beschreibung:</label>
        <ul v-if="Object.keys(description).length">
          <li v-for="item in description">
            {{ item }}
          </li>
        </ul>
        <div class="c-form__row">
          <input
            type="text"
            placeholder="Akzeptanzkriterium"
            v-model="descriptionItem"
            @keyup.enter="pushDescriptionItem"
            @blur="pushDescriptionItem"
          >
          <svg
            class="c-modal__icon"
            @click="pushDescriptionItem"
          >
            <use href="#check"></use>
          </svg>
        </div>
      </div>
      <div
        class="c-form__column"
        v-for="item in accordions"
      >
        <ul>
          <li>Titel: {{ item.title }}</li>
          <li>Content Titel: {{ item.contentTitle }}</li>
          <li>Link: {{ item.link }}</li>
        </ul>
      </div>

      <div class="c-form__row">
        <div class="c-form__column">
          <label>Titel: </label>
          <input
            placeholder="z.B. SCSS-Variante, Title des Accordions"
            required
            type="text"
            v-model="accordion['title']"
          >
        </div>
        <div class="c-form__column">
          <label>Content Titel: </label>
          <input
            placeholder="z.B. Klassisch (SCSS + JS), Title im Accordion"
            required
            type="text"
            v-model="accordion['contentTitle']"
          >
        </div>
      </div>
      <div class="c-form__column">
        <label>Link: </label>
        <div class="c-form__row">
          <input
            placeholder="Link zum Musterbeispiel"
            type="text"
            required
            v-model="accordion['link']"
            @blur="addNewAccordion"
          >

          <svg
            class="c-modal__icon"
            @click="addNewAccordion"
          >
            <use href="#check"></use>
          </svg>
        </div>
      </div>
      <Button
        class="u-mt"
        @click="getValuesComponent"
        text="Erzeuge"
        type="submit"
      />
    </div>
    <div v-if="Object.keys(result).length">
      <p>
        Damit die neue Komponente angezeigt wird, füge das
        Object in die Datei "components.json". Anschließend muss ein neues
        SVG in die Sprite.vue hinzugefügt werden. Diese braucht eine Id, die
        gleich dem vergegebenen Titel ist. Abschließend füge noch ein Musterbild
        in den Ordner detailImg hinzu, auch hier Imagename === Titel.
      </p>
      <textarea
        class="c-modal__result"
        rows="10"
      >{{result}}</textarea>
      <Button
        @click="formStore.copy(result)"
        text="Kopieren"
        variant="link-style"
      />
      <span v-if="formStore.copyWasSuccessful">
        Das Kopieren war Erfolgreich!
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/components/Button.vue";
import Divider from "@/components/Divider.vue";
import {ref} from "vue";
import {useFormStore} from "@/stores/formStore.js";

const formStore = useFormStore()
const newComponent = ref({})
const newComponentId = ref("")
const newComponentDifficulty = ref("")
const description = ref([])
const descriptionItem = ref("")
const result = ref("")
const accordion = ref({})
let accordions = []

function getValuesComponent() {
  newComponent.value['id'] = formStore.validateId(newComponentId.value)
  newComponent.value['difficulty'] = formStore.validateDifficulty(newComponentDifficulty.value)
  newComponent.value['description'] = description.value
  newComponent.value['accordions'] = accordions
  result.value = `"${newComponent.value.id}": ${JSON.stringify(newComponent.value, null, 2)}`
  newComponent.value = {}
  description.value = []
  accordions = []
}

function pushDescriptionItem() {
  if (!descriptionItem.value) return undefined
  description.value.push(descriptionItem.value)
  descriptionItem.value = ""
}

function addNewAccordion() {
  if (Object.keys(accordion.value).length < 3) return undefined
  accordions.push(accordion.value)
  accordion.value = {}
}
</script>
