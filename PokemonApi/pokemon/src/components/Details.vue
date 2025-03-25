<template>
  <div
      class="c-details"
      v-if="showDetails"
      data-cy="details"
  >
    <div>
      <div class="c-details__header">
         <span
             class="c-details__close"
             @click="close"
             data-cy="details-close"
         >✖</span>
        <h2
            class="c-details__title"
            data-cy="details-title"
        >
          {{ pokemon.name }}</h2>
        <img
            data-cy="c-details__media"
            :src="pokemon.sprites.front_default"
            alt="pokemon"
        >
      </div>
      <div data-cy="c-details__body">
        <h3>Erfahrung: {{ pokemon.base_experience }} Punkte</h3>
        <h3>Größe: {{ pokemon.height }} cm</h3>
        <h3>Gewicht: {{ pokemon.weight }} g</h3>
      </div>
      <span
          v-if="!showAccordion"
          class="c-details__toggle"
          @click="toggleAccordion"

      >Mehr anzeigen</span>
      <span
          v-else
          class="c-details__toggle"
          @click="toggleAccordion"

      >Weniger anzeigen</span>

      <Accordion v-if="showAccordion" :pokemon="pokemon"/>
    </div>
    <button
        @click="save"
        class="c-details__btn"
        :class="{'c-details__btn--disabled' : pokemonStore.pokemonAlreadySaved }"
        :disabled=pokemonStore.pokemonAlreadySaved
        data-cy="details-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 549.000000 371.000000">
        <g transform="translate(0.000000,371.000000) scale(0.100000,-0.100000)"
           stroke="none">
          <path d="M1574 3209 c-49 -14 -125 -70 -161 -117 -65 -86 -63 -42 -63 -1139 0
-1080 -2 -1035 55 -1061 60 -28 71 -22 496 244 l409 255 409 -255 c310 -194
416 -256 440 -256 44 0 86 24 100 57 8 21 11 289 9 1038 l-3 1010 -28 57 c-30
62 -83 115 -149 150 l-43 23 -720 2 c-416 1 -733 -2 -751 -8z m1427 -215 c61
-31 59 -1 59 -949 0 -476 -2 -865 -5 -865 -3 0 -163 99 -357 220 -289 180
-359 220 -388 220 -29 0 -99 -40 -388 -220 -194 -121 -354 -220 -357 -220 -3
0 -5 389 -5 864 0 616 3 872 11 895 7 18 26 41 43 52 30 18 60 19 694 19 582
0 667 -2 693 -16z"/>
        </g>
      </svg>
      Fangen
    </button>
  </div>
</template>

<script setup lang="ts">
import {usePokemonStore} from "@/stores/pokemonApi";
import {ref} from "vue";
import Accordion from "@/components/Accordion.vue";

const props = defineProps<{
  pokemon?: Pokemon
}>()

let pokemon: Pokemon;
const pokemonStore = usePokemonStore()
const showDetails = ref(true)
const showAccordion = ref(false)
if (props.pokemon) {
  pokemon = props.pokemon
} else if (pokemonStore.pokemon) {
  pokemon = pokemonStore.pokemon
}

function save() {
  pokemonStore.save()
}

function close() {
  showDetails.value = !showDetails.value
}

function toggleAccordion() {
  showAccordion.value = !showAccordion.value
}
</script>

<style scoped lang="scss">
@import "../assets/details.scss";
</style>
