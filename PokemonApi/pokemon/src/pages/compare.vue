<template>
  <div
      v-if="pokemons"
      class="o-grid o-grid--fourth"
  >
  <div v-for="pokemon in pokemons">
    <p :class="getClass(pokemon.base_experience, 'base_experience')">
      Erfahrung: {{ pokemon.base_experience }} Punkte
    </p>
    <p :class="getClass(pokemon.height, 'height')">
      Größe: {{ pokemon.height }} cm
    </p>
    <p :class="getClass(pokemon.weight, 'weight')">
      Gewicht: {{ pokemon.weight }} g
    </p>
    <p :class="getClass(pokemon.abilities.length, 'abilities')">
      Anzahl der Fähigkeiten: {{ pokemon.abilities.length }}
    </p>
    <p :class="getClass(pokemon.moves.length, 'moves')">
      Anzahl der Attacken: {{ pokemon.moves.length }}
    </p>
  </div>
    <a @click="$router.back()">Zurück zur Startseite</a>
  </div>
</template>

<script setup lang="ts">

import {useCompareStore} from "@/stores/compare";

import {ref, computed} from "vue";

const compareStore = useCompareStore();
const pokemons: Pokemon[] | undefined = compareStore.selectedPokemons;


const stats = computed(() => {
  if (!pokemons || pokemons.length === 0) return {};

  const getMinMax = (key: keyof Pokemon | string) => {
    const values = pokemons.map((pokemon) =>
        key === "abilities"
            ? pokemon.abilities.length
            : key === "moves"
                ? pokemon.moves.length
                : (pokemon as any)[key]
    );
    return {
      max: Math.max(...values),
      min: Math.min(...values),
    };
  };

  return {
    base_experience: getMinMax("base_experience"),
    height: getMinMax("height"),
    weight: getMinMax("weight"),
    abilities: getMinMax("abilities"),
    moves: getMinMax("moves"),
  };
});

const getClass = (value: number, statKey: string) => {
  const stat = stats.value[statKey];
  if (!stat) return "";

  if (value === stat.max) return "highest";
  if (value === stat.min) return "lowest";
  return "";
};
</script>


<style scoped lang="scss">
.highest {
  color: green;
  font-weight: bold;
}

.lowest {
  color: red;
  font-weight: bold;
}

@import "../assets/o-grid.scss";
</style>
