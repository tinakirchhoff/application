<template>
  <div class="c-accordion">
    <h3>Fähigkeiten:</h3>
    <ul>
      <li v-for="item in pokemon.abilities">
        <a @click="clickAbilities(item.ability.url)">{{ item.ability.name }}</a>
      </li>
    </ul>
    <h3>Weiterentwicklung: </h3>
    <ul>
      <li v-for="form in pokemon.forms">
        <a :href="form.url">{{ form.name }}</a>
      </li>
    </ul>
    <h3>Attacke: </h3>
    <ul class="o-grid o-grid--half">
      <li v-for="item in pokemon.moves"
      >
        <a @click="clickMoves(item.move.url)">{{ item.move.name }}</a>
      </li>
    </ul>
    <div class="c-accordion__additional-info" v-if="ability || move">
      <div v-if="ability">
        <h4>Fähigkeit:</h4>
        <p>Name: {{ ability.name }}</p>
        <a :href="ability.generation.url">{{ ability.generation.name }}</a>
      </div>
      <div v-if="move">
        <h4>Attacke: </h4>
        <p>Name: {{ move.name }}</p>
        <p>Zielsicherheit: {{ move.accuracy }}</p>
        <p>Pp?: {{ move.pp }}</p>
        <p>Priorität: {{ move.priority }}</p>
        <p>Power: {{ move.power }}</p>
        <a :href="move.damage_class.url">{{ move.damage_class.name }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useApiStore} from "@/stores/fetchApi";
import {type Ref, ref} from "vue";

const abilitiesStore = useApiStore()
const movesStore = useApiStore()

defineProps<{
  pokemon: Pokemon
}>()

const ability: Ref<Ability | undefined> = ref();
const move: Ref<Move | undefined> = ref();

async function clickAbilities(url: string) {
  ability.value = await abilitiesStore.fetch(url)
}

async function clickMoves(url: string) {
  move.value = await movesStore.fetch(url)
}
</script>

<style scoped lang="scss">
@import "../assets/accordion.scss";
@import "../assets/o-grid.scss";
</style>
