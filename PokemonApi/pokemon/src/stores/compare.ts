import {defineStore} from 'pinia'
import {usePokemonStore} from "@/stores/pokemonApi";

export const useCompareStore = defineStore('compare', {
    state: () => ({
        selectedPokemons: []
    }),

    actions: {
        save(savedPokemonsIds) {
           this.selectedPokemons = savedPokemonsIds
        },
    }
})
