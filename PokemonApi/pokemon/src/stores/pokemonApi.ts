import {defineStore} from 'pinia'
import {useLocalStorage} from "@vueuse/core";

export const usePokemonStore = defineStore('pokemonApi', {
    state: () => ({
        pokemon: undefined as Pokemon | undefined,
        hasError: false,
        isLoading: false,
        savedPokemonIds: useLocalStorage("savedPokemonIds", []),
        pokemonAlreadySaved: false
    }),

    actions: {
        async fetchPokemon(name: string | number): Promise<Pokemon | undefined> {
            this.isLoading = true
            const url: string = `https://pokeapi.co/api/v2/pokemon/${name}`
            this.pokemon = undefined
            try {
                let response: Response = await fetch(url)
                this.pokemon = await response.json()
                this.hasError = false
                this.isLoading = false
                this.pokemonAlreadySaved = this.savedPokemonIds.includes(this.pokemon.id)
                return this.pokemon
            } catch (error) {
                this.hasError = true
            }
            this.isLoading = false
            return undefined
        },
        save() {
            if (!this.pokemon) return false;
            this.pokemonAlreadySaved = true
            this.savedPokemonIds.push(this.pokemon.id)
        },
        remove(index: number) {
            if (!this.pokemon) return false;
            this.savedPokemonIds.splice(index, 1)
        }
    }
})
