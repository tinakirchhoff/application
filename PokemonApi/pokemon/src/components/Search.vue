<template>
  <div class="c-search">
    <h1 class="c-search__headline">Pokémon Suche</h1>
    <form
        class="c-search__form"
        @submit.prevent="submit"
    >
      <input
          autofocus
          data-cy="search-input"
          required
          type="text"
          v-model="searchText"
      >
      <button
          class="c-search__submit"
          type="submit"
      >
        Senden
      </button>
    </form>
    <span v-if="pokemonStore.hasError">
    Es ist ein Fehler aufgetreten!
  </span>
    <LoadingSpinner v-if="pokemonStore.isLoading"/>
  </div>
  <Details v-if="showDetails"/>
</template>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue';
import {usePokemonStore} from '@/stores/pokemonApi'
import Details from "@/components/Details.vue";
import {ref} from "vue";

const pokemonStore = usePokemonStore()
const showDetails = ref(false)
let searchText: string;

async function submit() {
  showDetails.value = false

  if (searchText) {
    const validText = validateText(searchText)
    await pokemonStore.fetchPokemon(validText)
    searchText = ""
    showDetails.value = true
  }
}

function validateText(value: string): string {
  return value.replace(/\s/g, "").toLowerCase()
}

</script>

<style scoped>
@import "../assets/search.scss";
</style>
