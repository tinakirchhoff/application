<template>
  <div
      class="c-watchlist"
      data-cy="watchlist"
  >
    <svg
        class="c-watchlist__icon"
         @click="showModal"
         data-cy="watchlist-icon"
         viewBox="0 0 595.3 594.1"
         xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <path fill="#FFFFFF" d="M297.6,380.9c-40.4,0-74.1-28.6-82.1-66.6H81.1c9.5,110.5,102.2,197.2,215.1,197.2
			s205.7-86.7,215.1-197.2H379.7C371.7,352.4,338,380.9,297.6,380.9z"/>
          <path fill="#DFDFDF" d="M345.6,505.9c89.6-21,157.7-97.7,165.7-191.6h-53C453,399.5,408.3,471.7,345.6,505.9z"/>
          <path fill="#FFFFFF" d="M347.1,297L347.1,297C347,297,347,297,347.1,297c-0.1-6.1-1.2-11.9-3.2-17.3
			c-7-18.8-25.1-32.1-46.3-32.1s-39.3,13.4-46.3,32.1c-2,5.4-3.1,11.2-3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0
			c0,6.1,1.1,11.9,3.1,17.3c7,18.8,25.1,32.1,46.3,32.1c21.2,0,39.3-13.4,46.3-32.1C346,309,347.1,303.1,347.1,297
			C347.1,297,347.1,297,347.1,297z"/>
          <path fill="#FF1C1C" d="M297.7,213.2c40.4,0,74.1,28.6,82.1,66.6h134.4C504.7,169.2,412,82.5,299,82.5S93.4,169.2,83.9,279.7
			h131.7C223.6,241.7,257.3,213.2,297.7,213.2z"/>
          <path fill="#DF1818"
                d="M458.3,279.7h55.8c-8.2-95.5-78.6-173.3-170.5-192.6C407.4,120.8,452.9,193.7,458.3,279.7z"/>
        </g>
        <path d="M299,82.5c113,0,205.7,86.7,215.1,197.2H379.7c-8-38-41.7-66.6-82.1-66.6c-40.4,0-74.1,28.6-82.1,66.6H83.9
		C93.4,169.2,186.1,82.5,299,82.5z M343.9,279.7c2,5.4,3.1,11.2,3.1,17.3c0,0,0,0,0,0h0.1c0,0,0,0,0,0c0,6.1-1.1,11.9-3.1,17.3
		c-7,18.8-25.1,32.1-46.3,32.1c-21.2,0-39.3-13.4-46.3-32.1c-2-5.4-3.1-11.2-3.1-17.3c0,0,0,0,0,0h-0.1c0,0,0,0,0,0
		c0-6.1,1.1-11.9,3.1-17.3c7-18.8,25.1-32.1,46.3-32.1S336.9,261,343.9,279.7z M296.2,511.6c-113,0-205.7-86.7-215.1-197.2h134.4
		c8,38,41.7,66.6,82.1,66.6s74.1-28.6,82.1-66.6h131.7C501.9,424.8,409.2,511.6,296.2,511.6z M297.6,41.3
		C156.4,41.3,41.9,155.8,41.9,297s114.5,255.7,255.7,255.7S553.4,438.3,553.4,297S438.9,41.3,297.6,41.3z"/>
      </g>
    </svg>
    <span class="c-watchlist__icon-number">{{ pokemonStore.savedPokemonIds.length }}</span>

    <div
        v-if="buttonClick"
        class="c-watchlist__content"
    >
      <h1 class="c-watchlist__headline">Merkliste</h1>
      <span
          class="c-watchlist__close"
          @click="showModal"
      >✖</span>
      <ul class="c-watchlist__list">
        <li
            v-for="(pokemon, index) in pokemons"
            :key="index"
            class="c-watchlist__item"
            @click="showDetails(pokemon)"
            data-cy="watchlist-item"
        >
          <input
              v-model="selectedPokemonsIds"
              :value="pokemon.id"
              type="checkbox"
              @click.stop>
          <span
              class="c-watchlist__item-close"
              @click="remove(index)"
              data-cy="watchlist-item-close"
          >✖</span>
          <h2 class="c-details__title">{{ pokemon.name }}</h2>
          <img
              :src="pokemon.sprites.front_default"
              alt="pokemon">
        </li>
      </ul>
      <Details
          class="c-watchlist__details"
          v-if="itemClick"
          :pokemon="pokemon"
      />
      <button
          v-if="selectedPokemonsIds.length > 1"
          @click="compare"
          class="c-watchlist__btn"
      >Vergleichen</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePokemonStore} from "@/stores/pokemonApi";
import {type Ref, ref} from "vue";
import Details from "@/components/Details.vue";
import {useCompareStore} from "@/stores/compare";
import {RouterLink, useRouter} from "vue-router";

const pokemonStore = usePokemonStore()
const buttonClick = ref(false)
const pokemons: Ref<Pokemon[] | undefined> = ref([]);
const itemClick = ref(false)
const pokemon: Ref<Pokemon | undefined> = ref()
const selectedPokemonsIds = ref([])
const compareStore = useCompareStore()
const selectedPokemons = ref([])
const router = useRouter()

async function showModal() {
  if (!pokemons.value) return false;
  buttonClick.value = !buttonClick.value
  pokemons.value = []
  for (const pokemonId of pokemonStore.savedPokemonIds) {
    pokemons.value.push(await pokemonStore.fetchPokemon(pokemonId))
  }
}

function remove(index: number) {
  if (!pokemons.value) return false;
  pokemons.value.splice(index, 1);
  pokemonStore.remove(index)
  if(!pokemons.value.length) {
    buttonClick.value = false
  }
}

function showDetails(item: Pokemon | undefined) {
  if (!item) return false;
    itemClick.value = !itemClick.value
    pokemon.value = item
}

async function compare() {
 selectedPokemons.value = []
  for (const pokemonId of selectedPokemonsIds.value) {
    selectedPokemons.value.push(await pokemonStore.fetchPokemon(pokemonId))
  }
  compareStore.save(selectedPokemons.value)
  await router.push('/compare')
}
</script>

<style scoped lang="scss">
@import "../assets/watchlist.scss";
</style>
